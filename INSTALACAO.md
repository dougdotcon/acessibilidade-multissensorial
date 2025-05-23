# 🚀 Guia de Instalação - Extensão de Acessibilidade Multissensorial

## 📋 Pré-requisitos

### 1. Google Chrome
- **Versão mínima**: Chrome 88 ou superior
- **Verificar versão**: Digite `chrome://version/` na barra de endereços

### 2. Chave da API OpenAI
- **Obter chave**: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Modelo necessário**: GPT-4o mini
- **Custo**: Aproximadamente $0.15 por 1M tokens de entrada

## 🔧 Instalação Passo a Passo

### Passo 1: Preparar os Arquivos
1. **Baixe ou clone** este repositório
2. **Extraia** todos os arquivos em uma pasta (ex: `C:\Extensao-Acessibilidade\`)

### Passo 2: Gerar Ícones
1. **Abra** o arquivo `create-icons.html` no navegador
2. **Clique** nos botões para baixar os ícones:
   - Baixar 16x16 → Salvar como `icons/icon16.png`
   - Baixar 32x32 → Salvar como `icons/icon32.png`
   - Baixar 48x48 → Salvar como `icons/icon48.png`
   - Baixar 128x128 → Salvar como `icons/icon128.png`

### Passo 3: Carregar no Chrome
1. **Abra o Chrome** e digite `chrome://extensions/` na barra de endereços
2. **Ative** o "Modo do desenvolvedor" (canto superior direito)
3. **Clique** em "Carregar sem compactação"
4. **Selecione** a pasta onde estão os arquivos da extensão
5. **Confirme** que a extensão apareceu na lista

### Passo 4: Configurar API OpenAI
1. **Clique** no ícone da extensão na barra de ferramentas
2. **Clique** em "⚙️ Configurações Avançadas"
3. **Insira** sua chave da API OpenAI no campo "Chave da API OpenAI"
4. **Clique** em "🧪 Testar Conexão" para verificar
5. **Clique** em "💾 Salvar Configurações"

## ✅ Verificação da Instalação

### Teste Rápido
1. **Abra** o arquivo `test-page.html` no navegador
2. **Selecione** qualquer texto na página
3. **Verifique** se aparece uma barra de ferramentas com botões
4. **Teste** os atalhos de teclado:
   - `Ctrl + Alt + E` para explicar
   - `Ctrl + Alt + R` para ler

### Checklist de Funcionalidades
- [ ] Ícone da extensão aparece na barra de ferramentas
- [ ] Popup abre ao clicar no ícone
- [ ] Tooltip aparece ao selecionar texto
- [ ] Explicação funciona (requer API configurada)
- [ ] Leitura em voz alta funciona
- [ ] Atalhos de teclado respondem
- [ ] Configurações podem ser acessadas

## 🎛️ Configuração Inicial Recomendada

### Configurações de Voz
- **Velocidade**: 1.0x (padrão)
- **Tom**: 1.0 (padrão)
- **Volume**: 100%
- **Voz**: Selecione uma voz em português

### Configurações de Comportamento
- ✅ **Explicação Automática**: Ativada
- ❌ **Leitura Automática**: Desativada (para não incomodar)
- ✅ **Mostrar Tooltip**: Ativada
- ✅ **Atalhos de Teclado**: Ativada

### Configurações de Aparência
- **Tamanho de Fonte**: 16px
- **Tema**: Automático (segue o sistema)

## 🔧 Solução de Problemas Comuns

### ❌ Extensão não aparece
**Problema**: A extensão não aparece na lista após carregar
**Solução**:
1. Verifique se todos os arquivos estão na pasta
2. Confirme que o `manifest.json` está presente
3. Recarregue a extensão em `chrome://extensions/`

### ❌ API não funciona
**Problema**: Explicações não funcionam
**Solução**:
1. Verifique se a chave da API está correta
2. Teste a conexão nas configurações
3. Verifique se você tem créditos na conta OpenAI
4. Confirme que está conectado à internet

### ❌ Voz não funciona
**Problema**: Leitura em voz alta não funciona
**Solução**:
1. Verifique se o volume do sistema está ligado
2. Teste diferentes vozes nas configurações
3. Verifique as permissões de áudio do navegador

### ❌ Tooltip não aparece
**Problema**: Barra de ferramentas não aparece ao selecionar texto
**Solução**:
1. Recarregue a página atual
2. Verifique se a extensão está ativa
3. Confirme que não está em uma página especial do Chrome

## 🔄 Atualizações

### Como Atualizar
1. **Baixe** a nova versão dos arquivos
2. **Substitua** os arquivos antigos
3. **Vá** para `chrome://extensions/`
4. **Clique** no botão de recarregar da extensão

### Backup das Configurações
1. **Abra** as configurações da extensão
2. **Clique** em "📤 Exportar Configurações"
3. **Salve** o arquivo JSON em local seguro

## 📞 Suporte

### Se precisar de ajuda:
1. **Verifique** este guia primeiro
2. **Teste** com a página `test-page.html`
3. **Consulte** o arquivo `README.md` para mais detalhes
4. **Abra** o console do navegador (F12) para ver erros

### Informações para Suporte:
- **Versão do Chrome**: Digite `chrome://version/`
- **Versão da Extensão**: Veja em `chrome://extensions/`
- **Sistema Operacional**: Windows/Mac/Linux
- **Mensagens de Erro**: Copie do console (F12)

## 🎉 Pronto!

Sua extensão de acessibilidade está instalada e configurada! 

**Próximos passos**:
1. Explore as diferentes funcionalidades
2. Personalize as configurações conforme sua necessidade
3. Use os atalhos de teclado para maior produtividade
4. Compartilhe com outras pessoas que possam se beneficiar

---

**💡 Dica**: Mantenha sua chave da API OpenAI segura e não a compartilhe com outras pessoas.
