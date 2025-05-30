//import * as Blockly from 'blockly/core'

import { javascriptGenerator} from 'blockly/javascript';


javascriptGenerator.forBlock['beep'] = function (block) {
  const volume = block.getFieldValue('VOLUME');
  const duration = block.getFieldValue('DURATION');
  return `playBeep(${volume}, ${duration});\n`;
};


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