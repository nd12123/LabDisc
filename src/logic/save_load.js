// src/logic/save_load.js

/**
 * Модуль: save_load.js
 * Содержит функции для сохранения и загрузки рабочего пространства Blockly как JSON.
 * Экспортирует initSaveLoad(workspace), которую нужно вызвать из index.js после инициализации workspace.
 */

// ------------------------------------------------------------------
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ------------------------------------------------------------------

/**
 * Сохраняет текущее состояние workspace в JSON и предлагает скачать файл project.json
 * Uses window.workspace instead of taking it as a parameter
 */
function saveWorkspaceToFile() {
    // 1. "Сериализуем" workspace в JS-объект
// Новая строка: отключаем комментарии, задаём options.serializeComments=false
const workspaceJson = Blockly.serialization.workspaces.save(window.workspace, { serializeComments: false });
    // 2. Преобразуем JS-объект в красивую JSON-строку
    const jsonString = JSON.stringify(workspaceJson, null, 2);
  console.log(workspaceJson)
    // 3. Создаём Blob из строки и генерируем временный URL
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
  
    // 4. Создаём <a> и программно кликаем по ней, чтобы скачалось как файл
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'project.json';
    document.body.appendChild(downloadLink);
    downloadLink.click();
  
    // 5. Чистим за собой: удаляем элемент и освобождаем URL
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  }
  
  /**
   * Загружает workspace из JSON-объекта (not from file)
   * Uses window.workspace instead of taking it as a parameter
   * @param {!Object} json — JS-объект с данными workspace
   */
  function loadWorkspaceFromFile(json) {
    try {
      // 1. Очищаем текущее workspace
      window.workspace.clear();

      // 2. Загружаем из JS-объекта back workspace
      Blockly.serialization.workspaces.load(json, window.workspace);
    } catch (e) {
      console.error('Error loading workspace JSON:', e);
      alert('Не удалось загрузить проект: неверный формат JSON');
    }
  }
  
  // ------------------------------------------------------------------
  // ПУБЛИЧНАЯ ФУНКЦИЯ ДЛЯ ИНИЦИАЛИЗАЦИИ
  // ------------------------------------------------------------------
  
  /**
   * Initializes file input handler for load functionality
   * Buttons removed - all save/load now via window.* functions
   */
  export function initSaveLoad() {
    // Дождёмся, когда DOM загрузится
    window.addEventListener('DOMContentLoaded', () => {
      const loadInput = document.getElementById('loadInput');

      if (!loadInput) {
        console.warn('Load input not found in DOM.');
        return;
      }

      // Когда файл выбран в <input type="file">, читаем и передаём JSON в loadWorkspaceFromFile
      loadInput.addEventListener('change', event => {
        const files = event.target.files;
        if (files && files.length > 0) {
          const reader = new FileReader();
          reader.onload = function(e) {
            try {
              const json = JSON.parse(e.target.result);
              loadWorkspaceFromFile(json);
            } catch (err) {
              console.error('Error parsing JSON file:', err);
              alert('Не удалось прочитать файл: неверный формат JSON');
            }
          };
          reader.readAsText(files[0]);
        }
        // Очищаем значение, чтобы можно было снова загрузить тот же файл без перезагрузки страницы
        loadInput.value = '';
      });
    });
  }

  // ------------------------------------------------------------------
  // WINDOW-LEVEL API FOR FLUTTER INTEGRATION
  // ------------------------------------------------------------------

  /**
   * Saves current workspace and returns JSON object (for Flutter)
   * @returns {Object} Workspace JSON object
   */
  window.saveWorkspace = function() {
  const data = Blockly.serialization.workspaces.save(
    window.workspace,
    { serializeComments: false }
  );

  // iOS / iPad fix: never return raw objects across bridge
  if (Blockly.utils.userAgent.IPAD || Blockly.utils.userAgent.IOS) {
    return JSON.stringify(data);
  }

  return data;
};


  /**
   * Loads workspace from JSON object (for Flutter)
   * @param {!Object} json — JS-объект с данными workspace
   */
 window.loadWorkspace = function(json) {
  if (typeof json === 'string') {
    json = JSON.parse(json);
  }
  loadWorkspaceFromFile(json);
};


  /**
   * Saves workspace and triggers browser download as project.json file
   * (For use from Flutter or any external caller)
   */
  window.saveWorkspaceToFile = function() {
    saveWorkspaceToFile();
  };

  /**
   * Triggers file picker to load workspace from file
   * (For use from Flutter or any external caller)
   */
  window.loadWorkspaceFromFile = function() {
    const loadInput = document.getElementById('loadInput');
    if (loadInput) {
      loadInput.click();
    } else {
      console.error('Load input element not found');
    }
  };
  