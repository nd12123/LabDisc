/**
 * sensorDataParser.js
 * Binary data stream parser for Moshe's sensor hardware
 * Handles 2 Hz updates with variable sensor counts
 *
 * Format: [NumOfSensors(1B)][Sensor1_ID(1B)][Sensor1_value(2B)]...[SensorN_ID(1B)][SensorN_value(2B)]
 */

import { formatSensorValue, formatVariable, getAllSensorIds, SENSOR_META } from './sensorMetadata.js';

/**
 * Parse a binary sensor data packet
 * @param {Uint8Array|Buffer} buffer - Binary data buffer
 * @returns {object[]} Array of parsed sensor readings: [{sensorId, value, formatted}, ...]
 */
function parseSensorPacket(buffer) {
  if (!buffer || buffer.length < 1) {
    console.warn('parseSensorPacket: Empty or invalid buffer');
    return [];
  }

  const readings = [];

  try {
    const count = buffer[0];
    let offset = 1;

    // Validate packet structure
    const expectedLength = 1 + (count * 3); // 1 byte count + (3 bytes per sensor: 1 ID + 2 value)
    if (buffer.length < expectedLength) {
      console.warn(`parseSensorPacket: Incomplete packet. Expected ${expectedLength} bytes, got ${buffer.length}`);
      return readings;
    }

    // Parse each sensor in the packet
    for (let i = 0; i < count; i++) {
      const sensorId = buffer[offset];
      const rawValue = (buffer[offset + 1] << 8) | buffer[offset + 2];

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

      offset += 3;
    }

    return readings;
  } catch (error) {
    console.error('parseSensorPacket: Error parsing buffer', error);
    return [];
  }
}

/**
 * Create a test packet for development/testing
 * @param {object[]} sensors - Array of {sensorId, value} objects
 * @returns {Uint8Array} Binary packet data
 */
function createTestPacket(sensors) {
  const buffer = new Uint8Array(1 + (sensors.length * 3));
  buffer[0] = sensors.length;

  let offset = 1;
  for (const sensor of sensors) {
    buffer[offset] = sensor.sensorId;
    buffer[offset + 1] = (sensor.value >> 8) & 0xFF;
    buffer[offset + 2] = sensor.value & 0xFF;
    offset += 3;
  }

  return buffer;
}

/**
 * Handle incoming sensor data stream
 * This function should be called whenever new binary data arrives (2 Hz)
 * @param {Uint8Array|Buffer} buffer - Binary data from hardware
 * @param {function} updateCallback - Callback(sensorId, value, formatted) for each sensor reading
 */
function handleSensorStream(buffer, updateCallback) {
  const readings = parseSensorPacket(buffer);

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
 * Sets up window.handleSensorPacket for runtime use
 */
function initializeSensorDataHandler() {
  window.sensorValues = {};

  // Main function to handle incoming packets
  window.handleSensorPacket = function(buffer) {
    return handleSensorStream(buffer, (sensorId, value, formatted) => {
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
