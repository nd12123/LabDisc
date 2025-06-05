
// src/blocks/patched/loop_patch.js
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// Замена дефолтного блока whileUntil
Blockly.Blocks['controls_whileUntil'] = {
  init: function () {
    this.jsonInit({
      "type": "controls_whileUntil",
      "message0": "while %1",
      "args0": [
        {
          "type": "input_value",
          "name": "BOOL",
          "check": "Boolean"
        }
      ],
      "message1": "do %1",
      "args1": [
        {
          "type": "input_statement",
          "name": "DO"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#D679B3",
      "tooltip": "Repeat while the condition is true.",
      "helpUrl": ""
    });
  }
};

// Генератор JS
javascriptGenerator.forBlock['controls_whileUntil'] = function(block) {
  const conditionCode = javascriptGenerator.valueToCode(block, 'BOOL', javascriptGenerator.ORDER_NONE);
  const condition = conditionCode && conditionCode.trim() !== '' ? conditionCode : 'false';
  const branch = javascriptGenerator.statementToCode(block, 'DO');
  return `while (isRunning && (${condition})) {\n${branch}await pause(100);\n}\n`;
};


/*
import { javascriptGenerator } from 'blockly/javascript';
javascriptGenerator.forBlock['controls_whileUntil'] = function(block) {
  const condition = javascriptGenerator.valueToCode(block, 'BOOL', javascriptGenerator.ORDER_NONE) || 'false';
  const branch = javascriptGenerator.statementToCode(block, 'DO');
  return `while (isRunning && (${condition})) {\n${branch}}\n`;
};



import * as Blockly from 'blockly/core';
Blockly.Blocks['controls_whileUntil'] = {
  init: function () {
    this.jsonInit({
      "type": "controls_whileUntil",
      "message0": "while %1", //пока
      "args0": [
        {
          "type": "input_value",
          "name": "BOOL",
          "check": "Boolean"
        }
      ],
      "message1": "do %1", //выполнить
      "args1": [
        {
          "type": "input_statement",
          "name": "DO"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "%{BKY_LOOPS_HUE}",
      "tooltip": "%{BKY_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE}",
      "helpUrl": "%{BKY_CONTROLS_WHILEUNTIL_HELPURL}"
    });
  }
};
*/
