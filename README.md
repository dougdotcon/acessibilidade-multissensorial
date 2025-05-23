# 🔊 Extensão de Acessibilidade Multissensorial

Uma extensão Chrome que torna a web mais acessível através de explicações inteligentes, leitura em voz alta e ajustes visuais para pessoas com deficiência visual ou dificuldades de leitura.

## ✨ Funcionalidades

### 🎯 Principais Recursos
- **Explicação Inteligente**: Selecione qualquer texto e receba uma explicação clara e acessível via GPT-4o mini
- **Leitura em Voz Alta**: Síntese de voz natural com controles de velocidade, tom e volume
- **Ajuste de Fonte**: Aumente ou diminua o tamanho do texto dinamicamente
- **Interface Acessível**: Navegação por teclado e suporte a leitores de tela

### 🎮 Controles e Atalhos
- **Ctrl + Alt + E**: Explicar texto selecionado
- **Ctrl + Alt + R**: Ler texto selecionado em voz alta
- **Ctrl + Alt + S**: Parar leitura
- **Ctrl + Alt + +**: Aumentar fonte
- **Ctrl + Alt + -**: Diminuir fonte

### 🛠️ Configurações Avançadas
- Múltiplas vozes e idiomas
- Configurações de velocidade, tom e volume
- Temas (claro, escuro, alto contraste)
- Explicações automáticas
- Leitura automática

## 🚀 Instalação

### Pré-requisitos
1. **Google Chrome** (versão 88 ou superior)
2. **Chave da API OpenAI** - [Obter aqui](https://platform.openai.com/api-keys)

### Passos de Instalação

1. **Clone ou baixe este repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd extensao-acessibilidade
   ```

2. **Abra o Chrome e vá para as extensões**
   - Digite `chrome://extensions/` na barra de endereços
   - Ou vá em Menu → Mais ferramentas → Extensões

3. **Ative o modo desenvolvedor**
   - Clique no botão "Modo do desenvolvedor" no canto superior direito

4. **Carregue a extensão**
   - Clique em "Carregar sem compactação"
   - Selecione a pasta da extensão

5. **Configure a API OpenAI**
   - Clique no ícone da extensão
   - Vá em "Configurações Avançadas"
   - Insira sua chave da API OpenAI
   - Clique em "Testar Conexão" para verificar

## 📖 Como Usar

### Uso Básico
1. **Selecione qualquer texto** em uma página web
2. **Aparecerá uma barra de ferramentas** com opções:
   - 📖 **Explicar**: Receba uma explicação simplificada
   - 🔊 **Ler**: Ouça o texto em voz alta
   - ⏹️ **Parar**: Interrompa a leitura
   - 🔍+ **Zoom+**: Aumente a fonte
   - 🔍- **Zoom-**: Diminua a fonte

### Usando o Popup
1. **Clique no ícone da extensão** na barra de ferramentas
2. **Ações rápidas disponíveis**:
   - Explicar página inteira
   - Ler página inteira
   - Ajustar fonte da página
   - Parar leitura

### Configurações Personalizadas
1. **Abra as configurações** clicando em "⚙️ Configurações Avançadas"
2. **Configure conforme suas necessidades**:
   - Velocidade e tom da voz
   - Comportamento automático
   - Tema visual
   - Idioma das explicações

## 🎨 Temas e Acessibilidade

A extensão oferece múltiplos temas para diferentes necessidades:

- **Automático**: Segue o tema do sistema
- **Claro**: Interface clara e limpa
- **Escuro**: Reduz o cansaço visual
- **Alto Contraste**: Máxima legibilidade

## 🔧 Configurações Técnicas

### Configurações de Voz
- **Velocidade**: 0.5x a 2.0x
- **Tom**: 0.5 a 2.0
- **Volume**: 0% a 100%
- **Vozes**: Todas as vozes disponíveis no sistema

### Configurações de Comportamento
- **Explicação Automática**: Explica automaticamente texto selecionado
- **Leitura Automática**: Lê automaticamente texto selecionado
- **Tooltip**: Mostra/oculta a barra de ferramentas
- **Atalhos de Teclado**: Habilita/desabilita atalhos

### Configurações Avançadas
- **Tamanho Máximo de Texto**: Limite para explicações automáticas
- **Idioma das Explicações**: pt-BR, en-US, es-ES, fr-FR
- **Modo Debug**: Para desenvolvedores

## 🔒 Privacidade e Segurança

- **Sua chave da API** é armazenada localmente no Chrome
- **Textos selecionados** são enviados apenas para a API OpenAI
- **Nenhum dado** é coletado ou armazenado pelos desenvolvedores
- **Código aberto** para transparência total

## 🐛 Solução de Problemas

### A extensão não funciona
1. Verifique se a chave da API está configurada corretamente
2. Teste a conexão nas configurações
3. Recarregue a página atual
4. Verifique se a página não é uma página especial do Chrome

### A voz não funciona
1. Verifique se o volume está ligado
2. Teste diferentes vozes nas configurações
3. Verifique as permissões do navegador para áudio

### As explicações não aparecem
1. Verifique sua conexão com a internet
2. Teste a chave da API nas configurações
3. Verifique se você tem créditos na conta OpenAI

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **OpenAI** pela API GPT-4o mini
- **Comunidade de acessibilidade** pelas diretrizes e feedback
- **Desenvolvedores** que contribuíram para este projeto

## 📞 Suporte

Se você encontrar problemas ou tiver sugestões:

1. **Abra uma issue** no GitHub
2. **Descreva o problema** detalhadamente
3. **Inclua informações** sobre seu sistema e navegador

---

**Feito com ❤️ para tornar a web mais acessível para todos.**
