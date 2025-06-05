import { javascriptGenerator} from 'blockly/javascript';

// delay block
javascriptGenerator.forBlock['delay'] = function(block) {
  const delay = javascriptGenerator.valueToCode(block, 'INPUT', javascriptGenerator.ORDER_NONE) || '0';
  return `await pause(${delay});\n`;
};

javascriptGenerator.forBlock['forever_loop_clean'] = function(block) {
  const body = javascriptGenerator.statementToCode(block, 'comands');
  return `while (isRunning) {\n${body}await pause(100);\n}\n`;
};
