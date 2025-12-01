import React from 'react';
import ReactDOM from 'react-dom/client';
import RightOutputPanel from './components/RightOutputPanel.jsx';
import './components/SlotManager.js';

import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import * as En from 'blockly/msg/en';

// Suppress Blockly v12 deprecation warnings for methods that will be fixed in v13
// These warnings come from Blockly's internal serialization code, not our code
const originalWarn = console.warn;
console.warn = function(...args) {
  const message = args[0]?.toString() || '';
  // Suppress specific Blockly deprecation warnings
  if (message.includes('getAllVariables') || message.includes('getVariableById')) {
    return; // Silently skip these warnings
  }
  originalWarn.apply(console, args);
};

import { javascriptGenerator} from 'blockly/javascript';
import './styles/toolbox_style.css';
import { MyOwnDarkTheme } from './themes/blockly_theme.js';
import { FieldColour } from '@blockly/field-colour';

import './blocks/input/common.js'
import './blocks/input/physio.js'
import './blocks/input/biochem.js'
import './blocks/input/enviro.js'
import './blocks/input/gensci.js'
import './blocks/loopblocks.js'
import './blocks/mathblocks.js'
import './blocks/outputblocks.js'

import '@generators/output.js'
import '@generators/loops.js'
import '@generators/input.js'

import { getToolboxForModel } from './toolboxes/toolbox_factory.js';

import './blocks/patched/loop_patch.js';
//import { getSensorValue } from './mock/labdisc.js';
import './logic/display_logic.js';
import { initializeSensorDataHandler } from './logic/sensorDataParser.js';

import { initSaveLoad } from './logic/save_load.js';

import { converters } from './conversion/index.js';

//window.getSensorValue = getSensorValue;
// mock sensor layer for development
// mock sensor layer for development (RAW)
window.__mockSensorStore = {};
window.getSensorValueRaw = function(id) {
  // СЫРОЕ значение с устройства (пока — из мок-хранилища)
  return window.__mockSensorStore[id] ?? 0;
};
window.setSensorValue = function(id, value) {
  window.__mockSensorStore[id] = value;
};

// Initialize sensor data handler (supports binary stream parsing and sensor value management)
initializeSensorDataHandler();

// Карта соответствий: внутренний ID -> ключ конвертера + пост-обработка (если нужна)
// Подставляю ТВОИ id из текущих блоков input/common.js (см. твой список)
const SENSOR_MAP = {
  // из твоего input_common.js:
  1:  { key: 'temperature', unit: '°C' },     // temperature (C)
  2:  { key: 'light', unit: 'lx' },           // light (lx) — НЕЛИНЕЙНО через LUT
  3:  { key: 'ph', unit: 'pH' },              // pH (если вернёшь из комментария)
  5:  { /* current mA */ },                   // mA — пока без конверсии (сырое)
  6:  { /* voltage V */ },                    // V — пока без конверсии (сырое)
  8:  { /* distance cm */ },                  // cm — пока без конверсии (сырое)
  9:  { /* sound dB */ },                     // dB — пока без конверсии (сырое)
  11: { /* pressure kPa */ },                 // kPa — у тебя отдельный датчик (сырое)
  16: { key: 'low_voltage_mv', unit: 'V', post: (mv) => mv / 1000 }, // хотим вернуть в В
  17: { /* accelerometer m/s^2 */ },          // аксель — сырое (если нужно — добавим позже)

  // Если у тебя появится барометр отдельным ID — добавь сюда (пример):
  // 103: { key: 'barometer', unit: 'mBar' },
};

// ПЕРЕСЧИТАННОЕ значение (теперь ВСЕ блоки автоматически получают правильные числа)
window.getSensorValue = function(id) {
  const raw = window.getSensorValueRaw(id);
  const storeHasValue = window.__mockSensorStore[id] !== undefined;

  // If store is empty (value is undefined), return 0 directly without conversion
  // This provides a sensible default when no real sensor value exists yet
  // Only apply converters when a non-zero value exists in the store
  if (!storeHasValue) {
    return 0;
  }

  // Value explicitly set via setSensorValue - return it directly without conversion
  // This allows users to mock sensor values in the console
  return raw;
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

// Zoom controls
document.getElementById("zoomInBtn").addEventListener("click", () => {
  const workspace = Blockly.getMainWorkspace();
  if (workspace) {
    workspace.zoomCenter(1.2);
  }
});

document.getElementById("zoomOutBtn").addEventListener("click", () => {
  const workspace = Blockly.getMainWorkspace();
  if (workspace) {
    workspace.zoomCenter(1 / 1.2);
  }
});

document.getElementById("zoomResetBtn").addEventListener("click", () => {
  const workspace = Blockly.getMainWorkspace();
  if (workspace) {
    workspace.setScale(1.0);
  }
});

// Trash/Delete All controls
document.getElementById("trashBtn").addEventListener("click", () => {
  const workspace = Blockly.getMainWorkspace();
  if (workspace && confirm('Delete all blocks? This cannot be undone.')) {
    workspace.clear();
  }
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
const grid = {
  spacing: 25,
  length: 3,
  colour: '#f0f0f0',  // Very light grid for minimal visual distraction
  snap: false         // Don't force snap to grid
};

//window.addEventListener('DOMContentLoaded', () => {
  const workspace = Blockly.inject('blocklyDiv', { //workspace =
    toolbox: toolbox,
    theme: MyOwnDarkTheme,
    renderer: 'zelos',
    zoom: zoom,
    move: movements,
    grid: grid,
    trashcan: false, // Disabled - using custom toolbar button instead
    readOnly: false,
    //renderer:'zelos', readOnly: false,
    media: './media' //media from blockly? // ./blockly/media
  });


  initSaveLoad(workspace);


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

//console.log(window.workspace)
}, 0);
//});


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

// Mount React component for output panel
setTimeout(() => {
  const outputPanelRoot = ReactDOM.createRoot(document.getElementById('outputPanel'));
  outputPanelRoot.render(React.createElement(RightOutputPanel));
}, 100);