# 🔧 **Operadores em React (e JavaScript)**

> **Definição Rápida**:
> **Operadores** em JavaScript são símbolos especiais usados para realizar operações em operandos (valores e variáveis). Em React, eles são essenciais para renderização condicional, manipulação de dados e manipulação de eventos dentro dos componentes.

---

## **Principais Operadores para Desenvolvimento React**

Embora o JavaScript tenha muitos operadores, alguns são fundamentais para escrever código React limpo e eficaz.

### **1. E Lógico (`&&`) para Renderização Condicional**

Esta é a maneira mais comum de renderizar condicionalmente um componente ou elemento. Se a expressão à esquerda for "truthy" (verdadeira), a expressão à direita é renderizada. Se for "falsy" (falsa) (ex: `false`, `0`, `null`, `undefined`, `''`), nada é renderizado.

```jsx
function CaixaDeEntrada({ mensagensNaoLidas }) {
  return (
    <div>
      <h1>Olá!</h1>
      {mensagensNaoLidas.length > 0 &&
        <h2>
          Você tem {mensagensNaoLidas.length} mensagens não lidas.
        </h2>
      }
    </div>
  );
}
// Renderiza o h2 apenas se o array tiver itens.
```

> **Aviso:** Tenha cuidado com `0`. A expressão `0 && <Component />` irá renderizar um `0` na tela, o que geralmente não é o que você deseja.

---

### **2. Operador Ternário (`? :`) para Lógica `if-else` Inline**

Quando você precisa de uma condição `if-else` dentro do seu JSX, o operador ternário é a ferramenta perfeita.

```jsx
function StatusDoUsuario({ estaLogado }) {
  return (
    <div>
      {estaLogado ? <p>Bem-vindo de volta!</p> : <p>Por favor, faça o login.</p>}
    </div>
  );
}
```

---

### **3. Igualdade: `===` vs. `==`**

Sempre use o operador de **Igualdade Estrita (`===`)**.

- `===` (Igualdade Estrita): Retorna `true` apenas se ambos os operandos tiverem o mesmo tipo e o mesmo valor.
- `==` (Igualdade Frouxa): Tenta converter os operandos para um tipo comum antes de comparar, o que pode levar a resultados inesperados.

```javascript
5 === 5    // true
5 === '5'  // false (tipos diferentes)

5 == 5     // true
5 == '5'   // true (a string '5' é convertida para o número 5) - EVITE ISSO!
```

---

### **4. Operador de Propagação (`...`)**

O operador de propagação é crucial para trabalhar com o estado de forma **imutável**. Ele permite que você crie novas cópias de arrays e objetos.

**Para Arrays:**

```jsx
const tarefasAntigas = ['Aprender React'];
const novasTarefas = [...tarefasAntigas, 'Dominar o Estado']; // ['Aprender React', 'Dominar o Estado']
```

**Para Objetos:**

```jsx
const usuarioAntigo = { id: 1, nome: 'Alex' };
const usuarioAtualizado = { ...usuarioAntigo, nome: 'Alexis' }; // { id: 1, nome: 'Alexis' }
```

---

### **5. Encadeamento Opcional (`?.`)**

Acesse com segurança propriedades aninhadas de um objeto sem causar um erro se uma propriedade intermediária for `null` ou `undefined`.

```jsx
// Sem o encadeamento opcional, isso quebraria se 'usuario.perfil' for indefinido
const rua = usuario.perfil.endereco.rua;

// COM o encadeamento opcional, 'rua' será apenas 'undefined' se qualquer parte estiver faltando
const rua = usuario?.perfil?.endereco?.rua;
```

---

### **6. Operador de Coalescência Nula (`??`)**

Fornece um valor padrão para uma variável apenas se ela for `null` ou `undefined`. Ele ignora outros valores "falsy" como `0`, `''` ou `false`.

```javascript
// Usando || (OU Lógico)
const quantidade = 0 || 1; // o resultado é 1, porque 0 é falsy. Isso geralmente é um bug.

// Usando ?? (Coalescência Nula)
const quantidade = 0 ?? 1; // o resultado é 0, porque 0 não é nulo nem indefinido.
```

---

### **Outros Operadores Comuns**

- **Aritméticos:** `+`, `-`, `*`, `/`, `%` (usados para cálculos).
- **Concatenação de Strings:** `+` (ou preferencialmente literais de template: `` `Olá, ${nome}` ``).
- **Atribuição:** `=`, `+=`, `-=` (usados para atualizar variáveis, embora menos comuns com os setters de estado do React).

---

## **Resumo**

> Em React, domine os **operadores lógicos (`&&`, `? :`)** para renderização, o **operador de propagação (`...`)** para atualizações de estado, e operadores modernos do JS como **`?.`** e **`??`** para um código mais seguro e limpo. **Sempre prefira `===`** para comparações.
