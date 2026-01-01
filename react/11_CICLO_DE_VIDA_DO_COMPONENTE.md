# 🔄 O Ciclo de Vida do Componente e o Hook `useEffect`

Assim como um objeto em POO tem um ciclo de vida (construção, uso, destruição), um componente React também tem fases distintas em sua existência na tela. Gerenciar esse ciclo é fundamental para executar "efeitos colaterais".

> **Efeito Colateral (Side Effect)**: Qualquer operação que interage com o "mundo exterior" fora do fluxo de renderização do React. Exemplos incluem:
> - Buscar dados de uma API (`fetch`).
> - Configurar uma assinatura (`setInterval`, WebSockets).
> - Manipular o DOM diretamente (não recomendado, mas às vezes necessário).

O hook `useEffect` é a ferramenta unificada para gerenciar todos os side effects em componentes funcionais. Ele substitui os métodos de ciclo de vida como `componentDidMount`, `componentDidUpdate`, e `componentWillUnmount` das classes.

---

## **A Sintaxe do `useEffect`**

O `useEffect` aceita dois argumentos:
1.  Uma **função de callback** que contém a lógica do efeito.
2.  Um **array de dependências** (opcional) que controla *quando* o efeito deve ser executado novamente.

```jsx
useEffect(() => {
  // A lógica do seu efeito vai aqui.

  return () => {
    // Função de limpeza opcional.
  };
}, [dependencia1, dependencia2]); // Array de dependências.
```

---

## **1. "Montagem": Executando um Efeito Apenas Uma Vez**

Para executar uma lógica logo após o componente ser montado (inserido na tela pela primeira vez), forneça um **array de dependências vazio (`[]`)**.

-   **Análogo em Classes React**: `componentDidMount`.

**Uso Comum**: Buscar dados iniciais.

```jsx
import { useState, useEffect } from 'react';

function PerfilDeUsuario({ userId }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Esta função executa apenas uma vez, após a primeira renderização.
    console.log('Componente montado! Buscando dados...');
    fetch(`https://api.example.com/users/${userId}`)
      .then(response => response.json())
      .then(data => setUsuario(data));
  }, []); // Array vazio = "execute apenas na montagem"

  if (!usuario) {
    return <div>Carregando...</div>;
  }

  return <h1>{usuario.name}</h1>;
}
```

---

## **2. "Atualização": Executando um Efeito em Resposta a Mudanças**

Para re-executar o efeito sempre que uma `prop` ou `state` específico mudar, coloque essa variável no **array de dependências**.

-   **Análogo em Classes React**: `componentDidUpdate`.

**Uso Comum**: Re-buscar dados quando um ID muda.

```jsx
function PerfilDeUsuario({ userId }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Este efeito executa na montagem E sempre que `userId` mudar.
    console.log(`Buscando dados para o usuário: ${userId}`);
    fetch(`https://api.example.com/users/${userId}`)
      .then(response => response.json())
      .then(data => setUsuario(data));
  }, [userId]); // Dependência: `userId`

  // ...
}
```

---

## **3. "Desmontagem": Limpando o Efeito**

Se o seu efeito configurar algo que precisa ser "desfeito" (como um timer ou uma assinatura), você pode retornar uma **função de limpeza** de dentro do `useEffect`. O React executará essa função antes de o componente ser removido da tela.

-   **Análogo em Classes React**: `componentWillUnmount`.

**Uso Comum**: Limpar timers ou listeners.

```jsx
import { useState, useEffect } from 'react';

function Cronometro() {
  const [tempo, setTempo] = useState(0);

  useEffect(() => {
    // Configura o efeito: inicia um intervalo.
    const intervalId = setInterval(() => {
      setTempo(t => t + 1);
    }, 1000);

    // Retorna a função de limpeza.
    // Ela será chamada quando o componente for desmontado.
    return () => {
      console.log('Limpando o cronômetro!');
      clearInterval(intervalId);
    };
  }, []); // Array vazio, pois queremos que o cronômetro seja configurado apenas uma vez.

  return <div>Cronômetro: {tempo}s</div>;
}
```

---

## **Cuidado: O Efeito que Roda a Cada Renderização**

Se você **omitir o array de dependências**, o efeito será executado **após cada renderização** do componente. Isso raramente é o que você quer e pode causar loops infinitos se o efeito atualizar o estado.

```jsx
// CUIDADO: Roda a cada renderização!
useEffect(() => {
  console.log('Componente foi re-renderizado.');
});
```

---

## **Resumo do Ciclo de Vida com `useEffect`**

| Fase do Ciclo de Vida | Equivalente em Classe | Como fazer com `useEffect` |
| --- | --- | --- |
| **Montagem** (Mounting) | `componentDidMount` | `useEffect(() => { ... }, [])` |
| **Atualização** (Updating) | `componentDidUpdate` | `useEffect(() => { ... }, [prop, state])` |
| **Desmontagem** (Unmounting)| `componentWillUnmount` | `useEffect(() => { return () => { ... } }, [])`|

> **Resumo**: O `useEffect` permite que você "engate" lógicas no ciclo de vida do seu componente. Use o **array de dependências** para controlar precisamente *quando* seus efeitos colaterais devem rodar, e retorne uma **função de limpeza** para evitar vazamentos de memória.
