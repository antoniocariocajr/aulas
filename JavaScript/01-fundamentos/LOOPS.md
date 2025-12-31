# Loops e Iteração no JavaScript

Loops são estruturas que permitem executar o mesmo bloco de código repetidas vezes até que uma condição seja atingida. No JavaScript, temos desde os clássicos `for` e `while` até iteradores modernos e mais legíveis.
**[Voltar para o teoria de fundamentos](./teoria.md)**

---

## 1. Estruturas Clássicas

### 1.1 O Loop `for` (Contador)

É a estrutura mais completa, onde você controla o início, a condição e o incremento.

- **Uso:** Quando você sabe exatamente quantas vezes quer repetir ou precisa do índice numérico.

```javascript
for (let i = 0; i < 5; i++) {
    console.log(`Repetição número ${i}`);
}
```

### 1.2 `while` e `do...while`

- **`while`:** Verifica a condição **antes** de executar. Se for falsa de início, nunca executa.
- **`do...while`:** Executa o código **pelo menos uma vez** antes de verificar a condição.

```javascript
let contador = 0;
while (contador < 3) {
    console.log("Olá");
    contador++;
}
```

---

## 2. Iteradores Modernos (ES6+)

Estes são os preferidos no dia a dia por serem mais limpos e evitarem erros de "fora do índice".

### 2.1 `for...of` (Valores)

Itera sobre os **valores** de um objeto iterável (como Arrays ou Strings).

```javascript
const frutas = ["Maçã", "Uva", "Banana"];
for (let fruta of frutas) {
    console.log(fruta); // Maçã, Uva, Banana
}
```

### 2.2 `for...in` (Chaves/Propriedades)

Itera sobre as **propriedades (chaves)** de um objeto.

```javascript
const carro = { marca: "Ford", ano: 2020 };
for (let chave in carro) {
    console.log(`${chave}: ${carro[chave]}`);
}
```

---

## 3. Controle de Fluxo nos Loops

As vezes precisamos parar um loop antes da hora ou pular uma etapa.

- **`break`:** Para o loop imediatamente e sai dele.
- **`continue`:** Pula a iteração atual e vai direto para a próxima verificação de condição.

```javascript
for (let i = 1; i <= 10; i++) {
    if (i === 5) continue; // Pula o 5
    if (i === 8) break;    // Para de vez no 8
    console.log(i);
}
```

---

## 4. Boas Práticas

1. **Prefira `for...of` para Arrays:** É mais legível e menos propenso a erros que o `for` clássico com `.length`.
2. **Cuidado com Loops Infinitos:** Sempre garanta que a condição do `while` em algum momento se tornará falsa.
3. **Evite `for...in` em Arrays:** Embora funcione, ele pode iterar sobre propriedades herdadas e não garante a ordem dos elementos. Use para **Objetos Literais**.
4. **Imutabilidade com Métodos de Array:** No dia a dia profissional, evite usar loops manuais para transformar arrays. Prefira métodos como `.map()`, `.filter()` e `.forEach()` (vistos no nível Intermediário).

---

> [!IMPORTANT]
> **Dica de Performance:** Sempre que possível, salve o tamanho de um array em uma variável fora do `for` clássico para evitar que o JS recalcule o `.length` a cada volta: `for (let i = 0, len = arr.length; i < len; i++)`.
