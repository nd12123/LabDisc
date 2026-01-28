// src/blocks/input/input_common.js
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

function readSensorCall(sensorId) {
  if (typeof globalThis?.getSensorValueByCode === "function") {
    return `getSensorValueByCode(${sensorId})`;
  }
  return `getSensorValue(${sensorId})`;
}

Blockly.Blocks["sensor_read"] = {
  init() {
    this.jsonInit({
      type: "sensor_read",
      message0: "%1",
      args0: [
        {
          type: "field_label_serializable",
          name: "LABEL",
          text: "sensor",
        },
      ],
      output: "Number",
      colour: 210,
      tooltip: "Read sensor value",
      helpUrl: "",
    });
  },
};

javascriptGenerator.forBlock["sensor_read"] = (block) => {
  const rawId = block.data ?? block.getFieldValue("SENSOR_ID");
  const sensorId = Number(rawId);
  const safeId = Number.isFinite(sensorId) ? sensorId : 0;
  return [readSensorCall(safeId), javascriptGenerator.ORDER_ATOMIC];
};

export default ["sensor_read"];
