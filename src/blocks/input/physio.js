// src/blocks/input/physio.js
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

/**
 * Уникальные для Physio сенсоры:
 *  - low voltage (code 34)
 *  - accelerometer (code 35) -> единый блок [ax, ay, az]
 *  - external input 1 (code 32)
 *  - external input 2 (code 39)
 * Универсальные (барометр, микрофон и т.п.) берём из input_common.js.
 */
const SENSOR_ID = {
  LOW_VOLTAGE: 316, // code 34
  // fallback-IDs для осей акселя, если нет getSensorValueByCode:
  ACCEL_X: 350,     // code 35 ch0
  ACCEL_Y: 351,     // code 35 ch1
  ACCEL_Z: 352,     // code 35 ch2
  EXTERNAL1_V: 321, // code 32
  EXTERNAL2_V: 391, // code 39
};

// low voltage (V)
Blockly.Blocks['physio_get_low_voltage'] = {
  init: function () {
    this.jsonInit({
      type: 'physio_get_low_voltage',
      message0: 'low voltage (V)',
      output: 'Number',
      colour: 210,
      tooltip: 'Get low voltage input (V)',
      helpUrl: ''
    });
  }
};
javascriptGenerator.forBlock['physio_get_low_voltage'] = function () {
  if (typeof globalThis?.getSensorValueByCode === 'function') {
    return ['getSensorValueByCode(34)', javascriptGenerator.ORDER_ATOMIC];
  }
  return [`getSensorValue(${SENSOR_ID.LOW_VOLTAGE})`, javascriptGenerator.ORDER_ATOMIC];
};

// accelerometer -> [ax, ay, az] (m/s²)
Blockly.Blocks['physio_get_accel'] = {
  init: function () {
    this.jsonInit({
      type: 'physio_get_accel',
      message0: 'acceleration [ax, ay, az] (m/s²)',
      output: 'Array',
      colour: 210,
      tooltip: 'Returns [ax, ay, az] in m/s²',
      helpUrl: ''
    });
  }
};
javascriptGenerator.forBlock['physio_get_accel'] = function () {
  if (typeof globalThis?.getSensorValueByCode === 'function') {
    // code 35, channels 0..2
    return [
      '[getSensorValueByCode(35,0), getSensorValueByCode(35,1), getSensorValueByCode(35,2)]',
      javascriptGenerator.ORDER_ATOMIC
    ];
  }
  return [
    `[getSensorValue(${SENSOR_ID.ACCEL_X}), getSensorValue(${SENSOR_ID.ACCEL_Y}), getSensorValue(${SENSOR_ID.ACCEL_Z})]`,
    javascriptGenerator.ORDER_ATOMIC
  ];
};

// external input 1 (V)
Blockly.Blocks['physio_get_external1'] = {
  init: function () {
    this.jsonInit({
      type: 'physio_get_external1',
      message0: 'external input 1 (V)',
      output: 'Number',
      colour: 210,
      tooltip: 'Get external input 1 (V)',
      helpUrl: ''
    });
  }
};
javascriptGenerator.forBlock['physio_get_external1'] = function () {
  if (typeof globalThis?.getSensorValueByCode === 'function') {
    return ['getSensorValueByCode(32)', javascriptGenerator.ORDER_ATOMIC];
  }
  return [`getSensorValue(${SENSOR_ID.EXTERNAL1_V})`, javascriptGenerator.ORDER_ATOMIC];
};

// external input 2 (V)
Blockly.Blocks['physio_get_external2'] = {
  init: function () {
    this.jsonInit({
      type: 'physio_get_external2',
      message0: 'external input 2 (V)',
      output: 'Number',
      colour: 210,
      tooltip: 'Get external input 2 (V)',
      helpUrl: ''
    });
  }
};
javascriptGenerator.forBlock['physio_get_external2'] = function () {
  if (typeof globalThis?.getSensorValueByCode === 'function') {
    return ['getSensorValueByCode(39)', javascriptGenerator.ORDER_ATOMIC];
  }
  return [`getSensorValue(${SENSOR_ID.EXTERNAL2_V})`, javascriptGenerator.ORDER_ATOMIC];
};

export default [
  'physio_get_low_voltage',
  'physio_get_accel',
  'physio_get_external1',
  'physio_get_external2',
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