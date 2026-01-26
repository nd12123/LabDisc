// import React from "react";
// import ReactDOM from "react-dom/client";
// import RightOutputPanel from "./components/RightOutputPanel.jsx";
// import "./components/SlotManager.js";

import * as Blockly from "blockly/core";
import "blockly/blocks";
import * as En from "blockly/msg/en";
import convertSerializedWorkspaceToAst from "./custom_json_generator.js";

// Suppress Blockly v12 deprecation warnings for methods that will be fixed in v13
// These warnings come from Blockly's internal serialization code, not our code
const originalWarn = console.warn;
console.warn = function (...args) {
  const message = args[0]?.toString() || "";
  // Suppress specific Blockly deprecation warnings
  if (
    message.includes("getAllVariables") ||
    message.includes("getVariableById")
  ) {
    return; // Silently skip these warnings
  }
  originalWarn.apply(console, args);
};

import { javascriptGenerator } from "blockly/javascript";
import "./styles/toolbox_style.css";
import { MyOwnDarkTheme } from "./themes/blockly_theme.js";
import { FieldColour } from "@blockly/field-colour";

import "./blocks/input/common.js";
import "./blocks/input/physio.js";
import "./blocks/input/biochem.js";
import "./blocks/input/enviro.js";
import "./blocks/input/gensci.js";
import "./blocks/loopblocks.js";
import "./blocks/mathblocks.js";
import "./blocks/outputblocks.js";

import "@generators/output.js";
import "@generators/loops.js";
import "@generators/input.js";

import { getToolboxForModel } from "./toolboxes/toolbox_factory.js";

import "./blocks/patched/loop_patch.js";
//import { getSensorValue } from './mock/labdisc.js';
import "./logic/display_logic.js";
import { initializeSensorDataHandler } from "./logic/sensorDataParser.js";

import {
  initSaveLoad,
  saveWorkspaceToFile,
  loadWorkspaceFromFile,
} from "./logic/save_load.js";

import { converters } from "./conversion/index.js";

// Single source of truth for active Blockly model
window.activeModel = "default";

const IS_IPAD =
  /iPad|Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;

window.__blocklyVarCallback = null;
window.__blocklyVarRetry = false;

// Initialize sensor data handler (supports binary stream parsing and sensor value management)
// This sets up window.handleSensorPacket() for Flutter to call with binary sensor data
// It also initializes window.sensorValues = {} to store converted sensor readings
initializeSensorDataHandler();

// Get sensor value - reads from window.sensorValues which is populated by handleSensorPacket()
// The sensorDataParser already handles all conversions, so we just return the stored value
// Note: initializeSensorDataHandler() creates a window.getSensorValue, but we override it here
// to ensure compatibility with the existing codebase structure
window.getSensorValue = function (id) {
  // Read from sensorValues which is updated by handleSensorPacket()
  // This is the real sensor data system used by Flutter
  if (!window.sensorValues) {
    window.sensorValues = {};
  }
  return window.sensorValues[id] ?? 0;
};

