import * as Blockly from 'blockly/core';


Blockly.Blocks['forever_loop_clean'] = {
    init: function() {
      this.appendDummyInput()
      .appendField("forever"); //""Blockly.Msg["FOREVER_LOOP_TEXT"]
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