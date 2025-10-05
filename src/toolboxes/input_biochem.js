export const inputBlocksBioChem = {
  kind: 'category',
  name: 'Input',
  colour: '#649FEF',
  contents: [
    // если у тебя были generic-блоки — можешь оставить здесь;
    // я просто добавляю «правильные» для BioChem, включая ambient/external temp и light:

    // ↓↓↓ ДОБАВЛЕНО по спецификации BioChem ↓↓↓
    { kind: 'block', type: 'biochem_get_ambient_temp' },   // ambient temperature (°C), code 30
    { kind: 'block', type: 'biochem_get_external_temp' },  // external temperature (°C), code 13
    { kind: 'block', type: 'biochem_get_light' },          // light (lx, LUT), code 20

    { kind: 'block', type: 'biochem_get_barometer' },      // barometer (mBar), code 4
    { kind: 'block', type: 'biochem_get_rh' },             // humidity (%RH), code 6

    // GPS (5 каналов), code 7
    { kind: 'block', type: 'biochem_get_gps' },

    // Colorimeter (R/G/B), code 14
    { kind: 'block', type: 'biochem_get_color_r' },
    { kind: 'block', type: 'biochem_get_color_g' },
    { kind: 'block', type: 'biochem_get_color_b' },

    { kind: 'block', type: 'biochem_get_hr' },             // heart rate (bpm), code 22
    { kind: 'block', type: 'biochem_get_turbidity' },      // turbidity (NTU), code 31
    { kind: 'block', type: 'biochem_get_do' },             // dissolved O₂ (mg/L), code 40
    { kind: 'block', type: 'biochem_get_conductivity' },   // conductivity (mS), code 41
    { kind: 'block', type: 'biochem_get_thermocouple' },   // thermocouple (°C), code 42
  ]
};
