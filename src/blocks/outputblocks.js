import * as Blockly from 'blockly/core';


Blockly.Blocks['beep'] = {
  init: function () {
    this.jsonInit({
      "type": "beep",
      "message0": "beep volume %1 duration %2 ms",
      "args0": [
        {
          "type": "field_number",
          "name": "VOLUME",
          "value": 0.5,
          "min": 0,
          "max": 1,
          "precision": 0.1
        },
        {
          "type": "field_number",
          "name": "DURATION",
          "value": 500,
          "min": 1
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 200,
      "tooltip": "Play a beep sound",
      "helpUrl": ""
    });
  }
};



Blockly.Blocks['display_text'] = {
  init: function () {
    this.jsonInit({
      "type": "display_text",
      "message0": "display text %1 with color %2 background %3 at %4",
      "args0": [
        {
          "type": "field_input",
          "name": "TEXT",
          "text": "Hello!"
        },
        {
          "type": "field_colour",
          "name": "COLOR"
        },
        {
          "type": "field_colour",
          "name": "BG"
        },
        {
          "type": "field_dropdown",
          "name": "POSITION",
          "options": [
            ["Top", "top"],
            ["Center", "center"],
            ["Bottom", "bottom"]
          ]
        }
      ],
      "fields": {
        "COLOR": "#649FEF",
        "BG": "#ffffff",
        "POSITION": "center"
      },
      "previousStatement": null,
      "nextStatement": null,
      "colour": 70,
      "tooltip": "Show text on screen with styling",
      "helpUrl": ""
    });
  }
};

// (опционально) генератор
/*
Blockly.JavaScript['display_text'] = function (block) {
  const text = block.getFieldValue('TEXT');
  const color = block.getFieldValue('COLOR');
  const bg = block.getFieldValue('BG');
  const position = block.getFieldValue('POSITION');

  const code = `displayText("${text}", "${color}", "${bg}", "${position}");\n`;
  return code;
};
*/
  
Blockly.Blocks["display_var"] = {
    init: function() {
      this.jsonInit({
        "message0": "display variable %1 with color %2 background %3 at %4", //%{BKY_DISPLAY_VAR}
        "args0": [
          {
            "type": "input_value",
            "name": "var",
            "check": "Number"
          },
          {
            "type": "field_colour",
            "name": "COLOR"
          },
          {
            "type": "field_colour",
            "name": "BG"
          },
          {
            "type": "field_dropdown",
            "name": "POSITION",
            "options": [
              ["Top", "top"],
              ["Center", "center"],
              ["Bottom", "bottom"]
            ]
          }
        ],
        "fields": {
          "COLOR": "#649FEF",
          "BG": "#ffffff",
          "POSITION": "center"
        },
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#70AA55"
      })
    }
  }

  
  Blockly.Blocks['clear_screen'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("clear screen");//Blockly.Msg["CLEAR_SCREEN_TEXT"]);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#70AA55");
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  
// Блок: display_sensor
Blockly.Blocks['display_sensor'] = {
  init: function () {
    this.jsonInit({
      "type": "display_sensor",
      "message0": "show sensor %1 with unit %2 color %3 bg %4 at %5",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "SENSOR_ID",
          "options": [
            ["Temperature", "1"],
            ["Light", "2"],
            ["pH", "3"]
          ]
        },
        {
          "type": "field_input",
          "name": "UNIT",
          "text": "°C"
        },
        {
          "type": "field_colour",
          "name": "COLOR"
        },
        {
          "type": "field_colour",
          "name": "BG"
        },
        {
          "type": "field_dropdown",
          "name": "POSITION",
          "options": [
            ["Top", "top"],
            ["Center", "center"],
            ["Bottom", "bottom"]
          ]
        }
      ],
      "fields": {
        "COLOR": "#000000",
        "BG": "#ffffff",
        "POSITION": "center"
      },
      "previousStatement": null,
      "nextStatement": null,
      "colour": 90,
      "tooltip": "Show the current sensor value on screen",
      "helpUrl": ""
    });
  }
};


  /*
Blockly.JavaScript['display_variable'] = function (block) {
  const sensorId = block.getFieldValue('SENSOR_ID');
  const unit = block.getFieldValue('UNIT');
  const color = block.getFieldValue('COLOR');
  const bg = block.getFieldValue('BG');
  const position = block.getFieldValue('POSITION');

  const code = `displayVariable(${sensorId}, "${unit}", "${color}", "${bg}", "${position}");\n`;
  return code;
};
*/

Blockly.Blocks['horizontal_bar'] = {
  init: function () {
    this.jsonInit({
      "type": "horizontal_bar",
      "message0": "bar of sensor %1 from %2 to %3 color %4 to %5 in %6 steps",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "SENSOR_ID",
          "options": [
            ["Temperature", "1"],
            ["Light", "2"],
            ["pH", "3"]
          ]
        },
        {
          "type": "field_number",
          "name": "MIN",
          "value": 0
        },
        {
          "type": "field_number",
          "name": "MAX",
          "value": 100
        },
        {
          "type": "field_colour",
          "name": "COLOR1"
        },
        {
          "type": "field_colour",
          "name": "COLOR2"
        },
        {
          "type": "field_number",
          "name": "STEPS",
          "value": 10,
          "min": 1
        }
      ],
      "fields": {
        "COLOR1": "#00ff00",
        "COLOR2": "#ff0000"
      },
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "Display sensor value as a color-shifting bar",
      "helpUrl": ""
    });
  }
};

