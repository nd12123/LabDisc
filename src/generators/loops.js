import { javascriptGenerator} from 'blockly/javascript';

// delay block
javascriptGenerator.forBlock['delay'] = function(block) {
  const delay = javascriptGenerator.valueToCode(block, 'INPUT', javascriptGenerator.ORDER_NONE) || '0';
  return `await pause(${delay});\n`;
};