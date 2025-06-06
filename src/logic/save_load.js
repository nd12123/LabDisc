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
 * @param {!Blockly.WorkspaceSvg} workspace — ваш Blockly-рабочий объект
 */
function saveWorkspaceToFile(workspace) {
    // 1. "Сериализуем" workspace в JS-объект
// Новая строка: отключаем комментарии, задаём options.serializeComments=false
const workspaceJson = Blockly.serialization.workspaces.save(workspace, { serializeComments: false });
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
   * Читает содержимое выбранного JSON-файла и загружает workspace из него.
   * @param {!File} file — объект Файл из <input type="file">
   * @param {!Blockly.WorkspaceSvg} workspace — ваш Blockly-рабочий объект
   */
  function loadWorkspaceFromFile(file, workspace) {
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        // 1. Парсим JSON-строку в JS-объект
        const obj = JSON.parse(event.target.result);
  
        // 2. Очищаем текущее workspace
        workspace.clear();
  
        // 3. Загружаем из JS-объекта back workspace
        Blockly.serialization.workspaces.load(obj, workspace);
      } catch (e) {
        console.error('Error parsing or loading workspace JSON:', e);
        alert('Не удалось загрузить проект: неверный формат JSON');
      }
    };
    reader.readAsText(file);
  }
  
  // ------------------------------------------------------------------
  // ПУБЛИЧНАЯ ФУНКЦИЯ ДЛЯ ИНИЦИАЛИЗАЦИИ
  // ------------------------------------------------------------------
  
  /**
   * Привязывает к двум кнопкам (#saveBtn и #loadBtn) логику сохранения/загрузки workspace.
   * Кнопки и <input type="file" id="loadInput"> должны быть заранее объявлены в HTML.
   *
   * @param {!Blockly.WorkspaceSvg} workspace — ваш Blockly-объект
   */
  export function initSaveLoad(workspace) {
    // Дождёмся, когда DOM загрузится, и кнопки будут доступны
    window.addEventListener('DOMContentLoaded', () => {
      const saveButton = document.getElementById('saveBtn');
      const loadButton = document.getElementById('loadBtn');
      const loadInput = document.getElementById('loadInput');
  
      if (!saveButton || !loadButton || !loadInput) {
        console.warn('Save/Load buttons or loadInput not found in DOM.');
        return;
      }
  
      // Обработчик сохранения
      saveButton.addEventListener('click', () => {
        console.log(workspace)
        saveWorkspaceToFile(workspace);
      });
  
      // Обработчик клика по "Load" — просто эмулируем нажатие на скрытый <input type="file">
      loadButton.addEventListener('click', () => {
        loadInput.click();
      });
  
      // Когда файл выбран в <input type="file">, сразу передаём его в loadWorkspaceFromFile
      loadInput.addEventListener('change', event => {
        const files = event.target.files;
        if (files && files.length > 0) {
          loadWorkspaceFromFile(files[0], workspace);
        }
        // Очищаем значение, чтобы можно было снова загрузить тот же файл без перезагрузки страницы
        loadInput.value = '';
      });
    });
  }
  