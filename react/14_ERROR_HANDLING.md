# 🚨 Tratamento de Erros em React (Error Handling)

Em Java, o bloco `try-catch` é usado para capturar exceções e prevenir que o programa pare de funcionar. Em React, um erro de JavaScript durante a renderização de um componente pode quebrar toda a aplicação. Para lidar com isso de forma elegante, React oferece um mecanismo especial chamado **Error Boundaries**.

> **Definição**: Um **Error Boundary** é um componente React que captura erros de JavaScript em qualquer lugar da sua árvore de componentes filhos, registra esses erros e exibe uma interface de fallback (UI alternativa).

---

## **O Problema: Um Erro em um Componente Quebra Tudo**

Considere este componente que lança um erro intencional:
```jsx
function BuggyComponent() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('Eu quebrei de propósito!');
  }

  return <button onClick={() => setHasError(true)}>Clique para quebrar</button>;
}

function App() {
  return (
    <div>
      <h1>Minha Aplicação</h1>
      <BuggyComponent />
      <p>Outro conteúdo importante...</p>
    </div>
  );
}
```
Quando o botão é clicado, o erro é lançado e **toda a aplicação desaparece**, mostrando uma tela em branco. O `try-catch` tradicional não funciona com erros de renderização.

---

## **A Solução: Criando um Error Boundary**

Um Error Boundary **deve ser um componente de classe** que implementa um ou ambos os seguintes métodos de ciclo de vida:
-   `static getDerivedStateFromError(error)`: Para atualizar o estado e renderizar uma UI de fallback.
-   `componentDidCatch(error, errorInfo)`: Para registrar informações sobre o erro (ex: enviar para um serviço de logging).

**Exemplo de um ErrorBoundary.jsx:**
```jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // 1. Atualiza o estado para que a próxima renderização mostre a UI de fallback.
  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  // 2. Captura o erro e informações adicionais para logging.
  componentDidCatch(error, errorInfo) {
    // Você pode enviar o erro para um serviço de monitoramento aqui
    console.error("Erro capturado pelo Error Boundary:", error, errorInfo);
  }

  render() {
    // 3. Se houver um erro, renderiza a UI de fallback.
    if (this.state.hasError) {
      return (
        <div>
          <h2>Algo deu errado.</h2>
          <p>Por favor, recarregue a página.</p>
          {/* <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details> */}
        </div>
      );
    }

    // 4. Se não, renderiza os componentes filhos normalmente.
    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## **Usando o Error Boundary**

Agora, você pode "envolver" partes da sua aplicação com o `ErrorBoundary`. Se qualquer componente dentro dele (ou seus descendentes) lançar um erro, o `ErrorBoundary` o capturará.

```jsx
import ErrorBoundary from './ErrorBoundary';
import BuggyComponent from './BuggyComponent';

function App() {
  return (
    <div>
      <h1>Minha Aplicação</h1>
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
      <p>Este parágrafo NÃO irá desaparecer se o BuggyComponent quebrar.</p>
    </div>
  );
}
```
Com essa estrutura, apenas o `BuggyComponent` será substituído pela UI de fallback, e o resto da aplicação continuará funcionando.

---

## **O que os Error Boundaries NÃO Capturam**

Eles são como um `catch` para a renderização, mas não capturam erros em:
-   ** manipuladores de eventos** (Event Handlers): Use `try-catch` normal dentro deles.
-   **Código assíncrono** (ex: `setTimeout` ou `fetch` callbacks): Use `.catch()` ou `try-catch` com `async/await`.
-   **Renderização no lado do servidor** (Server Side Rendering).
-   **Erros lançados no próprio Error Boundary**.

### **Exemplo: `try-catch` em um Event Handler**
```jsx
function handleClick() {
  try {
    // Lógica que pode falhar
    JSON.parse("{'json_invalido'}");
  } catch (error) {
    console.error("Erro no clique do botão:", error);
    // Você pode atualizar o estado para mostrar uma mensagem de erro na UI
  }
}
```

---

## **Tratando Erros de API**

Para erros de API (como o `fetch`), a abordagem é usar a gestão de estado que já vimos:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Estado para o erro

  useEffect(() => {
    fetch(`https://api.example.com/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Usuário não encontrado');
        }
        return response.json();
      })
      .then(data => setUser(data))
      .catch(err => setError(err)); // Captura o erro e o coloca no estado
  }, [userId]);

  if (error) {
    return <div>Erro ao carregar o perfil: {error.message}</div>;
  }
  // ...
}
```

> **Resumo**: Use **Error Boundaries** para capturar erros de renderização e proteger sua aplicação de quebrar completamente, mostrando uma UI de fallback. Para erros em **lógica de eventos e código assíncrono (como APIs)**, continue usando os blocos `try-catch` tradicionais e o gerenciamento de estado de erro.
