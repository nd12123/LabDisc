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
