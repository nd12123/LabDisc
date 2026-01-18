// src/blocks/input/enviro.js
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import { SENSOR_ID } from "./sensorIds.js";

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

// Добавляем: UV, IR temp, barometer, GPS x5, colorimeter R/G/B, turbidity, DO
const sensors = [
  {
    sensorId: SENSOR_ID.UV,
    name: "enviro_get_uv",
    label: "UV index",
    unit: "",
  },
  {
    sensorId: SENSOR_ID.IR_TEMP,
    name: "enviro_get_ir_temperature",
    label: "IR temperature (°C)",
    unit: "°C",
  },
  {
    sensorId: SENSOR_ID.BAROMETER,
    name: "enviro_get_barometer",
    label: "barometer (mBar)",
    unit: "mBar",
  },

  // GPS (ID 7): 5 каналов
  {
    sensorId: SENSOR_ID.GPS_LAT,
    name: "enviro_get_gps_lat",
    label: "GPS latitude (°)",
    unit: "°",
  },
  {
    sensorId: SENSOR_ID.GPS_LONG,
    name: "enviro_get_gps_lon",
    label: "GPS longitude (°)",
    unit: "°",
  },
  {
    sensorId: SENSOR_ID.GPS_SPEED,
    name: "enviro_get_gps_speed",
    label: "GPS speed",
    unit: "",
  },
  {
    sensorId: SENSOR_ID.GPS_ANGLE,
    name: "enviro_get_gps_course",
    label: "GPS course (°)",
    unit: "°",
  },
  {
    sensorId: SENSOR_ID.GPS,
    name: "enviro_get_gps_time",
    label: "GPS time (s)",
    unit: "s",
  },

  // Colorimeter — три канала (%T)
  {
    sensorId: SENSOR_ID.COLORIMETER_R,
    name: "enviro_get_color_r",
    label: "colorimeter R (%T)",
    unit: "%T",
  },
  {
    sensorId: SENSOR_ID.COLORIMETER_G,
    name: "enviro_get_color_g",
    label: "colorimeter G (%T)",
    unit: "%T",
  },
  {
    sensorId: SENSOR_ID.COLORIMETER_B,
    name: "enviro_get_color_b",
    label: "colorimeter B (%T)",
    unit: "%T",
  },

  {
    sensorId: SENSOR_ID.TURBIDITY,
    name: "enviro_get_turbidity",
    label: "turbidity (NTU)",
    unit: "NTU",
  },
  {
    sensorId: SENSOR_ID.DISSOLVED_OXYGEN,
    name: "enviro_get_do",
    label: "dissolved O₂ (mg/L)",
    unit: "mg/L",
  },
];

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
Blockly.Blocks["enviro_get_gps"] = {
  init: function () {
    this.jsonInit({
      type: "enviro_get_gps",
      message0: "GPS [lat, lon, speed, course, time]",
      output: "Array",
      colour: 210,
      tooltip: "Returns [lat°, lon°, speed, course°, time_s]",
      helpUrl: "",
    });
  },
};

javascriptGenerator.forBlock["enviro_get_gps"] = function () {
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
