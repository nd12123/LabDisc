// src/blocks/input/biochem.js
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import { SENSOR_ID } from "./sensorIds.js";

/**
 * Оставляем только уникальные для BioChem блоки: heart rate, thermocouple.
 * Всё остальное — в src/blocks/input/input_common.js (универсальные).
 */
const sensors = [
  {
    sensorId: SENSOR_ID.HEARTRATE,
    name: "biochem_get_hr",
    label: "heart rate (bpm)",
    unit: "bpm",
  },
  {
    sensorId: SENSOR_ID.THERMOCOUPLE,
    name: "biochem_get_thermocouple",
    label: "thermocouple (°C)",
    unit: "°C",
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
    if (typeof globalThis?.getSensorValueByCode === "function") {
      return [
        `getSensorValueByCode(${sensor.sensorId})`,
        javascriptGenerator.ORDER_ATOMIC,
      ];
    }
    return [
      `getSensorValue(${sensor.sensorId})`,
      javascriptGenerator.ORDER_ATOMIC,
    ];
  };
}

export default sensors;
