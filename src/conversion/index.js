// src/conversion/index.js

export function convertLinear(raw, [dMin, vMin], [dMax, vMax]) {
  const k = (vMax - vMin) / (dMax - dMin);
  return vMin + k * (raw - dMin);
}

export function convertTable(raw, lut) {
  if (!lut?.length) return null;
  if (raw <= lut[0][0]) return lut[0][1];
  if (raw >= lut[lut.length - 1][0]) return lut[lut.length - 1][1];
  let lo = 0, hi = lut.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (lut[mid][0] <= raw) lo = mid; else hi = mid;
  }
  const [x1, y1] = lut[lo];
  const [x2, y2] = lut[hi];
  return y1 + (y2 - y1) * ((raw - x1) / (x2 - x1));
}

// Временная LUT для Light (заменишь на заводскую при появлении)
export const LIGHT_LUT = [
  [0, 0],
  [4096, 5],
  [8192, 20],
  [16384, 120],
  [24576, 500],
  [32768, 2000],
  [40960, 7000],
  [49152, 16000],
  [57344, 35000],
  [65535, 55000],
];

export const converters = {
  // Встроенные
  light: (raw) => convertTable(raw, LIGHT_LUT),                        // lx (нелинейно)
  barometer: (raw) => raw / 10,                                        // mBar
  ph: (raw) => convertLinear(raw, [0x0000, 0.00], [0x0578, 14.00]),    // pH
  conductivity: (raw) => convertLinear(raw, [0x0000, 0.0], [0x07D0, 20.0]), // mS
  dissolved_o2: (raw) => convertLinear(raw, [0x0000, 0.0], [0x03E8, 20.0]), // mg/L (пример)
  turbidity: (raw) => convertLinear(raw, [0x0064, 10.0], [0x38A4, 1450.0]), // NTU
  temperature: (raw) => convertLinear(raw, [0xFF9C, -10.0], [0x1388, 50.0]),// °C (ambient пример)
  low_voltage_mv: (raw) => {                                           // мВ для ±0.5 V
    const MIN = 0x3B3B;   // -500 mV
    const MAX = 0xC4C5;   // +500 mV
    const MID = 0x8000;   // 0 mV
    const scale = 1000.0 / (MAX - MIN);
    return (raw - MID) * scale;
  },
};
