/**
 * Blockly serialization → LogicNode AST converter.
 *
 * Accepts the object returned from:
 * Blockly.serialization.workspaces.save(workspace, { serializeComments: false })
 * and produces LogicNode-shaped JSON that Dart can parse via LogicNode.fromJson.
 *
 * This file replaces the old Blockly Generator approach with a pure data
 * converter so it can be reused without injecting into Blockly namespaces.
 */

// ---- Helpers ---------------------------------------------------------------

const DEFAULT_LITERAL_ZERO = literalNode(0);
const DEFAULT_LITERAL_FALSE = literalNode(false);

function literalNode(value) {
  return { runtimeType: "literal", value };
}

function unaryNode(operator, operand) {
  return { runtimeType: "unaryOp", operator, operand };
}

function binaryNode(operator, left, right) {
  return { runtimeType: "binaryOp", operator, left, right };
}

function blockStatement(body) {
  return { runtimeType: "blockStatement", body };
}

function ensureNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function ensureString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function toReadSensor(block) {
  if (!block || block.type !== "sensor_read") return null;
  const rawId = block.data ?? block.fields?.SENSOR_ID;
  const sensorId = ensureNumber(rawId, 0);
  return { runtimeType: "readSensor", sensorId };
}

// ---- Expression conversion -------------------------------------------------

function blockToExpression(block) {
  if (!block) return DEFAULT_LITERAL_ZERO;
  const type = block.type;

  // Direct sensor reads
  const sensorNode = toReadSensor(block);
  if (sensorNode) return sensorNode;

  switch (type) {
    case "math_number":
      return literalNode(ensureNumber(block.fields?.NUM));
    case "text":
      return literalNode(ensureString(block.fields?.TEXT));
    case "logic_boolean":
      return literalNode(block.fields?.BOOL === "TRUE");
    case "variables_get": {
      const name = block.fields?.VAR?.name || block.fields?.VAR?.id || "item";
      return { runtimeType: "getVariable", name };
    }
    case "math_arithmetic": {
      const left = inputExpr(block, "A", DEFAULT_LITERAL_ZERO);
      const right = inputExpr(block, "B", DEFAULT_LITERAL_ZERO);
      const opMap = {
        ADD: "+",
        MINUS: "-",
        MULTIPLY: "*",
        DIVIDE: "/",
        POWER: "^",
      };
      const operator = opMap[block.fields?.OP] || "+";
      return binaryNode(operator, left, right);
    }
    case "logic_compare": {
      const left = inputExpr(block, "A", DEFAULT_LITERAL_ZERO);
      const right = inputExpr(block, "B", DEFAULT_LITERAL_ZERO);
      const opMap = {
        EQ: "==",
        NEQ: "!=",
        LT: "<",
        LTE: "<=",
        GT: ">",
        GTE: ">=",
      };
      const operator = opMap[block.fields?.OP] || "==";
      return binaryNode(operator, left, right);
    }
    case "logic_operation": {
      const left = inputExpr(block, "A", DEFAULT_LITERAL_FALSE);
      const right = inputExpr(block, "B", DEFAULT_LITERAL_FALSE);
      const operator = block.fields?.OP === "AND" ? "&&" : "||";
      return binaryNode(operator, left, right);
    }
    case "logic_negate": {
      const operand = inputExpr(block, "BOOL", DEFAULT_LITERAL_FALSE);
      return unaryNode("!", operand);
    }
    case "math_single": {
      const operand = inputExpr(block, "NUM", DEFAULT_LITERAL_ZERO);
      const opMap = {
        ROOT: "sqrt",
        ABS: "abs",
        NEG: "-",
        LN: "ln",
        LOG10: "log10",
        EXP: "exp",
        POW10: "pow10",
      };
      const operator = opMap[block.fields?.OP] || "abs";
      return unaryNode(operator, operand);
    }
    case "math_trig": {
      const operand = inputExpr(block, "NUM", DEFAULT_LITERAL_ZERO);
      const operator = ensureString(block.fields?.OP, "sin").toLowerCase();
      return unaryNode(operator, operand);
    }
    case "math_round": {
      const operand = inputExpr(block, "NUM", DEFAULT_LITERAL_ZERO);
      const opMap = { ROUND: "round", ROUNDUP: "ceil", ROUNDDOWN: "floor" };
      const operator = opMap[block.fields?.OP] || "round";
      return unaryNode(operator, operand);
    }
    case "math_modulo": {
      const left = inputExpr(block, "DIVIDEND", DEFAULT_LITERAL_ZERO);
      const right = inputExpr(block, "DIVISOR", literalNode(1));
      return binaryNode("%", left, right);
    }
    case "math_number_property": {
      const numberToCheck = inputExpr(
        block,
        "NUMBER_TO_CHECK",
        DEFAULT_LITERAL_ZERO,
      );
      const property = block.fields?.PROPERTY || "EVEN";
      switch (property) {
        case "EVEN":
          return binaryNode(
            "==",
            binaryNode("%", numberToCheck, literalNode(2)),
            literalNode(0),
          );
        case "ODD":
          return binaryNode(
            "!=",
            binaryNode("%", numberToCheck, literalNode(2)),
            literalNode(0),
          );
        case "PRIME":
          return unaryNode("isPrime", numberToCheck);
        case "WHOLE":
          return binaryNode(
            "==",
            numberToCheck,
            unaryNode("floor", numberToCheck),
          );
        case "POSITIVE":
          return binaryNode(">", numberToCheck, literalNode(0));
        case "NEGATIVE":
          return binaryNode("<", numberToCheck, literalNode(0));
        case "DIVISIBLE_BY": {
          const divisor = inputExpr(block, "DIVISOR", literalNode(1));
          return binaryNode(
            "==",
            binaryNode("%", numberToCheck, divisor),
            literalNode(0),
          );
        }
        default:
          return binaryNode(
            "==",
            binaryNode("%", numberToCheck, literalNode(2)),
            literalNode(0),
          );
      }
    }
    default:
      return DEFAULT_LITERAL_ZERO;
  }
}

