/**
 * sensorDataParser.test.js
 * Test suite for sensor data parsing and formatting
 *
 * Usage: Import and run these test functions in the browser console
 */

import { parseSensorPacket, createTestPacket, handleSensorStream } from './sensorDataParser.js';
import { formatVariable, formatSensorValue, SENSOR_META } from './sensorMetadata.js';

/**
 * Test 1: Format variable with 2 decimal places
 */
function testFormatVariable() {
  console.log('=== Test: formatVariable ===');

  const testCases = [
    { input: 3.14159, expected: '3.14' },
    { input: 100, expected: '100' },
    { input: 45.5, expected: '45.5' },
    { input: 0.005, expected: '0.01' },
    { input: -12.999, expected: '-13' },
  ];

  testCases.forEach(({ input, expected }) => {
    const result = formatVariable(input);
    const pass = result === expected;
    console.log(`  ${pass ? '✓' : '✗'} formatVariable(${input}) = "${result}" (expected: "${expected}")`);
  });
}

/**
 * Test 2: Format sensor value with sensor-specific decimals
 */
function testFormatSensorValue() {
  console.log('\n=== Test: formatSensorValue ===');

  const testCases = [
    // Sensor 1: Temperature (1 decimal)
    { sensorId: 1, value: 253, expected: { text: '25.3', decimals: 1 } },
    // Sensor 2: Light (0 decimals)
    { sensorId: 2, value: 1500, expected: { text: '1500', decimals: 0 } },
    // Sensor 4: Distance (2 decimals)
    { sensorId: 4, value: 312, expected: { text: '3.12', decimals: 2 } },
    // Sensor 8: Current (2 decimals)
    { sensorId: 8, value: 157, expected: { text: '1.57', decimals: 2 } },
  ];

  testCases.forEach(({ sensorId, value, expected }) => {
    const result = formatSensorValue(sensorId, value);
    const pass = result.text === expected.text && result.decimals === expected.decimals;
    console.log(`  ${pass ? '✓' : '✗'} Sensor ${sensorId}: ${value} → "${result.text}" (decimals: ${result.decimals})`);
  });
}

/**
 * Test 3: Create and parse test packet
 */
function testPacketCreationAndParsing() {
  console.log('\n=== Test: Packet Creation and Parsing ===');

  const sensors = [
    { sensorId: 1, value: 253 },    // Temp: 25.3°C
    { sensorId: 2, value: 1500 },   // Light: 1500lx
    { sensorId: 8, value: 157 },    // Current: 1.57A
  ];

  const packet = createTestPacket(sensors);
  console.log(`  Created packet (${packet.length} bytes):`, Array.from(packet).map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' '));

  const parsed = parseSensorPacket(packet);
  console.log(`  Parsed ${parsed.length} sensors:`);
  parsed.forEach(reading => {
    console.log(`    - Sensor ${reading.sensorId} (${reading.name}): ${reading.text} ${reading.unit}`);
  });

  const correctCount = parsed.length === sensors.length;
  console.log(`  ${correctCount ? '✓' : '✗'} Correct number of sensors parsed`);
}

/**
 * Test 4: Multiple packets
 */
function testMultiplePackets() {
  console.log('\n=== Test: Multiple Packets ===');

  const packets = [
    { sensors: [{ sensorId: 1, value: 220 }, { sensorId: 3, value: 550 }], label: '22°C, 55% RH' },
    { sensors: [{ sensorId: 5, value: 850 }], label: '85 dBa' },
    { sensors: [{ sensorId: 1, value: 251 }, { sensorId: 2, value: 2000 }, { sensorId: 4, value: 312 }], label: '25.1°C, 2000lx, 3.12m' },
  ];

  packets.forEach(({ sensors, label }) => {
    const packet = createTestPacket(sensors);
    const parsed = parseSensorPacket(packet);
    console.log(`  [${label}]`);
    parsed.forEach(r => console.log(`    → ${r.name}: ${r.text} ${r.unit}`));
  });
}

/**
 * Test 5: Sensor metadata completeness
 */
function testSensorMetadata() {
  console.log('\n=== Test: Sensor Metadata ===');

  const allIds = Object.keys(SENSOR_META).map(Number).sort((a, b) => a - b);
  console.log(`  Total sensors defined: ${allIds.length}`);
  console.log(`  IDs: ${allIds.join(', ')}`);

  let hasErrors = false;
  allIds.forEach(id => {
    const meta = SENSOR_META[id];
    const hasAllProps = meta.name && meta.unit !== undefined && meta.min !== undefined && meta.max !== undefined && meta.decimals !== undefined;
    if (!hasAllProps) {
      console.log(`  ✗ Sensor ${id} is missing properties`);
      hasErrors = true;
    }
  });

  if (!hasErrors) {
    console.log(`  ✓ All sensors have complete metadata`);
  }
}

/**
 * Test 6: Needle position calculation
 */
function testNeedlePositioning() {
  console.log('\n=== Test: Needle Position Calculation ===');

  const testCases = [
    { low: 0, high: 100, value: 0, expected: 0 },
    { low: 0, high: 100, value: 50, expected: 50 },
    { low: 0, high: 100, value: 100, expected: 100 },
    { low: -10, high: 60, value: 25, expected: 58.33 },
    { low: 0, high: 5, value: 2.5, expected: 50 },
    { low: 50, high: 130, value: 90, expected: 51.61 },
  ];

  testCases.forEach(({ low, high, value, expected }) => {
    const position = Math.max(0, Math.min(100, ((value - low) / (high - low)) * 100));
    const actual = parseFloat(position.toFixed(2));
    const expectedRounded = parseFloat(expected.toFixed(2));
    const pass = actual === expectedRounded;
    console.log(`  ${pass ? '✓' : '✗'} Range [${low}, ${high}], value ${value} → ${actual}% (expected: ${expectedRounded}%)`);
  });
}

/**
 * Run all tests
 */
function runAllTests() {
  console.clear();
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║  SENSOR DATA PARSER & FORMATTING TEST SUITE   ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  testFormatVariable();
  testFormatSensorValue();
  testPacketCreationAndParsing();
  testMultiplePackets();
  testSensorMetadata();
  testNeedlePositioning();

  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║  TESTS COMPLETE                               ║');
  console.log('╚════════════════════════════════════════════════╝');
}

// Export for use in browser console
export {
  testFormatVariable,
  testFormatSensorValue,
  testPacketCreationAndParsing,
  testMultiplePackets,
  testSensorMetadata,
  testNeedlePositioning,
  runAllTests
};

// Also make available globally
if (typeof window !== 'undefined') {
  window.testSensorParser = {
    formatVariable: testFormatVariable,
    formatSensor: testFormatSensorValue,
    packets: testPacketCreationAndParsing,
    multiplePackets: testMultiplePackets,
    metadata: testSensorMetadata,
    needle: testNeedlePositioning,
    runAll: runAllTests
  };
}
