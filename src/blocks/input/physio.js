// src/blocks/input/physio.js
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

/**
 * Внутренние ID — временные (fallback).
 */
const SENSOR_ID = {
  BAROMETER: 303,
  MICROPHONE_V: 333,

  ACCEL_X: 350,
  ACCEL_Y: 351,
  ACCEL_Z: 352,

  EXTERNAL1_V: 321,
  EXTERNAL2_V: 391,
};

function channelFor(name) {
  if (name.endsWith('_accel_x')) return 0;
  if (name.endsWith('_accel_y')) return 1;
  if (name.endsWith('_accel_z')) return 2;
  return null;
}

// Добавляем: барометр, микрофон, аксель (XYZ), второй внешний вход
const sensors = [
  { id: SENSOR_ID.BAROMETER,    code: 4,  name: 'physio_get_barometer',  label: 'barometer (mBar)',       unit: 'mBar' },
  { id: SENSOR_ID.MICROPHONE_V, code: 33, name: 'physio_get_microphone', label: 'microphone (V)',         unit: 'V'    },

  // Accelerometer (код 35): 3 канала X/Y/Z
  { id: SENSOR_ID.ACCEL_X,      code: 35, name: 'physio_get_accel_x',    label: 'acceleration X (m/s²)',  unit: 'm/s²' },
  { id: SENSOR_ID.ACCEL_Y,      code: 35, name: 'physio_get_accel_y',    label: 'acceleration Y (m/s²)',  unit: 'm/s²' },
  { id: SENSOR_ID.ACCEL_Z,      code: 35, name: 'physio_get_accel_z',    label: 'acceleration Z (m/s²)',  unit: 'm/s²' },

  // Внешние универсальные входы Physio: 32 и 39
  { id: SENSOR_ID.EXTERNAL1_V,  code: 32, name: 'physio_get_external1',  label: 'external input 1 (V)',   unit: 'V'    },
  { id: SENSOR_ID.EXTERNAL2_V,  code: 39, name: 'physio_get_external2',  label: 'external input 2 (V)',   unit: 'V'    },
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

  javascriptGenerator.forBlock[sensor.name] = function () {
    const ch = channelFor(sensor.name);
    if (typeof globalThis?.getSensorValueByCode === 'function') {
      return [
        ch == null
          ? `getSensorValueByCode(${sensor.code})`
          : `getSensorValueByCode(${sensor.code}, ${ch})`,
        javascriptGenerator.ORDER_ATOMIC
      ];
    }
    return [`getSensorValue(${sensor.id})`, javascriptGenerator.ORDER_ATOMIC];
  };
}

export default sensors;


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