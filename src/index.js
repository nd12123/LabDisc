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

// Initialize sensor data handler (supports binary stream parsing and sensor value management)
// This sets up window.handleSensorPacket() for Flutter to call with binary sensor data
// It also initializes window.sensorValues = {} to store converted sensor readings
initializeSensorDataHandler();

// Get sensor value - reads from window.sensorValues which is populated by handleSensorPacket()
// The sensorDataParser already handles all conversions, so we just return the stored value
// Note: initializeSensorDataHandler() creates a window.getSensorValue, but we override it here
// to ensure compatibility with the existing codebase structure
window.getSensorValue = function(id) {
  // Read from sensorValues which is updated by handleSensorPacket()
  // This is the real sensor data system used by Flutter
  if (!window.sensorValues) {
    window.sensorValues = {};
  }
  return window.sensorValues[id] ?? 0;
};

// Helper function for manual testing in console
// This allows developers to manually set sensor values for testing without Flutter
window.setSensorValue = function(id, value) {
  if (!window.sensorValues) {
    window.sensorValues = {};
  }
  window.sensorValues[id] = value;
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


// Expose run/stop functions globally for Flutter integration
window.runWorkspace = function() {
  const code = javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace());
  console.clear();
  console.log("Generated JS:", code);
  runCode(code);
};

window.stopWorkspace = function() {
  clearScreen();
  console.clear();
  stopCode();
};

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


  initSaveLoad();


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

// ------------------------------------------------------------------
// MODEL SWITCHING FUNCTION FOR FLUTTER INTEGRATION
// ------------------------------------------------------------------

/**
 * Switches the current model and reloads the toolbox
 * Optionally clears the workspace (recommended when switching models)
 * @param {string} modelName - Model name: 'physio', 'biochem', 'enviro', 'gensci', or 'default'
 * @param {boolean} clearWorkspace - Whether to clear workspace after switching (default: true)
 */
window.setModel = function(modelName, clearWorkspace = true) {
  try {
    // Get new toolbox for the model
    const newToolbox = getToolboxForModel(modelName);

    // Update the workspace toolbox
    window.workspace.updateToolbox(newToolbox);

    // Clear workspace if requested (recommended to avoid incompatible blocks)
    if (clearWorkspace) {
      window.workspace.clear();
    }

    // Re-select default category (Output category at index 0)
    setTimeout(() => {
      const toolbox = window.workspace.getToolbox();
      const categories = toolbox.getToolboxItems();
      if (categories && categories.length > 0) {
        const defaultCategory = categories[0]; // Select first category (Input)
        toolbox.setSelectedItem(defaultCategory);
      }
    }, 0);

    console.log('Model switched to:', modelName);
    return true;
  } catch (e) {
    console.error('Error switching model:', e);
    return false;
  }
};


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