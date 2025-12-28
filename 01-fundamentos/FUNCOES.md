# Funções no JavaScript: O Guia Completo

As funções são os "blocos de construção" fundamentais do JavaScript. Elas permitem agrupar um conjunto de instruções para serem reutilizadas em diferentes partes do código.

---

## 1. Formas de Declarar Funções

### 1.1 Function Declaration (Declaração Comum)

A forma mais básica. Elas sofrem **Hoisting** (pode chamar antes de declarar).

```javascript
function somar(a, b) {
    return a + b;
}
```

### 1.2 Function Expression (Expressão)

A função é armazenada em uma variável. **Não sofre Hoisting** de inicialização.

```javascript
const subrair = function(a, b) {
    return a - b;
};
```

### 1.3 Arrow Functions (`=>`)

Introduzidas no ES6, são mais curtas e modernas. Possuem retorno implícito se tiverem apenas uma linha.

```javascript
const multiplicar = (a, b) => a * b;
```

---

## 2. Parâmetros e Retorno

### 2.1 Parâmetros Padrão

Você pode definir um valor caso nada seja passado para a função.

```javascript
function saudar(nome = "Visitante") {
    console.log(`Olá, ${nome}`);
}
```

### 2.2 O Operador de Retorno (`return`)

O `return` encerra a execução da função e devolve um valor. Se uma função não tiver `return`, ela devolve `undefined` por padrão.

---

## 3. Escopo Léxico e This

- **Escopo Léxico:** Uma função tem acesso às variáveis declaradas ao seu redor (seu contexto de nascimento).
- **O Thís nas Arrow Functions:** Diferente das funções comuns, as Arrow Functions **não criam seu próprio `this`**. Elas herdam o `this` de quem as criou. Isso é vital para trabalhar com objetos e classes.

---

## 4. Boas Práticas

1. **Funções Pequenas:** Uma função deve fazer apenas **uma coisa** e fazê-la bem (Single Responsibility Principle).
2. **Nomes por Ação:** Use verbos para nomear funções (ex: `calcularTotal`, `buscarUsuario`, `validarEmail`).
3. **Evite Efeitos Colaterais:** Tente criar "Funções Puras" (que dependem apenas dos seus argumentos e não alteram nada fora delas).
4. **Use Arrow Functions para Callbacks:** Elas tornam o código mais limpo e evitam problemas com o contexto do `this`.
5. **Documente com JSDoc:** Para funções complexas, use comentários estruturados para explicar parâmetros e retornos.

```javascript
/**
 * Calcula a média de dois números
 * @param {number} n1 - Primeiro número
 * @param {number} n2 - Segundo número
 * @returns {number} A média calculada
 */
const calcularMedia = (n1, n2) => (n1 + n2) / 2;
```
