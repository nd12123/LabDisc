export const inputBlocksPhysio = {
  kind: 'category',
  name: 'Input',
  colour: '#649FEF',//'#5CA699',
  contents: [
    // твоё текущее содержимое:
    { kind: 'block', type: 'get_temperature' },
    { kind: 'block', type: 'get_light' },
    //{ kind: 'block', type: 'get_ph' },
    //{ kind: 'block', type: 'get_potentiometer' },
    { kind: 'block', type: 'get_current' },
    { kind: 'block', type: 'get_voltage' },
    //{ kind: 'block', type: 'get_light_force' },
    { kind: 'block', type: 'get_distance' },
    { kind: 'block', type: 'get_amb_temp' },
    { kind: 'block', type: 'get_air_pressure' },
    //{ kind: 'block', type: 'get_ir_temperature' }, // (скорее лишний для Physio, но не трогаю)
    { kind: 'block', type: 'physio_get_low_voltage' },

    // ↓↓↓ ДОБАВЛЕНО по спецификации Physio ↓↓↓
    { kind: 'block', type: 'get_barometer' },   // barometer (mBar), code 4
    { kind: 'block', type: 'get_microphone' },  // microphone (V), code 33
    { kind: 'block', type: 'physio_get_accel' },     // acceleration X, code 35 ch0
    //{ kind: 'block', type: 'physio_get_accel_y' },     // acceleration Y, code 35 ch1
    //{ kind: 'block', type: 'physio_get_accel_z' },     // acceleration Z, code 35 ch2
    { kind: 'block', type: 'physio_get_external1' },   // external input 1 (V), code 32
    { kind: 'block', type: 'physio_get_external2' },   // external input 2 (V), code 39
  ]
};
