// Content script para detectar seleção de texto e interações
class AccessibilityHelper {
  constructor() {
    this.selectedText = '';
    this.isReading = false;
    this.tooltip = null;
    this.settings = {};
    this.init();
  }
  
  async init() {
    await this.loadSettings();
    this.setupEventListeners();
    this.createTooltip();
    console.log('Assistente de Acessibilidade ativo');
  }
  
  async loadSettings() {
    this.settings = await chrome.storage.sync.get([
      'autoExplain', 'autoRead', 'fontSize', 'voiceRate', 'voicePitch', 'voiceVolume'
    ]);
  }
  
  setupEventListeners() {
    // Detectar seleção de texto
    document.addEventListener('mouseup', (e) => this.handleTextSelection(e));
    document.addEventListener('keyup', (e) => this.handleKeyboardSelection(e));
    
    // Listener para mensagens do background
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'explainSelectedText') {
        this.explainCurrentSelection();
      }
    });
    
    // Atalhos de teclado
    document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
  }
  
  handleTextSelection(e) {
    setTimeout(() => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      
      if (text && text.length > 3) {
        this.selectedText = text;
        this.showTooltip(e.pageX, e.pageY);
        
        if (this.settings.autoRead) {
          this.readText(text);
        }
      } else {
        this.hideTooltip();
      }
    }, 100);
  }
  
  handleKeyboardSelection(e) {
    // Detectar seleção via teclado (Shift + setas)
    if (e.shiftKey) {
      this.handleTextSelection(e);
    }
  }
  
  handleKeyboardShortcuts(e) {
    // Ctrl + Alt + E: Explicar texto selecionado
    if (e.ctrlKey && e.altKey && e.key === 'e') {
      e.preventDefault();
      this.explainCurrentSelection();
    }
    
    // Ctrl + Alt + R: Ler texto selecionado
    if (e.ctrlKey && e.altKey && e.key === 'r') {
      e.preventDefault();
      this.readCurrentSelection();
    }
    
    // Ctrl + Alt + S: Parar leitura
    if (e.ctrlKey && e.altKey && e.key === 's') {
      e.preventDefault();
      this.stopReading();
    }
    
    // Ctrl + Alt + +: Aumentar fonte
    if (e.ctrlKey && e.altKey && e.key === '+') {
      e.preventDefault();
      this.increaseFontSize();
    }
    
    // Ctrl + Alt + -: Diminuir fonte
    if (e.ctrlKey && e.altKey && e.key === '-') {
      e.preventDefault();
      this.decreaseFontSize();
    }
  }
  
  createTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.id = 'accessibility-tooltip';
    this.tooltip.innerHTML = `
      <div class="tooltip-content">
        <button id="explain-btn" title="Explicar texto (Ctrl+Alt+E)">📖 Explicar</button>
        <button id="read-btn" title="Ler em voz alta (Ctrl+Alt+R)">🔊 Ler</button>
        <button id="stop-btn" title="Parar leitura (Ctrl+Alt+S)">⏹️ Parar</button>
        <button id="zoom-in-btn" title="Aumentar fonte (Ctrl+Alt++)">🔍+ Zoom+</button>
        <button id="zoom-out-btn" title="Diminuir fonte (Ctrl+Alt+-)">🔍- Zoom-</button>
      </div>
    `;
    
    this.tooltip.style.cssText = `
      position: absolute;
      background: #2c3e50;
      color: white;
      padding: 8px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      display: none;
      font-family: Arial, sans-serif;
      font-size: 14px;
      max-width: 300px;
    `;
    
    document.body.appendChild(this.tooltip);
    this.setupTooltipEvents();
  }
  
  setupTooltipEvents() {
    this.tooltip.querySelector('#explain-btn').addEventListener('click', () => {
      this.explainCurrentSelection();
    });
    
    this.tooltip.querySelector('#read-btn').addEventListener('click', () => {
      this.readCurrentSelection();
    });
    
    this.tooltip.querySelector('#stop-btn').addEventListener('click', () => {
      this.stopReading();
    });
    
    this.tooltip.querySelector('#zoom-in-btn').addEventListener('click', () => {
      this.increaseFontSize();
    });
    
    this.tooltip.querySelector('#zoom-out-btn').addEventListener('click', () => {
      this.decreaseFontSize();
    });
  }
  
  showTooltip(x, y) {
    this.tooltip.style.display = 'block';
    this.tooltip.style.left = `${x + 10}px`;
    this.tooltip.style.top = `${y - 60}px`;
    
    // Auto-hide após 10 segundos
    setTimeout(() => this.hideTooltip(), 10000);
  }
  
  hideTooltip() {
    this.tooltip.style.display = 'none';
  }
  
  async explainCurrentSelection() {
    if (!this.selectedText) {
      this.showNotification('Nenhum texto selecionado');
      return;
    }
    
    this.showNotification('Explicando texto...', 'info');
    
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'explainText',
        text: this.selectedText
      });
      
      if (response.success) {
        this.showExplanation(response.explanation);
        
        if (this.settings.autoRead) {
          this.readText(response.explanation);
        }
      } else {
        this.showNotification(`Erro: ${response.error}`, 'error');
      }
    } catch (error) {
      this.showNotification('Erro ao explicar texto', 'error');
    }
  }
  
  readCurrentSelection() {
    if (this.selectedText) {
      this.readText(this.selectedText);
    }
  }
  
  readText(text) {
    this.isReading = true;
    chrome.runtime.sendMessage({
      action: 'speakText',
      text: text,
      options: {
        rate: this.settings.voiceRate,
        pitch: this.settings.voicePitch,
        volume: this.settings.voiceVolume
      }
    });
    
    this.showNotification('Lendo texto...', 'info');
  }
  
  stopReading() {
    this.isReading = false;
    chrome.runtime.sendMessage({ action: 'stopSpeaking' });
    this.showNotification('Leitura interrompida');
  }
  
  increaseFontSize() {
    this.adjustFontSize(2);
  }
  
  decreaseFontSize() {
    this.adjustFontSize(-2);
  }
  
  adjustFontSize(delta) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedElement = range.commonAncestorContainer.parentElement;
      
      if (selectedElement) {
        const currentSize = parseInt(window.getComputedStyle(selectedElement).fontSize);
        const newSize = Math.max(8, Math.min(48, currentSize + delta));
        selectedElement.style.fontSize = `${newSize}px`;
        
        this.showNotification(`Fonte ajustada para ${newSize}px`);
      }
    }
  }
  
  showExplanation(explanation) {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="explanation-modal">
        <div class="explanation-content">
          <h3>Explicação do Texto</h3>
          <div class="original-text">
            <strong>Texto original:</strong>
            <p>"${this.selectedText}"</p>
          </div>
          <div class="explanation-text">
            <strong>Explicação:</strong>
            <p>${explanation}</p>
          </div>
          <div class="modal-actions">
            <button id="read-explanation">🔊 Ler Explicação</button>
            <button id="close-explanation">✖️ Fechar</button>
          </div>
        </div>
      </div>
    `;
    
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 10001;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const content = modal.querySelector('.explanation-content');
    content.style.cssText = `
      background: white;
      padding: 20px;
      border-radius: 12px;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners
    modal.querySelector('#read-explanation').addEventListener('click', () => {
      this.readText(explanation);
    });
    
    modal.querySelector('#close-explanation').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        document.body.removeChild(modal);
        document.removeEventListener('keydown', escHandler);
      }
    });
  }
  
  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'error' ? '#e74c3c' : type === 'info' ? '#3498db' : '#27ae60'};
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      z-index: 10002;
      font-family: Arial, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  }
}

// Inicializar quando a página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new AccessibilityHelper());
} else {
  new AccessibilityHelper();
}
