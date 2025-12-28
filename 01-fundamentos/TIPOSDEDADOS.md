# Tipos de Dados no JavaScript: O Guia Completo

JavaScript é uma linguagem dinamicamente tipada, o que significa que as variáveis não têm um tipo fixo, mas os **valores** sim. Entender como esses tipos se comportam é essencial para evitar bugs de lógica.
**[Voltar para o teoria de fundamentos](./teoria.md)**

---

## 1. As Duas Grandes Categorias

### 1.1 Primitivos (Imutáveis)

São os tipos mais básicos. Quando você altera uma variável com um valor primitivo, você está substituindo o valor inteiro por um novo. Eles são passados por **valor** (cópia).

1. **String:** Textos. Ex: `"Olá"`, `'Mundo'`.
2. **Number:** Todos os números (inteiros e decimais). Ex: `10`, `3.14`.
3. **Boolean:** Valores lógicos `true` ou `false`.
4. **Null:** Ausência intencional de valor.
5. **Undefined:** Valor padrão para variáveis não inicializadas.
6. **Symbol:** Único e imutável (usado para chaves de objeto internas).
7. **BigInt:** Números inteiros extremamente grandes.

### 1.2 Objetos (Referência e Mutáveis)

Objetos, Arrays e Funções. Eles podem conter coleções de dados e comportamentos complexos. Eles são passados por **referência** (ponteiro).

---

## 2. A Batalha: `null` vs `undefined`

Este é um dos pontos que mais confunde iniciantes. Embora pareçam iguais, eles servem para propósitos diferentes:

| Característica | `undefined` | `null` |
| :--- | :--- | :--- |
| **Significado** | "Valor ainda não definido" | "Valor definido como vazio/inexistente" |
| **Origem** | É o valor padrão do JS (automático) | Definido pelo programador (manual) |
| **Tipo (`typeof`)** | `"undefined"` | `"object"` (erro histórico do JS) |
| **Uso Sugerido** | Deixe para o motor do JS identificar falta | Use para "limpar" uma variável propositalmente |

### Exemplo prático

```javascript
let usuario; 
console.log(usuario); // undefined (o JS não sabe quem é)

usuario = null; 
console.log(usuario); // null (eu disse que este usuário não existe agora)
```

---

## 3. Primitivos vs Referência (Na prática)

A maior diferença está em como eles são copiados na memória.

- **Cópia de Valor (Primitivos):** Você cria uma xerox. Se riscar a xerox, o original continua limpo.
- **Cópia de Referência (Objetos):** Você cria um atalho para a mesma pasta. Se deletar um arquivo pela atalho, ele some da pasta original.

```javascript
// Exemplo de Referência (O perigo)
let listaA = [1, 2];
let listaB = listaA;
listaB.push(3);

console.log(listaA); // [1, 2, 3] -> Mudou o original sem querer!
```

---

## 4. Tipagem Dinâmica ("Any") e Declarações Múltiplas

No JavaScript puro, não existe uma palavra-chave `Any` como no TypeScript, porque **toda variável no JavaScript é "Any" por natureza**.

### 4.1 O conceito de "Any" no JS

Uma variável pode começar como um número e depois virar uma string sem que o código quebre automaticamente. Isso dá flexibilidade, mas também exige cuidado.

```javascript
let dado = 10;      // É um Number
dado = "Antônio";   // Agora é uma String (O JS permite isso livremente)
```

### 4.2 Declaração "Dupla" (Union Types no JS)

Quando você diz "essa variável pode ser nula ou um número", você está criando o que chamamos de **Union Type**. No JS, fazemos isso inicializando com `null` ou usando JSDoc para documentar a intenção.

#### Por que inicializar como `null`?

Se você sabe que uma variável vai receber um número depois, mas ela começa "vazia", o ideal é usar `null`.

```javascript
/** @type {number | null} */
let pontuacao = null; // Começa nulo (intencionalmente vazio)

// ... mais tarde no código ...
pontuacao = 100; // Agora recebe o valor numérico
```

### 4.3 Boas Práticas com Tipagem Dinâmica

1. **Use JSDoc:** Ajuda o VS Code a te dar sugestões (IntelliSense).

    ```javascript
    /** @type {string | number} */
    let identificador;
    ```

2. **Evite mudar o tipo sem motivo:** Se uma variável nasceu para ser um `Number`, evite transformá-la em `String`. Crie uma nova variável se necessário.
3. **Checagem de Segurança (Type Guards):** Antes de fazer operações, verifique se o tipo é o esperado.

    ```javascript
    if (typeof pontuacao === "number") {
        console.log(pontuacao.toFixed(2));
    }
    ```

---

## 5. Boas Práticas Gerais

1. **Use `null` para ausência:** Se você quer indicar que um objeto ou valor não existe no momento, atribua `null`. Nunca deixe como `undefined` manualmente.
2. **Cuidado com a Mutação:** Ao copiar arrays ou objetos, use o **Spread Operator (`...`)** para criar uma cópia real.
    - ✅ `const novaLista = [...listaOriginal];`
3. **Checagem de tipo:** Prefira usar métodos específicos ou o operador `typeof`.
    - Lembre-se: `typeof null === "object"`. Para checar null com segurança use `item === null`.
4. **Consistência de Tipos:** Tente não mudar o tipo de uma variável drasticamente (ex: começar com número e depois virar string). Isso torna o código imprevisível.
5. **Use Template Strings:** Para concatenar textos e variáveis, prefira `` `Olá ${nome}` `` em vez de `"Olá " + nome`.

---

> [!IMPORTANT]
> **Dica Pro:** No JavaScript, o valor `0`, `""` (string vazia), `null`, `undefined` e `NaN` são todos considerados **Falsy** (se comportam como `false` em condicionais). Todo o resto é **Truthy**.
