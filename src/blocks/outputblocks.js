import * as Blockly from "blockly/core";
import { MODEL_SENSORS } from "../logic/modelSensors.js";
import { SENSOR_META } from "../logic/sensorMetadata.js";
import { SENSOR_NAMES } from "../logic/sensorNames.js";

function getSensorOptions() {
  const model = window.activeModel || "default";
  const sensors = MODEL_SENSORS[model] || MODEL_SENSORS["default"];

  const options = sensors.map((id) => {
    let name = SENSOR_NAMES[id];
    if (!name) {
      const meta = SENSOR_META[id];
      if (meta) name = meta.name;
    }
    if (!name) name = "Sensor " + id;
    return [name, String(id)];
  });

  if (options.length === 0) return [["No sensors", "-1"]];

  return options;
}

Blockly.Extensions.register("dynamic_sensor_dropdown", function () {
  const field = this.getField("SENSOR_ID");
  if (field) {
    field.setOptions(getSensorOptions);
  }
});

Blockly.Blocks["pause"] = {
  init: function () {
    this.jsonInit({
      message0: "pause for %1 (ms)", //%{BKY_PAUSE_TEXT} ,
      args0: [
        {
          type: "input_value",
          name: "INPUT",
          check: "Number",
          shadow: {
            type: "math_number",
            fields: {
              NUM: 500,
            },
          },
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
      message0: "display text %1",
      message1: "color %1 background %2 on %3",
      args0: [
        {
          type: "field_input",
          name: "TEXT",
          text: "Hello!",
        },
      ],
      args1: [
        {
          type: "field_colour",
          name: "COLOR",
          colour: "#000000",
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
      message0: "display variable %1",
      message1: "color %1 background %2 on %3",
      args0: [
        {
          type: "input_value",
          name: "var",
          check: "Number",
        },
      ],
      args1: [
        {
          type: "field_colour",
          name: "COLOR",
          colour: "#000000",
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
      inputsInline: false,
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
          options: [["Loading...", "-1"]],
        },
        {
          type: "field_colour",
          name: "COLOR",
          colour: "#000000",
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
      extensions: ["dynamic_sensor_dropdown"],
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
          shadow: {
            type: "math_number",
            fields: {
              NUM: 500,
            },
          },
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
          shadow: {
            type: "math_number",
            fields: {
              NUM: 1,
            },
          },
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
      message0: "bar from %1 to %2 of variable %3",
      message1: "in %1 steps with color %2 on %3",
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
        {
          type: "input_value",
          name: "var",
          check: "Number",
        },
      ],
      args1: [
        {
          type: "field_number",
          name: "STEPS",
          value: 10,
          min: 1,
        },
        {
          type: "field_colour",
          name: "COLOR",
          colour: "#000000",
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
      inputsInline: false,
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
      message0: "display bar of %1 from %2 to %3",
      message1: "in %1 steps with color %2 on %3",
      args0: [
        {
          type: "field_dropdown",
          name: "SENSOR_ID",
          options: [["Loading...", "-1"]],
        },
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
          type: "field_number",
          name: "STEPS",
          value: 10,
          min: 1,
        },
        {
          type: "field_colour",
          name: "COLOR",
          colour: "#000000",
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
      extensions: ["dynamic_sensor_dropdown"],
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
