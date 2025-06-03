//import * as Blockly from 'blockly/core'

import { javascriptGenerator} from 'blockly/javascript';


javascriptGenerator.forBlock['beep'] = function (block) {
  const volume = block.getFieldValue('VOLUME');
  const duration = block.getFieldValue('DURATION');
  return `playBeep(${volume}, ${duration});\n`;
};
/*
// beep block
javascriptGenerator.forBlock['beep'] = function(block) {
  const volume = block.getFieldValue('VOLUME');
  const duration = block.getFieldValue('DURATION');
  return `beep(${volume}, ${duration});\n`;
};
*/


javascriptGenerator.forBlock['clear_screen'] = function(block){
    const code = "clearScreen();\n";
    return code;
  }


  javascriptGenerator.forBlock['horizontal_bar'] = function (block){
    const id = block.getFieldValue('SENSOR_ID');
    const min = block.getFieldValue('MIN');
    const max = block.getFieldValue('MAX');
    const color1 = block.getFieldValue('COLOR1');
    const color2 = block.getFieldValue('COLOR2');
    const steps = block.getFieldValue('STEPS');
  
    const code = `drawBar(${id}, ${min}, ${max}, "${color1}", "${color2}", ${steps});\n`;
    return code;
  };

// pause block
javascriptGenerator.forBlock['pause'] = function(block) {
  const delay = javascriptGenerator.valueToCode(block, 'INPUT', javascriptGenerator.ORDER_NONE) || '0';
  return `await pause(${delay});\n`;
};



// display_text block
javascriptGenerator.forBlock['display_text'] = function(block) {
  const text = block.getFieldValue('TEXT');
  const color = block.getFieldValue('COLOR');
  const bg = block.getFieldValue('BG');
  const pos = block.getFieldValue('POSITION');
  return `displayText("${text}", "${color}", "${bg}", "${pos}");\n`;
};

// display_var block
javascriptGenerator.forBlock['display_var'] = function(block) {
  const variable = javascriptGenerator.valueToCode(block, 'var', javascriptGenerator.ORDER_NONE) || '0';
  const color = block.getFieldValue('COLOR');
  const bg = block.getFieldValue('BG');
  const pos = block.getFieldValue('POSITION');
  return `displayVariable(${variable}, "${color}", "${bg}", "${pos}");\n`;
};

// display_sensor block
javascriptGenerator.forBlock['display_sensor'] = function(block) {
  const id = block.getFieldValue('SENSOR_ID');
  const unit = block.getFieldValue('UNIT');
  const color = block.getFieldValue('COLOR');
  const bg = block.getFieldValue('BG');
  const pos = block.getFieldValue('POSITION');
  return `displaySensor(${id}, "${unit}", "${color}", "${bg}", "${pos}");\n`;
};
/*

// horizontal_bar block
javascriptGenerator.forBlock['horizontal_bar'] = function(block) {
  const id = block.getFieldValue('SENSOR_ID');
  const min = block.getFieldValue('MIN');
  const max = block.getFieldValue('MAX');
  const color1 = block.getFieldValue('COLOR1');
  const color2 = block.getFieldValue('COLOR2');
  const steps = block.getFieldValue('STEPS');
  return `drawBar(${id}, ${min}, ${max}, "${color1}", "${color2}", ${steps});\n`;
}; */

// forever_loop_clean block
javascriptGenerator.forBlock['forever_loop_clean'] = function(block) {
  const body = javascriptGenerator.statementToCode(block, 'comands');
  return `while (true) {\n${body}}\n`;
};
