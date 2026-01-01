# **Introduction to React**

React is a **component-based** JavaScript library for building user interfaces. It is **declarative**, making your code more predictable and easier to debug. It's one of the most popular libraries for frontend development, created and maintained by Meta.

## 📦 **The React Development Environment**

As a React developer, you'll use a set of tools to create, build, and run your applications. Unlike Java's JDK, the React ecosystem is a collection of open-source tools.

> **Node.js & npm/yarn:** Node.js is a JavaScript runtime that allows you to run JavaScript outside of a browser. It comes with npm (Node Package Manager), a tool for managing project dependencies. Yarn is a popular alternative to npm.

Key tools in the React ecosystem include:

* **`create-react-app` / `Vite`:** Scaffolding tools that create a new React project with a pre-configured development environment.
* **Babel:** A JavaScript compiler that transforms modern JavaScript (including JSX) into browser-compatible code.
* **Webpack / Rollup:** Module bundlers that package your code and assets for production.

### **Core Components of a React Project**

| Component | Function | Files / Folders |
| --- | --- | --- |
| **`package.json`** | Lists project dependencies and scripts. | `package.json` |
| **`node_modules/`** | Contains all the downloaded project dependencies. | `node_modules/` |
| **`src/`** | Contains the source code of your application. | `src/` |
| **`public/`** | Contains the main HTML file and other static assets. | `public/` |
| **`build/` or `dist/`**| Contains the optimized, production-ready code. | `build/` or `dist/` |

---

### **Instalação típica – estrutura de pastas (usando `create-react-app`)**

```bash
my-react-app/
 ├─ node_modules/   ← All project dependencies
 ├─ public/         ← Static assets (index.html, images)
 ├─ src/            ← Your React components and logic
 │  ├─ App.js
 │  ├─ index.js
 │  └─ ...
 ├─ .gitignore
 ├─ package.json    ← Project configuration and dependencies
 └─ README.md
```

---

### **Exemplo de uso – linha de comando**

```bash
# 1. Create a new React app (using Vite)
npm create vite@latest my-react-app -- --template react

# 2. Navigate to the project directory
cd my-react-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

---

## **IDE**

An IDE (Integrated Development Environment) for React development provides tools to streamline your workflow, such as intelligent code completion, debugging, and integrations with other tools.

### **Popular IDEs/Editors for React**

| IDE/Editor | Developer | Cost | Key Features |
| --- | --- | --- | --- |
| **Visual Studio Code** | Microsoft | **Free** | Lightweight, extensive ecosystem of extensions (ESLint, Prettier, React snippets), integrated terminal. |
| **WebStorm** | JetBrains | Paid | Powerful code analysis, advanced refactoring, built-in debugger, excellent support for the entire web ecosystem. |
| **Sublime Text** | Sublime HQ | Paid | Fast, lightweight, and highly customizable. |

---

## **Core Syntax (JSX)**

JSX (JavaScript XML) is a syntax extension that lets you write HTML-like markup inside a JavaScript file. It's the standard way to build component UIs in React.

### **Key JSX Concepts**

| Concept | Description |
| --- | --- |
| **Components** | Reusable pieces of UI. They are like JavaScript functions that return HTML. Component names must start with a capital letter. |
| **Props** | "Properties" are how you pass data from a parent component to a child component. |
| **State** | A component's private memory. When state changes, React re-renders the component. |
| **Expressions (`{}`)**| You can embed any JavaScript expression in JSX by wrapping it in curly braces. |
| **Events (`onClick`)** | You can handle DOM events with camelCased attributes like `onClick`, `onChange`, etc. |

### **Example of a React Component with JSX**

```jsx
import React, { useState } from 'react';

function MyButton({ title }) {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      {title}: Clicked {count} times
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>My App</h1>
      <MyButton title="Counter" />
    </div>
  );
}
```
