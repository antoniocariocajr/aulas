# 🎣 Custom Hooks: Reutilizando Lógica com Estado

Em Java, uma `Interface Funcional` permite que você passe "comportamentos" como lambdas, promovendo a reutilização de código. Em React, um **Custom Hook** permite que você extraia e reutilize **lógica com estado (stateful logic)** de um componente.

> **Definição**: Um Custom Hook é uma função JavaScript cujo nome começa com "**use**" e que pode chamar outros Hooks (como `useState`, `useEffect`, etc.). Ele não é um recurso do React, mas uma convenção de nomenclatura que permite encapsular lógica complexa.

---

## **O Problema: Lógica Repetida em Componentes**

Imagine que vários componentes em sua aplicação precisam saber o tamanho da janela do navegador. Sem Custom Hooks, você teria que repetir a mesma lógica em cada um deles:

```jsx
// Componente A
function ComponenteA() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div>A largura é {windowSize.width}px</div>;
}

// Componente B teria que repetir todo o useState e useEffect...
```

Isso viola o princípio DRY (Don't Repeat Yourself).

---

## **A Solução: Criando um Custom Hook**

Podemos extrair essa lógica para um Custom Hook chamado `useWindowSize`.

**1. Crie uma nova função `use...` (ex: `hooks/useWindowSize.js`):**

```javascript
import { useState, useEffect } from 'react';

// O nome deve começar com "use"
export function useWindowSize() {
  // 1. A mesma lógica de estado que estava no componente
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 2. O mesmo efeito que estava no componente
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    // Limpeza do efeito
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Array vazio para rodar apenas na montagem e desmontagem

  // 3. Retorne o valor que os componentes precisam
  return windowSize;
}
```

**2. Use o seu Custom Hook em qualquer componente:**

Agora, os componentes se tornam muito mais limpos e a lógica é reutilizável.

```jsx
import { useWindowSize } from './hooks/useWindowSize';

function ComponenteA() {
  // Uma única linha para obter a lógica complexa
  const size = useWindowSize();
  return <div>A largura é {size.width}px</div>;
}

function ComponenteB() {
  const size = useWindowSize();
  return <p>A altura é {size.height}px</p>;
}
```

---

## **Regras dos Custom Hooks**

1.  **O nome deve começar com `use`**. Isso é crucial. O React depende dessa convenção para verificar se as [Regras dos Hooks](https://reactjs.org/docs/hooks-rules.html) estão sendo seguidas.
2.  **Hooks só podem ser chamados de outros Hooks ou de componentes React.** Você não pode chamar um Hook de uma função JavaScript comum.
3.  **Cada chamada a um Hook é completamente independente.** Se o `ComponenteA` e o `ComponenteB` usam `useWindowSize`, cada um tem seu próprio estado `windowSize` isolado.

---

## **Outro Exemplo: `useFetch` para buscar dados**

Outro caso de uso comum é criar um Hook para encapsular a lógica de `fetch`, `loading` e `error`.

```javascript
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [url]); // Re-executa se a URL mudar

  return { data, loading, error };
}
```

**Uso no componente:**

```jsx
import { useFetch } from './hooks/useFetch';

function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`https://api.example.com/users/${userId}`);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao buscar dados!</div>;

  return <h1>{user.name}</h1>;
}
```

---

> **Resumo**: Custom Hooks são a principal ferramenta do React para **reutilizar lógica com estado**. Se você se encontrar copiando e colando a mesma lógica de `useState` e `useEffect` entre componentes, extraia-a para um Custom Hook. Assim como interfaces funcionais em Java, eles permitem encapsular um "comportamento" de forma limpa e reutilizável.
