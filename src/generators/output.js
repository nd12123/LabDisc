// src/generators/output.js
import { javascriptGenerator } from 'blockly/javascript';

// pause block
javascriptGenerator.forBlock['pause'] = function(block) {
  const delay = javascriptGenerator.valueToCode(block, 'INPUT', javascriptGenerator.ORDER_NONE) || '0';
  return `await pause(${delay});\n`;
};

// beep block
javascriptGenerator.forBlock['beep'] = function(block) {
  const volume = block.getFieldValue('VOLUME');
  const duration = block.getFieldValue('DURATION');
  return `playBeep(${volume}, ${duration});\n`;
};

// display_text block
javascriptGenerator.forBlock['display_text'] = function(block) {
  const text = block.getFieldValue('TEXT');
  const color = block.getFieldValue('COLOR');
  const bg = block.getFieldValue('BG');
  const pos = block.getFieldValue('POSITION');
  var position = 0;
  if (pos == 'bottom'){
    var position = '2'
  } else if (pos == 'center'){
    var position = '1'
  }
  return `displayText("${text}", "${color}", "${bg}", "${position}");\n`; //${pos}
};

// display_var block
javascriptGenerator.forBlock['display_var'] = function(block) {
  const variable = javascriptGenerator.valueToCode(block, 'var', javascriptGenerator.ORDER_NONE) || '0';
  const color = block.getFieldValue('COLOR');
  const bg = block.getFieldValue('BG');
  const pos = block.getFieldValue('POSITION');
  var position = 0;
  if (pos == 'bottom'){
    var position = '2'
  } else if (pos == 'center'){
    var position = '1'
  }
  return `displayVariable(${variable}, "${color}", "${bg}", "${position}");\n`;
};

// display_sensor block
javascriptGenerator.forBlock['display_sensor'] = function(block) {
  const id = block.getFieldValue('SENSOR_ID');
  const unit = block.getFieldValue('UNIT');
  const color = block.getFieldValue('COLOR');
  const bg = block.getFieldValue('BG');
  const pos = block.getFieldValue('POSITION');
  return `displaySensor(getSensorValue("${id}"), "${unit}", "${color}", "${bg}", "${pos}");\n`;
};

// clear_screen block
javascriptGenerator.forBlock['clear_screen'] = function(block) {
  return `clearScreen();\n`;
};


javascriptGenerator.forBlock['bar'] = function(block) {
  //const min = block.getFieldValue('MIN') || '0';
  //const max = block.getFieldValue('MAX') || '100';
  const color1 = block.getFieldValue('COLOR1') || '#00FF00';
  const color2 = block.getFieldValue('COLOR2') || '#0000FF';
  const steps = block.getFieldValue('STEPS') || '10';

  return `drawBar("${color1}", "${color2}", ${steps});\nawait pause(100);\n`; //${min}, ${max}, 
};

javascriptGenerator.forBlock['horizontal_bar'] = function(block) {
  const sensorId = block.getFieldValue('SENSOR_ID'); // || 0
  const min = block.getFieldValue('MIN') || '0';
  const max = block.getFieldValue('MAX') || '100';
  const color1 = block.getFieldValue('COLOR1') || '#00FF00';
  const color2 = block.getFieldValue('COLOR2') || '#0000FF';
  const steps = block.getFieldValue('STEPS') || '10';

  return `drawHorBar(${sensorId}, ${min}, ${max}, "${color1}", "${color2}", ${steps});\nawait pause(100);\n`; //${sensorId},
};


/*
javascriptGenerator.forBlock['horizontal_bar'] = function(block) {
  const sensorId = block.getFieldValue('SENSOR');
  //const x = block.getFieldValue('X') || 0;
  const min = block.getFieldValue('MIN') || 0;
  const max = block.getFieldValue('MAX') || 100;
  const color1 = block.getFieldValue('COLOR1') || '#00FF00';
  const color2 = block.getFieldValue('COLOR2') || '#FF0000';
  const width = block.getFieldValue('WIDTH') || 10;

  return `drawBar(${sensorId}, ${min}, ${max}, "${color1}", "${color2}", ${width});\nawait pause(100);\n`;

  //return `drawBar(getSensorValue("${id}"), ${min}, ${max}, "${color1}", "${color2}", ${steps});\n`;
};
*/