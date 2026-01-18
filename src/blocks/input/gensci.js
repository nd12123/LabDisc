// src/blocks/input/gensci.js
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import { SENSOR_ID } from "./sensorIds.js";

/**
 * Внутренние ID — временные (для fallback на getSensorValue(id)).
 * Основной путь — getSensorValueByCode(code[, channel]).
 */

function channelFor(name) {
  // GPS
  if (name.endsWith("_gps_lat")) return 0;
  if (name.endsWith("_gps_lon")) return 1;
  if (name.endsWith("_gps_speed")) return 2;
  if (name.endsWith("_gps_course")) return 3;
  if (name.endsWith("_gps_time")) return 4;
  // Colorimeter
  if (name.endsWith("_color_r")) return 0;
  if (name.endsWith("_color_g")) return 1;
  if (name.endsWith("_color_b")) return 2;
  return null;
}

// Набор блоков GenSci (добавлены: humidity, GPS x5, microphone)
const sensors = [
  {
    sensorId: SENSOR_ID.HUMIDITY,
    name: "gensci_get_humidity",
    label: "relative humidity (%RH)",
    unit: "%RH",
  },
  {
    sensorId: SENSOR_ID.MICROPHONE,
    name: "gensci_get_microphone",
    label: "microphone (V)",
    unit: "V",
  },

  // GPS (ID 7): 5 каналов
  {
    sensorId: SENSOR_ID.GPS_LAT,
    name: "gensci_get_gps_lat",
    label: "GPS latitude (°)",
    unit: "°",
  },
  {
    sensorId: SENSOR_ID.GPS_LONG,
    name: "gensci_get_gps_lon",
    label: "GPS longitude (°)",
    unit: "°",
  },
  {
    sensorId: SENSOR_ID.GPS_SPEED,
    name: "gensci_get_gps_speed",
    label: "GPS speed",
    unit: "",
  },
  {
    sensorId: SENSOR_ID.GPS_ANGLE,
    name: "gensci_get_gps_course",
    label: "GPS course (°)",
    unit: "°",
  },
  {
    sensorId: SENSOR_ID.GPS,
    name: "gensci_get_gps_time",
    label: "GPS time (s)",
    unit: "s",
  },
];

// Регистрация
for (const sensor of sensors) {
  Blockly.Blocks[sensor.name] = {
    init: function () {
      this.jsonInit({
        type: sensor.name,
        message0: sensor.label,
        output: "Number",
        colour: 210,
        tooltip: `Get ${sensor.label}`,
        helpUrl: "",
      });
    },
  };

  javascriptGenerator.forBlock[sensor.name] = function () {
    const ch = channelFor(sensor.name);
    if (typeof globalThis?.getSensorValueByCode === "function") {
      return [
        ch == null
          ? `getSensorValueByCode(${sensor.sensorId})`
          : `getSensorValueByCode(${sensor.sensorId}, ${ch})`,
        javascriptGenerator.ORDER_ATOMIC,
      ];
    }
    return [
      `getSensorValue(${sensor.sensorId})`,
      javascriptGenerator.ORDER_ATOMIC,
    ];
  };
}

// === GPS unified block: returns [lat, lon, speed, course, time] ===
Blockly.Blocks["gensci_get_gps"] = {
  init: function () {
    this.jsonInit({
      type: "gensci_get_gps",
      message0: "GPS [lat, lon, speed, course, time]",
      output: "Array",
      colour: 210,
      tooltip: "Returns [lat°, lon°, speed, course°, time_s]",
      helpUrl: "",
    });
  },
};

javascriptGenerator.forBlock["gensci_get_gps"] = function () {
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

export default sensors;
