// src/blocks/input/biochem.js
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

/**
 * ВАЖНО:
 * В твоём рантайме генератор использует getSensorValue(<id>).
 * Ниже — карта ВНУТРЕННИХ id для BioChem. Заполни числами, которые реально
 * возвращает твой мост LabDisc → JS. Я поставил временные значения (TODO),
 * чтобы ты сразу видел структуру (ничего не сломается, просто вернёт не те каналы).
 *
 * Если у тебя есть API типа getSensorValueByCode(<labdisc_code>), его тоже
 * поддержал (см. генератор ниже) — тогда можно не заполнять IDs.
 */
const SENSOR_ID = {
  AMBIENT_TEMP:        101, // TODO: поставить реальный id (°C)
  EXTERNAL_TEMP:       102, // TODO: внешний термосенсор (°C)
  BAROMETER:           103, // TODO: барометр (mBar)
  LIGHT:               104, // TODO: освещённость (lx) — НЕЛИНЕЙНАЯ LUT
  REL_HUMIDITY:        105, // TODO: относительная влажность (%)
  PH:                  106, // TODO: pH (0..14.00)
  CONDUCTIVITY:        107, // TODO: проводимость (mS)
  DISSOLVED_OXYGEN:    108, // TODO: растворённый O2 (mg/L)
  TURBIDITY:           109, // TODO: мутность (NTU)
  THERMOCOUPLE:        110, // TODO: термопара (°C) — negative slope
  HEART_RATE:          111, // TODO: пульс (bpm)
  COLORIMETER_R:       112, // TODO: колориметр — красный канал (a.u.)
  COLORIMETER_G:       113, // TODO: зелёный канал (a.u.)
  COLORIMETER_B:       114, // TODO: синий канал (a.u.)
  GPS_LAT:             115, // опционально: широта (deg)
  GPS_LON:             116, // опционально: долгота (deg)
  GPS_SPEED:           117, // опционально: скорость (m/s или km/h — см. твоё API)
};

// описание блоков для модели BioChem (согласно Excel)
const sensors = [
  { id: SENSOR_ID.AMBIENT_TEMP,     code: 30, name: 'biochem_get_ambient_temp',  label: 'ambient temperature (°C)', unit: '°C' },
  { id: SENSOR_ID.EXTERNAL_TEMP,    code: 13, name: 'biochem_get_external_temp', label: 'external temperature (°C)', unit: '°C' },
  { id: SENSOR_ID.BAROMETER,        code: 4,  name: 'biochem_get_barometer',     label: 'barometer (mBar)', unit: 'mBar' },
  { id: SENSOR_ID.LIGHT,            code: 20, name: 'biochem_get_light',         label: 'light (lx)', unit: 'lx', conversion: 'table' }, // ← LUT (нелинейно)
  { id: SENSOR_ID.REL_HUMIDITY,     code: 41, name: 'biochem_get_rh',            label: 'relative humidity (%)', unit: '%' },
  { id: SENSOR_ID.PH,               code: 2,  name: 'biochem_get_ph',            label: 'pH', unit: 'pH' },
  { id: SENSOR_ID.CONDUCTIVITY,     code: 18, name: 'biochem_get_conductivity',  label: 'conductivity (mS)', unit: 'mS' },
  { id: SENSOR_ID.DISSOLVED_OXYGEN, code: 19, name: 'biochem_get_do',            label: 'dissolved O₂ (mg/L)', unit: 'mg/L' },
  { id: SENSOR_ID.TURBIDITY,        code: 29, name: 'biochem_get_turbidity',     label: 'turbidity (NTU)', unit: 'NTU' },
  { id: SENSOR_ID.THERMOCOUPLE,     code: 42, name: 'biochem_get_thermocouple',  label: 'thermocouple (°C)', unit: '°C' },
  { id: SENSOR_ID.HEART_RATE,       code: 22, name: 'biochem_get_hr',            label: 'heart rate (bpm)', unit: 'bpm' },

  // Колориметр — три отдельных числовых канала:
  { id: SENSOR_ID.COLORIMETER_R,    code: 14, name: 'biochem_get_color_r',       label: 'colorimeter R (a.u.)', unit: 'a.u.' },
  { id: SENSOR_ID.COLORIMETER_G,    code: 14, name: 'biochem_get_color_g',       label: 'colorimeter G (a.u.)', unit: 'a.u.' },
  { id: SENSOR_ID.COLORIMETER_B,    code: 14, name: 'biochem_get_color_b',       label: 'colorimeter B (a.u.)', unit: 'a.u.' },

  // GPS (опционально, если подключён/включён в BioChem)
  // Можно вынести в отдельную категорию, но оставлю как Number-выходы:
  { id: SENSOR_ID.GPS_LAT,          code: 7,  name: 'biochem_get_gps_lat',       label: 'GPS latitude (deg)', unit: '°' },
  { id: SENSOR_ID.GPS_LON,          code: 7,  name: 'biochem_get_gps_lon',       label: 'GPS longitude (deg)', unit: '°' },
  // { id: SENSOR_ID.GPS_SPEED,     code: 7,  name: 'biochem_get_gps_speed',     label: 'GPS speed', unit: 'm/s' }, // если нужно
];

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

  // Генерация JS-кода:
  // 1) если в рантайме есть getSensorValueByCode(<labdisc_code>, <channel?>),
  //    используем его (чтобы не зависеть от внутренних ID).
  // 2) иначе — падаем обратно на getSensorValue(<internal_id>), как у тебя в common.
  javascriptGenerator.forBlock[sensor.name] = function () {
    // Для колориметра R/G/B можно передать "канал" вторым аргументом (0/1/2), если API поддерживает.
    if (typeof globalThis?.getSensorValueByCode === 'function') {
      // простая версия: только по коду
      return [`getSensorValueByCode(${sensor.code}${sensor.name.endsWith('_color_r') ? ',0' : sensor.name.endsWith('_color_g') ? ',1' : sensor.name.endsWith('_color_b') ? ',2' : ''})`, javascriptGenerator.ORDER_ATOMIC];
    }
    return [`getSensorValue(${sensor.id})`, javascriptGenerator.ORDER_ATOMIC];
  };
}

export default sensors;
