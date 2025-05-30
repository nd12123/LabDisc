import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import * as En from 'blockly/msg/en';

import './blocks/inputblocks.js'
import './blocks/loopblocks.js'
import './blocks/mathblocks.js'
import './blocks/displayblocks.js'

import { toolbox } from './toolbox.js';

import { FieldColour } from '@blockly/field-colour';

Blockly.setLocale(En);

Blockly.fieldRegistry.register('field_colour', FieldColour);

window.sensorValues = {
  1: 22.4,
  2: 570,
  3: 7.2
};



window.displayVariable = function (sensorId, unit, color, bg, position) {
  const value = window.sensorValues?.[sensorId] ?? "[no data]";
  const el = document.getElementById("outputArea");
  el.textContent = `${value} ${unit}`;
  el.style.color = color;
  el.style.backgroundColor = bg;
  el.style.textAlign = position;
};


window.drawBar = function (sensorId, min, max, color1, color2, steps) {
  const val = window.sensorValues?.[sensorId] ?? 0;
  const norm = Math.max(0, Math.min(1, (val - min) / (max - min)));

  const mix = (c1, c2, f) => Math.round(c1 + (c2 - c1) * f);

  const hexToRgb = hex => {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [0, 0, 0];
  };

  const rgbToHex = ([r, g, b]) =>
    '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const mixed = c1.map((v, i) => mix(v, c2[i], norm));
  const finalColor = rgbToHex(mixed);

  // Bar container
  const bar = document.createElement('div');
  bar.style.width = '100%';
  bar.style.height = '30px';
  bar.style.border = '1px solid #ccc';
  bar.style.backgroundColor = '#eee';
  bar.style.margin = '10px 0';

  // Bar fill
  const fill = document.createElement('div');
  fill.style.height = '100%';
  fill.style.width = `${norm * 100}%`;
  fill.style.backgroundColor = finalColor;
  fill.style.transition = 'width 0.3s, background-color 0.3s';

  bar.appendChild(fill);

  const label = document.createElement('div');
  label.textContent = `Sensor ${sensorId}: ${val}`;
  label.style.marginBottom = '5px';

  const output = document.getElementById("outputArea");
  output.innerHTML = ''; // Очистка
  output.appendChild(label);
  output.appendChild(bar);
};



window.addEventListener('DOMContentLoaded', () => {
  Blockly.inject('blocklyDiv', {
    toolbox: toolbox
  });

});


