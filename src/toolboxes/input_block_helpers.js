import { SENSOR_META } from "../logic/sensorMetadata.js";
import { SENSOR_NAMES } from "../logic/sensorNames.js";

function getSensorLabel(id) {
  const meta = SENSOR_META[id];
  let name = SENSOR_NAMES[id] || meta?.name;
  if (!name) name = `Sensor ${id}`;
  if (meta?.unit) return `${name} (${meta.unit})`;
  return name;
}

export function buildSensorBlocks(sensorIds) {
  return (sensorIds || []).map((id) => ({
    kind: "block",
    type: "sensor_read",
    fields: {
      LABEL: getSensorLabel(id),
    },
    data: String(id),
  }));
}
