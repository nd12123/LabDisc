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

import '@generators/output.js'
import '@generators/loops.js'
import '@generators/input.js'

import { getToolboxForModel } from './toolboxes/toolbox_factory.js';

import { FieldColour } from '@blockly/field-colour';

import './styles/toolbox_style.css';
import { MyOwnDarkTheme } from './themes/blockly_theme.js';

import './blocks/patched/loop_patch.js';
//import { getSensorValue } from './mock/labdisc.js';
import './logic/display_logic.js';

//window.getSensorValue = getSensorValue;
// mock sensor layer for development
window.__mockSensorStore = {};
window.getSensorValue = function(id) {
  return window.__mockSensorStore[id] ?? 0;
};
window.setSensorValue = function(id, value) {
  window.__mockSensorStore[id] = value;
  console.log(`Sensor ${id} set to ${value}`);
};
/*
window.sensorValues = { //example, gotta be polling
  1: 22.4,
  2: 570,
  3: 7.2
};
*/

window.isRunning = false;

let runner = null;

function runCode(code) {
  stopCode();
  window.isRunning = true;

  try {
    runner = new Function(`
      (async () => {
        ${code}
      })();
    `);
    runner();
  } catch (e) {
    console.error("Execution error:", e);
  }
}
window.activeTimers = [];

function stopCode() {
  window.isRunning = false;
  if (typeof stopPolling === 'function') stopPolling(); // если где-то остался
  activeTimers.forEach(clearTimeout);
  activeTimers = [];
  
}

window.pause = (ms) => new Promise((resolve) => {
  const id = setTimeout(() => resolve(), ms);
  window.activeTimers.push(id);
});


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
  runCode(code)
});

document.getElementById("stopButton").addEventListener("click", () => {
  clearScreen(); // очистим UI
  console.clear(); // по желанию
  // Здесь можно сбрасывать состояние, отменять таймеры
  //stopPolling();
  stopCode();
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

Blockly.setLocale(En);

Blockly.fieldRegistry.register('field_colour', FieldColour);



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
  window.workspace = Blockly.getMainWorkspace(); // tweaking with the workspace
  //window.workspace.toolbox.flyout.autoClose = false; //uncomment for prod

  // 1. Оборачиваем  в setTimeout или ставим после inject’а, чтобы Blockly успел полностью загрузиться.
  setTimeout(() => {
  // 2. Берём тулбокс через API:
  const toolbox = workspace.getToolbox();
  // 3. Получаем массив айтемов — это объекты ToolboxCategory или ToolboxSeparator в порядке, как они идут в XML/toolbox.js:
  const categories = toolbox.getToolboxItems();
  // 4. Убедитесь, что именно столько категорий в вашем XML, иначе IndexError.
  const defaultCategory = categories[1];
  // 5. Вызываем setSelectedItem, чтобы «открыть» её:
  toolbox.setSelectedItem(defaultCategory);
}, 0);
});
/*
let pollingId = null;

function startPolling() {
  stopPolling(); // безопасно
  pollingId = setInterval(() => {
    // например
    console.log("Polling...", getSensorValue('1'));
  }, 333);
}

function stopPolling() {
  if (pollingId !== null) {
    clearInterval(pollingId);
    pollingId = null;
    console.log('Polling stopped');
  }
}
*/

//console.log(Blockly.getMainWorkspace())
//window.workspace = Blockly.Workspace;
//var tree = workspace.toolbox.contents_;
//workspace.toolbox.setSelectedItem(tree[3]);
//window.Blockly = Blockly;

//workspace = Blockly.GetMainWorkapace
//console.log(workspace.GetTheme())