function inputExpr(block, inputName, fallback) {
  const inputBlock =
    block.inputs?.[inputName]?.block || block.inputs?.[inputName]?.shadow;
  if (inputBlock) return blockToExpression(inputBlock);
  return fallback;
}

// ---- Statement conversion --------------------------------------------------

function blockToStatements(block) {
  const stmts = [];
  let current = block;
  while (current) {
    const node = blockToStatement(current);
    if (node) stmts.push(node);
    current = current.next?.block || null;
  }
  return stmts;
}

function blockToStatement(block) {
  if (!block) return null;
  switch (block.type) {
    case "controls_if": {
      const condition = inputExpr(block, "IF0", DEFAULT_LITERAL_FALSE);
      const thenBody = statementsFromInput(block, "DO0");
      const elseBody = statementsFromInput(block, "ELSE");
      const node = {
        runtimeType: "ifStatement",
        condition,
        thenBranch: blockStatement(thenBody),
      };
      if (elseBody.length > 0) {
        node.elseBranch = blockStatement(elseBody);
      }
      return node;
    }
    case "forever_loop_clean": {
      const body = statementsFromInput(block, "comands");
      return {
        runtimeType: "whileStatement",
        condition: literalNode(true),
        body: blockStatement(body),
      };
    }
    case "controls_whileUntil": {
      const isUntil = block.fields?.MODE === "UNTIL";
      let condition = inputExpr(block, "BOOL", DEFAULT_LITERAL_FALSE);
      if (isUntil) condition = unaryNode("!", condition);
      const body = statementsFromInput(block, "DO");
      return {
        runtimeType: "whileStatement",
        condition,
        body: blockStatement(body),
      };
    }
    case "controls_repeat_ext": {
      const times = inputExpr(block, "TIMES", literalNode(1));
      const body = statementsFromInput(block, "DO");
      // Repeat N times -> for i from 0 to N-1 step 1
      return {
        runtimeType: "forStatement",
        variableName: `i_${block.id || "0"}`,
        from: literalNode(0),
        to: binaryNode("-", times, literalNode(1)),
        step: literalNode(1),
        body: blockStatement(body),
      };
    }
    case "pause":
    case "delay": {
      const durationMs = inputExpr(block, "INPUT", DEFAULT_LITERAL_ZERO);
      return { runtimeType: "delayNode", durationMs };
    }
    case "delay_seconds": {
      const durationMs = inputExpr(block, "INPUT", DEFAULT_LITERAL_ZERO);
      return {
        runtimeType: "delayNode",
        durationMs: binaryNode("*", durationMs, literalNode(1000)),
      };
    }
    case "variables_set": {
      const name = block.fields?.VAR?.name || block.fields?.VAR?.id || "item";
      const value = inputExpr(block, "VALUE", DEFAULT_LITERAL_ZERO);
      return { runtimeType: "setVariable", name, value };
    }
    case "variables_change": {
      const name = block.fields?.VAR?.name || block.fields?.VAR?.id || "item";
      const changeAmount = inputExpr(block, "VALUE", DEFAULT_LITERAL_ZERO);
      const currentValue = { runtimeType: "getVariable", name };
      return {
        runtimeType: "setVariable",
        name,
        value: binaryNode("+", currentValue, changeAmount),
      };
    }
    case "math_change": {
      const name = block.fields?.VAR?.name || block.fields?.VAR?.id || "item";
      const changeAmount = inputExpr(block, "DELTA", DEFAULT_LITERAL_ZERO);
      const currentValue = { runtimeType: "getVariable", name };
      return {
        runtimeType: "setVariable",
        name,
        value: binaryNode("+", currentValue, changeAmount),
      };
    }
    case "beep": {
      const volume = ensureNumber(block.fields?.VOLUME, 0.5);
      const durationMs = ensureNumber(block.fields?.DURATION, 500);
      return { runtimeType: "soundNode", volume, durationMs };
    }
    case "display_text": {
      return {
        runtimeType: "displayNode",
        displayType: "text",
        text: ensureString(block.fields?.TEXT),
        color: block.fields?.COLOR || "#000000",
        backgroundColor: block.fields?.BG || "#FFFFFF",
        position: block.fields?.POSITION || "top",
      };
    }
    case "display_var": {
      const value = inputExpr(block, "var", DEFAULT_LITERAL_ZERO);
      return {
        runtimeType: "displayNode",
        displayType: "variable",
        value,
        color: block.fields?.COLOR || "#000000",
        backgroundColor: block.fields?.BG || "#FFFFFF",
        position: block.fields?.POSITION || "top",
      };
    }
    case "display_sensor": {
      return {
        runtimeType: "displayNode",
        displayType: "sensor",
        sensorId: ensureString(block.fields?.SENSOR_ID),
        text: ensureString(block.fields?.UNIT),
        color: block.fields?.COLOR || "#000000",
        backgroundColor: block.fields?.BG || "#FFFFFF",
        position: block.fields?.POSITION || "top",
      };
    }
    case "clear_screen": {
      return { runtimeType: "displayNode", displayType: "clear" };
    }
    case "clear_screen_slot": {
      return {
        runtimeType: "displayNode",
        displayType: "clear",
        position: block.fields?.SCREEN || "center",
      };
    }
    case "bar": {
      // Map extra styling onto available fields; steps retained as property.
      const min = ensureNumber(block.fields?.MIN, 0);
      const max = ensureNumber(block.fields?.MAX, 100);
      const value = inputExpr(block, "var", DEFAULT_LITERAL_ZERO);
      return {
        runtimeType: "displayNode",
        displayType: "bar",
        min,
        max,
        value,
        color: block.fields?.COLOR || "#00ff00",
        steps: ensureNumber(block.fields?.STEPS, 10),
        position: block.fields?.POSITION || "center",
      };
    }
    case "horizontal_bar": {
      return {
        runtimeType: "displayNode",
        displayType: "horizontal_bar",
        sensorId: ensureString(block.fields?.SENSOR_ID),
        min: ensureNumber(block.fields?.MIN, 0),
        max: ensureNumber(block.fields?.MAX, 100),
        color: block.fields?.COLOR || "#00ff00",
        steps: ensureNumber(block.fields?.STEPS, 10),
        position: block.fields?.POSITION || "center",
      };
    }
    case "print": {
      const message = inputExpr(block, "TEXT", DEFAULT_LITERAL_ZERO);
      return { runtimeType: "print", message };
    }
    default: {
      // If it's an expression-only block, ignore it at statement level.
      if (isExpressionBlock(block.type)) return null;
      return null;
    }
  }
}

