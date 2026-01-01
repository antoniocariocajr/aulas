# 📦 Props e Interfaces: O Contrato Entre Componentes

Em React, as **props** (abreviação de "propriedades") definem o contrato de comunicação entre um componente pai e um filho. Elas são a maneira como os dados fluem de cima para baixo na árvore de componentes.

> **Definição**: Props são um objeto que contém todos os dados e funções que um componente pai passa para um componente filho. Elas são **somente leitura** (read-only) para o filho.

---

## **1. Passando e Recebendo Props**

O componente pai passa props como se fossem atributos de uma tag HTML. O componente filho recebe um único argumento, o objeto `props`.

**Pai (App.jsx):**
```jsx
import CartaoDeUsuario from './CartaoDeUsuario';

function App() {
  return (
    <div>
      <h1>Minha Aplicação</h1>
      <CartaoDeUsuario
        nome="Alice"
        idade={30}
        estaAtivo={true}
        aoSelecionar={() => alert('Usuário Alice selecionado!')}
      />
    </div>
  );
}
```

**Filho (CartaoDeUsuario.jsx):**
```jsx
// Recebendo o objeto 'props' e acessando suas propriedades
function CartaoDeUsuario(props) {
  return (
    <div
      className={props.estaAtivo ? 'card active' : 'card'}
      onClick={props.aoSelecionar}
    >
      <h2>{props.nome}</h2>
      <p>Idade: {props.idade}</p>
    </div>
  );
}

// É comum desestruturar (destructure) as props para um código mais limpo
function CartaoDeUsuario({ nome, idade, estaAtivo, aoSelecionar }) {
  return (
    <div
      className={estaAtivo ? 'card active' : 'card'}
      onClick={aoSelecionar}
    >
      <h2>{nome}</h2>
      <p>Idade: {idade}</p>
    </div>
  );
}
```

---

## **2. Definindo o Contrato com `PropTypes`**

Para garantir que um componente receba as props corretas em desenvolvimento, podemos usar a biblioteca `prop-types`. Ela atua como um verificador em tempo de execução, emitindo avisos no console se o contrato não for cumprido.

**Instalação:** `npm install prop-types`

**Uso:**
```jsx
import PropTypes from 'prop-types';

function CartaoDeUsuario({ nome, idade, estaAtivo, aoSelecionar }) {
  // ... (código JSX do componente)
}

// Definindo o "contrato" das props
CartaoDeUsuario.propTypes = {
  // `nome` deve ser uma string e é obrigatória
  nome: PropTypes.string.isRequired,

  // `idade` deve ser um número
  idade: PropTypes.number,

  // `estaAtivo` deve ser um booleano
  estaAtivo: PropTypes.bool,

  // `aoSelecionar` deve ser uma função
  aoSelecionar: PropTypes.func.isRequired,
};

// Definindo valores padrão
CartaoDeUsuario.defaultProps = {
  idade: 99,
  estaAtivo: false,
};
```
Se o componente `App` tentasse renderizar `<CartaoDeUsuario nome={123} />`, o React mostraria um aviso no console, pois `nome` deveria ser uma `string`.

---

## **3. O Contrato Estático com TypeScript**

TypeScript leva o conceito de contrato a outro nível, fornecendo verificação estática (antes mesmo de o código rodar).

Usando uma `interface` ou `type` do TypeScript, você define a forma exata do objeto de props.

**Exemplo com TypeScript (CartaoDeUsuario.tsx):**
```tsx
import React from 'react';

// 1. Definindo a interface (o contrato) para as props
interface UserCardProps {
  nome: string;
  idade?: number; // '?' torna a prop opcional
  estaAtivo?: boolean;
  aoSelecionar: () => void; // Uma função que não recebe argumentos e não retorna nada
}

// 2. Usando a interface para tipar as props do componente
const CartaoDeUsuario: React.FC<UserCardProps> = ({ nome, idade = 99, estaAtivo = false, aoSelecionar }) => {
  return (
    <div
      className={estaAtivo ? 'card active' : 'card'}
      onClick={aoSelecionar}
    >
      <h2>{nome}</h2>
      <p>Idade: {idade}</p>
    </div>
  );
};

export default CartaoDeUsuario;
```
Se você tentar usar `<CartaoDeUsuario />` sem a prop `nome` ou com o tipo errado, o seu editor de código (e o compilador TypeScript) irá apontar um erro imediatamente.

---

## **Resumo**

> Em React, **props** são o mecanismo para passar dados de pai para filho. Para garantir que essa comunicação ocorra corretamente, você define um "contrato" usando **PropTypes** (para verificação em tempo de execução) ou, idealmente, com **interfaces TypeScript** (para verificação estática).
