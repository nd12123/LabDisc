// src/toolboxes/input_common.js
export const inputBlocksCommon = {
  kind: 'category',
  name: 'Input',
  colour: '#649FEF',
  contents: [
    { kind: 'block', type: 'get_temperature' }, // ambient temperature (°C)
    { kind: 'block', type: 'get_amb_temp' }, // ambient temperature (°C)
    { kind: 'block', type: 'get_external' }, // ambient temperature (°C)
  ],
};
