import * as Blockly from 'blockly/core';

// Блок: get_sensor_value(ID)
Blockly.Blocks['get_sensor_value'] = {
  init: function () {
    this.jsonInit({
        "type": "get_sensor_value",
        "message0": "sensor value %1",
        "args0": [{
            "type": "field_dropdown",
            "name": "SENSOR_ID",
            "options": [
                ["Temperature", "1"],
                ["Light", "2"],
                ["pH", "3"]
            ]
        }],
        "output": "Number",
        "colour": 230,
        "tooltip": "Get value from selected sensor",
        "helpUrl": ""
    })
  }
};



/*
// Генерация JS (если тебе нужно что-то вернуть)
Blockly.JavaScript['get_sensor_value'] = function (block) {
  //const id = block.getFieldValue('SENSOR_ID');
  const code = getSensorValue(); //Value(${id})
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

    this.appendDummyInput()
      .appendField("sensor value")
      .appendField(new Blockly.FieldDropdown([
        ["Temperature", "1"],
        ["Light", "2"],
        ["pH", "3"]
      ]), "SENSOR_ID");

    this.setOutput(true, 'Number');
    this.setColour(230);
    this.setTooltip("Gets the current value from the specified sensor.");
    this.setHelpUrl("");
*/