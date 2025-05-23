// JavaScript para a página de opções
class OptionsManager {
  constructor() {
    this.settings = {};
    this.voices = [];
    this.init();
  }
  
  async init() {
    await this.loadSettings();
    await this.loadVoices();
    this.setupEventListeners();
    this.updateUI();
  }
  
  async loadSettings() {
    this.settings = await chrome.storage.sync.get([
      'apiKey',
      'voiceRate',
      'voicePitch',
      'voiceVolume',
      'preferredVoice',
      'autoExplain',
      'autoRead',
      'showTooltip',
      'keyboardShortcuts',
      'fontSize',
      'theme',
      'maxTextLength',
      'explanationLanguage',
      'debugMode'
    ]);
    
    // Valores padrão
    this.settings = {
      apiKey: '',
      voiceRate: 1.0,
      voicePitch: 1.0,
      voiceVolume: 1.0,
      preferredVoice: 'default',
      autoExplain: true,
      autoRead: false,
      showTooltip: true,
      keyboardShortcuts: true,
      fontSize: 16,
      theme: 'auto',
      maxTextLength: 2000,
      explanationLanguage: 'pt-BR',
      debugMode: false,
      ...this.settings
    };
  }
  
  async loadVoices() {
    return new Promise((resolve) => {
      const loadVoicesCallback = () => {
        this.voices = speechSynthesis.getVoices();
        this.populateVoiceSelect();
        resolve();
      };
      
      if (speechSynthesis.getVoices().length > 0) {
        loadVoicesCallback();
      } else {
        speechSynthesis.addEventListener('voiceschanged', loadVoicesCallback);
      }
    });
  }
  
