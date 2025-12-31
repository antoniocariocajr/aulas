# Operadores e Estruturas Condicionais no JavaScript

Controlar o fluxo de execução é o que permite que seu código tome decisões. Para isso, utilizamos Operadores para comparar dados e Estruturas Condicionais para agir conforme os resultados.
**[Voltar para o teoria de fundamentos](./teoria.md)**

---

## 1. Operadores: As Ferrramentas de Comparação

### 1.1 Operadores Aritméticos

Usados para cálculos matemáticos básicos.

- `+`, `-`, `*`, `/`: Os básicos.
- `%` (Módulo): Retorna o **resto** da divisão. Útil para saber se um número é par/ímpar.
- `**` (Potência): Ex: `2 ** 3 = 8`.

### 1.2 Operadores de Comparação

Servem para testar valores e retornam sempre um **Boolean** (`true` ou `false`).

- `>` e `<`: Maior e menor.
- `>=` e `<=`: Maior/igual e menor/igual.
- `==` e `!=`: Comparação ampla (evite coerção indesejada).
- `===` e `!==`: **Comparação estrita** (compara valor e tipo). **Sempre prefira estes!**

### 1.3 Operadores Lógicos

Combinam múltiplas condições.

- `&&` (AND): Todas precisam ser `true`.
- `||` (OR): Pelo menos uma precisa ser `true`.
- `!` (NOT): Inverte o valor booleano.

---

## 2. Estruturas Condicionais: Tomando Decisões

### 2.1 O Clássico `if / else if / else`

Ideal para condições complexas e variadas.

```javascript
let velocidade = 80;

if (velocidade > 100) {
    console.log("Multado por alta velocidade!");
} else if (velocidade > 40) {
    console.log("Velocidade normal.");
} else {
    console.log("Muito devagar.");
}
```

### 2.2 O Eficiente `switch / case`

Melhor quando você tem uma **única variável** que precisa ser comparada com vários valores exatos.

- **Diferença crucial:** O `switch` utiliza a comparação estrita (`===`).
- **Não esqueça o `break`:** Sem ele, o JS continua executando os casos abaixo (fall-through).

```javascript
let diaSemana = 1;

switch (diaSemana) {
    case 1:
        console.log("Domingo");
        break;
    case 2:
        console.log("Segunda");
        break;
    default:
        console.log("Outro dia");
}
```

### 2.3 O Prático Operador Ternário

Uma forma curta de fazer um `if/else`. Use para atribuições simples de uma linha.

```javascript
// condicao ? valor_se_verdade : valor_se_falso
const status = idade >= 18 ? "Adulto" : "Menor";
```

---

## 3. Uso em Declaração de Variáveis

Diferente de outras linguagens, no JavaScript o `if` e o `switch` são **declarações** (statements) e não **expressões**. Isso significa que você não pode atribuir o resultado de um `if` diretamente a uma constante.

Para resolver isso, existem três padrões principais:

### 3.1 O Padrão `let` (Declaração Externa)

Você declara a variável com `let` fora do bloco e atribui o valor dentro.

```javascript
let categoria;
if (pontos > 100) {
    categoria = "Premium";
} else {
    categoria = "Comum";
}
```

### 3.2 O Operador Ternário (O "if" das Atribuições)

Este é o modo preferido quando a decisão é simples, pois permite usar `const`.

```javascript
// ✅ Limpo e permite imutabilidade
const categoria = pontos > 100 ? "Premium" : "Comum";
```

### 3.3 Inicialização com `switch`

Semelhante ao `if`, você usa o `let` externo e preenche o valor nos casos.

```javascript
let mensagem;
switch (status) {
    case 'sucesso':
        mensagem = 'Operação concluída!';
        break;
    case 'erro':
        mensagem = 'Algo deu errado.';
        break;
    default:
        mensagem = 'Aguardando...';
}
```

---

## 4. Boas Práticas: Quando usar cada uma?

1. **Evite Condicionais Aninhadas (Pyramid of Doom):** Se você tem muitos `if` dentro de outros, tente usar o padrão **Guard Clause** (retorne cedo se a condição não for batida).
2. **Sempre prefira `===`:** Evite bugs causados pela coerção de tipo do `==`.
3. **Use nomes descritivos em booleanos:** Comece com `is`, `has` ou `should` (ex: `isUsuarioAtivo`). Isso deixa o `if` parecendo uma frase em inglês.
4. **Não abuse do Ternário:** Se a lógica for longa ou tiver muitos caracteres, use o `if` tradicional para manter a legibilidade.
5. **Use o `default` no Switch:** Sempre forneça um caso padrão para evitar comportamentos inesperados quando nenhum `case` for atingido.

---

> [!TIP]
> **Dica de Performance:** O motor do JavaScript costuma otimizar o `switch` transformando-o em algo parecido com uma tabela de busca (hash table), o que pode ser levemente mais rápido que muitos `if/else` encadeados para valores fixos.
