// src/blocks/input/biochem.js
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

/**
 * Генератор в рантайме использует getSensorValue(<id>) (синхронно),
 * но если есть getSensorValueByCode(<labdisc_code>[, channel]),
 * будем вызывать его (без завязки на внутренние id).
 *
 * SENSOR_ID — временные внутренние ID; можно не трогать,
 * если используешь getSensorValueByCode в рантайме.
 */
const SENSOR_ID = {
  AMBIENT_TEMP:        101,
  EXTERNAL_TEMP:       102,
  BAROMETER:           103,
  LIGHT:               104,
  REL_HUMIDITY:        105,
  PH:                  106,
  CONDUCTIVITY:        107,
  DISSOLVED_OXYGEN:    108,
  TURBIDITY:           109,
  THERMOCOUPLE:        110,
  HEART_RATE:          111,
  COLORIMETER_R:       112,
  COLORIMETER_G:       113,
  COLORIMETER_B:       114,
  GPS_LAT:             115,
  GPS_LON:             116,
  GPS_SPEED:           117,
  GPS_COURSE:          118,
  GPS_TIME:            119,
};

// описание блоков для модели BioChem (согласно таблице)
// ⚠️ Исправлены коды: RH=6, DO=40, Conductivity=41, Turbidity=31
// Colorimeter — %T, GPS — 5 каналов
const sensors = [
  { id: SENSOR_ID.AMBIENT_TEMP,     code: 30, name: 'biochem_get_ambient_temp',  label: 'ambient temperature (°C)', unit: '°C' },
  { id: SENSOR_ID.EXTERNAL_TEMP,    code: 13, name: 'biochem_get_external_temp', label: 'external temperature (°C)', unit: '°C' },

  { id: SENSOR_ID.BAROMETER,        code: 4,  name: 'biochem_get_barometer',     label: 'barometer (mBar)', unit: 'mBar' },
  { id: SENSOR_ID.REL_HUMIDITY,     code: 6,  name: 'biochem_get_rh',            label: 'relative humidity (%RH)', unit: '%RH' },
  { id: SENSOR_ID.LIGHT,            code: 20, name: 'biochem_get_light',         label: 'light (lx)', unit: 'lx', conversion: 'table' },

  { id: SENSOR_ID.PH,               code: 2,  name: 'biochem_get_ph',            label: 'pH', unit: 'pH' },
  { id: SENSOR_ID.CONDUCTIVITY,     code: 41, name: 'biochem_get_conductivity',  label: 'conductivity (mS)', unit: 'mS' },
  { id: SENSOR_ID.DISSOLVED_OXYGEN, code: 40, name: 'biochem_get_do',            label: 'dissolved O₂ (mg/L)', unit: 'mg/L' },
  { id: SENSOR_ID.TURBIDITY,        code: 31, name: 'biochem_get_turbidity',     label: 'turbidity (NTU)', unit: 'NTU' },

  { id: SENSOR_ID.THERMOCOUPLE,     code: 42, name: 'biochem_get_thermocouple',  label: 'thermocouple (°C)', unit: '°C' },
  { id: SENSOR_ID.HEART_RATE,       code: 22, name: 'biochem_get_hr',            label: 'heart rate (bpm)', unit: 'bpm' },

  // Колориметр — три отдельных числовых канала (%T):
  { id: SENSOR_ID.COLORIMETER_R,    code: 14, name: 'biochem_get_color_r',       label: 'colorimeter R (%T)', unit: '%T' },
  { id: SENSOR_ID.COLORIMETER_G,    code: 14, name: 'biochem_get_color_g',       label: 'colorimeter G (%T)', unit: '%T' },
  { id: SENSOR_ID.COLORIMETER_B,    code: 14, name: 'biochem_get_color_b',       label: 'colorimeter B (%T)', unit: '%T' },

  // GPS (5 каналов): lat, lon, speed, course, time — код 7
  { id: SENSOR_ID.GPS_LAT,          code: 7,  name: 'biochem_get_gps_lat',       label: 'GPS latitude (°)', unit: '°' },
  { id: SENSOR_ID.GPS_LON,          code: 7,  name: 'biochem_get_gps_lon',       label: 'GPS longitude (°)', unit: '°' },
  { id: SENSOR_ID.GPS_SPEED,        code: 7,  name: 'biochem_get_gps_speed',     label: 'GPS speed', unit: '' },
  { id: SENSOR_ID.GPS_COURSE,       code: 7,  name: 'biochem_get_gps_course',    label: 'GPS course (°)', unit: '°' },
  { id: SENSOR_ID.GPS_TIME,         code: 7,  name: 'biochem_get_gps_time',      label: 'GPS time (s)', unit: 's' },
];

// утилита для определения канала по имени блока (минимально инвазивно)
function channelFor(name) {
  // colorimeter channels
  if (name.endsWith('_color_r')) return 0;
  if (name.endsWith('_color_g')) return 1;
  if (name.endsWith('_color_b')) return 2;
  // GPS channels
  if (name.endsWith('_gps_lat'))    return 0;
  if (name.endsWith('_gps_lon'))    return 1;
  if (name.endsWith('_gps_speed'))  return 2;
  if (name.endsWith('_gps_course')) return 3;
  if (name.endsWith('_gps_time'))   return 4;
  // single-channel sensors
  return null;
}

// Регистрация блоков
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

  // Генерация JS-кода (не ломаем синхронность и текущий API):
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
Blockly.Blocks['biochem_get_gps'] = {
  init: function () {
    this.jsonInit({
      type: 'biochem_get_gps',
      message0: 'GPS [lat, lon, speed, course, time]',
      output: 'Array',
      colour: 210,
      tooltip: 'Returns [lat°, lon°, speed, course°, time_s]',
      helpUrl: ''
    });
  }
};

javascriptGenerator.forBlock['biochem_get_gps'] = function () {
  if (typeof globalThis?.getSensorValueByCode === 'function') {
    return [
      '[getSensorValueByCode(7,0), getSensorValueByCode(7,1), getSensorValueByCode(7,2), getSensorValueByCode(7,3), getSensorValueByCode(7,4)]',
      javascriptGenerator.ORDER_ATOMIC
    ];
  }
  // fallback на внутренние ID, если byCode отсутствует
  return [
    `[getSensorValue(${SENSOR_ID.GPS_LAT}), getSensorValue(${SENSOR_ID.GPS_LON}), getSensorValue(${SENSOR_ID.GPS_SPEED}), getSensorValue(${SENSOR_ID.GPS_COURSE}), getSensorValue(${SENSOR_ID.GPS_TIME})]`,
    javascriptGenerator.ORDER_ATOMIC
  ];
};

export default sensors;
