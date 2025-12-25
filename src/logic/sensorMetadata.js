/**
 * sensorMetadata.js
 * Sensor specifications from LabDisc Excel file (Range-3 column, decimals per sensor type)
 * All 18 sensors with their properties for formatting and display
 */

/**
 * Sensor metadata lookup table
 * ID -> {name, unit, min (Range-3), max (Range-3), decimals}
 */
const SENSOR_META = {
  1: {
    id: 1,
    name: 'UV',
    unit: 'UV',
    min: 0,
    max: 14,
    decimals: 0,
    scale: 1
  },
  2: {
    id: 2,
    name: 'pH',
    unit: 'pH',
    min: 0,
    max: 14,
    decimals: 2,
    scale: 100
  },
  4: {
    id: 4,
    name: 'Barometer',
    unit: 'mBar',
    min: 500,
    max: 1150,
    decimals: 1,
    scale: 10
  },
  5: {
    id: 5,
    name: 'IR Temperature',
    unit: '°C',
    min: -170,
    max: 380,
    decimals: 1,
    scale: 10
  },
  6: {
    id: 6,
    name: 'Humidity',
    unit: '%RH',
    min: 0,
    max: 100,
    decimals: 1,
    scale: 10
  },
  20: {
    id: 20,
    name: 'Light',
    unit: 'lx',
    min: 0,
    max: 55000,
    decimals: 0,
    scale: 1
  },
  21: {
    id: 21,
    name: 'Sound',
    unit: 'dB',
    min: 54,
    max: 96,
    decimals: 1,
    scale: 10
  },
  25: {
    id: 25,
    name: 'Distance',
    unit: 'm',
    min: 0.4,
    max: 10,
    decimals: 2,
    scale: 100
  },
  26: {
    id: 26,
    name: 'Air Pressure',
    unit: 'kPa',
    min: 0,
    max: 300,
    decimals: 1,
    scale: 10
  },
  27: {
    id: 27,
    name: 'Voltage',
    unit: 'V',
    min: -30,
    max: 30,
    decimals: 2,
    scale: 100
  },
  28: {
    id: 28,
    name: 'Current',
    unit: 'A',
    min: -1,
    max: 1,
    decimals: 3,
    scale: 1000
  },
  30: {
    id: 30,
    name: 'Amb. Temperature',
    unit: '°C',
    min: -10,
    max: 50,
    decimals: 1,
    scale: 10
  },
  34: {
    id: 34,
    name: 'Low Voltage',
    unit: 'mV',
    min: -500,
    max: 500,
    decimals: 1,
    scale: 10
  },
  35: {
    id: 35,
    name: 'Acceleration',
    unit: 'g',
    min: -8,
    max: 8,
    decimals: 3,
    scale: 1000
  },
  40: {
    id: 40,
    name: 'Dissolved Oxygen',
    unit: 'mg/l',
    min: 0,
    max: 14,
    decimals: 2,
    scale: 100
  },
  41: {
    id: 41,
    name: 'Conductivity',
    unit: 'mS',
    min: 0,
    max: 20,
    decimals: 2,
    scale: 100
  },
  42: {
    id: 42,
    name: 'Thermocouple',
    unit: '°C',
    min: -220,
    max: 1350,
    decimals: 1,
    scale: 10
  }
};

/**
 * Format a variable value with at most 2 decimal places
 * Trims trailing zeros
 * @param {number} value - The numeric value to format
 * @returns {string} Formatted value string
 */
function formatVariable(value) {
  const num = Number(value);
  if (isNaN(num)) return '0';
  const fixed = num.toFixed(2);
  return parseFloat(fixed).toString();
}

/**
 * Format a sensor value according to its sensor-specific decimal places
 * @param {number} sensorId - The sensor ID (1-18)
 * @param {number} rawValue - The raw sensor value
 * @returns {object} { value: number, text: string, unit: string, min: number, max: number, name: string, decimals: number }
 */
function formatSensorValue(sensorId, rawValue) {
  const meta = SENSOR_META[sensorId];

  if (!meta) {
    console.warn(`Unknown sensor ID: ${sensorId}`);
    return {
      value: rawValue,
      text: String(rawValue),
      unit: '',
      min: 0,
      max: 100,
      name: `Sensor ${sensorId}`,
      decimals: 1
    };
  }

  // Scale raw value by sensor scale factor (e.g., 253 / 10 = 25.3 for temp)
  const scaleFactor = meta.scale || 1;
  const num = Number(rawValue) / scaleFactor;
  const formatted = num.toFixed(meta.decimals);
  const value = parseFloat(formatted);

  return {
    value: value,
    text: value.toString(),
    unit: meta.unit,
    min: meta.min,
    max: meta.max,
    name: meta.name,
    decimals: meta.decimals,
    sensorId: sensorId
  };
}

/**
 * Get sensor metadata by ID
 * @param {number} sensorId - The sensor ID (1-18)
 * @returns {object} Sensor metadata or null if not found
 */
function getSensorMeta(sensorId) {
  return SENSOR_META[sensorId] || null;
}

/**
 * Get all sensor IDs
 * @returns {number[]} Array of sensor IDs (1-18)
 */
function getAllSensorIds() {
  return Object.keys(SENSOR_META).map(Number);
}

export {
  SENSOR_META,
  formatVariable,
  formatSensorValue,
  getSensorMeta,
  getAllSensorIds
};
