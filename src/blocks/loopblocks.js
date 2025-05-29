import * as Blockly from 'blockly/core';


Blockly.Blocks['delay'] = {
  init: function() {
    this.jsonInit({"message0": "delay for %1 (Ms)", //%{BKY_DELAY_TEXT}
      "args0": [
        {
          "type": "input_value",
          "name": "INPUT",
          "check": "Number"
        },
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#D679B3",
    });
  }
};

Blockly.Blocks['pause'] = {
    init: function() {
      this.jsonInit({
        "message0": "pause for %1 (Ms)",//%{BKY_PAUSE_TEXT} ,
        "args0": [
          {
            "type": "input_value",
            "name": "INPUT",
            "check": "Number"
          },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#D679B3"
      });
    }
};
Blockly.Blocks['forever_loop_clean'] = {
    init: function() {
      this.appendDummyInput()
      .appendField(Blockly.Msg["FOREVER_LOOP_TEXT"]); //"forever"
      this.appendStatementInput("comands")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#D679B3");
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
/*


Blockly.Blocks['break_clean'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg['BREAK_TEXT']) //"break the loop""
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#D679B3");
   this.setTooltip("");
   this.setHelpUrl("");
    }
};

Blockly.Blocks['continue_loop'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg["CONTINUE_TEXT"]) //"continue with next iteration"
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#D679B3");
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

*/