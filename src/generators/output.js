// src/generators/output.js
import { javascriptGenerator } from "blockly/javascript";

// pause block
javascriptGenerator.forBlock["pause"] = function (block) {
  const delay =
    javascriptGenerator.valueToCode(
      block,
      "INPUT",
      javascriptGenerator.ORDER_NONE
    ) || "0";
  return `await pause(${delay});\n`;
};

// beep block
javascriptGenerator.forBlock["beep"] = function (block) {
  const volume = block.getFieldValue("VOLUME");
  const duration = block.getFieldValue("DURATION");
  return `playBeep(${volume}, ${duration});\n`;
};

// display_text block
javascriptGenerator.forBlock["display_text"] = function (block) {
  const text = block.getFieldValue("TEXT");
  const color = block.getFieldValue("COLOR");
  const bg = block.getFieldValue("BG");
  const pos = block.getFieldValue("POSITION") || "center";
  const blockId = block.id;
  return `displayText("${blockId}", "${text}", "${color}", "${bg}", "${pos}");\n`;
};

// display_var block
javascriptGenerator.forBlock["display_var"] = function (block) {
  const variable =
    javascriptGenerator.valueToCode(
      block,
      "var",
      javascriptGenerator.ORDER_NONE
    ) || "0";
  const color = block.getFieldValue("COLOR");
  const bg = block.getFieldValue("BG");
  const pos = block.getFieldValue("POSITION") || "center";
  const blockId = block.id;

  // Check if input is a sensor block - if so, extract sensor ID for live polling
  const inputBlock = block.getInputTargetBlock("var");
  let sensorId = null;

  if (inputBlock) {
    const blockType = inputBlock.type;

    // Map sensor block types to their internal sensor IDs (matching CSV "Code" column)
    // Comprehensive mapping covering all models: common, physio, biochem, enviro, gensci
    const sensorMap = {
      // Common blocks (all models) - updated to match hardware codes
      get_ambient_temperature: "30",
      get_temperature: "30", // alias
      get_amb_temp: "30", // alias
      get_light: "20",
      get_ph: "2",
      get_external_temperature: "13",
      get_external: "13", // alias
      get_barometer: "4",
      get_humidity: "6",
      get_sound_level: "21",
      get_distance: "25",
      get_air_pressure: "26",
      get_voltage: "27",
      get_current: "28",
      get_external1: "32",
      get_microphone: "33",
      get_do: "40",
      get_turbidity: "31",
      get_conductivity: "41",

      // Physio-specific blocks
      physio_get_low_voltage: "34",
      physio_get_external1: "32",
      physio_get_external2: "39",

      // BioChem-specific blocks
      biochem_get_hr: "22",
      biochem_get_thermocouple: "42",

      // Enviro-specific blocks
      enviro_get_uv: "1",
      enviro_get_ir_temperature: "5",
      enviro_get_barometer: "4",
      enviro_get_gps_lat: "7",
      enviro_get_gps_lon: "7",
      enviro_get_gps_speed: "7",
      enviro_get_gps_course: "7",
      enviro_get_gps_time: "7",
      enviro_get_color_r: "14",
      enviro_get_color_g: "14",
      enviro_get_color_b: "14",
      enviro_get_turbidity: "31",
      enviro_get_do: "40",

      // GenSci-specific blocks
      gensci_get_humidity: "6",
      gensci_get_microphone: "33",
      gensci_get_gps_lat: "7",
      gensci_get_gps_lon: "7",
      gensci_get_gps_speed: "7",
      gensci_get_gps_course: "7",
      gensci_get_gps_time: "7",
    };

    sensorId = sensorMap[blockType];
  }

  // If sensor detected, pass sensorId for live polling; otherwise pass captured value
  if (sensorId) {
    // Get sensor name and unit from the sensor block for better display (updated to match CSV codes)
    const sensorNames = {
      1: ["UV", "UV"],
      2: ["pH", "pH"],
      4: ["Barometer", "mBar"],
      5: ["IR Temperature", "°C"],
      6: ["Humidity", "%RH"],
      7: ["GPS", ""],
      13: ["Ext. Temperature", "°C"],
      14: ["Colorimeter", "%T"],
      20: ["Light", "lx"],
      21: ["Sound", "dB"],
      22: ["Heart Rate", "bpm"],
      25: ["Distance", "m"],
      26: ["Air Pressure", "kPa"],
      27: ["Voltage", "V"],
      28: ["Current", "A"],
      30: ["Amb. Temperature", "°C"],
      31: ["Turbidity", "NTU"],
      32: ["External Sensor 1", "V"],
      33: ["Microphone", "V"],
      34: ["Low Voltage", "mV"],
      35: ["Acceleration", "g"],
      39: ["External Sensor 2", "V"],
      40: ["Dissolved Oxygen", "mg/l"],
      41: ["Conductivity", "mS"],
      42: ["Thermocouple", "°C"],
    };
    const [sensorName, sensorUnit] = sensorNames[sensorId] || [
      "Sensor " + sensorId,
      "",
    ];
    return `displayVariable("${blockId}", null, "${sensorName}", "${sensorUnit}", "${color}", "${bg}", "${pos}", "${sensorId}");\n`;
  } else {
    return `displayVariable("${blockId}", ${variable}, "Value", "", "${color}", "${bg}", "${pos}");\n`;
  }
};

