// src/theme/blockly_theme.js
import * as Blockly from 'blockly/core';

export const MyOwnDarkTheme = Blockly.Theme.defineTheme('MyOwnDarkTheme', {
  base: Blockly.Themes.Classic,
  'blockStyles': {
    'logic_blocks': {
      'colourPrimary': '#565380'
    },
    'math_blocks': {
        'colourPrimary': '#DD2121',
        //'colourTertiary': '#f3f3f3' //'#808080',
    },
    /* style for math_number only */
    'number_blocks':{
      'colourPrimary': '#f3f3f3',
    //'colourTertiary': '#808080'
    },
    'loop_blocks': {
      'colourPrimary': '#D679B3'
    },
    'variable_blocks': {
      'colourPrimary': "#FF962C"
    },
  /*
  'variable_dynamic_blocks': {
    'colourPrimary': "#FF962C"
  },
  'output_blocks': {
      'colourPrimary': '#569FA8'
    },
  */
},
  componentStyles: {
    flyoutOpacity: 1,
    scrollbarColour:  '#F4DEC8',
    insertionMarkerColour: '#fff',
    insertionMarkerOpacity: 0.3,
    scrollbarOpacity: 1,
    scrollbarThickness: 20,
    cursorColour: '#d0d0d0',
  },
  fontStyle: {
    family: 'Outfit, sans-serif',
    weight: '400'
  }
});

