# 📦 Props: O Contrato de Comunicação Entre Componentes

Em Java, uma `interface` define um contrato que uma classe deve seguir. Em React, as **props** (abreviação de "properties") definem o contrato de comunicação entre um componente pai e um componente filho. O pai passa dados para o filho através das props, e o filho os recebe como um objeto.

> **Definição**: Props são um objeto que contém todos os dados e funções que um componente pai passa para um componente filho. Elas são **somente leitura** (read-only) para o filho.

---

## **1. Passando e Recebendo Props**

O componente pai passa props como se fossem atributos de uma tag HTML. O componente filho recebe um único argumento, o objeto `props`.

**Pai (App.jsx):**
```jsx
import UserCard from './UserCard';

function App() {
  return (
    <div>
      <h1>Minha Aplicação</h1>
      <UserCard
        name="Alice"
        age={30}
        isActive={true}
        onSelect={() => alert('Usuário Alice selecionado!')}
      />
    </div>
  );
}
```

**Filho (UserCard.jsx):**
```jsx
// Recebendo o objeto 'props' e acessando suas propriedades
function UserCard(props) {
  return (
    <div
      className={props.isActive ? 'card active' : 'card'}
      onClick={props.onSelect}
    >
      <h2>{props.name}</h2>
      <p>Idade: {props.age}</p>
    </div>
  );
}

// É comum desestruturar (destructure) as props para um código mais limpo
function UserCard({ name, age, isActive, onSelect }) {
  return (
    <div
      className={isActive ? 'card active' : 'card'}
      onClick={onSelect}
    >
      <h2>{name}</h2>
      <p>Idade: {age}</p>
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

function UserCard({ name, age, isActive, onSelect }) {
  // ... (código JSX do componente)
}

// Definindo o "contrato" das props
UserCard.propTypes = {
  // `name` deve ser uma string e é obrigatória
  name: PropTypes.string.isRequired,

  // `age` deve ser um número
  age: PropTypes.number,

  // `isActive` deve ser um booleano
  isActive: PropTypes.bool,

  // `onSelect` deve ser uma função
  onSelect: PropTypes.func.isRequired,
};

// Definindo valores padrão (similar a métodos default em interfaces)
UserCard.defaultProps = {
  age: 99,
  isActive: false,
};
```
Se o componente `App` tentasse renderizar `<UserCard name={123} />`, o React mostraria um aviso no console, pois `name` deveria ser uma `string`.

---

## **3. O Contrato Estático com TypeScript**

TypeScript leva o conceito de contrato a outro nível, fornecendo verificação estática (antes mesmo de o código rodar). Esta é a analogia mais direta a uma `interface` em Java.

Usando uma `interface` ou `type` do TypeScript, você define a forma exata do objeto de props.

**Exemplo com TypeScript (UserCard.tsx):**
```tsx
import React from 'react';

// 1. Definindo a interface (o contrato) para as props
interface UserCardProps {
  name: string;
  age?: number; // '?' torna a prop opcional
  isActive?: boolean;
  onSelect: () => void; // Uma função que não recebe argumentos e não retorna nada
}

// 2. Usando a interface para tipar as props do componente
const UserCard: React.FC<UserCardProps> = ({ name, age = 99, isActive = false, onSelect }) => {
  return (
    <div
      className={isActive ? 'card active' : 'card'}
      onClick={onSelect}
    >
      <h2>{name}</h2>
      <p>Idade: {age}</p>
    </div>
  );
};

export default UserCard;
```
Se você tentar usar `<UserCard />` sem a prop `name` ou com o tipo errado, o seu editor de código (e o compilador TypeScript) irá apontar um erro imediatamente.

---

## **Resumo Comparativo**

| Conceito | Java | React (com PropTypes) | React (com TypeScript) |
| --- | --- | --- | --- |
| **Definição** | `interface Veiculo { void ligar(); }` | `Component.propTypes = { ligar: PropTypes.func }` | `interface Props { ligar: () => void; }` |
| **Implementação** | `class Carro implements Veiculo` | `<Componente ligar={...} />` | `const C: React.FC<Props> = ({ ligar }) => ...` |
| **Verificação** | Compilador (estático) | Console do navegador (tempo de execução) | Editor/Compilador (estático) |
| **Obrigatoriedade**| Compilador força a implementação | `isRequired` gera um aviso | O compilador gera um erro |

---

> **Resumo**: Em React, **props** são o mecanismo para passar dados de pai para filho. Para garantir que essa comunicação ocorra corretamente, você define um "contrato" usando **PropTypes** (para verificação em tempo de execução) ou, idealmente, com **interfaces TypeScript** (para verificação estática), que é o paralelo mais próximo das interfaces em Java.