  populateVoiceSelect() {
    const voiceSelect = document.getElementById('voice-select');
    voiceSelect.innerHTML = '<option value="default">Voz Padrão do Sistema</option>';
    
    this.voices.forEach((voice, index) => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(option);
    });
  }
  
  setupEventListeners() {
    // API Configuration
    document.getElementById('toggle-api-key').addEventListener('click', this.toggleApiKeyVisibility);
    document.getElementById('test-api').addEventListener('click', () => this.testApiConnection());
    
    // Voice Configuration
    document.getElementById('test-voice').addEventListener('click', () => this.testVoice());
    
    // Range inputs
    this.setupRangeInput('voice-rate-config', 'rate-display', (value) => `${value}x`);
    this.setupRangeInput('voice-pitch-config', 'pitch-display', (value) => value);
    this.setupRangeInput('voice-volume-config', 'volume-display', (value) => `${Math.round(value * 100)}%`);
    this.setupRangeInput('font-size-config', 'font-size-display', (value) => `${value}px`);
    
    // Footer actions
    document.getElementById('save-settings').addEventListener('click', () => this.saveSettings());
    document.getElementById('reset-settings').addEventListener('click', () => this.resetSettings());
    document.getElementById('export-settings').addEventListener('click', () => this.exportSettings());
    document.getElementById('import-settings').addEventListener('click', () => this.importSettings());
    document.getElementById('import-file').addEventListener('change', (e) => this.handleImportFile(e));
  }
  
  setupRangeInput(inputId, displayId, formatter) {
    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);
    
    input.addEventListener('input', (e) => {
      display.textContent = formatter(e.target.value);
    });
  }
  
  updateUI() {
    // API Key
    document.getElementById('api-key').value = this.settings.apiKey;
    
    // Voice settings
    document.getElementById('voice-select').value = this.settings.preferredVoice;
    document.getElementById('voice-rate-config').value = this.settings.voiceRate;
    document.getElementById('voice-pitch-config').value = this.settings.voicePitch;
    document.getElementById('voice-volume-config').value = this.settings.voiceVolume;
    
    // Update displays
    document.getElementById('rate-display').textContent = `${this.settings.voiceRate}x`;
    document.getElementById('pitch-display').textContent = this.settings.voicePitch;
    document.getElementById('volume-display').textContent = `${Math.round(this.settings.voiceVolume * 100)}%`;
    
    // Behavior settings
    document.getElementById('auto-explain-config').checked = this.settings.autoExplain;
    document.getElementById('auto-read-config').checked = this.settings.autoRead;
    document.getElementById('show-tooltip-config').checked = this.settings.showTooltip;
    document.getElementById('keyboard-shortcuts-config').checked = this.settings.keyboardShortcuts;
    
    // Appearance settings
    document.getElementById('font-size-config').value = this.settings.fontSize;
    document.getElementById('font-size-display').textContent = `${this.settings.fontSize}px`;
    document.getElementById('theme-select').value = this.settings.theme;
    
    // Advanced settings
    document.getElementById('max-text-length').value = this.settings.maxTextLength;
    document.getElementById('explanation-language').value = this.settings.explanationLanguage;
    document.getElementById('debug-mode-config').checked = this.settings.debugMode;
  }
  
  toggleApiKeyVisibility() {
    const apiKeyInput = document.getElementById('api-key');
    const toggleBtn = document.getElementById('toggle-api-key');
    
    if (apiKeyInput.type === 'password') {
      apiKeyInput.type = 'text';
      toggleBtn.textContent = '🙈';
    } else {
      apiKeyInput.type = 'password';
      toggleBtn.textContent = '👁️';
    }
  }
  
  async testApiConnection() {
    const apiKey = document.getElementById('api-key').value.trim();
    const statusElement = document.getElementById('api-status');
    
    if (!apiKey) {
      this.showApiStatus('Insira uma chave da API', 'error');
      return;
    }
    
    this.showApiStatus('Testando conexão...', 'loading');
    
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (response.ok) {
        this.showApiStatus('✅ Conexão bem-sucedida', 'success');
      } else {
        this.showApiStatus('❌ Chave inválida', 'error');
      }
    } catch (error) {
      this.showApiStatus('❌ Erro de conexão', 'error');
    }
  }
  
  showApiStatus(message, type) {
    const statusElement = document.getElementById('api-status');
    statusElement.textContent = message;
    statusElement.className = `status-indicator ${type}`;
  }
  
  testVoice() {
    const voiceName = document.getElementById('voice-select').value;
    const rate = parseFloat(document.getElementById('voice-rate-config').value);
    const pitch = parseFloat(document.getElementById('voice-pitch-config').value);
    const volume = parseFloat(document.getElementById('voice-volume-config').value);
    
    const utterance = new SpeechSynthesisUtterance('Esta é uma demonstração da voz selecionada para acessibilidade.');
    
    if (voiceName !== 'default') {
      const voice = this.voices.find(v => v.name === voiceName);
      if (voice) utterance.voice = voice;
    }
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    speechSynthesis.speak(utterance);
  }
  
  async saveSettings() {
    const newSettings = {
      apiKey: document.getElementById('api-key').value.trim(),
      preferredVoice: document.getElementById('voice-select').value,
      voiceRate: parseFloat(document.getElementById('voice-rate-config').value),
      voicePitch: parseFloat(document.getElementById('voice-pitch-config').value),
      voiceVolume: parseFloat(document.getElementById('voice-volume-config').value),
      autoExplain: document.getElementById('auto-explain-config').checked,
      autoRead: document.getElementById('auto-read-config').checked,
      showTooltip: document.getElementById('show-tooltip-config').checked,
      keyboardShortcuts: document.getElementById('keyboard-shortcuts-config').checked,
      fontSize: parseInt(document.getElementById('font-size-config').value),
      theme: document.getElementById('theme-select').value,
      maxTextLength: parseInt(document.getElementById('max-text-length').value),
      explanationLanguage: document.getElementById('explanation-language').value,
      debugMode: document.getElementById('debug-mode-config').checked
    };
    
    try {
      await chrome.storage.sync.set(newSettings);
      this.settings = { ...this.settings, ...newSettings };
      this.showStatusMessage('✅ Configurações salvas com sucesso!', 'success');
      
      // Aplicar tema se mudou
      this.applyTheme(newSettings.theme);
      
    } catch (error) {
      this.showStatusMessage('❌ Erro ao salvar configurações', 'error');
    }
  }
  
  async resetSettings() {
    if (confirm('Tem certeza que deseja restaurar todas as configurações padrão?')) {
      try {
        await chrome.storage.sync.clear();
        await this.loadSettings();
        this.updateUI();
        this.showStatusMessage('✅ Configurações restauradas para o padrão', 'success');
      } catch (error) {
        this.showStatusMessage('❌ Erro ao restaurar configurações', 'error');
      }
    }
  }
  
  exportSettings() {
    const settingsToExport = { ...this.settings };
    // Remover dados sensíveis
    delete settingsToExport.apiKey;
    
    const dataStr = JSON.stringify(settingsToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'acessibilidade-configuracoes.json';
    link.click();
    
    this.showStatusMessage('✅ Configurações exportadas', 'success');
  }
  
  importSettings() {
    document.getElementById('import-file').click();
  }
  
  async handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      const text = await file.text();
      const importedSettings = JSON.parse(text);
      
      // Validar e mesclar configurações
      const validSettings = {};
      for (const [key, value] of Object.entries(importedSettings)) {
        if (key in this.settings && key !== 'apiKey') {
          validSettings[key] = value;
        }
      }
      
      await chrome.storage.sync.set(validSettings);
      this.settings = { ...this.settings, ...validSettings };
      this.updateUI();
      
      this.showStatusMessage('✅ Configurações importadas com sucesso!', 'success');
      
    } catch (error) {
      this.showStatusMessage('❌ Erro ao importar configurações', 'error');
    }
    
    // Limpar input
    event.target.value = '';
  }
  
  showStatusMessage(message, type) {
    const statusElement = document.getElementById('status-message');
    statusElement.textContent = message;
    statusElement.className = `status-message ${type}`;
    statusElement.style.display = 'block';
    
    setTimeout(() => {
      statusElement.style.display = 'none';
    }, 3000);
  }
  
  applyTheme(theme) {
    const body = document.body;
    body.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast');
    
    if (theme === 'light') {
      body.classList.add('theme-light');
    } else if (theme === 'dark') {
      body.classList.add('theme-dark');
    } else if (theme === 'high-contrast') {
      body.classList.add('theme-high-contrast');
    }
    // 'auto' usa o tema do sistema (padrão)
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new OptionsManager();
});

// Adicionar estilos de tema
const themeStyles = `
  .theme-dark {
    background: #1a1a1a !important;
    color: #e1e1e1 !important;
  }
  
  .theme-dark .options-container {
    background: #2d2d2d !important;
  }
  
  .theme-dark .config-section {
    background: #3a3a3a !important;
    border-color: #4a4a4a !important;
  }
  
  .theme-dark .form-group input,
  .theme-dark .form-group select {
    background: #4a4a4a !important;
    border-color: #5a5a5a !important;
    color: #e1e1e1 !important;
  }
  
  .theme-high-contrast {
    background: #000 !important;
    color: #fff !important;
  }
  
  .theme-high-contrast .options-container {
    background: #000 !important;
    border: 3px solid #fff !important;
  }
  
  .theme-high-contrast .config-section {
    background: #000 !important;
    border: 2px solid #fff !important;
  }
  
  .theme-high-contrast .form-group input,
  .theme-high-contrast .form-group select {
    background: #000 !important;
    border: 3px solid #fff !important;
    color: #fff !important;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = themeStyles;
document.head.appendChild(styleSheet);