function statementsFromInput(block, inputName) {
  const inputBlock = block.inputs?.[inputName]?.block;
  return inputBlock ? blockToStatements(inputBlock) : [];
}

function isExpressionBlock(type) {
  return [
    "math_number",
    "text",
    "logic_boolean",
    "variables_get",
    "math_arithmetic",
    "logic_compare",
    "logic_operation",
    "logic_negate",
    "math_single",
    "math_trig",
    "math_round",
    "math_modulo",
    "math_number_property",
    "sensor_read",
  ].includes(type);
}

// ---- Public API -----------------------------------------------------------

/**
 * Convert a Blockly serialization object to LogicNode JSON.
 * @param {object|string|null} serialized workspace serialization object or JSON string.
 * @returns {object} LogicNode program JSON (with runtimeType keys).
 */
export function convertSerializedWorkspaceToAst(serialized) {
  if (!serialized) {
    return { runtimeType: "program", body: [] };
  }

  const workspace =
    typeof serialized === "string" ? safeParse(serialized) : serialized;

  const blocksArray = workspace?.blocks?.blocks || [];
  const statements = [];

  for (const block of blocksArray) {
    // Top blocks already contain their chains via `next`
    const stmts = blockToStatements(block);
    statements.push(...stmts);
  }

  return { runtimeType: "program", body: statements };
}

function safeParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.warn("Failed to parse workspace JSON, returning empty program", e);
    return { blocks: { blocks: [] } };
  }
}

export default convertSerializedWorkspaceToAst;
