# Accessible Web Companion

<p align="center">
  <img src="logo.png" alt="Accessible Web Companion Logo" width="200">
</p>

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  </a>
  <a href="https://www.google.com/chrome/">
    <img src="https://img.shields.io/badge/Chrome-v88+-green.svg" alt="Chrome Compatibility">
  </a>
  <a href="https://platform.openai.com/api-keys">
    <img src="https://img.shields.io/badge/API-OpenAI-orange.svg" alt="OpenAI API">
  </a>
</p>

<p align="center">
  A Chrome extension that enhances web accessibility through AI-powered explanations, natural text-to-speech, and visual customizations. Designed for users with visual impairments or reading difficulties.
</p>

<div align="center">
  
  [📥 Installation](#-installation) • 
  [✨ Features](#-features) • 
  [📖 Usage](#-usage) • 
  [🔧 Technical Config](#-technical-configuration) • 
  [🤝 Contributing](#-contributing)
  
</div>

---

## ✨ Features

### 🎯 Core Capabilities
- **AI-Powered Explanations**: Select any text and receive clear, context-aware summaries using GPT-4o mini.
- **Natural TTS**: High-quality text-to-speech with granular control over speed, pitch, and volume.
- **Dynamic Visuals**: Instantly adjust font sizes and apply high-contrast themes without reloading the page.
- **Accessible Interface**: Fully navigable via keyboard and compatible with screen readers.

### ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Alt + E` | Explain selected text |
| `Ctrl + Alt + R` | Read selected text aloud |
| `Ctrl + Alt + S` | Stop reading |
| `Ctrl + Alt + +` | Increase font size |
| `Ctrl + Alt + -` | Decrease font size |

### 🛠️ Advanced Settings
- **Multi-language Support**: Detects and processes text in various languages.
- **Voice Customization**: Choose from multiple voices and fine-tune speech parameters.
- **Theming**: Toggle between Light, Dark, and High-Contrast modes.
- **Automation**: Optional auto-read and auto-explain features for specific domains.

## 🚀 Installation

### Prerequisites
- **Google Chrome** (Version 88+)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

### Setup Guide

<details>
<summary><b>📋 Detailed Step-by-Step Guide</b></summary>

1. **Clone or Download the Repository**
   bash
   git clone https://github.com/dougdotcon/acessibilidade-multissensorial.git
   cd acessibilidade-multissensorial
   

2. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/` in your address bar.
   - Or use the menu: Menu → More Tools → Extensions.

3. **Enable Developer Mode**
   - Toggle the switch in the top right corner labeled "Developer mode".

4. **Load the Extension**
   - Click "Load unpacked".
   - Select the root folder of the repository.

5. **Configure API Key**
   - Click the extension icon in the browser toolbar.
   - Go to "Settings" (Gear icon).
   - Paste your OpenAI API Key and save.

6. **Verify Installation**
   - The extension icon should appear in your toolbar.
   - Select text on a webpage, right-click, and choose "Explain" or "Read Aloud".

</details>

## 📖 Usage

1. **Explaining Text**:
   - Highlight text on any website.
   - Press `Ctrl + Alt + E` or right-click and select "Explain Selection".
   - A popup will appear with the AI-generated explanation.

2. **Reading Aloud**:
   - Highlight text.
   - Press `Ctrl + Alt + R` or right-click and select "Read Aloud".
   - Use `Ctrl + Alt + S` to stop playback.

3. **Visual Adjustments**:
   - Click the extension icon to access the control panel.
   - Use the slider or buttons to adjust font size globally.

## 🔧 Technical Configuration

### Environment Variables
Create a `config.json` file in the root directory (or use the Options page UI):


{
  "openaiApiKey": "sk-...",
  "defaultVoice": "alloy",
  "theme": "dark",
  "fontSizeMultiplier": 1.2
}


### Build from Source (Optional)
If you plan to modify the extension significantly:

bash
# Install dependencies (if using npm scripts for bundling)
npm install

# Build the project
npm run build

# Load the 'dist' folder instead of the root


## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgements

- [OpenAI API](https://platform.openai.com/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
}