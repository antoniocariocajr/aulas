# **Introdução ao React**

React é uma biblioteca JavaScript **baseada em componentes** para construir interfaces de usuário. É **declarativo**, tornando seu código mais previsível e fácil de depurar. É uma das bibliotecas mais populares para desenvolvimento frontend, criada e mantida pela Meta.

## 📦 **O Ambiente de Desenvolvimento React**

Como desenvolvedor React, você usará um conjunto de ferramentas para criar, construir e executar suas aplicações. Diferente do JDK do Java, o ecossistema React é uma coleção de ferramentas de código aberto.

> **Node.js & npm/yarn:** Node.js é um ambiente de execução JavaScript que permite que você execute JavaScript fora de um navegador. Ele vem com o npm (Node Package Manager), uma ferramenta para gerenciar dependências de projetos. O Yarn é uma alternativa popular ao npm.

As principais ferramentas no ecossistema React incluem:

*   **`create-react-app` / `Vite`:** Ferramentas de scaffolding que criam um novo projeto React com um ambiente de desenvolvimento pré-configurado.
*   **Babel:** Um compilador JavaScript que transforma JavaScript moderno (incluindo JSX) em código compatível com os navegadores.
*   **Webpack / Rollup:** Bundlers de módulos que empacotam seu código e assets para produção.

### **Componentes Principais de um Projeto React**

| Componente | Função | Arquivos / Pastas |
| --- | --- | --- |
| **`package.json`** | Lista as dependências e scripts do projeto. | `package.json` |
| **`node_modules/`** | Contém todas as dependências do projeto baixadas. | `node_modules/` |
| **`src/`** | Contém o código-fonte da sua aplicação. | `src/` |
| **`public/`** | Contém o arquivo HTML principal e outros assets estáticos. | `public/` |
| **`build/` ou `dist/`**| Contém o código otimizado e pronto para produção. | `build/` ou `dist/` |

---

### **Instalação Típica – Estrutura de Pastas (usando `create-react-app`)**

```bash
meu-app-react/
 ├─ node_modules/   ← Todas as dependências do projeto
 ├─ public/         ← Assets estáticos (index.html, imagens)
 ├─ src/            ← Seus componentes e lógica React
 │  ├─ App.js
 │  ├─ index.js
 │  └─ ...
 ├─ .gitignore
 ├─ package.json    ← Configuração e dependências do projeto
 └─ README.md
```

---

### **Exemplo de Uso – Linha de Comando**

```bash
# 1. Criar um novo app React (usando Vite)
npm create vite@latest meu-app-react -- --template react

# 2. Navegar para o diretório do projeto
cd meu-app-react

# 3. Instalar as dependências
npm install

# 4. Iniciar o servidor de desenvolvimento
npm run dev
```

---

## **IDE**

Um IDE (Ambiente de Desenvolvimento Integrado) para desenvolvimento React fornece ferramentas para agilizar seu fluxo de trabalho, como autocompletar de código inteligente, depuração e integrações com outras ferramentas.

### **IDEs/Editores Populares para React**

| IDE/Editor | Desenvolvedor | Custo | Principais Características |
| --- | --- | --- | --- |
| **Visual Studio Code** | Microsoft | **Gratuito** | Leve, ecossistema extensivo de extensões (ESLint, Prettier, snippets de React), terminal integrado. |
| **WebStorm** | JetBrains | Pago | Análise de código poderosa, refatoração avançada, depurador embutido, excelente suporte para todo o ecossistema web. |
| **Sublime Text** | Sublime HQ | Pago | Rápido, leve e altamente personalizável. |

---

## **Sintaxe Principal (JSX)**

JSX (JavaScript XML) é uma extensão de sintaxe que permite escrever uma marcação semelhante a HTML dentro de um arquivo JavaScript. É a maneira padrão de construir UIs de componentes em React.

### **Conceitos Chave do JSX**

| Conceito | Descrição |
| --- | --- |
| **Componentes** | Pedaços reutilizáveis de UI. São como funções JavaScript que retornam HTML. Os nomes dos componentes devem começar com uma letra maiúscula. |
| **Props** | "Propriedades" são como você passa dados de um componente pai para um componente filho. |
| **State** | A memória privada de um componente. Quando o estado muda, o React renderiza o componente novamente. |
| **Expressões (`{}`)**| Você pode embutir qualquer expressão JavaScript no JSX envolvendo-a em chaves. |
| **Eventos (`onClick`)** | Você pode lidar com eventos do DOM com atributos em camelCase como `onClick`, `onChange`, etc. |

### **Exemplo de um Componente React com JSX**

```jsx
import React, { useState } from 'react';

function MeuBotao({ titulo }) {
  const [contador, setContador] = useState(0);

  function handleClick() {
    setContador(contador + 1);
  }

  return (
    <button onClick={handleClick}>
      {titulo}: Clicado {contador} vezes
    </button>
  );
}

export default function MeuApp() {
  return (
    <div>
      <h1>Meu App</h1>
      <MeuBotao titulo="Contador" />
    </div>
  );
}
```