// Helper function for manual testing in console
// This allows developers to manually set sensor values for testing without Flutter
window.setSensorValue = function (id, value) {
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

/*
window.createBlocklyVariable = function (name) {
  if (!name) return;

  const workspace = Blockly.getMainWorkspace();
  if (!workspace) return;

  // Avoid duplicates
  const existing = workspace.getVariable(name);
  if (existing) return;

  workspace.createVariable(name);
};
*/
if (IS_IPAD && Blockly?.Variables?.promptName) {
  Blockly.Variables.promptName = function (
    workspace,
    promptText,
    defaultName,
    callback
  ) {
    window.__blocklyVarCallback = callback;

    window.alert(
      "__BLOCKLY_VARIABLE__:" +
        JSON.stringify({
          prompt: promptText,
          defaultName,
          retry: window.__blocklyVarRetry,
        })
    );

    // IMPORTANT:
    // retry flag is reset ONLY after prompt is sent
    window.__blocklyVarRetry = false;
  };
}

if (IS_IPAD) {
  Blockly.dialog.setAlert((message, callback) => {
    if (message.toLowerCase().includes("already exists")) {
      // Tell Flutter this is a retry
      window.__blocklyVarRetry = true;

      // Let Blockly continue its internal flow
      callback();
      return;
    }

    // Any other alert → forward to Flutter
    try {
      window.alert(message);
    } finally {
      callback();
    }
  });
}

window.finishBlocklyVariable = function (name) {
  const cb = window.__blocklyVarCallback;
  window.__blocklyVarCallback = null;

  if (!cb) return;

  // User cancelled → stop everything
  if (!name) {
    window.__blocklyVarRetry = false;
    cb(null);
    return;
  }

  // Let Blockly validate (duplicate check happens here)
  cb(name);
};

/*
if (IS_IPAD && Blockly.Variables && typeof Blockly.Variables.promptName === 'function') {
  Blockly.Variables.promptName = function (
    workspace,
    promptText,
    defaultName,
    callback
  ) {
    try {
      const name = window.prompt(promptText, defaultName);
      callback(name);
    } catch (e) {
      console.error('[Variables.promptName override failed]', e);
      callback(null);
    }
  };
} */

/*
if (IS_IPAD) {
  Blockly.dialog.setConfirm((message, callback) => {
    const result = window.confirm(message);
    callback(result);
  });

  Blockly.dialog.setAlert((message, callback) => {
    window.alert(message);
    callback();
  });
}
*/

/*
window.modalOpen = function modalOpen(payload) {
  // OLD behavior (Blockly Field)
  if (payload && typeof payload.getText === 'function') {
    const value = payload.getText();
    window.valueBefore = value;
    return value;
  }

  // NEW behavior (dialog override)
  if (payload && payload.type) {
    console.log('[modalOpen]', payload);
    // Flutter should handle this
    return null;
  }

  return null;
};
*/

function stopCode() {
  window.isRunning = false;
  if (typeof stopPolling === "function") stopPolling(); // если где-то остался
  activeTimers.forEach(clearTimeout);
  activeTimers = [];
}

window.pause = (ms) =>
  new Promise((resolve) => {
    const id = setTimeout(() => resolve(), ms);
    window.activeTimers.push(id);
  });

/*
function getModelFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('model') || 'default';
}
const currentModel = getModelFromURL();
console.log('Selected model:', currentModel);

const toolbox = getToolboxForModel(currentModel);
*/

// Expose run/stop functions globally for Flutter integration
window.runWorkspace = function () {
  const code = javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace());
  console.clear();
  console.log("Generated JS:", code);
  runCode(code);
};

window.stopWorkspace = function () {
  clearScreen();
  console.clear();
  stopCode();
};

window.clearWorkspace = function () {
  const workspace = Blockly.getMainWorkspace();
  if (workspace) {
    workspace.clear();
  }
};

window.playBeep = function (volume = 0.5, duration = 500) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4
  gainNode.gain.setValueAtTime(volume, ctx.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + duration / 1000);
};

Blockly.setLocale(En);

Blockly.fieldRegistry.register("field_colour", FieldColour);

const movements = {
  scrollbars: { horizontal: true, vertical: true },
  drag: true,
  wheel: true,
};
const zoom = {
  controls: true,
  wheel: true,
  startScale: 1.0,
  maxScale: 3,
  minScale: 0.3,
  scaleSpeed: 1.2,
  pinch: true,
};
const grid = {
  spacing: 25,
  length: 3,
  colour: "#f0f0f0", // Very light grid for minimal visual distraction
  snap: false, // Don't force snap to grid
};

//window.addEventListener('DOMContentLoaded', () => {
const workspace = Blockly.inject("blocklyDiv", {
  //workspace =
  //toolbox: toolbox,
  toolbox: getToolboxForModel(window.activeModel),
  theme: MyOwnDarkTheme,
  renderer: "zelos",
  zoom: zoom,
  move: movements,
  grid: grid,
  trashcan: true, // Disabled - using custom toolbar button instead
  readOnly: false,
  modalInputs: !IS_IPAD,
  //renderer:'zelos', readOnly: false,
  media: "./media", //'./media' //media from blockly? // ./blockly/media
});

