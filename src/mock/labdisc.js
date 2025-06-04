// src/mock/labdisc.js

const mockSensorData = {
    '1': () => (20 + Math.random() * 10).toFixed(1),   // Temperature
    '2': () => (500 + Math.random() * 300).toFixed(0), // Light
    '3': () => (6 + Math.random()).toFixed(2),         // pH
    '4': () => (400 + Math.random() * 200).toFixed(0), // CO2 (если будет)
  };
  
  export function getSensorValue(id) {
    if (mockSensorData[id]) {
      return mockSensorData[id]();
    }
    return 0;
  }
  