/**
 * sensorDataParser.js
 * Sensor data parser for LabDisc hardware via Flutter
 * Handles sensor updates with variable sensor counts
 *
 * Format: [NumOfSensors, SensorID1, Value1, SensorID2, Value2, ...]
 * Example: [2, 30, 25, 20, 1500] = 2 sensors: Sensor 30 = 25°C, Sensor 20 = 1500 lx
 *
 * Note: Flutter handles byte conversion, so values come pre-converted from hardware
 */

import { formatSensorValue, formatVariable, getAllSensorIds, SENSOR_META } from './sensorMetadata.js';

/**
 * Parse a sensor data packet from Flutter
 * Flutter handles byte conversion, so we receive decoded values directly
 * @param {Array} data - Array format: [NumOfSensors, SensorID1, Value1, SensorID2, Value2, ...]
 * @returns {object[]} Array of parsed sensor readings: [{sensorId, value, formatted}, ...]
 *
 * Example: parseSensorPacket([2, 30, 25, 20, 1500])
 *   -> Sensor 30: 25°C (Amb. Temperature)
 *   -> Sensor 20: 1500 lx (Light)
 */
function parseSensorPacket(data) {
  if (!data || !Array.isArray(data) || data.length < 1) {
    console.warn('parseSensorPacket: Invalid data format. Expected array [count, id1, val1, ...]');
    return [];
  }

  const readings = [];

  try {
    const count = data[0];

    // Validate packet structure: 1 count + (2 values per sensor: ID + value)
    const expectedLength = 1 + (count * 2);
    if (data.length < expectedLength) {
      console.warn(`parseSensorPacket: Incomplete packet. Expected ${expectedLength} values, got ${data.length}`);
      return readings;
    }

    // Parse each sensor in the packet
    let offset = 1;
    for (let i = 0; i < count; i++) {
      const sensorId = data[offset];
      const rawValue = data[offset + 1];

      // Format the value according to sensor specification
      const formatted = formatSensorValue(sensorId, rawValue);

      readings.push({
        sensorId: sensorId,
        rawValue: rawValue,
        value: formatted.value,
        text: formatted.text,
        unit: formatted.unit,
        name: formatted.name,
        min: formatted.min,
        max: formatted.max,
        decimals: formatted.decimals
      });

      offset += 2; // Move to next sensor (ID + value)
    }

    return readings;
  } catch (error) {
    console.error('parseSensorPacket: Error parsing data', error);
    return [];
  }
}

/**
 * Create a test packet for development/testing
 * @param {object[]} sensors - Array of {sensorId, value} objects
 * @returns {Array} Packet data in Flutter format: [count, id1, val1, id2, val2, ...]
 *
 * Example: createTestPacket([{sensorId: 30, value: 25}, {sensorId: 20, value: 1500}])
 *   -> [2, 30, 25, 20, 1500]
 */
function createTestPacket(sensors) {
  const packet = [sensors.length];

  for (const sensor of sensors) {
    packet.push(sensor.sensorId);
    packet.push(sensor.value);
  }

  return packet;
}

/**
 * Handle incoming sensor data stream
 * This function should be called whenever new sensor data arrives from Flutter
 * @param {Array} data - Sensor data array: [count, id1, val1, id2, val2, ...]
 * @param {function} updateCallback - Callback(sensorId, value, formatted) for each sensor reading
 */
function handleSensorStream(data, updateCallback) {
  const readings = parseSensorPacket(data);

  for (const reading of readings) {
    if (typeof updateCallback === 'function') {
      updateCallback(reading.sensorId, reading.value, reading);
    }

    // Also update window.sensorValues for backward compatibility
    if (!window.sensorValues) {
      window.sensorValues = {};
    }
    window.sensorValues[reading.sensorId] = reading.value;

    // Log for debugging
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Sensor ${reading.sensorId} (${reading.name}): ${reading.text} ${reading.unit}`);
    }
  }

  return readings;
}

/**
 * Initialize sensor data handler in window global
 * Sets up window.handleSensorPacket for runtime use with Flutter
 */
function initializeSensorDataHandler() {
  window.sensorValues = {};

  /**
   * Main function to handle incoming packets from Flutter
   * @param {Array} data - Format: [numSensors, sensorId1, value1, sensorId2, value2, ...]
   * Example: window.handleSensorPacket([2, 30, 25, 20, 1500])
   */
  window.handleSensorPacket = function(data) {
    return handleSensorStream(data, () => {
      // Update displays that reference this sensor
      if (typeof window.updateDisplaySlot === 'function' && window.slotManager) {
        // Find display blocks that reference this sensor and update them
        const slots = window.slotManager.slots;
        for (const blockId in slots) {
          // This will be improved when we wire sensor updates to displays
          // For now, displays poll sensors directly
        }
      }
    });
  };

  // Helper function to get sensor value
  window.getSensorValue = function(sensorId) {
    return window.sensorValues[sensorId] || 0;
  };

  // Helper function to set sensor value (for testing)
  window.setSensorValue = function(sensorId, value) {
    window.sensorValues[sensorId] = value;
  };

  // Export functions to window for Playwright tests and console access
  window.parseSensorPacket = parseSensorPacket;
  window.createTestPacket = createTestPacket;
  window.handleSensorStream = handleSensorStream;
  window.formatVariable = formatVariable;
  window.formatSensorValue = formatSensorValue;
  window.getAllSensorIds = getAllSensorIds;
  window.SENSOR_META = SENSOR_META;
}

export {
  parseSensorPacket,
  createTestPacket,
  handleSensorStream,
  initializeSensorDataHandler
};
