// src/blocks/input/input_common.js
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

/**
 * Универсальные блоки сенсоров (встречаются в нескольких моделях).
 * - Единые типы: get_ambient_temperature, get_external_temperature, get_light, get_ph, ...
 * - GPS: единый блок get_gps -> Array [lat, lon, speed, course, time]
 * - Colorimeter: get_color_r/g/b
 * Back-compat алиасы: get_temperature -> ambient, get_amb_temp -> ambient, get_external -> external temperature.
 */

// fallback-внутренние ID (НЕ Labdisc-коды). Используются только если нет getSensorValueByCode.
const SENSOR_ID = {
  AMBIENT_TEMP: 1,        // °C (code 30)
  EXTERNAL_TEMP: 12,      // °C (code 13)
  LIGHT: 2,               // lx (code 20)
  PH: 3,                  // pH (code 2)
  BAROMETER: 14,          // mBar (code 4)
  HUMIDITY: 15,           // %RH (code 6)

  // GPS — 5 каналов
  GPS_LAT: 20,
  GPS_LON: 21,
  GPS_SPEED: 22,
  GPS_COURSE: 23,
  GPS_TIME: 24,

  // Colorimeter — 3 канала
  COLOR_R: 60,
  COLOR_G: 61,
  COLOR_B: 62,

  SOUND_LEVEL: 9,         // dB (code 21)
  DISTANCE: 18,           // m  (code 25)
  AIR_PRESSURE_KPA: 11,   // kPa (code 26)
  VOLTAGE: 6,             // V  (code 27)
  CURRENT: 5,             // A  (code 28)
  EXTERNAL1: 32,          // V  (code 32)
  MICROPHONE: 33,         // V  (code 33)

  DISSOLVED_O2: 40,       // mg/L (code 40)
  TURBIDITY: 31,          // NTU  (code 31)
  CONDUCTIVITY: 41,       // mS   (code 41)
};

// утилита генерации вызова
function genCall(code, ch = null, fallbackId = null) {
  if (typeof globalThis?.getSensorValueByCode === 'function') {
    return ch == null
      ? `getSensorValueByCode(${code})`
      : `getSensorValueByCode(${code}, ${ch})`;
  }
  return `getSensorValue(${fallbackId ?? code})`;
}

// регистратор одно-канального блока
function reg1({ type, label, code, fallbackId }) {
  Blockly.Blocks[type] = {
    init() {
      this.jsonInit({
        type,
        message0: label,
        output: 'Number',
        colour: 210,
        tooltip: `Get ${label}`,
        helpUrl: ''
      });
    }
  };
  javascriptGenerator.forBlock[type] = () => [
    genCall(code, null, fallbackId),
    javascriptGenerator.ORDER_ATOMIC
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
          output: 'Number',
          colour: 210,
          tooltip: `Get ${label}`,
          helpUrl: ''
        });
      }
    };
    javascriptGenerator.forBlock[type] = () => [
      genCall(code, ch),
      javascriptGenerator.ORDER_ATOMIC
    ];
  });
}

/* =========================
 *   РЕГИСТРАЦИЯ УНИВЕРСАЛЬНЫХ БЛОКОВ
 * ========================= */

// Температуры
reg1({ type: 'get_ambient_temperature',  label: 'ambient temperature (°C)',  code: 30, fallbackId: SENSOR_ID.AMBIENT_TEMP });
reg1({ type: 'get_external_temperature', label: 'external temperature (°C)', code: 13, fallbackId: SENSOR_ID.EXTERNAL_TEMP });

// Свет (люксы) — LUT в рантайме
reg1({ type: 'get_light', label: 'light (lx)', code: 20, fallbackId: SENSOR_ID.LIGHT });

// pH
reg1({ type: 'get_ph', label: 'pH', code: 2, fallbackId: SENSOR_ID.PH });

// Барометр
reg1({ type: 'get_barometer', label: 'barometer (mBar)', code: 4, fallbackId: SENSOR_ID.BAROMETER });

// Влажность
reg1({ type: 'get_humidity', label: 'relative humidity (%RH)', code: 6, fallbackId: SENSOR_ID.HUMIDITY });

// Звук (дБ)
reg1({ type: 'get_sound_level', label: 'sound level (dB)', code: 21, fallbackId: SENSOR_ID.SOUND_LEVEL });

// Расстояние (м)
reg1({ type: 'get_distance', label: 'distance (m)', code: 25, fallbackId: SENSOR_ID.DISTANCE });

// Давление воздуха (кПа)
reg1({ type: 'get_air_pressure', label: 'air pressure (kPa)', code: 26, fallbackId: SENSOR_ID.AIR_PRESSURE_KPA });

// Напряжение/Ток
reg1({ type: 'get_voltage', label: 'voltage (V)', code: 27, fallbackId: SENSOR_ID.VOLTAGE });
reg1({ type: 'get_current', label: 'current (A)', code: 28, fallbackId: SENSOR_ID.CURRENT });

// Внешний вход 1 (V)
reg1({ type: 'get_external1', label: 'external input 1 (V)', code: 32, fallbackId: SENSOR_ID.EXTERNAL1 });

