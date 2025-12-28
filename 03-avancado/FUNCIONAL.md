# Programação Funcional (PF) no JavaScript

A Programação Funcional foca em **"o quê fazer"** em vez de **"como fazer"**, tratando o código como uma série de transformações matemáticas. No JavaScript, ela é amplamente utilizada em bibliotecas como React e Redux.
**[Voltar para o teoria de avançado](./teoria.md)**

---

## 1. Funções Puras (Pure Functions)

Uma função é pura se:

1. Dada a mesma entrada, sempre retorna a mesma saída.
2. Não causa **efeitos colaterais** (não altera variáveis globais, o DOM ou arquivos).

```javascript
// Pura
const somar = (a, b) => a + b;

// Impura (depende de algo externo)
let total = 0;
const somarAoTotal = (a) => total += a;
```

---

## 2. Imutabilidade

Na PF, nunca alteramos dados existentes. Em vez de mudar um array, criamos um novo com a alteração desejada. Isso torna o código previsível e fácil de testar.

```javascript
const original = [1, 2, 3];
// ❌ Ruim: original.push(4)
// ✅ Bom: 
const novo = [...original, 4];
```

---

## 3. Composição de Funções (Composition)

É a técnica de combinar funções pequenas e simples para criar lógicas complexas.

- **Dica:** Imagine funções como peças de Lego.

```javascript
const trim = s => s.trim();
const reverse = s => s.split('').reverse().join('');

const limparEReverter = s => reverse(trim(s));
```

---

## 4. Currying

É o processo de transformar uma função que recebe múltiplos argumentos em uma sequência de funções que recebem um argumento de cada vez.

```javascript
const multiplicar = a => b => a * b;
const dobrar = multiplicar(2);
console.log(dobrar(5)); // 10
```

---

## 5. Boas Práticas

1. **Evite Estados Globais:** Passe tudo o que a função precisa via argumentos.
2. **Use Métodos Imutáveis:** Prefira `.map`, `.filter`, `.reduce` em vez de loops `for` que alteram variáveis externas.
3. **Separe a Lógica:** Deixe as funções que calculam coisas separadas das funções que mexem no DOM (efeitos colaterais).
4. **Const em tudo:** Use `const` para reforçar a ideia de que os valores não devem mudar após criados.
