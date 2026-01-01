# ⚛️ Componentes: Os Blocos de Construção do React

Em React, um **componente** é o "molde" para uma parte da interface do usuário. É um bloco de código autocontido e reutilizável que define como uma parte da UI deve parecer e se comportar. Este é o equivalente direto de uma **classe** na Programação Orientada a Objetos.

Se uma aplicação fosse uma casa feita de blocos de Lego, cada bloco individual seria um componente.

## Estrutura de um Componente React

Um componente React moderno é tipicamente uma função JavaScript. Ele é composto por:
1.  **Props**: Entradas para o componente, semelhantes aos argumentos de um construtor.
2.  **State**: Os dados internos do componente, como atributos ou variáveis de instância.
3.  **Lógica**: Funções e cálculos que determinam o comportamento do componente.
4.  **JSX**: O "valor de retorno", uma descrição da UI que o componente irá renderizar.

```jsx
import React, { useState } from 'react';

// 'PerfilDeUsuario' é o componente (o molde)
function PerfilDeUsuario({ nomeInicial, idadeInicial }) { // 1. Props são as entradas

  // 2. State são os dados internos
  const [nome, setNome] = useState(nomeInicial);
  const [idade, setIdade] = useState(idadeInicial);

  // 3. Lógica/Comportamento (um manipulador de eventos)
  function handleAniversario() {
    setIdade(idade + 1);
    console.log(`${nome} agora tem ${idade + 1} anos.`);
  }

  // 4. JSX é a saída renderizada
  return (
    <div className="perfil-de-usuario">
      <p>Nome: {nome}</p>
      <p>Idade: {idade}</p>
      <button onClick={handleAniversario}>Fazer Aniversário</button>
    </div>
  );
}
```

---

## **Props (Propriedades)**

**Props** (abreviação de "propriedades") são como os componentes recebem dados de seus pais. Elas são **somente leitura**. Um componente nunca deve modificar suas próprias props.

-   **Analogia**: Props são como os argumentos passados para uma função ou um construtor de classe.

```jsx
// Componente pai passando props
function App() {
  return <PerfilDeUsuario nomeInicial="Alice" idadeInicial={30} />;
}
```
Dentro de `PerfilDeUsuario`, `nomeInicial` é "Alice" e `idadeInicial` é 30.

---

## **State**

**State** são dados gerenciados *dentro* do componente. Ele representa informações que podem mudar ao longo do tempo, geralmente em resposta a ações do usuário. Quando o estado muda, o React automaticamente renderiza o componente novamente.

-   **Analogia**: O estado é como as variáveis de instância ou atributos de um objeto. Cada instância tem seu próprio estado.

No exemplo `PerfilDeUsuario`, `nome` e `idade` são partes do estado, gerenciadas pelo Hook `useState`.

---

## **Instância**

Uma **instância** é um elemento renderizado concreto criado a partir de um molde de componente.

Se `PerfilDeUsuario` é a classe (o molde), então toda vez que você usa `<PerfilDeUsuario />` em sua aplicação, você está criando uma nova e independente **instância** daquele componente. Cada instância tem seu próprio estado separado.

### **Analogia**

| Componente React (Molde) | Instância React (Elemento Renderizado) |
| --- | --- |
| `function PerfilDeUsuario() { ... }` | `<PerfilDeUsuario nome="Alice" />` |
| Descreve **como** um perfil funciona | **Um** perfil de usuário específico na tela |

### **Na Prática**

```jsx
function App() {
  return (
    <div>
      {/* Instância 1: Seu estado é independente */}
      <PerfilDeUsuario nomeInicial="Alice" idadeInicial={30} />

      {/* Instância 2: Seu estado também é independente */}
      <PerfilDeUsuario nomeInicial="Bob" idadeInicial={42} />
    </div>
  );
}
```
Se você clicar no botão "Fazer Aniversário" para o perfil de Alice, apenas a idade dela aumentará. O perfil de Bob permanece inalterado porque eles são instâncias separadas com seu próprio estado privado.
