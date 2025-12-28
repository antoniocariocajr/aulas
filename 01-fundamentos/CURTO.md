# Curto-Circuito (Short-Circuit) e Lógica Lógica

No JavaScript, os operadores lógicos `&&` (AND) e `||` (OR) fazem mais do que apenas retornar `true` ou `false`. Eles realizam o que chamamos de **Curto-Circuito**, retornando o valor de um dos operandos.
**[Voltar para o teoria de fundamentos](./teoria.md)**

---

## 1. Operador OR (`||`) - Busca pelo "Verdadeiro"

O operador `||` avalia da esquerda para a direita e para no **primeiro valor verdadeiro (Truthy)** que encontrar.

- **Uso Comum:** Definir valores padrão (Defaulting).

```javascript
const nomeInput = "";
const nomeExibicao = nomeInput || "Usuário Anônimo";

console.log(nomeExibicao); // "Usuário Anônimo" porque "" é Falsy.
```

---

## 2. Operador AND (`&&`) - Busca pelo "Falso"

O operador `&&` avalia da esquerda para a direita e para no **primeiro valor falso (Falsy)** que encontrar. Se todos forem verdadeiros, retorna o último.

- **Uso Comum:** Execução condicional simples.

```javascript
const usuarioLogado = true;
usuarioLogado && console.log("Bem-vindo!"); // Só executa o console se logado for true.
```

---

## 3. O Operador Coalescência Nula (`??`)

Diferente do `||`, o `??` (Nullish Coalescing) só considera como falso os valores `null` e `undefined`.

- **Problema do `||`:** Ele considera `0` e `""` como falsos.
- **Solução do `??`:** Se você quer permitir o número zero como valor válido, use `??`.

```javascript
let contador = 0;
let valor1 = contador || 10; // Resulta em 10 (porque 0 é Falsy)
let valor2 = contador ?? 10; // Resulta em 0 (zero não é nulo/undefined)
```

---

## 4. Boas Práticas

1. **Use `||` para Valores Padrão Simples:** Quando você não se importa se strings vazias ou zeros forem substituídos.
2. **Use `??` para Configurações e Números:** Quando o valor `0` ou `false` são opções válidas que não devem ser sobrescritas pelo padrão.
3. **Não exagere no `&&` para lógica:** Embora `condicao && acao()` seja rápido, usar `if` as vezes deixa o código mais claro para outros programadores.
4. **Legibilidade:** Se o curto-circuito ficar muito longo, use parênteses ou quebre em variáveis intermediárias.

---

> [!TIP]
> **Valores Falsy no JS:** `false`, `0`, `-0`, `0n`, `""` (vazia), `null`, `undefined`, e `NaN`. Tudo o que não for isso é considerado **Truthy**.
