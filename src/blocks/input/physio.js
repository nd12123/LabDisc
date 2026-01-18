// src/blocks/input/physio.js
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import { SENSOR_ID } from "./sensorIds.js";

/**
 * Уникальные для Physio сенсоры:
 *  - low voltage (ID 34)
 *  - accelerometer (ID 35) -> единый блок [ax, ay, az]
 *  - external input 1 (ID 32)
 *  - external input 2 (ID 39)
 * Универсальные (барометр, микрофон и т.п.) берём из input_common.js.
 */

// low voltage (V)
Blockly.Blocks["physio_get_low_voltage"] = {
  init: function () {
    this.jsonInit({
      type: "physio_get_low_voltage",
      message0: "low voltage (V)",
      output: "Number",
      colour: 210,
      tooltip: "Get low voltage input (V)",
      helpUrl: "",
    });
  },
};
javascriptGenerator.forBlock["physio_get_low_voltage"] = function () {
  if (typeof globalThis?.getSensorValueByCode === "function") {
    return [
      `getSensorValueByCode(${SENSOR_ID.LOW_VOLTAGE})`,
      javascriptGenerator.ORDER_ATOMIC,
    ];
  }
  return [
    `getSensorValue(${SENSOR_ID.LOW_VOLTAGE})`,
    javascriptGenerator.ORDER_ATOMIC,
  ];
};

// accelerometer -> [ax, ay, az] (m/s²)
Blockly.Blocks["physio_get_accel"] = {
  init: function () {
    this.jsonInit({
      type: "physio_get_accel",
      message0: "acceleration [ax, ay, az] (m/s²)",
      output: "Array",
      colour: 210,
      tooltip: "Returns [ax, ay, az] in m/s²",
      helpUrl: "",
    });
  },
};
javascriptGenerator.forBlock["physio_get_accel"] = function () {
  if (typeof globalThis?.getSensorValueByCode === "function") {
    // Acceleration sensor ID 35, channels 0..2
    return [
      `[getSensorValueByCode(${SENSOR_ID.ACCELERATION},0), getSensorValueByCode(${SENSOR_ID.ACCELERATION},1), getSensorValueByCode(${SENSOR_ID.ACCELERATION},2)]`,
      javascriptGenerator.ORDER_ATOMIC,
    ];
  }
  return [
    `[getSensorValue(${SENSOR_ID.ACCELERATION_X}), getSensorValue(${SENSOR_ID.ACCELERATION_Y}), getSensorValue(${SENSOR_ID.ACCELERATION_Z})]`,
    javascriptGenerator.ORDER_ATOMIC,
  ];
};

// external input 1 (V)
Blockly.Blocks["physio_get_external1"] = {
  init: function () {
    this.jsonInit({
      type: "physio_get_external1",
      message0: "external input 1 (V)",
      output: "Number",
      colour: 210,
      tooltip: "Get external input 1 (V)",
      helpUrl: "",
    });
  },
};
javascriptGenerator.forBlock["physio_get_external1"] = function () {
  if (typeof globalThis?.getSensorValueByCode === "function") {
    return [
      `getSensorValueByCode(${SENSOR_ID.EXTERNAL_A})`,
      javascriptGenerator.ORDER_ATOMIC,
    ];
  }
  return [
    `getSensorValue(${SENSOR_ID.EXTERNAL_A})`,
    javascriptGenerator.ORDER_ATOMIC,
  ];
};

// external input 2 (V)
Blockly.Blocks["physio_get_external2"] = {
  init: function () {
    this.jsonInit({
      type: "physio_get_external2",
      message0: "external input 2 (V)",
      output: "Number",
      colour: 210,
      tooltip: "Get external input 2 (V)",
      helpUrl: "",
    });
  },
};
javascriptGenerator.forBlock["physio_get_external2"] = function () {
  if (typeof globalThis?.getSensorValueByCode === "function") {
    return [
      `getSensorValueByCode(${SENSOR_ID.EXTERNAL_B})`,
      javascriptGenerator.ORDER_ATOMIC,
    ];
  }
  return [
    `getSensorValue(${SENSOR_ID.EXTERNAL_B})`,
    javascriptGenerator.ORDER_ATOMIC,
  ];
};

export default [
  "physio_get_low_voltage",
  "physio_get_accel",
  "physio_get_external1",
  "physio_get_external2",
];

/*
const sensors = [
  { id: 1, name: 'get_temperature', label: 'temperature (C)', unit: '°C' },
  { id: 9, name: 'get_sound_level', label: 'sound level (dB)', unit: 'dB' },
  { id: 11, name: 'get_pressure', label: 'pressure (kPa)', unit: 'kPa' },
  { id: 2, name: 'get_light', label: 'light (lx)', unit: 'lx' },
  { id: 5, name: 'get_current', label: 'current (mA)', unit: 'mA' },
  { id: 6, name: 'get_voltage', label: 'voltage (V)', unit: 'V' },
  { id: 8, name: 'get_distance', label: 'distance (cm)', unit: 'cm' },
  { id: 16, name: 'get_low_voltage', label: 'low voltage (V)', unit: 'V' },
  { id: 17, name: 'get_accelerometer', label: 'Acceleration (m/s**2)', unit: 'm/s*s' },
  { key: 'barometer', code: 4, unit: 'mBar', decimals: 1, type: 'linear' }, // NEW
];

for (const sensor of sensors) {
  Blockly.Blocks[sensor.name] = {
    init: function () {
      this.jsonInit({
        type: sensor.name,
        message0: sensor.label,
        output: 'Number',
        colour: 210,
        tooltip: `Get ${sensor.label}`,
        helpUrl: ''
      });
    }
  };

  javascriptGenerator.forBlock[sensor.name] = function (block) {
    return [`getSensorValue(${sensor.id})`, javascriptGenerator.ORDER_ATOMIC];
  };
}
*/
