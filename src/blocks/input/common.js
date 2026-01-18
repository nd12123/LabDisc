// src/blocks/input/input_common.js
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import { SENSOR_ID } from "./sensorIds.js";

/**
 * Универсальные блоки сенсоров (встречаются в нескольких моделях).
 * - Единые типы: get_ambient_temperature, get_external_temperature, get_light, get_ph, ...
 * - GPS: единый блок get_gps -> Array [lat, lon, speed, course, time]
 * - Colorimeter: get_color_r/g/b
 * Back-compat алиасы: get_temperature -> ambient, get_amb_temp -> ambient, get_external -> external temperature.
 */

// утилита генерации вызова
function genCall(sensorId, ch = null) {
  if (typeof globalThis?.getSensorValueByCode === "function") {
    return ch == null
      ? `getSensorValueByCode(${sensorId})`
      : `getSensorValueByCode(${sensorId}, ${ch})`;
  }
  return `getSensorValue(${sensorId})`;
}

// регистратор одно-канального блока
function reg1({ type, label, sensorId }) {
  Blockly.Blocks[type] = {
    init() {
      this.jsonInit({
        type,
        message0: label,
        output: "Number",
        colour: 210,
        tooltip: `Get ${label}`,
        helpUrl: "",
      });
    },
  };
  javascriptGenerator.forBlock[type] = () => [
    genCall(sensorId),
    javascriptGenerator.ORDER_ATOMIC,
  ];
}

// регистратор многоканального семейства (например, colorimeter R/G/B)
function regMulti(baseType, items, code) {
  items.forEach(({ suffix, label, ch }) => {
    const type = `${baseType}_${suffix}`;
    Blockly.Blocks[type] = {
      init() {
        this.jsonInit({
          type,
          message0: label,
          output: "Number",
          colour: 210,
          tooltip: `Get ${label}`,
          helpUrl: "",
        });
      },
    };
    javascriptGenerator.forBlock[type] = () => [
      genCall(code, ch),
      javascriptGenerator.ORDER_ATOMIC,
    ];
  });
}

/* =========================
 *   РЕГИСТРАЦИЯ УНИВЕРСАЛЬНЫХ БЛОКОВ
 * ========================= */

// Температуры
reg1({
  type: "get_ambient_temperature",
  label: "ambient temperature (°C)",
  sensorId: SENSOR_ID.AMB_TEMPERATURE,
});
reg1({
  type: "get_external_temperature",
  label: "external temperature (°C)",
  sensorId: SENSOR_ID.EXTERNAL_TEMPERATURE,
});

// Свет (люксы) — LUT в рантайме
reg1({ type: "get_light", label: "light (lx)", sensorId: SENSOR_ID.LIGHT });

// pH
reg1({ type: "get_ph", label: "pH", sensorId: SENSOR_ID.PH });

// Барометр
reg1({
  type: "get_barometer",
  label: "barometer (mBar)",
  sensorId: SENSOR_ID.BAROMETER,
});

// Влажность
reg1({
  type: "get_humidity",
  label: "relative humidity (%RH)",
  sensorId: SENSOR_ID.HUMIDITY,
});

// Звук (дБ)
reg1({
  type: "get_sound_level",
  label: "sound level (dB)",
  sensorId: SENSOR_ID.SOUND,
});

// Расстояние (м)
reg1({
  type: "get_distance",
  label: "distance (m)",
  sensorId: SENSOR_ID.DISTANCE,
});

// Давление воздуха (кПа)
reg1({
  type: "get_air_pressure",
  label: "air pressure (kPa)",
  sensorId: SENSOR_ID.AIRPRESSURE,
});

// Напряжение/Ток
reg1({
  type: "get_voltage",
  label: "voltage (V)",
  sensorId: SENSOR_ID.VOLTAGE,
});
reg1({
  type: "get_current",
  label: "current (A)",
  sensorId: SENSOR_ID.CURRENT,
});

// Внешний вход 1 (V)
reg1({
  type: "get_external1",
  label: "external input 1 (V)",
  sensorId: SENSOR_ID.EXTERNAL_A,
});

// Микрофон (V)
reg1({
  type: "get_microphone",
  label: "microphone (V)",
  sensorId: SENSOR_ID.MICROPHONE,
});

// Водные датчики
reg1({
  type: "get_do",
  label: "dissolved O₂ (mg/L)",
  sensorId: SENSOR_ID.DISSOLVED_OXYGEN,
});
reg1({
  type: "get_turbidity",
  label: "turbidity (NTU)",
  sensorId: SENSOR_ID.TURBIDITY,
});
reg1({
  type: "get_conductivity",
  label: "conductivity (mS)",
  sensorId: SENSOR_ID.CONDUCTIVITY,
});

