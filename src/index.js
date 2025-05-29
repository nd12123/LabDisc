import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import 'blockly/msg/en';

import './blocks/inputblocks.js'
import './blocks/loopblocks.js'
import './blocks/mathblocks.js'
import './blocks/displayblocks.js'

import { toolbox } from './toolbox.js';

window.addEventListener('DOMContentLoaded', () => {
  Blockly.inject('blocklyDiv', {
    toolbox: toolbox
  });
});


