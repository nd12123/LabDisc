// src/blocks/input/biochem.js
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

/**
 * Оставляем только уникальные для BioChem блоки: heart rate, thermocouple.
 * Всё остальное — в src/blocks/input/input_common.js (универсальные).
 */
const SENSOR_ID = {
  HEART_RATE:   111, // code 22
  THERMOCOUPLE: 110, // code 42
};

const sensors = [
  { id: SENSOR_ID.HEART_RATE,   code: 22, name: 'biochem_get_hr',           label: 'heart rate (bpm)',  unit: 'bpm' },
  { id: SENSOR_ID.THERMOCOUPLE, code: 42, name: 'biochem_get_thermocouple', label: 'thermocouple (°C)', unit: '°C'  },
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
    if (typeof globalThis?.getSensorValueByCode === 'function') {
      return [`getSensorValueByCode(${sensor.code})`, javascriptGenerator.ORDER_ATOMIC];
    }
    return [`getSensorValue(${sensor.id})`, javascriptGenerator.ORDER_ATOMIC];
  };
}

export default sensors;
