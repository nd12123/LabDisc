// src/logic/display.js

/**
 * New display system using React component
 * All display functions update the RightOutputPanel through window.updateDisplaySlot
 */

// Ensure slot manager is available (imported in index.js before this file)

// Helper: Get slot for a block and update the panel
function updateSlot(blockId, displayData) {
  if (!window.slotManager) {
    console.error('SlotManager not initialized');
    return;
  }

  const slotIndex = window.slotManager.getSlot(blockId);
  window.slotManager.setSlotContent(slotIndex, displayData);

  if (typeof window.updateDisplaySlot === 'function') {
    window.updateDisplaySlot(slotIndex, displayData);
  }
}

// Очистка дисплея - clears all slots
window.clearScreen = function () {
  if (window.slotManager) {
    window.slotManager.reset();
  }
  if (typeof window.clearOutputPanel === 'function') {
    window.clearOutputPanel();
  }
};
  
/**
 * NEW API: displayText - shows text with custom colors
 * @param {string} blockId - unique identifier for the block (used for slot allocation)
 * @param {string} text - text to display
 * @param {string} textColor - text color (hex color, e.g., #000000)
 * @param {string} bgColor - background color
 * @param {string} position - vertical alignment: 'top', 'center', or 'bottom'
 */
window.displayText = function (blockId, text, textColor, bgColor, position) {
  const displayData = {
    type: 'text',
    text: String(text || ''),
    color: textColor || '#000000',
    bgColor: bgColor || '#ffffff',
    position: position || 'center'
  };
  updateSlot(blockId, displayData);
};

/**
 * NEW API: displayVariable - shows numeric value as meter display
 * Supports live sensor polling for dynamic updates
 * @param {string} blockId - unique identifier for the block
 * @param {number} value - numeric value to display (ignored if sensorId provided)
 * @param {string} label - label/title for the meter
 * @param {string} unit - unit of measurement
 * @param {string} textColor - color for the value text
 * @param {string} bgColor - background color
 * @param {string} position - vertical alignment: 'top', 'center', or 'bottom'
 * @param {string} sensorId - sensor ID for live polling (optional, if provided, value is ignored)
 */
window.displayVariable = function(blockId, value, label, unit, textColor, bgColor, position, sensorId) {
  const displayData = {
    type: 'meter',
    label: String(label || 'Value'),
    value: Number(value) || 0,
    unit: String(unit || ''),
    color: textColor || '#0000ff',
    bgColor: bgColor || '#ffffff',
    position: position || 'center',
    sensorId: sensorId // Store sensor ID for live polling
  };
  updateSlot(blockId, displayData);
};

/**
 * NEW API: displayBar - shows horizontal color bar with gradient
 * Supports live sensor polling for dynamic updates
 * @param {string} blockId - unique identifier for the block
 * @param {number} low - minimum range value
 * @param {number} high - maximum range value
 * @param {number} value - current sensor value (can be a sensor ID string for live polling)
 * @param {string} color1 - start color (hex)
 * @param {string} color2 - end color (hex)
 * @param {number} steps - number of segments
 * @param {string} label - sensor name/label (optional)
 * @param {string} unit - unit of measurement (optional)
 * @param {string} sensorId - sensor ID for live polling (optional, if provided, value is ignored)
 */
window.displayBar = function(blockId, low, high, value, color1, color2, steps, label, unit, sensorId) {
  const displayData = {
    type: 'bar',
    low: Number(low) || 0,
    high: Number(high) || 100,
    value: Number(value) || 0,
    color1: color1 || '#00ff00',
    color2: color2 || '#ff0000',
    steps: Number(steps) || 10,
    label: label || '',
    unit: unit || '',
    sensorId: sensorId // Store sensor ID for live polling
  };
  updateSlot(blockId, displayData);
};

/**
 * DEPRECATED: Old canvas-based bar function (kept for backward compatibility)
 * Use displayBar() instead for new code
 */
window.drawBar = function(color1, color2, steps) {
  console.warn('drawBar() is deprecated. Use displayBar(blockId, low, high, value, color1, color2, steps) instead.');
};

/**
 * DEPRECATED: Old canvas-based horizontal bar (kept for backward compatibility)
 * Use displayBar() instead for new code
 */
window.drawHorBar = function(sensorId, min, max, color1, color2, steps) {
  console.warn('drawHorBar() is deprecated. Use displayBar(blockId, low, high, value, color1, color2, steps) instead.');

  // Fallback: try to get sensor value and display
  if (typeof getSensorValue === 'function') {
    const value = getSensorValue(sensorId);
    window.displayBar(`bar_${sensorId}`, min, max, value, color1, color2, steps);
  }
};
  
  
  /*
  window.clearScreen = function () {
    const el = document.getElementById("outputArea");
    if (el) {
      el.innerHTML = "";
    }
  };
  
  


  window.drawHorizontalBar = function (sensorId, min, max, color1, color2, steps) {
    const val = window.sensorValues?.[sensorId] ?? 0;
    const norm = Math.max(0, Math.min(1, (val - min) / (max - min)));
  
    const mix = (c1, c2, f) => Math.round(c1 + (c2 - c1) * f);
  
    const hexToRgb = hex => {
      const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
      return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [0, 0, 0];
    };
  
    const rgbToHex = ([r, g, b]) =>
      '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const mixed = c1.map((v, i) => mix(v, c2[i], norm));
    const finalColor = rgbToHex(mixed);
  
    // Bar container
    const bar = document.createElement('div');
    bar.style.width = '100%';
    bar.style.height = '30px';
    bar.style.border = '1px solid #ccc';
    bar.style.backgroundColor = '#eee';
    bar.style.margin = '10px 0';
  
    // Bar fill
    const fill = document.createElement('div');
    fill.style.height = '100%';
    fill.style.width = `${norm * 100}%`;
    fill.style.backgroundColor = finalColor;
    fill.style.transition = 'width 0.3s, background-color 0.3s';
  
    bar.appendChild(fill);
  
    const label = document.createElement('div');
    label.textContent = `Sensor ${sensorId}: ${val}`;
    label.style.marginBottom = '5px';
  
    const output = document.getElementById("outputArea");
    output.innerHTML = ''; // Очистка
    output.appendChild(label);
    output.appendChild(bar);
  };

  */