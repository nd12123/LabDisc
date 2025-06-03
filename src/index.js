import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import * as En from 'blockly/msg/en';

import { javascriptGenerator} from 'blockly/javascript';

import './blocks/input/common.js'
import './blocks/input/physio.js'
import './blocks/input/biochem.js'
import './blocks/input/enviro.js'
//import './blocks/inputblocks.js'
import './blocks/loopblocks.js'
import './blocks/mathblocks.js'
import './blocks/outputblocks.js'

import './generators/output.js'

import { getToolboxForModel } from './toolboxes/toolbox_factory.js';

import { FieldColour } from '@blockly/field-colour';

import './styles/toolbox_style.css';
import { MyOwnDarkTheme } from './themes/blockly_theme.js';



Blockly.setLocale(En);

Blockly.fieldRegistry.register('field_colour', FieldColour);

window.sensorValues = { //example, gotta be polling
  1: 22.4,
  2: 570,
  3: 7.2
};

function getModelFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('model') || 'default';
}

const currentModel = getModelFromURL();
console.log('Selected model:', currentModel);

const toolbox = getToolboxForModel(currentModel);


//running JS code
document.getElementById("runButton").addEventListener("click", () => {
  const code = javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace());
  console.clear();
  console.log("Generated JS:", code);
  try {
    eval(code);
  } catch (e) {
    console.error("Execution error:", e);
  }
});

document.getElementById("stopButton").addEventListener("click", () => {
  clearScreen(); // очистим UI
  console.clear(); // по желанию
  // Здесь можно сбрасывать состояние, отменять таймеры
});

window.playBeep = function (volume = 0.5, duration = 500) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4
  gainNode.gain.setValueAtTime(volume, ctx.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + duration / 1000);
};

window.clearScreen = function () {
  const el = document.getElementById("outputArea");
  if (el) {
    el.innerHTML = "";
  }
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




const movements = {scrollbars: { horizontal: true, vertical: true},drag: true,wheel: true};
const zoom = {controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2, pinch: true}

window.addEventListener('DOMContentLoaded', () => {
  Blockly.inject('blocklyDiv', { //workspace =  
    toolbox: toolbox,
    theme: MyOwnDarkTheme,
    renderer: 'zelos',
    zoom: zoom,
    move: movements,
    trashcan: true, 
    readOnly: false,
    //renderer:'zelos', readOnly: false,
    media: './media' //media from blockly? // ./blockly/media
  });

  window.Blockly = Blockly;
  window.workspace = Blockly.getMainWorkspace(); // или твой workspace

  //console.log(workspace.getTheme())
});


//workspace = Blockly.GetMainWorkspace()
//var tree = workspace.toolbox.contents_; //not toolbox_
//workspace.toolbox.setSelectedItem(tree[3]); //Select INPUT category as default
//console.log(Blockly.getMainWorkspace())
//window.workspace = Blockly.Workspace;
//var tree = workspace.toolbox.contents_;
//workspace.toolbox.setSelectedItem(tree[3]);
//window.Blockly = Blockly;


//window.workspace.toolbox.flyout.autoClose = false;
//workspace = Blockly.GetMainWorkapace
//console.log(workspace.GetTheme())