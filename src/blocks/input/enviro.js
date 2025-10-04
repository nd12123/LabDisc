// src/blocks/input/input_common.js
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

const sensors = [
  { id: 1, name: 'get_temperature', label: 'temperature (C)', unit: '°C' },
  { id: 9, name: 'get_sound_level', label: 'sound level (dB)', unit: 'dB' },

  { id: 3, name: 'get_ph', label: 'pH', unit: 'pH' },
  
  { id: 13, name: 'get_humidity', label: 'phumidity (%)', unit: '%' },

  { id: 11, name: 'get_pressure', label: 'pressure (kPa)', unit: 'kPa' },
  { id: 2, name: 'get_light', label: 'light (lx)', unit: 'lx' },
  { id: 5, name: 'get_current', label: 'current (mA)', unit: 'mA' },
  { id: 6, name: 'get_voltage', label: 'voltage (V)', unit: 'V' },
  { id: 8, name: 'get_distance', label: 'distance (cm)', unit: 'cm' },

  
  { id: 16, name: 'get_uv', label: 'low voltage (V)', unit: 'V' },
  { id: 17, name: 'get_ir_temperature', label: 'IR temperature (C)', unit: '°C' },
/*
  { id: 4, name: 'get_potentiometer', label: 'potentiometer (%)', unit: '%' },
  { id: 7, name: 'get_light_force', label: 'light force', unit: '?' },
  { id: 10, name: 'get_air_temp', label: 'air temperature (°C)', unit: '°C' },
   */
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