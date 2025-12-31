# Funções Avançadas e Conceitos de Escopo

No nível intermediário, precisamos entender como o JavaScript lida com o ciclo de vida das variáveis e como as funções podem ser usadas como ferramentas poderosas.
**[Voltar para o teoria de intermediário](./teoria.md)**

---

## 1. Higher-Order Functions (HOF)

Uma HOF é uma função que **recebe outra função** como argumento ou **retorna uma função**.

- **Exemplo (Recebendo):** `map`, `filter`, `addEventListener`.
- **Exemplo (Retornando):** Fábricas de funções.

```javascript
function criarSaudacao(saudacao) {
    return function(nome) {
        console.log(`${saudacao}, ${nome}!`);
    };
}
const saudarOi = criarSaudacao("Oi");
saudarOi("Beto"); // "Oi, Beto!"
```

---

## 2. Closures (Fechamentos)

Uma **Closure** acontece quando uma função interna "se lembra" do ambiente (variáveis) onde foi criada, mesmo depois que a função pai já terminou de executar.

- **Utilidade:** Criar variáveis privadas.

```javascript
function meuContador() {
    let cont = 0;
    return () => ++cont; // Tem acesso a 'cont' pra sempre
}
const contagem = meuContador();
```

---

## 3. Recursividade (Recursion)

É quando uma função chama a si mesma.

- **Regra de Ouro:** Sempre tenha uma **condição de parada**, senão você terá um erro de *Stack Overflow* (estouro de pilha).

```javascript
function contagemRegressiva(n) {
    if (n === 0) return console.log("Fogo!");
    console.log(n);
    contagemRegressiva(n - 1);
}
```

---

## 4. O comportamento do `this` (Revisão Intermediária)

- **Função Comum:** O `this` depende de **quem chama**. Se ninguém chama (callback isolado), ele vira `undefined` ou `Window`.
- **Arrow Function:** O `this` é **fixo** (léxico). Ele sempre vale o que valia no momento que a função foi escrita.

---

## 5. Boas Práticas

1. **Não abuse da Recursividade:** Em JavaScript, recursão profunda pode ser lenta. Para listas gigantes, prefira loops.
2. **Encapsule com Closures:** Use para esconder lógica interna que não deve ser alterada por fora.
3. **Código Declarativo:** Tente usar HOFs como `.map` em vez de escrever loops manuais. Isso torna o código mais "o que fazer" e menos "como fazer".
4. **Arrow Functions em Callbacks:** Use sempre para evitar a perda do contexto do `this` em eventos ou timeouts.
