import { pythonGenerator } from "blockly/python";
import { SENSOR_META } from "../logic/sensorMetadata.js";
import { SENSOR_NAMES } from "../logic/sensorNames.js";

function ensureTimeImport() {
  if (!pythonGenerator.definitions_) {
    pythonGenerator.definitions_ = {};
  }
  pythonGenerator.definitions_["import_time"] = "import time";
}

function quote(value) {
  if (typeof pythonGenerator.quote_ === "function") {
    return pythonGenerator.quote_(value);
  }
  return JSON.stringify(String(value));
}

function getSensorDisplay(id) {
  const meta = SENSOR_META[id];
  const name = SENSOR_NAMES[id] || meta?.name || `Sensor ${id}`;
  return name;
}

pythonGenerator.forBlock["sensor_read"] = (block) => {
  const rawId = block.data ?? block.getFieldValue("SENSOR_ID");
  const sensorId = Number(rawId);
  const safeId = Number.isFinite(sensorId) ? sensorId : 0;
  return [`get_sensor_value(${safeId})`, pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator.forBlock["pause"] = function (block) {
  const delay =
    pythonGenerator.valueToCode(block, "INPUT", pythonGenerator.ORDER_NONE) ||
    "0";
  ensureTimeImport();
  return `time.sleep((${delay}) / 1000)\n`;
};

pythonGenerator.forBlock["delay"] = function (block) {
  const delay =
    pythonGenerator.valueToCode(block, "INPUT", pythonGenerator.ORDER_NONE) ||
    "0";
  ensureTimeImport();
  return `time.sleep((${delay}) / 1000)\n`;
};

pythonGenerator.forBlock["delay_seconds"] = function (block) {
  const delaySeconds =
    pythonGenerator.valueToCode(block, "INPUT", pythonGenerator.ORDER_NONE) ||
    "0";
  ensureTimeImport();
  return `time.sleep(${delaySeconds})\n`;
};

pythonGenerator.forBlock["beep"] = function (block) {
  const volume = block.getFieldValue("VOLUME");
  const duration = block.getFieldValue("DURATION");
  return `play_beep(${volume}, ${duration})\n`;
};

pythonGenerator.forBlock["display_text"] = function (block) {
  const text = block.getFieldValue("TEXT");
  const color = block.getFieldValue("COLOR");
  const bg = block.getFieldValue("BG");
  const pos = block.getFieldValue("POSITION") || "center";
  return `display_text(${quote(text)}, ${quote(color)}, ${quote(bg)}, ${quote(
    pos
  )})\n`;
};

pythonGenerator.forBlock["display_var"] = function (block) {
  const variable =
    pythonGenerator.valueToCode(block, "var", pythonGenerator.ORDER_NONE) ||
    "0";
  const color = block.getFieldValue("COLOR");
  const bg = block.getFieldValue("BG");
  const pos = block.getFieldValue("POSITION") || "center";
  const blockId = block.id;

  const inputBlock = block.getInputTargetBlock("var");
  let sensorId = null;

  if (inputBlock?.type === "sensor_read") {
    const rawId = inputBlock.data ?? inputBlock.getFieldValue("SENSOR_ID");
    const idNum = Number(rawId);
    if (Number.isFinite(idNum)) sensorId = String(idNum);
  }

  if (sensorId) {
    const sensorName = getSensorDisplay(Number(sensorId));
    return `display_variable(${quote(sensorName)}, ${quote(color)}, ${quote(
      bg
    )}, ${quote(pos)}, ${quote(sensorId)})\n`;
  }

  return `display_variable(${variable}, "Value", "", ${quote(color)}, ${quote(
    bg
  )}, ${quote(pos)})\n`;
};

pythonGenerator.forBlock["display_sensor"] = function (block) {
  const id = block.getFieldValue("SENSOR_ID");
  const color = block.getFieldValue("COLOR");
  const bg = block.getFieldValue("BG");
  const pos = block.getFieldValue("POSITION") || "center";

  const metadata = sensorMetadata[idNum] || { name: `Sensor ${id}`, unit: "" };
  return `display_variable(${quote(metadata.name)}, ${quote(
    metadata.unit
  )}, ${quote(color)}, ${quote(bg)}, ${quote(pos)}, ${quote(String(id))})\n`;
};

pythonGenerator.forBlock["clear_screen"] = function () {
  return "clear_screen()\n";
};

pythonGenerator.forBlock["clear_screen_slot"] = function (block) {
  const screen = block.getFieldValue("SCREEN") || "center";
  return `clear_screen_slot(${quote(screen)})\n`;
};

pythonGenerator.forBlock["bar"] = function (block) {
  const min = block.getFieldValue("MIN") || "0";
  const max = block.getFieldValue("MAX") || "100";
  const variable =
    pythonGenerator.valueToCode(block, "var", pythonGenerator.ORDER_NONE) ||
    "0";
  const color = block.getFieldValue("COLOR") || "#00FF00";
  const steps = block.getFieldValue("STEPS") || "10";
  const pos = block.getFieldValue("POSITION") || "center";

  const inputBlock = block.getInputTargetBlock("var");
  let sensorId = null;

  if (inputBlock?.type === "sensor_read") {
    const blockType = inputBlock.type;
    const rawId = inputBlock.data ?? inputBlock.getFieldValue("SENSOR_ID");
    const idNum = Number(rawId);
    if (Number.isFinite(idNum)) sensorId = String(idNum);

    if (sensorId) {
      const sensorName = getSensorDisplay(Number(sensorId));
      return `display_bar(${min}, ${max}, ${quote(color)}, ${steps}, ${quote(
        sensorName
      )}, ${quote(pos)})\n`;
    }
  }

  return `display_bar(${min}, ${max}, ${variable}, ${quote(
    color
  )}, ${steps}, "", "", ${quote(pos)})\n`;
};

pythonGenerator.forBlock["horizontal_bar"] = function (block) {
  const sensorId = block.getFieldValue("SENSOR_ID");
  const min = block.getFieldValue("MIN") || "0";
  const max = block.getFieldValue("MAX") || "100";
  const color = block.getFieldValue("COLOR") || "#00FF00";
  const steps = block.getFieldValue("STEPS") || "10";
  const pos = block.getFieldValue("POSITION") || "center";

  const sensorName = getSensorDisplay(Number(sensorId));

  return `display_bar(${min}, ${max}, ${quote(color)}, ${steps}, ${quote(
    sensorName
  )}, ${quote(pos)})\n`;
};

pythonGenerator.forBlock["forever_loop_clean"] = function (block) {
  const body = pythonGenerator.statementToCode(block, "comands");
  const indent = pythonGenerator.INDENT || "  ";
  ensureTimeImport();
  return `while is_running:\n${body}${indent}`;
};

pythonGenerator.forBlock["controls_whileUntil"] = function (block) {
  const conditionCode = pythonGenerator.valueToCode(
    block,
    "BOOL",
    pythonGenerator.ORDER_NONE
  );
  const condition =
    conditionCode && conditionCode.trim() !== "" ? conditionCode : "False";
  const branch = pythonGenerator.statementToCode(block, "DO");
  const indent = pythonGenerator.INDENT || "  ";
  ensureTimeImport();
  return `while is_running and (${condition}):\n${branch}${indent}time.sleep(0.1)\n`;
};
