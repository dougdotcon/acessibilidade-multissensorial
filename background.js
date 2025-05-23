// Service Worker para a extensão de acessibilidade
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extensão de Acessibilidade Multissensorial instalada');
  
  // Configurações padrão
  chrome.storage.sync.set({
    apiKey: '',
    voiceRate: 1.0,
    voicePitch: 1.0,
    voiceVolume: 1.0,
    fontSize: 16,
    autoExplain: true,
    autoRead: false,
    preferredVoice: 'default'
  });
});

// Listener para mensagens do content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'explainText') {
    explainTextWithGPT(request.text)
      .then(explanation => sendResponse({ success: true, explanation }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Indica resposta assíncrona
  }
  
  if (request.action === 'speakText') {
    speakText(request.text, request.options || {});
    sendResponse({ success: true });
  }
  
  if (request.action === 'stopSpeaking') {
    chrome.tts.stop();
    sendResponse({ success: true });
  }
});

// Função para explicar texto usando GPT-4o mini
async function explainTextWithGPT(text) {
  try {
    const { apiKey } = await chrome.storage.sync.get(['apiKey']);
    
    if (!apiKey) {
      throw new Error('Chave da API OpenAI não configurada. Acesse as opções da extensão.');
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente de acessibilidade. Explique o texto selecionado de forma clara, simples e acessível. Foque em tornar o conteúdo compreensível para pessoas com dificuldades de leitura ou deficiência visual. Use linguagem simples e direta.'
          },
          {
            role: 'user',
            content: `Explique este texto de forma acessível: "${text}"`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error('Erro ao explicar texto:', error);
    throw error;
  }
}

// Função para falar texto usando TTS
async function speakText(text, options = {}) {
  try {
    const settings = await chrome.storage.sync.get([
      'voiceRate', 'voicePitch', 'voiceVolume', 'preferredVoice'
    ]);
    
    const ttsOptions = {
      text: text,
      rate: options.rate || settings.voiceRate || 1.0,
      pitch: options.pitch || settings.voicePitch || 1.0,
      volume: options.volume || settings.voiceVolume || 1.0,
      voiceName: options.voiceName || settings.preferredVoice || undefined
    };
    
    chrome.tts.speak(text, ttsOptions);
    
  } catch (error) {
    console.error('Erro ao falar texto:', error);
  }
}

// Context menu para acessibilidade
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'explainSelection') {
    chrome.tabs.sendMessage(tab.id, {
      action: 'explainSelectedText'
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'explainSelection',
    title: 'Explicar texto selecionado',
    contexts: ['selection']
  });
});
