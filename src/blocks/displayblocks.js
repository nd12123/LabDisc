import * as Blockly from 'blockly/core';


Blockly.Blocks["display_text"] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 %2 %3", //%{BKY_DISPLAY_TXT}
        "args0": [
          {
            "type": "input_value",
            "name": "text",
            "check": "String"
          },
          {
            "type": "field_dropdown",
            "name": "position",
            "options": [
              [
                "%{BKY_TOP}",
                "xploris.POSITION_TOP"
              ],
              [
                "%{BKY_CENTER}",
                "xploris.POSITION_CENTER"
              ],
              [
                "%{BKY_BOTTOM}",
                "xploris.POSITION_BOTTOM"
              ],
            ]
          },
          {
            "type": "field_colour",
            "name": "colour",
            "colour": '#649FEF',
          },
  
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#70AA55"
      })
    }
  }

  
Blockly.Blocks["display_var"] = {
    init: function() {
      this.jsonInit({
        "message0": "display variable %1 %2 %3", //%{BKY_DISPLAY_VAR}
        "args0": [
          {
            "type": "input_value",
            "name": "var",
            "check": "Number"
          },
          {
            "type": "field_dropdown",
            "name": "position",
            "options": [
              [
                "%{BKY_TOP}",
                "xploris.POSITION_TOP"
              ],
              [
                "%{BKY_CENTER}",
                "xploris.POSITION_CENTER"
              ],
              [
                "%{BKY_BOTTOM}",
                "xploris.POSITION_BOTTOM"
              ],
            ]
          },
          {
            "type": "field_colour",
            "name": "colour",
            "colour": '#649FEF',
          },
  
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#70AA55"
      })
    }
  }