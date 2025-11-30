// src/generators/output.js
import { javascriptGenerator } from 'blockly/javascript';

// pause block
javascriptGenerator.forBlock['pause'] = function(block) {
  const delay = javascriptGenerator.valueToCode(block, 'INPUT', javascriptGenerator.ORDER_NONE) || '0';
  return `await pause(${delay});\n`;
};

// beep block
javascriptGenerator.forBlock['beep'] = function(block) {
  const volume = block.getFieldValue('VOLUME');
  const duration = block.getFieldValue('DURATION');
  return `playBeep(${volume}, ${duration});\n`;
};

// display_text block
javascriptGenerator.forBlock['display_text'] = function(block) {
  const text = block.getFieldValue('TEXT');
  const color = block.getFieldValue('COLOR');
  const bg = block.getFieldValue('BG');
  const pos = block.getFieldValue('POSITION') || 'center';
  const blockId = block.id;
  return `displayText("${blockId}", "${text}", "${color}", "${bg}", "${pos}");\n`;
};

// display_var block
javascriptGenerator.forBlock['display_var'] = function(block) {
  const variable = javascriptGenerator.valueToCode(block, 'var', javascriptGenerator.ORDER_NONE) || '0';
  const color = block.getFieldValue('COLOR');
  const bg = block.getFieldValue('BG');
  const pos = block.getFieldValue('POSITION') || 'center';
  const blockId = block.id;

  // Check if input is a sensor block - if so, extract sensor ID for live polling
  const inputBlock = block.getInputTargetBlock('var');
  let sensorId = null;

  if (inputBlock) {
    const blockType = inputBlock.type;

    // Map sensor block types to their internal sensor IDs
    // Comprehensive mapping covering all models: common, physio, biochem, enviro, gensci
    const sensorMap = {
      // Common blocks (all models)
      'get_ambient_temperature': '1',
      'get_temperature': '1',        // alias
      'get_amb_temp': '1',           // alias
      'get_light': '2',
      'get_ph': '3',
      'get_external_temperature': '12',
      'get_external': '12',          // alias
      'get_barometer': '14',
      'get_humidity': '15',
      'get_sound_level': '9',
      'get_distance': '18',
      'get_air_pressure': '11',
      'get_voltage': '6',
      'get_current': '5',
      'get_external1': '32',
      'get_microphone': '33',
      'get_do': '40',
      'get_turbidity': '31',
      'get_conductivity': '41',

      // Physio-specific blocks
      'physio_get_low_voltage': '316',
      'physio_get_external1': '321',
      'physio_get_external2': '391',

      // BioChem-specific blocks
      'biochem_get_hr': '111',
      'biochem_get_thermocouple': '110',

      // Enviro-specific blocks
      'enviro_get_uv': '401',
      'enviro_get_ir_temperature': '405',
      'enviro_get_barometer': '403',
      'enviro_get_gps_lat': '410',
      'enviro_get_gps_lon': '411',
      'enviro_get_gps_speed': '412',
      'enviro_get_gps_course': '413',
      'enviro_get_gps_time': '414',
      'enviro_get_color_r': '420',
      'enviro_get_color_g': '421',
      'enviro_get_color_b': '422',
      'enviro_get_turbidity': '431',
      'enviro_get_do': '440',

      // GenSci-specific blocks
      'gensci_get_humidity': '205',
      'gensci_get_microphone': '233',
      'gensci_get_gps_lat': '210',
      'gensci_get_gps_lon': '211',
      'gensci_get_gps_speed': '212',
      'gensci_get_gps_course': '213',
      'gensci_get_gps_time': '214'
    };

    sensorId = sensorMap[blockType];
  }

  // If sensor detected, pass sensorId for live polling; otherwise pass captured value
  if (sensorId) {
    // Get sensor name and unit from the sensor block for better display
    const sensorNames = {
      '1': ['Temperature', '°C'],
      '2': ['Light', 'lx'],
      '3': ['pH', 'pH'],
      '5': ['Current', 'mA'],
      '6': ['Voltage', 'V'],
      '9': ['Sound Level', 'dB'],
      '11': ['Air Pressure', 'kPa'],
      '12': ['External Temp', '°C'],
      '14': ['Barometer', 'mBar'],
      '15': ['Humidity', '%'],
      '18': ['Distance', 'm'],
      '31': ['Turbidity', 'NTU'],
      '32': ['External Input 1', 'V'],
      '33': ['Microphone', 'V'],
      '40': ['Dissolved O₂', 'mg/L'],
      '41': ['Conductivity', 'mS'],
      '110': ['Thermocouple', '°C'],
      '111': ['Heart Rate', 'bpm'],
      '316': ['Low Voltage', 'V'],
      '321': ['External 1', 'V'],
      '391': ['External 2', 'V'],
      '401': ['UV Index', ''],
      '403': ['Barometer', 'mBar'],
      '405': ['IR Temp', '°C'],
      '410': ['GPS Lat', '°'],
      '411': ['GPS Lon', '°'],
      '412': ['GPS Speed', ''],
      '413': ['GPS Course', '°'],
      '414': ['GPS Time', 's'],
      '420': ['Color R', '%T'],
      '421': ['Color G', '%T'],
      '422': ['Color B', '%T'],
      '431': ['Turbidity', 'NTU'],
      '440': ['Dissolved O₂', 'mg/L']
    };
    const [sensorName, sensorUnit] = sensorNames[sensorId] || ['Sensor ' + sensorId, ''];
    return `displayVariable("${blockId}", null, "${sensorName}", "${sensorUnit}", "${color}", "${bg}", "${pos}", "${sensorId}");\n`;
  } else {
    return `displayVariable("${blockId}", ${variable}, "Value", "", "${color}", "${bg}", "${pos}");\n`;
  }
};