initSaveLoad();

window.saveWorkspaceToFile = saveWorkspaceToFile;
window.loadWorkspaceFromFile = loadWorkspaceFromFile;

window.Blockly = Blockly;
window.workspace = Blockly.getMainWorkspace(); // tweaking with the workspace
window.workspace.toolbox.flyout.autoClose = false; //uncomment for prod

window.blocklyReady = true;

// ------------------------------------------------------------------
// POSTMESSAGE HANDLER FOR FLUTTER WEB INTEGRATION
// ------------------------------------------------------------------

/**
 * Handles postMessage requests from Flutter parent window
 * Supports: getCode, getWorkspace, getAstJson, loadCode
 */
window.addEventListener("message", function (event) {
  // Only accept messages from parent window (Flutter)
  // In production, you might want to check event.origin for security
  if (event.source !== window.parent) {
    return;
  }

  const payload = event.data;
  if (!payload || typeof payload !== "object") {
    return;
  }

  const action = payload.action;
  if (!action) {
    return;
  }

  try {
    switch (action) {
      case "getCode": {
        const code = javascriptGenerator.workspaceToCode(workspace);
        window.parent.postMessage(
          {
            type: "codeChanged",
            code: code,
          },
          "*"
        );
        break;
      }

      case "getWorkspace": {
        const workspaceJson = saveWorkspaceToFile();
        window.parent.postMessage(
          {
            type: "workspaceData",
            data: JSON.stringify(workspaceJson),
          },
          "*"
        );
        break;
      }

      case "getAstJson": {
        const astJson = window.getAstJson();
        if (astJson) {
          // getAstJson returns an object, stringify it for transmission
          window.parent.postMessage(
            {
              type: "astJson",
              data: JSON.stringify(astJson),
            },
            "*"
          );
        } else {
          window.parent.postMessage(
            {
              type: "astJson",
              data: "{}",
            },
            "*"
          );
        }
        break;
      }

      case "loadCode": {
        if (payload.code) {
          let jsonData;
          if (typeof payload.code === "string") {
            jsonData = JSON.parse(payload.code);
          } else {
            jsonData = payload.code;
          }
          loadWorkspaceFromFile(jsonData);
        }
        break;
      }

      case "setModel": {
        window.setModel(payload.code);
        break;
      }

      case "toggleToolbox": {
        window.toggleToolboxLogic(payload.code.toString() === "true");
        break;
      }

      default:
        console.warn("Unknown postMessage action:", action);
    }
  } catch (error) {
    console.error("Error handling postMessage action:", action, error);
    // Send error response if possible
    if (action === "getAstJson") {
      window.parent.postMessage(
        {
          type: "astJson",
          data: "{}",
        },
        "*"
      );
    }
  }
});

// Send initial ready notification
window.parent.postMessage(
  {
    type: "ready",
  },
  "*"
);

// 1. Оборачиваем  в setTimeout или ставим после inject'а, чтобы Blockly успел полностью загрузиться.
setTimeout(() => {
  // 2. Берём тулбокс через API:
  const toolbox = workspace.getToolbox();
  // 3. Получаем массив айтемов — это объекты ToolboxCategory или ToolboxSeparator в порядке, как они идут в XML/toolbox.js:
  const categories = toolbox.getToolboxItems();
  // 4. Убедитесь, что именно столько категорий в вашем XML, иначе IndexError.
  const defaultCategory = categories[1];
  // 5. Вызываем setSelectedItem, чтобы «открыть» её:
  toolbox.setSelectedItem(defaultCategory);

  console.log(window.workspace);
}, 0);

// ------------------------------------------------------------------
// MODEL SWITCHING FUNCTION FOR FLUTTER INTEGRATION
// ------------------------------------------------------------------

