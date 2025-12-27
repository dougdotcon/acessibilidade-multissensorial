# Acessível Web Companion

<p align="center">
  <img src="logo.png" alt="Logo do Acessível Web Companion" width="200">
</p>

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/Licença-MIT-blue.svg" alt="Licença: MIT">
  </a>
  <a href="https://www.google.com/chrome/">
    <img src="https://img.shields.io/badge/Chrome-v88+-green.svg" alt="Compatibilidade Chrome">
  </a>
  <a href="https://platform.openai.com/api-keys">
    <img src="https://img.shields.io/badge/API-OpenAI-orange.svg" alt="OpenAI API">
  </a>
</p>

<p align="center">
  Uma extensão Chrome que aprimora a acessibilidade web através de explicações impulsadas por IA, síntese de voz natural e customizações visuais. Projetada para usuários com dificuldades visuais ou de leitura.
</p>

<div align="center">
  
  [📥 Instalação](#-instalação) • 
  [✨ Funcionalidades](#-funcionalidades) • 
  [📖 Uso](#-uso) • 
  [🔧 Config Técnica](#-configuração-técnica) • 
  [🤝 Contribuir](#-contribuindo)
  
</div>

---

## ✨ Funcionalidades

### 🎯 Capacidades Principais
- **Explicações com IA**: Selecione qualquer texto e receba resumos claros e contextuais usando o GPT-4o mini.
- **TTS Natural**: Síntese de voz de alta qualidade com controle granular sobre velocidade, tom e volume.
- **Visuais Dinâmicos**: Ajuste instantaneamente o tamanho das fontes e aplique temas de alto contraste sem recarregar a página.
- **Interface Acessível**: Totalmente navegável via teclado e compatível com leitores de tela.

### ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl + Alt + E` | Explicar texto selecionado |
| `Ctrl + Alt + R` | Ler texto selecionado em voz alta |
| `Ctrl + Alt + S` | Parar leitura |
| `Ctrl + Alt + +` | Aumentar tamanho da fonte |
| `Ctrl + Alt + -` | Diminuir tamanho da fonte |

### 🛠️ Configurações Avançadas
- **Suporte a Multi-idiomas**: Detecta e processa texto em várias línguas.
- **Customização de Voz**: Escolha entre múltiplas vozes e ajuste finamente os parâmetros de fala.
- **Temas**: Alterne entre Modos Claro, Escuro e Alto Contraste.
- **Automação**: Recursos opcionais de leitura e explicação automáticas para domínios específicos.

## 🚀 Instalação

### Pré-requisitos
- **Google Chrome** (Versão 88+)
- **Chave da API OpenAI** - [Obter aqui](https://platform.openai.com/api-keys)

### Guia de Configuração

<details>
<summary><b>📋 Guia Detalhado Passo a Passo</b></summary>

1. **Clone ou Baixe o Repositório**
   bash
   git clone https://github.com/dougdotcon/acessibilidade-multissensorial.git
   cd acessibilidade-multissensorial
   

2. **Abra a Página de Extensões do Chrome**
   - Navegue para `chrome://extensions/` na barra de endereços.
   - Ou use o menu: Menu → Mais Ferramentas → Extensões.

3. **Ative o Modo Desenvolvedor**
   - Ative o interruptor no canto superior direito chamado "Modo do desenvolvedor".

4. **Carregue a Extensão**
   - Clique em "Carregar sem compactação".
   - Selecione a pasta raiz do repositório.

5. **Configure a Chave da API**
   - Clique no ícone da extensão na barra de ferramentas do navegador.
   - Vá para "Configurações" (Ícone de Engrenagem).
   - Cole sua Chave de API da OpenAI e salve.

6. **Verifique a Instalação**
   - O ícone da extensão deve aparecer na sua barra de ferramentas.
   - Selecione texto em uma página da web, clique com o botão direito e escolha "Explicar" ou "Ler em Voz Alta".

</details>

## 📖 Uso

1. **Explicando Texto**:
   - Destaque o texto em qualquer site.
   - Pressione `Ctrl + Alt + E` ou clique com o botão direito e selecione "Explicar Seleção".
   - Um pop-up aparecerá com a explicação gerada pela IA.

2. **Leitura em Voz Alta**:
   - Destaque o texto.
   - Pressione `Ctrl + Alt + R` ou clique com o botão direito e selecione "Ler em Voz Alta".
   - Use `Ctrl + Alt + S` para parar a reprodução.

3. **Ajustes Visuais**:
   - Clique no ícone da extensão para acessar o painel de controle.
   - Use o controle deslizante ou os botões para ajustar o tamanho da fonte globalmente.

## 🔧 Configuração Técnica

### Variáveis de Ambiente
Crie um arquivo `config.json` no diretório raiz (ou use a interface de Configurações):


{
  "openaiApiKey": "sk-...",
  "defaultVoice": "alloy",
  "theme": "dark",
  "fontSizeMultiplier": 1.2
}


### Compilar do Código-Fonte (Opcional)
Se você planeja modificar a extensão significativamente:

bash
# Instale as dependências (se usar scripts npm)
npm install

# Construa o projeto
npm run build

# Carregue a pasta 'dist' em vez da raiz


## 🤝 Contribuindo

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **grandemente apreciada**.

1. Faça um Fork do Projeto
2. Crie sua Branch de Funcionalidade (`git checkout -b feature/NovoRecurso`)
3. Commit suas Alterações (`git commit -m 'Adiciona NovoRecurso'`)
4. Push para a Branch (`git push origin feature/NovoRecurso`)
5. Abra um Pull Request

## 📜 Licença

Distribuído sob a Licença MIT. Veja `LICENSE` para mais informações.

## 🙏 Agradecimentos

- [OpenAI API](https://platform.openai.com/)
- [Web Speech API](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Speech_API)
}