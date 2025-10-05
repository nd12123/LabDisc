export const inputBlocksGensci = {
  kind: 'category',
  name: 'Input',
  colour: '#649FEF',
  contents: [
    // твои текущие generic-блоки GenSci — оставляй как было (temperature, light, sound, distance, pressure, ...)

    // ↓↓↓ ДОБАВЛЕНО по спецификации GenSci ↓↓↓
    { kind: 'block', type: 'gensci_get_humidity' },  // %RH, code 6

    // GPS (5 каналов), code 7
        { kind: 'block', type: 'biochem_get_gps' },

    { kind: 'block', type: 'gensci_get_microphone' }, // microphone (V), code 33
  ]
};