// GPS — единый блок, возвращающий массив [lat, lon, speed, course, time]
Blockly.Blocks["get_gps"] = {
  init: function () {
    this.jsonInit({
      type: "get_gps",
      message0: "GPS [lat, lon, speed, course, time]",
      output: "Array",
      colour: 210,
      tooltip: "Returns [lat°, lon°, speed, course°, time_s]",
      helpUrl: "",
    });
  },
};
javascriptGenerator.forBlock["get_gps"] = function () {
  if (typeof globalThis?.getSensorValueByCode === "function") {
    return [
      `[getSensorValueByCode(${SENSOR_ID.GPS},0), getSensorValueByCode(${SENSOR_ID.GPS},1), getSensorValueByCode(${SENSOR_ID.GPS},2), getSensorValueByCode(${SENSOR_ID.GPS},3), getSensorValueByCode(${SENSOR_ID.GPS},4)]`,
      javascriptGenerator.ORDER_ATOMIC,
    ];
  }
  return [
    `[getSensorValue(${SENSOR_ID.GPS_LAT}), getSensorValue(${SENSOR_ID.GPS_LONG}), getSensorValue(${SENSOR_ID.GPS_SPEED}), getSensorValue(${SENSOR_ID.GPS_ANGLE}), getSensorValue(${SENSOR_ID.GPS})]`,
    javascriptGenerator.ORDER_ATOMIC,
  ];
};

/* =========================
 *   BACK-COMPAT АЛИАСЫ
 * =========================
 * Сохраняем старые типы, но они возвращают те же значения.
 */

// get_temperature -> ambient
Blockly.Blocks["get_temperature"] = {
  init() {
    this.jsonInit({
      type: "get_temperature",
      message0: "temperature (°C)",
      output: "Number",
      colour: 210,
    });
  },
};
javascriptGenerator.forBlock["get_temperature"] = () => [
  genCall(SENSOR_ID.AMB_TEMPERATURE),
  javascriptGenerator.ORDER_ATOMIC,
];

// get_amb_temp -> ambient
Blockly.Blocks["get_amb_temp"] = {
  init() {
    this.jsonInit({
      type: "get_amb_temp",
      message0: "amb. temperature (°C)",
      output: "Number",
      colour: 210,
    });
  },
};
javascriptGenerator.forBlock["get_amb_temp"] = () => [
  genCall(SENSOR_ID.AMB_TEMPERATURE),
  javascriptGenerator.ORDER_ATOMIC,
];

// get_external -> external temperature
Blockly.Blocks["get_external"] = {
  init() {
    this.jsonInit({
      type: "get_external",
      message0: "attached sensor",
      output: "Number",
      colour: 210,
    });
  },
};
javascriptGenerator.forBlock["get_external"] = () => [
  genCall(SENSOR_ID.EXTERNAL_TEMPERATURE),
  javascriptGenerator.ORDER_ATOMIC,
];
// Colorimeter — единый блок, возвращает [R, G, B] в %T
Blockly.Blocks["get_color"] = {
  init: function () {
    this.jsonInit({
      type: "get_colorimeter",
      message0: "colorimeter [R, G, B] (%T)",
      output: "Array",
      colour: 210,
      tooltip: "Returns [R%T, G%T, B%T]",
      helpUrl: "",
    });
  },
};

javascriptGenerator.forBlock["get_color"] = function () {
  if (typeof globalThis?.getSensorValueByCode === "function") {
    // Colorimeter code, каналы 0/1/2
    return [
      `[getSensorValueByCode(${SENSOR_ID.COLORIMETER},0), getSensorValueByCode(${SENSOR_ID.COLORIMETER},1), getSensorValueByCode(${SENSOR_ID.COLORIMETER},2)]`,
      javascriptGenerator.ORDER_ATOMIC,
    ];
  }
  // fallback на внутренние ID (если byCode отсутствует)
  return [
    `[getSensorValue(${SENSOR_ID.COLORIMETER_R}), getSensorValue(${SENSOR_ID.COLORIMETER_G}), getSensorValue(${SENSOR_ID.COLORIMETER_B})]`,
    javascriptGenerator.ORDER_ATOMIC,
  ];
};

// (экспорт при желании)
const sensors = [
  "get_ambient_temperature",
  "get_external_temperature",
  "get_light",
  "get_ph",
  "get_barometer",
  "get_humidity",
  "get_sound_level",
  "get_distance",
  "get_air_pressure",
  "get_voltage",
  "get_current",
  "get_external1",
  "get_microphone",
  "get_do",
  "get_turbidity",
  "get_conductivity",
  "get_color",
  "get_gps",
  // алиасы:
  "get_temperature",
  "get_amb_temp",
  "get_external",
];

export default sensors;
