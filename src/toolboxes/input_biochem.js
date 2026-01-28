import { MODEL_SENSORS } from "../logic/modelSensors.js";
import { buildSensorBlocks } from "./input_block_helpers.js";

export const inputBlocksBioChem = {
  kind: "category",
  name: "Input",
  colour: "#649FEF",
  contents: buildSensorBlocks(MODEL_SENSORS.biochem),
};
