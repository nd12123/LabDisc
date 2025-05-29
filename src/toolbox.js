export const toolbox = {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: 'Input',
        colour: '#649FEF',
        contents: [
          {
            kind: 'block',
            type: 'get_sensor_value'
          }
        ]
      },
      {
        kind: 'category',
        name: 'Display',
        colour: '#70AA55',
        contents: [
          {
            kind: 'block',
            type: 'display_text'
          }
        ]
      },
      {
        kind: 'category',
        name: 'Logic',
        colour: '#5C81A6',
        contents: [
          { kind: 'block', type: 'controls_if' },
          { kind: 'block', type: 'logic_compare' }
        ]
      },
      {
        kind: 'category',
        name: 'Variables',
        colour: '#5C81A6',
        contents: [
          //{ kind: 'block', type: 'variables_get' },
          //{ kind: 'block', type: 'variables_set' }
        ]
      },
      {
        kind: 'category',
        name: 'Loops',
        colour: '#5CA65C',
        contents: [ /*{ kind: 'block', type: 'controls_repeat_ext' }, */
          { kind: 'block', type: 'controls_whileUntil' },
          { kind: 'block', type: 'controls_whileUntil' },
          { kind: 'block', type: 'pause' },
          { kind: 'block', type: 'delay' },

        ]
      },
      {
        kind: 'category',
        name: 'Math',
        colour: '#5C68A6',
        contents: [
          { kind: 'block', type: 'math_number' },
          { kind: 'block', type: 'math_arithmetic' },
          {
            kind:"block",
            type:"math_arithmetic",
          },
          {
            kind:"block",
            type:"math_single",
          },
          {
            kind:"block",
            type:"math_number_property",
          },
          {
            kind:"block",
            type:"math_round",
          },
          /*
          {
            "kind":"block",
            "type":"math_modulo",
          },
          */
        ]
      }
    ]
  };