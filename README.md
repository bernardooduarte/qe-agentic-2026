# 🧪 Playwright API Resilience & CI/CD Lab

Este projeto é um laboratório prático de Engenharia de Qualidade (QE) focado na transição para arquiteturas modernas de teste. Ele demonstra como criar testes de API robustos, resilientes e integrados a um pipeline de CI/CD, utilizando ferramentas gratuitas e open-source.

O objetivo é simular conceitos avançados de **Testes E2E e Resiliência** (tendências de QA) aplicando validações semânticas em APIs públicas.

## 🚀 Tecnologias Utilizadas

- **[Playwright](https://playwright.dev/):** Framework de testes moderno e veloz
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática e segurança de código
- **[GitHub Actions](https://github.com/features/actions):** Integração Contínua (CI) e execução automática
- **[JSONPlaceholder](https://jsonplaceholder.typicode.com/):** API REST gratuita para testes

## 📂 Estrutura do Projeto

```
qe-agentic-2026/
├── .github/
│   └── workflows/              # Configuração do Pipeline de CI/CD
├── tests/
│   └── api-resilience.spec.ts # Cenários de teste da API
├── package.json               # Dependências do projeto
└── playwright.config.ts       # Configuração global do Playwright
```

## 🛠️ Como Rodar Localmente

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm

### Passo a Passo

1. **Instale as dependências:**

```bash
npm install
```

2. **Instale os navegadores do Playwright:**

```bash
npx playwright install
```

3. **Execute os testes:**

```bash
npx playwright test
```

4. **Visualize o relatório HTML:**

```bash
npx playwright show-report
```

## 🤖 Pipeline de CI/CD (GitHub Actions)

Este repositório contém um workflow configurado em `.github/workflows/playwright.yml`. A cada `push` ou `pull_request` na branch `main`, o GitHub Actions automaticamente:

1. Sobe um ambiente Ubuntu
2. Instala Node.js e dependências
3. Executa a suíte de testes do Playwright
4. Gera e armazena os artefatos (relatórios) da execução

## 🧠 Conceitos de Resiliência Aplicados

Neste laboratório, evitamos "testes frágeis" (flaky tests) aplicando:

- **Validação de Contrato:** Verificação de tipos e propriedades essenciais em vez de valores hardcoded
- **Tratamento de Erros:** Testes que validam se a API responde corretamente a falhas (ex: 404), simulando um comportamento de "auto-cura" ou robustez

---

_Desenvolvido como parte dos estudos de transição para Engenharia de Qualidade Web._