// display_sensor block
javascriptGenerator.forBlock['display_sensor'] = function(block) {
  const id = block.getFieldValue('SENSOR_ID');
  const color = block.getFieldValue('COLOR');
  const bg = block.getFieldValue('BG');
  const pos = block.getFieldValue('POSITION') || 'center';
  const blockId = block.id;

  // Map sensor IDs to their names and units
  const sensorMetadata = {
    '1': { name: 'Temperature', unit: '°C' },
    '2': { name: 'Light', unit: 'lx' },
    '3': { name: 'pH', unit: 'pH' },
    '5': { name: 'Current', unit: 'mA' },
    '6': { name: 'Voltage', unit: 'V' },
    '9': { name: 'Sound Level', unit: 'dB' },
    '11': { name: 'Air Pressure', unit: 'kPa' },
    '12': { name: 'External Temp', unit: '°C' },
    '14': { name: 'Barometer', unit: 'mBar' },
    '15': { name: 'Humidity', unit: '%' },
    '18': { name: 'Distance', unit: 'm' },
    '31': { name: 'Turbidity', unit: 'NTU' },
    '32': { name: 'External Input 1', unit: 'V' },
    '33': { name: 'Microphone', unit: 'V' },
    '40': { name: 'Dissolved O₂', unit: 'mg/L' },
    '41': { name: 'Conductivity', unit: 'mS' },
    '110': { name: 'Thermocouple', unit: '°C' },
    '111': { name: 'Heart Rate', unit: 'bpm' },
    '205': { name: 'Humidity', unit: '%' },
    '210': { name: 'GPS Lat', unit: '°' },
    '211': { name: 'GPS Lon', unit: '°' },
    '212': { name: 'GPS Speed', unit: 'km/h' },
    '213': { name: 'GPS Course', unit: '°' },
    '214': { name: 'GPS Time', unit: 's' },
    '233': { name: 'Microphone', unit: 'V' },
    '316': { name: 'Low Voltage', unit: 'V' },
    '321': { name: 'External 1', unit: 'V' },
    '391': { name: 'External 2', unit: 'V' },
    '401': { name: 'UV Index', unit: '' },
    '403': { name: 'Barometer', unit: 'mBar' },
    '405': { name: 'IR Temp', unit: '°C' },
    '410': { name: 'GPS Lat', unit: '°' },
    '411': { name: 'GPS Lon', unit: '°' },
    '412': { name: 'GPS Speed', unit: 'km/h' },
    '413': { name: 'GPS Course', unit: '°' },
    '414': { name: 'GPS Time', unit: 's' },
    '420': { name: 'Color R', unit: '%T' },
    '421': { name: 'Color G', unit: '%T' },
    '422': { name: 'Color B', unit: '%T' },
    '431': { name: 'Turbidity', unit: 'NTU' },
    '440': { name: 'Dissolved O₂', unit: 'mg/L' }
  };

  const metadata = sensorMetadata[id] || { name: `Sensor ${id}`, unit: '' };

  // Pass sensorId as parameter for live polling
  return `displayVariable("${blockId}", null, "${metadata.name}", "${metadata.unit}", "${color}", "${bg}", "${pos}", "${id}");\n`;
};

// clear_screen block
javascriptGenerator.forBlock['clear_screen'] = function(block) {
  return `clearScreen();\n`;
};

// clear_screen_slot block
javascriptGenerator.forBlock['clear_screen_slot'] = function(block) {
  const screen = block.getFieldValue('SCREEN') || 'center';
  return `clearScreenSlot("${screen}");\n`;
};


javascriptGenerator.forBlock['bar'] = function(block) {
  const color1 = block.getFieldValue('COLOR1') || '#00FF00';
  const color2 = block.getFieldValue('COLOR2') || '#0000FF';
  const steps = block.getFieldValue('STEPS') || '10';
  const pos = block.getFieldValue('POSITION') || 'center';
  const blockId = block.id;

  // Basic bar without sensor integration
  return `displayBar("${blockId}", 0, 100, 50, "${color1}", "${color2}", ${steps}, "", "", "${pos}");\n`;
};

javascriptGenerator.forBlock['horizontal_bar'] = function(block) {
  const sensorId = block.getFieldValue('SENSOR_ID');
  const min = block.getFieldValue('MIN') || '0';
  const max = block.getFieldValue('MAX') || '100';
  const color1 = block.getFieldValue('COLOR1') || '#00FF00';
  const color2 = block.getFieldValue('COLOR2') || '#0000FF';
  const steps = block.getFieldValue('STEPS') || '10';
  const pos = block.getFieldValue('POSITION') || 'center';
  const blockId = block.id;

  // Map sensor IDs to labels and units
  const sensorMap = {
    '1': { label: 'Temperature', unit: '°C' },
    '2': { label: 'Light', unit: 'lx' },
    '3': { label: 'pH', unit: 'pH' }
  };

  const sensorInfo = sensorMap[sensorId] || { label: `Sensor ${sensorId}`, unit: '' };

  // Pass sensorId as value so component can fetch it live
  // Use a special marker to indicate this should be fetched live
  return `displayBar("${blockId}", ${min}, ${max}, null, "${color1}", "${color2}", ${steps}, "${sensorInfo.label}", "${sensorInfo.unit}", "${pos}", "${sensorId}");\n`;
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