import * as Blockly from 'blockly/core';


Blockly.Blocks['pause'] = {
    init: function() {
      this.jsonInit({
        "message0": "pause for %1 (ms)",//%{BKY_PAUSE_TEXT} ,
        "args0": [
          {
            "type": "input_value",
            "name": "INPUT",
            "check": "Number"
          },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#569FA8"
      });
    }
};

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
      "colour": '#569FA8',//200,
      "tooltip": "Play a beep sound",
      "helpUrl": ""
    });
  }
};



Blockly.Blocks['display_text'] = {
  init: function () {
    this.jsonInit({
      "type": "display_text",
      "message0": "display text %1 color %2 background %3 on %4",
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
        "COLOR": "#000000",
        "BG": "#ffffff",
        "POSITION": "center"
      },
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#569FA8",//bar_70,
      "tooltip": "Show text on screen with styling",
      "helpUrl": ""
    });
  }
};

  
Blockly.Blocks["display_var"] = {
    init: function() {
      this.jsonInit({
        "message0": "display variable %1 color %2 background %3 on %4", //%{BKY_DISPLAY_VAR}
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
        "colour": '#569FA8',// "#70AA55"
      })
    }
  }

  
  Blockly.Blocks['clear_screen'] = {
    init: function() {
      this.jsonInit({
        "type": "clear_screen",
        "message0": "clear all screens",
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#569FA8",
        "tooltip": "Clear all display screens",
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['clear_screen_slot'] = {
    init: function() {
      this.jsonInit({
        "type": "clear_screen_slot",
        "message0": "clear screen %1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "SCREEN",
            "options": [
              ["Top", "top"],
              ["Center", "center"],
              ["Bottom", "bottom"]
            ]
          }
        ],
        "fields": {
          "SCREEN": "center"
        },
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#569FA8",
        "tooltip": "Clear a specific display screen",
        "helpUrl": ""
      });
    }
  };

  
// Блок: display_sensor
Blockly.Blocks['display_sensor'] = {
  init: function () {
    this.jsonInit({
      "type": "display_sensor",
      "message0": "show sensor %1 color %2 bg %3 on %4",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "SENSOR_ID",
          "options": [
            ["Temperature", "1"],
            ["Light", "2"],
            ["pH", "3"],
            ["Current", "5"],
            ["Voltage", "6"],
            ["Sound Level", "9"],
            ["Air Pressure", "11"],
            ["External Temp", "12"],
            ["Barometer", "14"],
            ["Humidity", "15"],
            ["Distance", "18"],
            ["Turbidity", "31"],
            ["External Input 1", "32"],
            ["Microphone", "33"],
            ["Dissolved O₂", "40"],
            ["Conductivity", "41"],
            ["Humidity (GenSci)", "205"],
            ["GPS Lat (GenSci)", "210"],
            ["GPS Lon (GenSci)", "211"],
            ["GPS Speed (GenSci)", "212"],
            ["GPS Course (GenSci)", "213"],
            ["GPS Time (GenSci)", "214"],
            ["Microphone (GenSci)", "233"],
            ["Low Voltage", "316"],
            ["External 1", "321"],
            ["External 2", "391"],
            ["UV Index", "401"],
            ["Barometer (Enviro)", "403"],
            ["IR Temp", "405"],
            ["GPS Lat (Enviro)", "410"],
            ["GPS Lon (Enviro)", "411"],
            ["GPS Speed (Enviro)", "412"],
            ["GPS Course (Enviro)", "413"],
            ["GPS Time (Enviro)", "414"],
            ["Color R", "420"],
            ["Color G", "421"],
            ["Color B", "422"],
            ["Turbidity (Enviro)", "431"],
            ["Dissolved O₂ (Enviro)", "440"],
            ["Thermocouple", "110"],
            ["Heart Rate", "111"]
          ]
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
      "colour": "#569FA8",//90,
      "tooltip": "Show the current sensor value on screen",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['delay'] = {
  init: function() {
    this.jsonInit({"message0": "delay for %1 (ms)", //%{BKY_DELAY_TEXT}
      "args0": [
        {
          "type": "input_value",
          "name": "INPUT",
          "check": "Number"
        },
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#D679B3",
    });
  }
};



Blockly.Blocks['bar'] = {
  init: function () {
    this.jsonInit({
      "type": "bar", //horizontal_bar?
      "message0": "bar from color %1 to color %2 in %3 steps on %4", //from %1 to %2
      "args0": [
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
        "COLOR1": "#00ff00",
        "COLOR2": "#ff0000",
        "POSITION": "center"
      },
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#569FA8",//120,
      "tooltip": "Display sensor value as a color-shifting bar",
      "helpUrl": ""
    });
  }
};



Blockly.Blocks['horizontal_bar'] = {
  init: function () {
    this.jsonInit({
      "type": "horizontal_bar",
      "message0": "display bar of %1 from %2 to %3 color %4 to %5 in %6 steps on %7",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "SENSOR_ID",
          "options": [
            ["Temperature", "1"],
            ["Light", "2"],
            ["pH", "3"],
            ["Current", "5"],
            ["Voltage", "6"],
            ["Sound Level", "9"],
            ["Air Pressure", "11"],
            ["External Temp", "12"],
            ["Barometer", "14"],
            ["Humidity", "15"],
            ["Distance", "18"],
            ["Turbidity", "31"],
            ["External Input 1", "32"],
            ["Microphone", "33"],
            ["Dissolved O₂", "40"],
            ["Conductivity", "41"],
            ["Humidity (GenSci)", "205"],
            ["GPS Lat (GenSci)", "210"],
            ["GPS Lon (GenSci)", "211"],
            ["GPS Speed (GenSci)", "212"],
            ["GPS Course (GenSci)", "213"],
            ["GPS Time (GenSci)", "214"],
            ["Microphone (GenSci)", "233"],
            ["Low Voltage", "316"],
            ["External 1", "321"],
            ["External 2", "391"],
            ["UV Index", "401"],
            ["Barometer (Enviro)", "403"],
            ["IR Temp", "405"],
            ["GPS Lat (Enviro)", "410"],
            ["GPS Lon (Enviro)", "411"],
            ["GPS Speed (Enviro)", "412"],
            ["GPS Course (Enviro)", "413"],
            ["GPS Time (Enviro)", "414"],
            ["Color R", "420"],
            ["Color G", "421"],
            ["Color B", "422"],
            ["Turbidity (Enviro)", "431"],
            ["Dissolved O₂ (Enviro)", "440"],
            ["Thermocouple", "110"],
            ["Heart Rate", "111"]
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
        "COLOR1": "#00ff00",
        "COLOR2": "#ff0000",
        "POSITION": "center"
      },
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#569FA8",//120,
      "tooltip": "Display sensor value as a color-shifting bar",
      "helpUrl": ""
    });
  }
};

/*
// (опционально) генератор
Blockly.JavaScript['display_text'] = function (block) {
  const text = block.getFieldValue('TEXT');
  const color = block.getFieldValue('COLOR');
  const bg = block.getFieldValue('BG');
  const position = block.getFieldValue('POSITION');

  const code = `displayText("${text}", "${color}", "${bg}", "${position}");\n`;
  return code;
};
*/


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