// display_sensor block
javascriptGenerator.forBlock["display_sensor"] = function (block) {
  const id = block.getFieldValue("SENSOR_ID");
  const color = block.getFieldValue("COLOR");
  const bg = block.getFieldValue("BG");
  const pos = block.getFieldValue("POSITION") || "center";
  const blockId = block.id;

  // Map sensor IDs to their names and units (updated to match CSV codes)
  const sensorMetadata = {
    1: { name: "UV", unit: "UV" },
    2: { name: "pH", unit: "pH" },
    4: { name: "Barometer", unit: "mBar" },
    5: { name: "IR Temperature", unit: "°C" },
    6: { name: "Humidity", unit: "%RH" },
    7: { name: "GPS", unit: "" },
    13: { name: "Ext. Temperature", unit: "°C" },
    14: { name: "Colorimeter", unit: "%T" },
    20: { name: "Light", unit: "lx" },
    21: { name: "Sound", unit: "dB" },
    22: { name: "Heart Rate", unit: "bpm" },
    25: { name: "Distance", unit: "m" },
    26: { name: "Air Pressure", unit: "kPa" },
    27: { name: "Voltage", unit: "V" },
    28: { name: "Current", unit: "A" },
    30: { name: "Amb. Temperature", unit: "°C" },
    31: { name: "Turbidity", unit: "NTU" },
    32: { name: "External Sensor 1", unit: "V" },
    33: { name: "Microphone", unit: "V" },
    34: { name: "Low Voltage", unit: "mV" },
    35: { name: "Acceleration", unit: "g" },
    39: { name: "External Sensor 2", unit: "V" },
    40: { name: "Dissolved Oxygen", unit: "mg/l" },
    41: { name: "Conductivity", unit: "mS" },
    42: { name: "Thermocouple", unit: "°C" },
  };

  const metadata = sensorMetadata[id] || { name: `Sensor ${id}`, unit: "" };

  // Pass sensorId as parameter for live polling
  return `displayVariable("${blockId}", null, "${metadata.name}", "${metadata.unit}", "${color}", "${bg}", "${pos}", "${id}");\n`;
};

// clear_screen block
javascriptGenerator.forBlock["clear_screen"] = function (block) {
  return `clearScreen();\n`;
};

// clear_screen_slot block
javascriptGenerator.forBlock["clear_screen_slot"] = function (block) {
  const screen = block.getFieldValue("SCREEN") || "center";
  return `clearScreenSlot("${screen}");\n`;
};

javascriptGenerator.forBlock["bar"] = function (block) {
  const color = block.getFieldValue("COLOR") || "#00FF00";
  const steps = block.getFieldValue("STEPS") || "10";
  const pos = block.getFieldValue("POSITION") || "center";
  const blockId = block.id;

  // Basic bar without sensor integration
  return `displayBar("${blockId}", 0, 100, 50, "${color}", ${steps}, "", "", "${pos}");\n`;
};

javascriptGenerator.forBlock["horizontal_bar"] = function (block) {
  const sensorId = block.getFieldValue("SENSOR_ID");
  const min = block.getFieldValue("MIN") || "0";
  const max = block.getFieldValue("MAX") || "100";
  const color = block.getFieldValue("COLOR") || "#00FF00";
  const steps = block.getFieldValue("STEPS") || "10";
  const pos = block.getFieldValue("POSITION") || "center";
  const blockId = block.id;

  // Map sensor IDs to labels and units (updated to match CSV codes)
  const sensorMap = {
    30: { label: "Amb. Temperature", unit: "°C" },
    20: { label: "Light", unit: "lx" },
    2: { label: "pH", unit: "pH" },
  };

  const sensorInfo = sensorMap[sensorId] || {
    label: `Sensor ${sensorId}`,
    unit: "",
  };

  // Pass sensorId as value so component can fetch it live
  // Use a special marker to indicate this should be fetched live
  return `displayBar("${blockId}", ${min}, ${max}, null, "${color}", ${steps}, "${sensorInfo.label}", "${sensorInfo.unit}", "${pos}", "${sensorId}");\n`;
};

/*
javascriptGenerator.forBlock['horizontal_bar'] = function(block) {
  const sensorId = block.getFieldValue('SENSOR');
  //const x = block.getFieldValue('X') || 0;
  const min = block.getFieldValue('MIN') || 0;
  const max = block.getFieldValue('MAX') || 100;
  const color1 = block.getFieldValue('COLOR1') || '#00FF00';
  const color2 = block.getFieldValue('COLOR2') || '#FF0000';
  const width = block.getFieldValue('WIDTH') || 10;

  return `drawBar(${sensorId}, ${min}, ${max}, "${color1}", "${color2}", ${width});\nawait pause(100);\n`;

  //return `drawBar(getSensorValue("${id}"), ${min}, ${max}, "${color1}", "${color2}", ${steps});\n`;
};
*/
