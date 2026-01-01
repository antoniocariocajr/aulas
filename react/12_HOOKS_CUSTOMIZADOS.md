# 🎣 Hooks Customizados: Reutilizando Lógica com Estado

Em React, um **Hook Customizado** permite que você extraia e reutilize **lógica com estado (stateful logic)** de um componente.

> **Definição**: Um Hook Customizado é uma função JavaScript cujo nome começa com "**use**" e que pode chamar outros Hooks (como `useState`, `useEffect`, etc.). Ele não é um recurso do React, mas uma convenção de nomenclatura que permite encapsular lógica complexa.

---

## **O Problema: Lógica Repetida em Componentes**

Imagine que vários componentes em sua aplicação precisam saber o tamanho da janela do navegador. Sem Hooks Customizados, você teria que repetir a mesma lógica em cada um deles:

```jsx
// Componente A
function ComponenteA() {
  const [tamanhoJanela, setTamanhoJanela] = useState({ largura: window.innerWidth, altura: window.innerHeight });

  useEffect(() => {
    function handleResize() {
      setTamanhoJanela({ largura: window.innerWidth, altura: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div>A largura é {tamanhoJanela.largura}px</div>;
}

// Componente B teria que repetir todo o useState e useEffect...
```

Isso viola o princípio DRY (Don't Repeat Yourself - Não se Repita).

---

## **A Solução: Criando um Hook Customizado**

Podemos extrair essa lógica para um Hook Customizado chamado `useTamanhoDaJanela`.

**1. Crie uma nova função `use...` (ex: `hooks/useTamanhoDaJanela.js`):**

```javascript
import { useState, useEffect } from 'react';

// O nome deve começar com "use"
export function useTamanhoDaJanela() {
  // 1. A mesma lógica de estado que estava no componente
  const [tamanhoJanela, setTamanhoJanela] = useState({
    largura: window.innerWidth,
    altura: window.innerHeight,
  });

  // 2. O mesmo efeito que estava no componente
  useEffect(() => {
    function handleResize() {
      setTamanhoJanela({
        largura: window.innerWidth,
        altura: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    // Limpeza do efeito
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Array vazio para rodar apenas na montagem e desmontagem

  // 3. Retorne o valor que os componentes precisam
  return tamanhoJanela;
}
```

**2. Use o seu Hook Customizado em qualquer componente:**

Agora, os componentes se tornam muito mais limpos e a lógica é reutilizável.

```jsx
import { useTamanhoDaJanela } from './hooks/useTamanhoDaJanela';

function ComponenteA() {
  // Uma única linha para obter a lógica complexa
  const tamanho = useTamanhoDaJanela();
  return <div>A largura é {tamanho.largura}px</div>;
}

function ComponenteB() {
  const tamanho = useTamanhoDaJanela();
  return <p>A altura é {tamanho.altura}px</p>;
}
```

---

## **Regras dos Hooks Customizados**

1.  **O nome deve começar com `use`**. Isso é crucial. O React depende dessa convenção para verificar se as [Regras dos Hooks](https://pt-br.reactjs.org/docs/hooks-rules.html) estão sendo seguidas.
2.  **Hooks só podem ser chamados de outros Hooks ou de componentes React.** Você não pode chamar um Hook de uma função JavaScript comum.
3.  **Cada chamada a um Hook é completamente independente.** Se o `ComponenteA` e o `ComponenteB` usam `useTamanhoDaJanela`, cada um tem seu próprio estado `tamanhoJanela` isolado.

---

## **Outro Exemplo: `useFetch` para buscar dados**

Outro caso de uso comum é criar um Hook para encapsular a lógica de `fetch`, `loading` e `error`.

```javascript
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    fetch(url)
      .then(response => response.json())
      .then(data => setDados(data))
      .catch(error => setErro(error))
      .finally(() => setCarregando(false));
  }, [url]); // Re-executa se a URL mudar

  return { dados, carregando, erro };
}
```

**Uso no componente:**

```jsx
import { useFetch } from './hooks/useFetch';

function PerfilDeUsuario({ userId }) {
  const { data: usuario, carregando, erro } = useFetch(`https://api.example.com/users/${userId}`);

  if (carregando) return <div>Carregando...</div>;
  if (erro) return <div>Erro ao buscar dados!</div>;

  return <h1>{usuario.name}</h1>;
}
```

---

> **Resumo**: Hooks Customizados são a principal ferramenta do React para **reutilizar lógica com estado**. Se você se encontrar copiando e colando a mesma lógica de `useState` e `useEffect` entre componentes, extraia-a para um Hook Customizado. Eles permitem encapsular um "comportamento" de forma limpa e reutilizável.
