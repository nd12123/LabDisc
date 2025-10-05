// src/blocks/input/enviro.js
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

/**
 * Внутренние ID — временные (fallback).
 */
const SENSOR_ID = {
  UV: 401,
  IR_TEMPERATURE: 405,
  BAROMETER: 403,

  GPS_LAT: 410,
  GPS_LON: 411,
  GPS_SPEED: 412,
  GPS_COURSE: 413,
  GPS_TIME: 414,

  COLORIMETER_R: 420,
  COLORIMETER_G: 421,
  COLORIMETER_B: 422,

  TURBIDITY: 431,
  DISSOLVED_OXYGEN: 440,
};

function channelFor(name) {
  // GPS
  if (name.endsWith('_gps_lat'))    return 0;
  if (name.endsWith('_gps_lon'))    return 1;
  if (name.endsWith('_gps_speed'))  return 2;
  if (name.endsWith('_gps_course')) return 3;
  if (name.endsWith('_gps_time'))   return 4;
  // Colorimeter
  if (name.endsWith('_color_r')) return 0;
  if (name.endsWith('_color_g')) return 1;
  if (name.endsWith('_color_b')) return 2;
  return null;
}

// Добавляем: UV, IR temp, barometer, GPS x5, colorimeter R/G/B, turbidity, DO
const sensors = [
  { id: SENSOR_ID.UV,              code: 1,  name: 'enviro_get_uv',             label: 'UV index',             unit: ''    },
  { id: SENSOR_ID.IR_TEMPERATURE,  code: 5,  name: 'enviro_get_ir_temperature', label: 'IR temperature (°C)',  unit: '°C'  },
  { id: SENSOR_ID.BAROMETER,       code: 4,  name: 'enviro_get_barometer',      label: 'barometer (mBar)',     unit: 'mBar'},

  // GPS (код 7): 5 каналов
  { id: SENSOR_ID.GPS_LAT,         code: 7,  name: 'enviro_get_gps_lat',        label: 'GPS latitude (°)',     unit: '°'   },
  { id: SENSOR_ID.GPS_LON,         code: 7,  name: 'enviro_get_gps_lon',        label: 'GPS longitude (°)',    unit: '°'   },
  { id: SENSOR_ID.GPS_SPEED,       code: 7,  name: 'enviro_get_gps_speed',      label: 'GPS speed',            unit: ''    },
  { id: SENSOR_ID.GPS_COURSE,      code: 7,  name: 'enviro_get_gps_course',     label: 'GPS course (°)',       unit: '°'   },
  { id: SENSOR_ID.GPS_TIME,        code: 7,  name: 'enviro_get_gps_time',       label: 'GPS time (s)',         unit: 's'   },

  // Colorimeter — три канала (%T)
  { id: SENSOR_ID.COLORIMETER_R,   code: 14, name: 'enviro_get_color_r',        label: 'colorimeter R (%T)',   unit: '%T'  },
  { id: SENSOR_ID.COLORIMETER_G,   code: 14, name: 'enviro_get_color_g',        label: 'colorimeter G (%T)',   unit: '%T'  },
  { id: SENSOR_ID.COLORIMETER_B,   code: 14, name: 'enviro_get_color_b',        label: 'colorimeter B (%T)',   unit: '%T'  },

  { id: SENSOR_ID.TURBIDITY,       code: 31, name: 'enviro_get_turbidity',      label: 'turbidity (NTU)',      unit: 'NTU' },
  { id: SENSOR_ID.DISSOLVED_OXYGEN,code: 40, name: 'enviro_get_do',             label: 'dissolved O₂ (mg/L)',  unit: 'mg/L'},
];

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
  LAT: 410, LON: 411, SPEED: 412, COURSE: 413, TIME: 414
};

Blockly.Blocks['enviro_get_gps'] = {
  init: function () {
    this.jsonInit({
      type: 'enviro_get_gps',
      message0: 'GPS [lat, lon, speed, course, time]',
      output: 'Array',
      colour: 210,
      tooltip: 'Returns [lat°, lon°, speed, course°, time_s]',
      helpUrl: ''
    });
  }
};

javascriptGenerator.forBlock['enviro_get_gps'] = function () {
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
