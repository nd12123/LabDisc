export const inputBlocksGensci = {
  kind: 'category',
  name: 'Input',
  colour: '#649FEF',
  contents: [
    // твои текущие generic-блоки GenSci — оставляй как было (temperature, light, sound, distance, pressure, ...)

    // ↓↓↓ ДОБАВЛЕНО по спецификации GenSci ↓↓↓
    { kind: 'block', type: 'get_humidity' },  // %RH, code 6
    { kind: 'block', type: 'get_ph' }, 

    // GPS (5 каналов), code 7
        { kind: 'block', type: 'get_gps' },

            { kind: 'block', type: 'get_humidity' },             // humidity (%RH), code 6
        { kind: 'block', type: 'get_sound_level' }, 
    { kind: 'block', type: 'get_light' }, 
        { kind: 'block', type: 'get_distance' }, 
    { kind: 'block', type: 'get_air_pressure' }, 
    { kind: 'block', type: 'get_voltage' }, 
    { kind: 'block', type: 'get_current' }, 

    { kind: 'block', type: 'gensci_get_microphone' }, // microphone (V), code 33
  ]
};
