export const inputBlocksEnviro = {
  kind: 'category',
  name: 'Input',
  colour: '#649FEF',
  contents: [
    // твои текущие generic-блоки Enviro — оставляй; добавляю нужные сенсоры:

    // ↓↓↓ ДОБАВЛЕНО по спецификации Enviro ↓↓↓
    { kind: 'block', type: 'enviro_get_uv' },               // UV index, code 1
    { kind: 'block', type: 'enviro_get_ir_temperature' },   // IR temperature (°C), code 5
    { kind: 'block', type: 'enviro_get_barometer' },        // barometer (mBar), code 4
    { kind: 'block', type: 'get_ph' }, 

    // GPS (5 каналов), code 7
        { kind: 'block', type: 'get_gps' },

    // Colorimeter (R/G/B), code 14
     { kind: 'block', type: 'get_color' }, 

    { kind: 'block', type: 'get_sound_level' }, 


    { kind: 'block', type: 'get_humidity' },             // humidity (%RH), code 6

    { kind: 'block', type: 'enviro_get_turbidity' },        // NTU, code 31
    { kind: 'block', type: 'enviro_get_do' },               // dissolved O₂ (mg/L), code 40
  ]
};
