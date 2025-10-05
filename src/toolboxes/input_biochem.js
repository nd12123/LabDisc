export const inputBlocksBioChem = {
  kind: 'category',
  name: 'Input',
  colour: '#649FEF',
  contents: [
    // если у тебя были generic-блоки — можешь оставить здесь;
    // я просто добавляю «правильные» для BioChem, включая ambient/external temp и light:

    // ↓↓↓ ДОБАВЛЕНО по спецификации BioChem ↓↓↓
    { kind: 'block', type: 'get_ambient_temperature' },   // ambient temperature (°C), code 30 -common!
    { kind: 'block', type: 'get_external_temperature' },  // external temperature (°C), code 13 -common!
    { kind: 'block', type: 'get_light' },          // light (lx, LUT), code 20

    { kind: 'block', type: 'get_barometer' },      // barometer (mBar), code 4
    { kind: 'block', type: 'get_humidity' },             // humidity (%RH), code 6

        { kind: 'block', type: 'get_ph' }, 

    // GPS (5 каналов), code 7
    { kind: 'block', type: 'get_gps' },

    // Colorimeter (R/G/B), code 14
    { kind: 'block', type: 'get_color' }, 
    //{ kind: 'block', type: 'biochem_get_color_r' },
    //{ kind: 'block', type: 'biochem_get_color_g' },
    //{ kind: 'block', type: 'biochem_get_color_b' },

    { kind: 'block', type: 'get_air_pressure' }, 

    { kind: 'block', type: 'biochem_get_hr' },             // heart rate (bpm), code 22
    { kind: 'block', type: 'get_turbidity' },      // turbidity (NTU), code 31
    { kind: 'block', type: 'get_do' },             // dissolved O₂ (mg/L), code 40
    { kind: 'block', type: 'get_conductivity' },   // conductivity (mS), code 41
    { kind: 'block', type: 'biochem_get_thermocouple' },   // thermocouple (°C), code 42
    //add external sensor 1 -common!
  ]
};
