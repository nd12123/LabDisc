// src/logic/display.js

/**
 * Глобальные функции отрисовки для категории "Display"
 * Предполагается, что есть canvas с id="displayCanvas" в DOM
 */

function getDisplayCanvas() {
    let canvas = document.getElementById('displayCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'displayCanvas';
      canvas.width = 620;
      canvas.height = 240;
      canvas.style.border = '1px solid #aaa';
      canvas.style.margin = '10px';
      document.body.appendChild(canvas);
    }
    return canvas;
  }
  
  function getDisplayContext() {
    const canvas = getDisplayCanvas();
    return canvas.getContext('2d');
  }
  
  // Очистка дисплея
  window.clearScreen = function () {
    const ctx = getDisplayContext();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };
  
  // Отображение текста
  window.displayText = function (text, textColor, bgColor, line = 0) {

//console.log("display: ", text, textColor, bgColor, line);
    //const y = lineHeight * line + 16;
    const ctx = getDisplayContext();
  const canvas = ctx.canvas;
  const lineHeight = 28;
  const y = 16;
  const padding = 4;

  // рисуем фон чуть выше и чуть выше строки текста
  ctx.fillStyle = bgColor || '#F8F8F8';
  ctx.fillRect(0, lineHeight * line, canvas.width, lineHeight);

  // рисуем текст
  ctx.fillStyle = textColor || '#000000';
  ctx.font = '16px Outfit, sans-serif';
  ctx.fillText(String(text), padding, y);
  };
  
  
 // src/logic/display_var.js

/**
 * Отображает значение переменной на дисплее с цветами и позицией
 * @param {any} value — значение переменной (число, строка и т.п.)
 * @param {string} textColor — цвет текста (напр. "#000000")
 * @param {string} bgColor — цвет фона (напр. "#ffffff")
 * @param {string|number} position — строка от 0 и выше
 */
window.displayVariable = function(value, textColor, bgColor, position) {
    const ctx = getDisplayContext();
    const canvas = ctx.canvas;
    const lineHeight = 28;
    const line = Number(position) || 0;
    const y = lineHeight * line + 20;
    const padding = 4;
  
    ctx.fillStyle = bgColor || '#FFFFFF';
    ctx.fillRect(0, lineHeight * line, canvas.width, lineHeight);
  
    ctx.fillStyle = textColor || '#000000';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(String(value), padding, y);
  };

// src/logic/draw_bar.js

/**
 * Отрисовывает полоску, поделенную на цветовые сегменты (градиент по шагам)
 * @param {string} color1 — стартовый цвет
 * @param {string} color2 — конечный цвет
 * @param {number} steps — число делений
 */
window.drawBar = function(color1, color2, steps) {
    const x = 20;
    const y = 50;
    const width = 300;
    const height = 50;
    const ctx = getDisplayContext();
  
    // Очистить зону
    ctx.clearRect(x, y, width, height);
  
    // Разбиваем градиент на шаги
    const stepWidth = width / steps;
  
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const r = Math.round(
        (1 - t) * parseInt(color1.slice(1, 3), 16) +
        t * parseInt(color2.slice(1, 3), 16)
      );
      const g = Math.round(
        (1 - t) * parseInt(color1.slice(3, 5), 16) +
        t * parseInt(color2.slice(3, 5), 16)
      );
      const b = Math.round(
        (1 - t) * parseInt(color1.slice(5, 7), 16) +
        t * parseInt(color2.slice(5, 7), 16)
      );
  
      const color = `rgb(${r}, ${g}, ${b})`;
      ctx.fillStyle = color;
      ctx.fillRect(x + i * stepWidth, y, stepWidth + 1, height); // +1 для устранения разрывов
    }
  };
  
  // src/logic/draw_bar.js

/**
 * Отрисовывает полоску с градиентными сегментами и отмечает текущий диапазон сенсора
 * @param {string} color1 — стартовый цвет
 * @param {string} color2 — конечный цвет
 * @param {number} steps — число сегментов
 * @param {number} min — минимальное значение сенсора
 * @param {number} max — максимальное значение сенсора
 */
window.drawHorBar = function(sensorId, min, max, color1, color2, steps) {
    const x = 20;
    const y = 50;
    const width = 300;
    const height = 50;
    const ctx = getDisplayContext();
  
    // Очистить зону
    ctx.clearRect(x, y, width, height);
  
    // Получить значение
    const value = getSensorValue(sensorId);
    const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
    const activeStep = Math.floor(ratio * steps);
  
    // Разбиваем градиент на шаги
    const stepWidth = width / steps;
  
    for (let i = 0; i < steps; i++) {
      let fillColor;
      if (i > activeStep) {
        fillColor = '#DDDDDD';
      } else {
        const t = i / (steps - 1);
        const r = Math.round(
          (1 - t) * parseInt(color1.slice(1, 3), 16) +
          t * parseInt(color2.slice(1, 3), 16)
        );
        const g = Math.round(
          (1 - t) * parseInt(color1.slice(3, 5), 16) +
          t * parseInt(color2.slice(3, 5), 16)
        );
        const b = Math.round(
          (1 - t) * parseInt(color1.slice(5, 7), 16) +
          t * parseInt(color2.slice(5, 7), 16)
        );
        fillColor = `rgb(${r}, ${g}, ${b})`;
      }
      ctx.fillStyle = fillColor;
      ctx.fillRect(x + i * stepWidth, y, stepWidth + 1, height);
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