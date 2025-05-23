// JavaScript para o popup da extensão
class PopupController {
  constructor() {
    this.settings = {};
    this.init();
  }
  
  async init() {
    await this.loadSettings();
    this.setupEventListeners();
    this.updateUI();
    this.updateStatus();
  }
  
  async loadSettings() {
    this.settings = await chrome.storage.sync.get([
      'apiKey',
      'voiceRate',
      'voicePitch', 
      'voiceVolume',
      'autoExplain',
      'autoRead',
      'fontSize'
    ]);
    
    // Valores padrão se não existirem
    this.settings = {
      voiceRate: 1.0,
      voicePitch: 1.0,
      voiceVolume: 1.0,
      autoExplain: true,
      autoRead: false,
      fontSize: 16,
      ...this.settings
    };
  }
  
  setupEventListeners() {
    // Ações rápidas
    document.getElementById('explain-page').addEventListener('click', () => {
      this.explainPage();
    });
    
    document.getElementById('read-page').addEventListener('click', () => {
      this.readPage();
    });
    
    document.getElementById('increase-font').addEventListener('click', () => {
      this.adjustPageFont(2);
    });
    
    document.getElementById('decrease-font').addEventListener('click', () => {
      this.adjustPageFont(-2);
    });
    
    document.getElementById('stop-reading').addEventListener('click', () => {
      this.stopReading();
    });
    
    // Controles de voz
    const voiceRate = document.getElementById('voice-rate');
    const voicePitch = document.getElementById('voice-pitch');
    const voiceVolume = document.getElementById('voice-volume');
    
    voiceRate.addEventListener('input', (e) => {
      this.updateVoiceSetting('voiceRate', parseFloat(e.target.value));
      document.getElementById('rate-value').textContent = `${e.target.value}x`;
    });
    
    voicePitch.addEventListener('input', (e) => {
      this.updateVoiceSetting('voicePitch', parseFloat(e.target.value));
      document.getElementById('pitch-value').textContent = e.target.value;
    });
    
    voiceVolume.addEventListener('input', (e) => {
      this.updateVoiceSetting('voiceVolume', parseFloat(e.target.value));
      document.getElementById('volume-value').textContent = `${Math.round(e.target.value * 100)}%`;
    });
    
    // Configurações
    document.getElementById('auto-explain').addEventListener('change', (e) => {
      this.updateSetting('autoExplain', e.target.checked);
    });
    
    document.getElementById('auto-read').addEventListener('change', (e) => {
      this.updateSetting('autoRead', e.target.checked);
    });
    
    // Footer
    document.getElementById('open-options').addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
      window.close();
    });
  }
  
  updateUI() {
    // Atualizar controles de voz
    document.getElementById('voice-rate').value = this.settings.voiceRate;
    document.getElementById('voice-pitch').value = this.settings.voicePitch;
    document.getElementById('voice-volume').value = this.settings.voiceVolume;
    
    document.getElementById('rate-value').textContent = `${this.settings.voiceRate}x`;
    document.getElementById('pitch-value').textContent = this.settings.voicePitch;
    document.getElementById('volume-value').textContent = `${Math.round(this.settings.voiceVolume * 100)}%`;
    
    // Atualizar checkboxes
    document.getElementById('auto-explain').checked = this.settings.autoExplain;
    document.getElementById('auto-read').checked = this.settings.autoRead;
  }
  
  async updateStatus() {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    
    try {
      // Verificar se a API key está configurada
      if (!this.settings.apiKey) {
        statusDot.className = 'status-dot inactive';
        statusText.textContent = 'API não configurada';
        return;
      }
      
      // Verificar se estamos em uma página válida
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
        statusDot.className = 'status-dot inactive';
        statusText.textContent = 'Página não suportada';
        return;
      }
      
      statusDot.className = 'status-dot';
      statusText.textContent = 'Ativo e funcionando';
      
    } catch (error) {
      statusDot.className = 'status-dot inactive';
      statusText.textContent = 'Erro de conexão';
    }
  }
  
  async explainPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      await chrome.tabs.sendMessage(tab.id, {
        action: 'explainPage'
      });
      
      this.showNotification('Explicando página...', 'info');
      
    } catch (error) {
      this.showNotification('Erro ao explicar página', 'error');
    }
  }
  
  async readPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      await chrome.tabs.sendMessage(tab.id, {
        action: 'readPage'
      });
      
      this.showNotification('Iniciando leitura da página...', 'info');
      
    } catch (error) {
      this.showNotification('Erro ao ler página', 'error');
    }
  }
  
  async adjustPageFont(delta) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      await chrome.tabs.sendMessage(tab.id, {
        action: 'adjustFont',
        delta: delta
      });
      
      this.showNotification(`Fonte ${delta > 0 ? 'aumentada' : 'diminuída'}`, 'success');
      
    } catch (error) {
      this.showNotification('Erro ao ajustar fonte', 'error');
    }
  }
  
  async stopReading() {
    try {
      await chrome.runtime.sendMessage({ action: 'stopSpeaking' });
      this.showNotification('Leitura interrompida', 'success');
      
    } catch (error) {
      this.showNotification('Erro ao parar leitura', 'error');
    }
  }
  
  async updateVoiceSetting(key, value) {
    this.settings[key] = value;
    await chrome.storage.sync.set({ [key]: value });
  }
  
  async updateSetting(key, value) {
    this.settings[key] = value;
    await chrome.storage.sync.set({ [key]: value });
  }
  
  showNotification(message, type = 'info') {
    // Criar notificação temporária no popup
    const notification = document.createElement('div');
    notification.className = `popup-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      right: 10px;
      background: ${type === 'error' ? '#e74c3c' : type === 'info' ? '#3498db' : '#27ae60'};
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      z-index: 1000;
      text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 2000);
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});

// Adicionar funcionalidades extras ao content script
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0] && !tabs[0].url.startsWith('chrome://')) {
    // Injetar funcionalidades extras se necessário
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: addPopupExtensions
    });
  }
});

function addPopupExtensions() {
  // Adicionar listeners para ações do popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'explainPage') {
      explainEntirePage();
      sendResponse({ success: true });
    }
    
    if (request.action === 'readPage') {
      readEntirePage();
      sendResponse({ success: true });
    }
    
    if (request.action === 'adjustFont') {
      adjustPageFontSize(request.delta);
      sendResponse({ success: true });
    }
  });
  
  function explainEntirePage() {
    // Pegar o texto principal da página
    const mainContent = document.querySelector('main, article, .content, #content, .post, .entry') || document.body;
    const text = mainContent.innerText.slice(0, 2000); // Limitar para não sobrecarregar a API
    
    if (text.trim()) {
      chrome.runtime.sendMessage({
        action: 'explainText',
        text: text
      }).then(response => {
        if (response.success) {
          showPageExplanation(response.explanation);
        }
      });
    }
  }
  
  function readEntirePage() {
    const mainContent = document.querySelector('main, article, .content, #content, .post, .entry') || document.body;
    const text = mainContent.innerText;
    
    if (text.trim()) {
      chrome.runtime.sendMessage({
        action: 'speakText',
        text: text
      });
    }
  }
  
  function adjustPageFontSize(delta) {
    const elements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, li, td, th');
    
    elements.forEach(element => {
      const currentSize = parseInt(window.getComputedStyle(element).fontSize);
      const newSize = Math.max(8, Math.min(48, currentSize + delta));
      element.style.fontSize = `${newSize}px`;
    });
  }
  
  function showPageExplanation(explanation) {
    // Usar a mesma função do content script
    if (window.accessibilityHelper) {
      window.accessibilityHelper.showExplanation(explanation);
    } else {
      alert(`Explicação da página:\n\n${explanation}`);
    }
  }
}