/**
 * Helper: Waits for toolbox to be ready with actual items (not just initialized)
 * Uses requestAnimationFrame to avoid blocking the event loop
 * @param {number} maxRetries - Maximum number of retries (default: 30 = ~500ms)
 * @returns {Promise<boolean>} - Resolves true when ready, false on timeout
 */
function waitForToolboxReady(maxRetries = 30) {
  return new Promise((resolve) => {
    let retries = 0;

    function check() {
      const toolbox = window.workspace?.getToolbox?.();
      const items = toolbox?.getToolboxItems?.();

      // Toolbox is ready when it exists AND has items
      if (toolbox && items && items.length > 0) {
        resolve(true);
        return;
      }

      retries++;
      if (retries >= maxRetries) {
        console.warn("Toolbox ready timeout");
        resolve(false);
        return;
      }

      // Use requestAnimationFrame to yield to browser between checks
      // This prevents event-loop starvation in Flutter WebView
      requestAnimationFrame(check);
    }

    check();
  });
}

/**
 * Switches the current model and reloads the toolbox
 * Optionally clears the workspace (recommended when switching models)
 * @param {string} modelName - Model name: 'physio', 'biochem', 'enviro', 'gensci', or 'default'
 * @param {boolean} clearWorkspace - Whether to clear workspace after switching (default: true)
 * @returns {Promise<boolean>} - Resolves true on success, false on error
 */
/**
 * Switches Blockly model safely (Flutter WebView–safe)
 * - No recursion
 * - No event-loop starvation
 * - Deterministic completion
 */
window.setModel = async function setModel(modelName, clearWorkspace = true) {
  try {
    // ---- 0. Check if model is already active - do nothing if unchanged ----
    if (window.activeModel === modelName) {
      console.log("[setModel] Model already active:", modelName);
      return true; // Success - no action needed
    }

    // Single source of truth
    window.activeModel = modelName;

    // ---- 1. Wait for workspace to exist ----
    let retries = 30;
    while ((!window.workspace || window.workspace.disposed) && retries-- > 0) {
      await new Promise((r) => requestAnimationFrame(r));
    }

    if (!window.workspace || window.workspace.disposed) {
      console.error("[setModel] Workspace not ready");
      return false;
    }

    // ---- 2. Clear workspace BEFORE toolbox update ----
    if (clearWorkspace) {
      window.workspace.clear();
    }

    // ---- 3. Update toolbox (mutates existing toolbox) ----
    window.workspace.updateToolbox(getToolboxForModel(modelName));

    // ---- 4. Wait until toolbox has categories ----
    let toolbox = null;
    retries = 30;

    while (retries-- > 0) {
      toolbox = window.workspace.getToolbox();
      const items = toolbox?.getToolboxItems?.();

      if (toolbox && items && items.length > 0) {
        break;
      }

      await new Promise((r) => requestAnimationFrame(r));
    }

    if (!toolbox) {
      console.error("[setModel] Toolbox not available");
      return false;
    }

    // ---- 5. Select first category safely ----
    const categories = toolbox.getToolboxItems();
    if (categories && categories.length > 0) {
      toolbox.setSelectedItem(categories[0]);
    }

    console.log("[setModel] Model switched:", modelName);
    return true;
  } catch (e) {
    console.error("[setModel] Error:", e);
    return false;
  }
};

/**
 * Toggles the visibility of the Logic category in the toolbox.
 * @param {boolean} isVisible - Whether the Logic category should be visible.
 */
window.toggleToolboxLogic = function (isVisible) {
  if (window.workspace) {
    if (isVisible) {
      const toolbox = window.workspace.getToolbox();
      const categories = toolbox.getToolboxItems();
      toolbox.setSelectedItem(categories[0]);
    } else {
      window.workspace.getFlyout().hide();
    }
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

// Expose function to get AST JSON
// Note: Blockly.JSON is set up in custom_json_generator.js
window.getAstJson = function () {
  try {
    const serialized = Blockly.serialization.workspaces.save(workspace);
    const ast = convertSerializedWorkspaceToAst(serialized);
    return ast;
  } catch (e) {
    console.error("Error getting AST JSON:", e);
    return null;
  }
};
