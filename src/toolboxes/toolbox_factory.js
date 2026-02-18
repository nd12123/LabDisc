import { commonCategories } from "./common.js";
import { MODEL_SENSORS } from "../logic/modelSensors.js";
import { buildSensorBlocks } from "./input_block_helpers.js";

export function getToolboxForModel(model) {
  const m = (model || "").toLowerCase();
  const sensors = MODEL_SENSORS[m] || MODEL_SENSORS.default;
  const inputCategory = {
    kind: "category",
    name: "Input",
    colour: "#649FEF",
    contents: buildSensorBlocks(sensors),
  };

  return {
    kind: "categoryToolbox",
    contents: [inputCategory, ...commonCategories],
  };
}

/**
 * Build toolbox from an explicit array of sensor IDs.
 * @param {number[]} sensorIds - Array of sensor IDs
 * @returns {object} Toolbox definition
 */
export function getToolboxForSensors(sensorIds) {
  const ids = Array.isArray(sensorIds) ? sensorIds : [];
  const inputCategory = {
    kind: "category",
    name: "Input",
    colour: "#649FEF",
    contents: buildSensorBlocks(ids),
  };

  return {
    kind: "categoryToolbox",
    contents: [inputCategory, ...commonCategories],
  };
}

/**
 * Unified toolbox getter: accepts either a model name (string) or sensor IDs (array of numbers).
 * @param {string|number[]} modelOrSensors - Model name or array of sensor IDs
 * @returns {object} Toolbox definition
 */
export function getToolbox(modelOrSensors) {
  if (
    Array.isArray(modelOrSensors) &&
    modelOrSensors.length > 0 &&
    typeof modelOrSensors[0] === "number"
  ) {
    return getToolboxForSensors(modelOrSensors);
  }
  return getToolboxForModel(modelOrSensors);
}