// Микрофон (V)
reg1({ type: 'get_microphone', label: 'microphone (V)', code: 33, fallbackId: SENSOR_ID.MICROPHONE });

// Водные датчики
reg1({ type: 'get_do', label: 'dissolved O₂ (mg/L)', code: 40, fallbackId: SENSOR_ID.DISSOLVED_O2 });
reg1({ type: 'get_turbidity', label: 'turbidity (NTU)', code: 31, fallbackId: SENSOR_ID.TURBIDITY });
reg1({ type: 'get_conductivity', label: 'conductivity (mS)', code: 41, fallbackId: SENSOR_ID.CONDUCTIVITY });

// GPS — единый блок, возвращающий массив [lat, lon, speed, course, time]
Blockly.Blocks['get_gps'] = {
  init: function () {
    this.jsonInit({
      type: 'get_gps',
      message0: 'GPS [lat, lon, speed, course, time]',
      output: 'Array',
      colour: 210,
      tooltip: 'Returns [lat°, lon°, speed, course°, time_s]',
      helpUrl: ''
    });
  }
};
javascriptGenerator.forBlock['get_gps'] = function () {
  if (typeof globalThis?.getSensorValueByCode === 'function') {
    return [
      '[getSensorValueByCode(7,0), getSensorValueByCode(7,1), getSensorValueByCode(7,2), getSensorValueByCode(7,3), getSensorValueByCode(7,4)]',
      javascriptGenerator.ORDER_ATOMIC
    ];
  }
  return [
    `[getSensorValue(${SENSOR_ID.GPS_LAT}), getSensorValue(${SENSOR_ID.GPS_LON}), getSensorValue(${SENSOR_ID.GPS_SPEED}), getSensorValue(${SENSOR_ID.GPS_COURSE}), getSensorValue(${SENSOR_ID.GPS_TIME})]`,
    javascriptGenerator.ORDER_ATOMIC
  ];
};

/* =========================
 *   BACK-COMPAT АЛИАСЫ
 * =========================
 * Сохраняем старые типы, но они возвращают те же значения.
 */

// get_temperature -> ambient
Blockly.Blocks['get_temperature'] = {
  init() {
    this.jsonInit({ type: 'get_temperature', message0: 'temperature (°C)', output: 'Number', colour: 210 });
  }
};
javascriptGenerator.forBlock['get_temperature'] = () => [
  genCall(30, null, SENSOR_ID.AMBIENT_TEMP),
  javascriptGenerator.ORDER_ATOMIC
];

// get_amb_temp -> ambient
Blockly.Blocks['get_amb_temp'] = {
  init() {
    this.jsonInit({ type: 'get_amb_temp', message0: 'amb. temperature (°C)', output: 'Number', colour: 210 });
  }
};
javascriptGenerator.forBlock['get_amb_temp'] = () => [
  genCall(30, null, SENSOR_ID.AMBIENT_TEMP),
  javascriptGenerator.ORDER_ATOMIC
];

// get_external -> external temperature
Blockly.Blocks['get_external'] = {
  init() {
    this.jsonInit({ type: 'get_external', message0: 'attached sensor', output: 'Number', colour: 210 });
  }
};
javascriptGenerator.forBlock['get_external'] = () => [
  genCall(13, null, SENSOR_ID.EXTERNAL_TEMP),
  javascriptGenerator.ORDER_ATOMIC
];
// Colorimeter — единый блок, возвращает [R, G, B] в %T
Blockly.Blocks['get_color'] = {
  init: function () {
    this.jsonInit({
      type: 'get_colorimeter',
      message0: 'colorimeter [R, G, B] (%T)',
      output: 'Array',
      colour: 210,
      tooltip: 'Returns [R%T, G%T, B%T]',
      helpUrl: ''
    });
  }
};

javascriptGenerator.forBlock['get_color'] = function () {
  if (typeof globalThis?.getSensorValueByCode === 'function') {
    // Labdisc code 14, каналы 0/1/2
    return [
      '[getSensorValueByCode(14,0), getSensorValueByCode(14,1), getSensorValueByCode(14,2)]',
      javascriptGenerator.ORDER_ATOMIC
    ];
  }
  // fallback на внутренние ID (если byCode отсутствует)
  return [
    `[getSensorValue(${SENSOR_ID.COLOR_R}), getSensorValue(${SENSOR_ID.COLOR_G}), getSensorValue(${SENSOR_ID.COLOR_B})]`,
    javascriptGenerator.ORDER_ATOMIC
  ];
};

// (экспорт при желании)
const sensors = [
  'get_ambient_temperature',
  'get_external_temperature',
  'get_light',
  'get_ph',
  'get_barometer',
  'get_humidity',
  'get_sound_level',
  'get_distance',
  'get_air_pressure',
  'get_voltage',
  'get_current',
  'get_external1',
  'get_microphone',
  'get_do',
  'get_turbidity',
  'get_conductivity',
  'get_color',
  'get_gps',
  // алиасы:
  'get_temperature',
  'get_amb_temp',
  'get_external',
];

export default sensors;
