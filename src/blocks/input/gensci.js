// src/blocks/input/gensci.js
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

/**
 * Внутренние ID — временные (для fallback на getSensorValue(id)).
 * Основной путь — getSensorValueByCode(code[, channel]).
 */
const SENSOR_ID = {
  AMBIENT_TEMP: 201,
  EXTERNAL_TEMP: 202,
  LIGHT: 203,
  AIR_PRESSURE_KPA: 204,
  REL_HUMIDITY: 205,
  SOUND_LEVEL_DB: 206,
  MICROPHONE_V: 233,

  GPS_LAT: 210,
  GPS_LON: 211,
  GPS_SPEED: 212,
  GPS_COURSE: 213,
  GPS_TIME: 214,
};


// Набор блоков GenSci (добавлены: humidity, GPS x5, microphone)
const sensors = [
  { id: SENSOR_ID.REL_HUMIDITY,     code: 6,  name: 'gensci_get_humidity',  label: 'relative humidity (%RH)', unit: '%RH' },
  { id: SENSOR_ID.MICROPHONE_V,     code: 33, name: 'gensci_get_microphone',label: 'microphone (V)',         unit: 'V'   },

  // GPS (код 7): 5 каналов
  { id: SENSOR_ID.GPS_LAT,          code: 7,  name: 'gensci_get_gps_lat',   label: 'GPS latitude (°)',       unit: '°'   },
  { id: SENSOR_ID.GPS_LON,          code: 7,  name: 'gensci_get_gps_lon',   label: 'GPS longitude (°)',      unit: '°'   },
  { id: SENSOR_ID.GPS_SPEED,        code: 7,  name: 'gensci_get_gps_speed', label: 'GPS speed',              unit: ''    },
  { id: SENSOR_ID.GPS_COURSE,       code: 7,  name: 'gensci_get_gps_course',label: 'GPS course (°)',         unit: '°'   },
  { id: SENSOR_ID.GPS_TIME,         code: 7,  name: 'gensci_get_gps_time',  label: 'GPS time (s)',           unit: 's'   },
];

// Регистрация
for (const sensor of sensors) {
  Blockly.Blocks[sensor.name] = {
    init: function () {
      this.jsonInit({
        type: sensor.name,
        message0: sensor.label,
        output: 'Number',
        colour: 210,
        tooltip: `Get ${sensor.label}`,
        helpUrl: ''
      });
    }
  };

  javascriptGenerator.forBlock[sensor.name] = function () {
    const ch = channelFor(sensor.name);
    if (typeof globalThis?.getSensorValueByCode === 'function') {
      return [
        ch == null
          ? `getSensorValueByCode(${sensor.code})`
          : `getSensorValueByCode(${sensor.code}, ${ch})`,
        javascriptGenerator.ORDER_ATOMIC
      ];
    }
    return [`getSensorValue(${sensor.id})`, javascriptGenerator.ORDER_ATOMIC];
  };
}

// === GPS unified block: returns [lat, lon, speed, course, time] ===
const SENSOR_ID_GPS = {
  LAT: 210, LON: 211, SPEED: 212, COURSE: 213, TIME: 214
};

Blockly.Blocks['gensci_get_gps'] = {
  init: function () {
    this.jsonInit({
      type: 'gensci_get_gps',
      message0: 'GPS [lat, lon, speed, course, time]',
      output: 'Array',
      colour: 210,
      tooltip: 'Returns [lat°, lon°, speed, course°, time_s]',
      helpUrl: ''
    });
  }
};

javascriptGenerator.forBlock['gensci_get_gps'] = function () {
  if (typeof globalThis?.getSensorValueByCode === 'function') {
    return [
      '[getSensorValueByCode(7,0), getSensorValueByCode(7,1), getSensorValueByCode(7,2), getSensorValueByCode(7,3), getSensorValueByCode(7,4)]',
      javascriptGenerator.ORDER_ATOMIC
    ];
  }
  return [
    `[getSensorValue(${SENSOR_ID_GPS.LAT}), getSensorValue(${SENSOR_ID_GPS.LON}), getSensorValue(${SENSOR_ID_GPS.SPEED}), getSensorValue(${SENSOR_ID_GPS.COURSE}), getSensorValue(${SENSOR_ID_GPS.TIME})]`,
    javascriptGenerator.ORDER_ATOMIC
  ];
};

export default sensors;
