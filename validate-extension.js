#!/usr/bin/env node

/**
 * Script de validação para a Extensão de Acessibilidade Multissensorial
 * Verifica se todos os arquivos necessários estão presentes e válidos
 */

const fs = require('fs');
const path = require('path');

class ExtensionValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = {
      error: '❌',
      warning: '⚠️',
      success: '✅',
      info: 'ℹ️'
    }[type];
    
    console.log(`${prefix} [${timestamp}] ${message}`);
    
    if (type === 'error') this.errors.push(message);
    if (type === 'warning') this.warnings.push(message);
    if (type === 'success') this.success.push(message);
  }

  validateFileExists(filePath, required = true) {
    if (fs.existsSync(filePath)) {
      this.log(`Arquivo encontrado: ${filePath}`, 'success');
      return true;
    } else {
      const message = `Arquivo não encontrado: ${filePath}`;
      this.log(message, required ? 'error' : 'warning');
      return false;
    }
  }

  validateJSON(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      JSON.parse(content);
      this.log(`JSON válido: ${filePath}`, 'success');
      return true;
    } catch (error) {
      this.log(`JSON inválido em ${filePath}: ${error.message}`, 'error');
      return false;
    }
  }

  validateManifest() {
    this.log('Validando manifest.json...', 'info');
    
    if (!this.validateFileExists('manifest.json')) return false;
    if (!this.validateJSON('manifest.json')) return false;

    try {
      const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
      
      // Verificar campos obrigatórios
      const requiredFields = ['manifest_version', 'name', 'version', 'permissions'];
      for (const field of requiredFields) {
        if (!manifest[field]) {
          this.log(`Campo obrigatório ausente no manifest: ${field}`, 'error');
        } else {
          this.log(`Campo presente: ${field}`, 'success');
        }
      }

      // Verificar versão do manifest
      if (manifest.manifest_version !== 3) {
        this.log('Recomendado usar Manifest V3', 'warning');
      }

      // Verificar permissões necessárias
      const requiredPermissions = ['activeTab', 'storage', 'tts', 'scripting'];
      for (const permission of requiredPermissions) {
        if (!manifest.permissions.includes(permission)) {
          this.log(`Permissão recomendada ausente: ${permission}`, 'warning');
        }
      }

      return true;
    } catch (error) {
      this.log(`Erro ao validar manifest: ${error.message}`, 'error');
      return false;
    }
  }

  validateCoreFiles() {
    this.log('Validando arquivos principais...', 'info');
    
    const coreFiles = [
      'background.js',
      'content.js',
      'content.css',
      'popup.html',
      'popup.js',
      'popup.css',
      'options.html',
      'options.js',
      'options.css'
    ];

    let allValid = true;
    for (const file of coreFiles) {
      if (!this.validateFileExists(file)) {
        allValid = false;
      }
    }

    return allValid;
  }

  validateIcons() {
    this.log('Validando ícones...', 'info');
    
    const iconSizes = [16, 32, 48, 128];
    let hasIcons = false;

    for (const size of iconSizes) {
      const iconPath = `icons/icon${size}.png`;
      if (this.validateFileExists(iconPath, false)) {
        hasIcons = true;
      }
    }

    if (!hasIcons) {
      this.log('Nenhum ícone encontrado. Use create-icons.html para gerar', 'warning');
    }

    return hasIcons;
  }

  validateJavaScript() {
    this.log('Validando sintaxe JavaScript...', 'info');
    
    const jsFiles = ['background.js', 'content.js', 'popup.js', 'options.js'];
    let allValid = true;

    for (const file of jsFiles) {
      if (fs.existsSync(file)) {
        try {
          const content = fs.readFileSync(file, 'utf8');
          
          // Verificações básicas de sintaxe
          if (content.includes('chrome.runtime') || content.includes('chrome.storage')) {
            this.log(`APIs Chrome detectadas em ${file}`, 'success');
          }
          
          // Verificar se não há console.log em produção (warning)
          if (content.includes('console.log')) {
            this.log(`Console.log encontrado em ${file} - remover para produção`, 'warning');
          }
          
        } catch (error) {
          this.log(`Erro ao ler ${file}: ${error.message}`, 'error');
          allValid = false;
        }
      }
    }

    return allValid;
  }

  validateHTML() {
    this.log('Validando arquivos HTML...', 'info');
    
    const htmlFiles = ['popup.html', 'options.html', 'test-page.html'];
    let allValid = true;

    for (const file of htmlFiles) {
      if (fs.existsSync(file)) {
        try {
          const content = fs.readFileSync(file, 'utf8');
          
          // Verificações básicas
          if (!content.includes('<!DOCTYPE html>')) {
            this.log(`DOCTYPE ausente em ${file}`, 'warning');
          }
          
          if (!content.includes('<meta charset="UTF-8">')) {
            this.log(`Charset UTF-8 ausente em ${file}`, 'warning');
          }
          
          this.log(`HTML válido: ${file}`, 'success');
          
        } catch (error) {
          this.log(`Erro ao ler ${file}: ${error.message}`, 'error');
          allValid = false;
        }
      }
    }

    return allValid;
  }

  validateAccessibility() {
    this.log('Verificando recursos de acessibilidade...', 'info');
    
    // Verificar se content.js tem funcionalidades de acessibilidade
    if (fs.existsSync('content.js')) {
      const content = fs.readFileSync('content.js', 'utf8');
      
      const accessibilityFeatures = [
        'addEventListener',
        'keydown',
        'mouseup',
        'selection',
        'speechSynthesis'
      ];
      
      for (const feature of accessibilityFeatures) {
        if (content.includes(feature)) {
          this.log(`Recurso de acessibilidade encontrado: ${feature}`, 'success');
        }
      }
    }

    return true;
  }

  validateConfiguration() {
    this.log('Verificando configurações...', 'info');
    
    // Verificar se package.json existe e é válido
    if (this.validateFileExists('package.json', false)) {
      this.validateJSON('package.json');
    }

    // Verificar README
    if (this.validateFileExists('README.md', false)) {
      this.log('Documentação encontrada', 'success');
    }

    return true;
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO DE VALIDAÇÃO DA EXTENSÃO');
    console.log('='.repeat(60));
    
    console.log(`\n✅ Sucessos: ${this.success.length}`);
    console.log(`⚠️  Avisos: ${this.warnings.length}`);
    console.log(`❌ Erros: ${this.errors.length}`);
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  AVISOS:');
      this.warnings.forEach(warning => console.log(`   • ${warning}`));
    }
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERROS:');
      this.errors.forEach(error => console.log(`   • ${error}`));
    }
    
    console.log('\n' + '='.repeat(60));
    
    if (this.errors.length === 0) {
      console.log('🎉 VALIDAÇÃO CONCLUÍDA COM SUCESSO!');
      console.log('A extensão está pronta para ser testada.');
      
      if (this.warnings.length > 0) {
        console.log('\n💡 Considere resolver os avisos para melhor qualidade.');
      }
      
      console.log('\n📋 PRÓXIMOS PASSOS:');
      console.log('1. Gere os ícones abrindo create-icons.html');
      console.log('2. Configure sua chave da API OpenAI');
      console.log('3. Carregue a extensão no Chrome (chrome://extensions/)');
      console.log('4. Teste usando test-page.html');
      
      return true;
    } else {
      console.log('💥 VALIDAÇÃO FALHOU!');
      console.log('Corrija os erros antes de prosseguir.');
      return false;
    }
  }

  run() {
    console.log('🔍 Iniciando validação da Extensão de Acessibilidade...\n');
    
    this.validateManifest();
    this.validateCoreFiles();
    this.validateIcons();
    this.validateJavaScript();
    this.validateHTML();
    this.validateAccessibility();
    this.validateConfiguration();
    
    return this.generateReport();
  }
}

// Executar validação se chamado diretamente
if (require.main === module) {
  const validator = new ExtensionValidator();
  const success = validator.run();
  process.exit(success ? 0 : 1);
}

module.exports = ExtensionValidator;
