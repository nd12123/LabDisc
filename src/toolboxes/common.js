
      export const commonCategories = [
      {
        kind: 'category',
        name: 'Output',
        colour: '#70AA55',
        contents: [
          {
            kind: 'block',
            type: 'display_text'
          },
          {
            kind: 'block',
            type: 'display_var'
          },
          /*
          {
            kind: 'block',
            type: 'display_sensor'
          },
          */
          {
            kind: 'block',
            type: 'horizontal_bar'
          },
          {
            kind: 'block',
            type: 'beep'
          },
          { 
            kind: 'block', 
            type: 'delay' 
          },
          {
            kind: 'block',
            type: 'clear_screen'
          },
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
        custom: 'VARIABLE',
        colour: '#5C81A6',
        /*
        contents: [
          { kind: 'block', type: 'variables_get' },
          { kind: 'block', type: 'variables_set' }
        ]
          */
      },
      {
        kind: 'category',
        name: 'Loops',
        colour: '#5CA65C',
        contents: [ /*{ kind: 'block', type: 'controls_repeat_ext' }, */
          { kind: 'block', type: 'controls_whileUntil' },
          { kind: 'block', type: 'controls_whileUntil' },
          { kind: 'block', type: 'pause' },

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
      }]

      /*
{
        kind: 'category',
        name: 'Input',
        colour: '#649FEF',
        contents: [ //is_button_pressed
          {
            kind: 'block',
            type: 'get_sensor_value'
          }
        ]
      },
      */