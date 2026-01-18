import * as Blockly from "blockly/core";

Blockly.Blocks["pause"] = {
  init: function () {
    this.jsonInit({
      message0: "pause for %1 (ms)", //%{BKY_PAUSE_TEXT} ,
      args0: [
        {
          type: "input_value",
          name: "INPUT",
          check: "Number",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: "#569FA8",
    });
  },
};

Blockly.Blocks["beep"] = {
  init: function () {
    this.jsonInit({
      type: "beep",
      message0: "beep volume %1 duration %2 ms",
      args0: [
        {
          type: "field_number",
          name: "VOLUME",
          value: 0.5,
          min: 0,
          max: 1,
          precision: 0.1,
        },
        {
          type: "field_number",
          name: "DURATION",
          value: 500,
          min: 1,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: "#569FA8", //200,
      tooltip: "Play a beep sound",
      helpUrl: "",
    });
  },
};

Blockly.Blocks["display_text"] = {
  init: function () {
    this.jsonInit({
      type: "display_text",
      message0: "display text %1 color %2 background %3 on %4",
      args0: [
        {
          type: "field_input",
          name: "TEXT",
          text: "Hello!",
        },
        {
          type: "field_colour",
          name: "COLOR",
        },
        {
          type: "field_colour",
          name: "BG",
        },
        {
          type: "field_dropdown",
          name: "POSITION",
          options: [
            ["Top", "top"],
            ["Center", "center"],
            ["Bottom", "bottom"],
          ],
        },
      ],
      fields: {
        COLOR: "#000000",
        BG: "#ffffff",
        POSITION: "center",
      },
      previousStatement: null,
      nextStatement: null,
      colour: "#569FA8", //bar_70,
      tooltip: "Show text on screen with styling",
      helpUrl: "",
    });
  },
};

Blockly.Blocks["display_var"] = {
  init: function () {
    this.jsonInit({
      message0: "display variable %1 color %2 background %3 on %4", //%{BKY_DISPLAY_VAR}
      args0: [
        {
          type: "input_value",
          name: "var",
          check: "Number",
        },
        {
          type: "field_colour",
          name: "COLOR",
        },
        {
          type: "field_colour",
          name: "BG",
        },
        {
          type: "field_dropdown",
          name: "POSITION",
          options: [
            ["Top", "top"],
            ["Center", "center"],
            ["Bottom", "bottom"],
          ],
        },
      ],
      fields: {
        COLOR: "#649FEF",
        BG: "#ffffff",
        POSITION: "center",
      },
      previousStatement: null,
      nextStatement: null,
      colour: "#569FA8", // "#70AA55"
    });
  },
};

Blockly.Blocks["clear_screen"] = {
  init: function () {
    this.jsonInit({
      type: "clear_screen",
      message0: "clear all screens",
      previousStatement: null,
      nextStatement: null,
      colour: "#569FA8",
      tooltip: "Clear all display screens",
      helpUrl: "",
    });
  },
};

Blockly.Blocks["clear_screen_slot"] = {
  init: function () {
    this.jsonInit({
      type: "clear_screen_slot",
      message0: "clear screen %1",
      args0: [
        {
          type: "field_dropdown",
          name: "SCREEN",
          options: [
            ["Top", "top"],
            ["Center", "center"],
            ["Bottom", "bottom"],
          ],
        },
      ],
      fields: {
        SCREEN: "center",
      },
      previousStatement: null,
      nextStatement: null,
      colour: "#569FA8",
      tooltip: "Clear a specific display screen",
      helpUrl: "",
    });
  },
};

// Блок: display_sensor
Blockly.Blocks["display_sensor"] = {
  init: function () {
    this.jsonInit({
      type: "display_sensor",
      message0: "show sensor %1 color %2 bg %3 on %4",
      args0: [
        {
          type: "field_dropdown",
          name: "SENSOR_ID",
          options: [
            ["Temperature", "30"],
            ["Light", "20"],
            ["pH", "2"],
            ["Current", "28"],
            ["Voltage", "27"],
            ["Sound Level", "21"],
            ["Air Pressure", "26"],
            ["External Temp", "13"],
            ["Barometer", "4"],
            ["Humidity", "6"],
            ["Distance", "25"],
            ["Turbidity", "31"],
            ["External Input 1", "32"],
            ["Microphone", "33"],
            ["Dissolved O₂", "40"],
            ["Conductivity", "41"],
            ["Humidity (GenSci)", "6"],
            ["GPS Lat (GenSci)", "8"],
            ["GPS Lon (GenSci)", "9"],
            ["GPS Speed (GenSci)", "10"],
            ["GPS Course (GenSci)", "11"],
            ["GPS Time (GenSci)", "7"],
            ["Microphone (GenSci)", "33"],
            ["Low Voltage", "34"],
            ["External 1", "32"],
            ["External 2", "39"],
            ["UV Index", "1"],
            ["Barometer (Enviro)", "4"],
            ["IR Temp", "5"],
            ["GPS Lat (Enviro)", "8"],
            ["GPS Lon (Enviro)", "9"],
            ["GPS Speed (Enviro)", "10"],
            ["GPS Course (Enviro)", "11"],
            ["GPS Time (Enviro)", "7"],
            ["Color R", "15"],
            ["Color G", "16"],
            ["Color B", "17"],
            ["Turbidity (Enviro)", "31"],
            ["Dissolved O₂ (Enviro)", "40"],
            ["Thermocouple", "42"],
            ["Heart Rate", "23"],
          ],
        },
        {
          type: "field_colour",
          name: "COLOR",
        },
        {
          type: "field_colour",
          name: "BG",
        },
        {
          type: "field_dropdown",
          name: "POSITION",
          options: [
            ["Top", "top"],
            ["Center", "center"],
            ["Bottom", "bottom"],
          ],
        },
      ],
      fields: {
        COLOR: "#000000",
        BG: "#ffffff",
        POSITION: "center",
      },
      previousStatement: null,
      nextStatement: null,
      colour: "#569FA8", //90,
      tooltip:
        "Display the current value from a selected sensor on the screen. Use SENSOR_ID field (not SENSOR) in JSON.",
      helpUrl: "",
    });
  },
};

Blockly.Blocks["delay"] = {
  init: function () {
    this.jsonInit({
      message0: "delay %1 (ms)", //%{BKY_DELAY_TEXT}
      args0: [
        {
          type: "input_value",
          name: "INPUT",
          check: "Number",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: "#D679B3",
    });
  },
};

Blockly.Blocks["delay_seconds"] = {
  init: function () {
    this.jsonInit({
      message0: "delay %1 (s)",
      args0: [
        {
          type: "input_value",
          name: "INPUT",
          check: "Number",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: "#D679B3",
    });
  },
};

Blockly.Blocks["bar"] = {
  init: function () {
    this.jsonInit({
      type: "bar", //horizontal_bar?
      message0: "bar from %1 to %2",
      message1: "of variable %1",
      message2: "in %1 steps",
      message3: "with color %1 on %2",
      args0: [
        {
          type: "field_number",
          name: "MIN",
          value: 0,
        },
        {
          type: "field_number",
          name: "MAX",
          value: 100,
        },
      ],
      args1: [
        {
          type: "input_value",
          name: "var",
          check: "Number",
        },
      ],
      args2: [
        {
          type: "field_number",
          name: "STEPS",
          value: 10,
          min: 1,
        },
      ],
      args3: [
        {
          type: "field_colour",
          name: "COLOR",
        },
        {
          type: "field_dropdown",
          name: "POSITION",
          options: [
            ["Top", "top"],
            ["Center", "center"],
            ["Bottom", "bottom"],
          ],
        },
      ],
      fields: {
        COLOR: "#00ff00",
        POSITION: "center",
      },
      previousStatement: null,
      nextStatement: null,
      colour: "#569FA8", //120,
      tooltip: "Display sensor value as a color-shifting bar",
      helpUrl: "",
    });
  },
};

Blockly.Blocks["horizontal_bar"] = {
  init: function () {
    this.jsonInit({
      type: "horizontal_bar",
      message0: "display bar of %1",
      message1: "from %1 to %2",
      message2: "in %1 steps",
      message3: "with color %1 on %2",
      args0: [
        {
          type: "field_dropdown",
          name: "SENSOR_ID",
          options: [
            ["Temperature", "30"],
            ["Light", "20"],
            ["pH", "2"],
            ["Current", "28"],
            ["Voltage", "27"],
            ["Sound Level", "21"],
            ["Air Pressure", "26"],
            ["External Temp", "13"],
            ["Barometer", "4"],
            ["Humidity", "6"],
            ["Distance", "25"],
            ["Turbidity", "31"],
            ["External Input 1", "32"],
            ["Microphone", "33"],
            ["Dissolved O₂", "40"],
            ["Conductivity", "41"],
            ["Humidity (GenSci)", "6"],
            ["GPS Lat (GenSci)", "8"],
            ["GPS Lon (GenSci)", "9"],
            ["GPS Speed (GenSci)", "10"],
            ["GPS Course (GenSci)", "11"],
            ["GPS Time (GenSci)", "7"],
            ["Microphone (GenSci)", "33"],
            ["Low Voltage", "34"],
            ["External 1", "32"],
            ["External 2", "39"],
            ["UV Index", "1"],
            ["Barometer (Enviro)", "4"],
            ["IR Temp", "5"],
            ["GPS Lat (Enviro)", "8"],
            ["GPS Lon (Enviro)", "9"],
            ["GPS Speed (Enviro)", "10"],
            ["GPS Course (Enviro)", "11"],
            ["GPS Time (Enviro)", "7"],
            ["Color R", "15"],
            ["Color G", "16"],
            ["Color B", "17"],
            ["Turbidity (Enviro)", "31"],
            ["Dissolved O₂ (Enviro)", "40"],
            ["Thermocouple", "42"],
            ["Heart Rate", "23"],
          ],
        },
      ],
      args1: [
        {
          type: "field_number",
          name: "MIN",
          value: 0,
        },
        {
          type: "field_number",
          name: "MAX",
          value: 100,
        },
      ],
      args2: [
        {
          type: "field_number",
          name: "STEPS",
          value: 10,
          min: 1,
        },
      ],
      args3: [
        {
          type: "field_colour",
          name: "COLOR",
        },
        {
          type: "field_dropdown",
          name: "POSITION",
          options: [
            ["Top", "top"],
            ["Center", "center"],
            ["Bottom", "bottom"],
          ],
        },
      ],
      fields: {
        COLOR: "#00ff00",
        POSITION: "center",
      },
      previousStatement: null,
      nextStatement: null,
      colour: "#569FA8", //120,
      tooltip:
        "Display sensor value as a color-shifting bar. Use SENSOR_ID field (not SENSOR) in JSON.",
      helpUrl: "",
    });
  },
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
