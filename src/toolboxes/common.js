
      export const commonCategories = [
      {
        kind: 'category',
        name: 'Output',
        colour: '#569FA8', //70AA55 E7A900-speaker 649FEF-input D679B3-loops DD2121-math FF962C-vars ("custom": "VAR") 565380-logic
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
            type: 'clear_screen'
          },
          
          { kind: 'block', type: 'pause' },
        ]
      },
      {
        kind: 'category',
        name: 'Logic',
        colour: '#565380',
        contents: [
          { kind: 'block', type: 'controls_if' },
          { kind: 'block', type: 'logic_compare' },
          
      {
        "kind": "block",
        "type": "logic_negate"
      },
      {
        "kind": "block",
        "type": "logic_operation" //default
      },
      {
        "kind":"block",
        "type":"controls_if",
        "extraState":{
          "hasElse":"true"
        },
      },
          //true/false?
        ]
      },
      {
        kind: 'category',
        name: 'Variables',
        custom: 'VARIABLE', //_DYNAMIC
        colour: '#FF962C',//'#5C81A6',
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
        colour: '#D679B3',//'#5CA65C',
        contents: [ /*{ kind: 'block', type: 'controls_repeat_ext' }, */
          { kind: 'block', type: 'controls_whileUntil' },
          //{ kind: 'block', type: 'controls_whileUntil' },
          //break?
          {
            "kind": "block",
            "type": "controls_repeat_ext"
          },
          { 
            kind: 'block', 
            type: 'delay' 
          },
        ]
      },
      {
        kind: 'category',
        name: 'Math',
        colour: '#DD2121',// '#5C68A6',
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