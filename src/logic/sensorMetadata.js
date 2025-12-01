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
    name: 'Ambient Temperature',
    unit: '°C',
    min: -10,
    max: 60,
    decimals: 1,
    scale: 10
  },
  2: {
    id: 2,
    name: 'Light',
    unit: 'lx',
    min: 0,
    max: 2000,
    decimals: 0,
    scale: 1
  },
  3: {
    id: 3,
    name: 'Humidity',
    unit: '%RH',
    min: 0,
    max: 100,
    decimals: 1,
    scale: 10
  },
  4: {
    id: 4,
    name: 'Distance',
    unit: 'm',
    min: 0,
    max: 5,
    decimals: 2,
    scale: 100
  },
  5: {
    id: 5,
    name: 'Sound Level',
    unit: 'dBa',
    min: 50,
    max: 130,
    decimals: 0,
    scale: 1
  },
  6: {
    id: 6,
    name: 'pH',
    unit: '',
    min: 0,
    max: 14,
    decimals: 1,
    scale: 10
  },
  7: {
    id: 7,
    name: 'Air Pressure',
    unit: 'kPa',
    min: 500,
    max: 1100,
    decimals: 0,
    scale: 1
  },
  8: {
    id: 8,
    name: 'Current',
    unit: 'A',
    min: 0,
    max: 3,
    decimals: 2,
    scale: 100
  },
  9: {
    id: 9,
    name: 'Voltage',
    unit: 'V',
    min: 0,
    max: 5,
    decimals: 2,
    scale: 100
  },
  10: {
    id: 10,
    name: 'Barometer',
    unit: 'mB',
    min: 500,
    max: 1100,
    decimals: 0,
    scale: 1
  },
  11: {
    id: 11,
    name: 'Dissolved Oxygen',
    unit: 'mg/l',
    min: 0,
    max: 14,
    decimals: 1,
    scale: 10
  },
  12: {
    id: 12,
    name: 'Conductivity',
    unit: 'ms',
    min: 0,
    max: 2000,
    decimals: 1,
    scale: 10
  },
  13: {
    id: 13,
    name: 'Thermocouple',
    unit: '°C',
    min: -20,
    max: 1000,
    decimals: 1,
    scale: 10
  },
  14: {
    id: 14,
    name: 'Accelerometer (z)',
    unit: 'g',
    min: -5,
    max: 5,
    decimals: 2,
    scale: 100
  },
  15: {
    id: 15,
    name: 'IR Temperature',
    unit: '°C',
    min: -20,
    max: 80,
    decimals: 0,
    scale: 1
  },
  16: {
    id: 16,
    name: 'UV',
    unit: '',
    min: 0,
    max: 100,
    decimals: 0,
    scale: 1
  },
  17: {
    id: 17,
    name: 'UV Index',
    unit: '',
    min: 0,
    max: 20,
    decimals: 0,
    scale: 1
  },
  18: {
    id: 18,
    name: 'Low Voltage',
    unit: 'mV',
    min: 0,
    max: 1000,
    decimals: 2,
    scale: 100
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
