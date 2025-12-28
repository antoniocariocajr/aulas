# Variáveis e Escopo no JavaScript

Entender como as variáveis funcionam é o passo mais importante para dominar o JavaScript. Este arquivo detalha os três tipos de declaração e as regras de escopo que regem a linguagem.

---

## 1. Por que existem três formas? (`var`, `let`, `const`)

O JavaScript nasceu apenas com o `var`. No entanto, com o crescimento da linguagem e a complexidade das aplicações, o `var` mostrou-se problemático devido ao seu escopo permissivo. O ES6 (2015) introduziu `let` e `const` para tornar o código mais previsível e seguro.

### 1.1 `var` (O Legado)

- **Função:** Declarar variáveis com **escopo de função**.
- **Problema:** Ignora blocos como `if`, `for` e `while`. Se declarada dentro de um `if`, ela "vaza" para fora dele.
- **Hoisting:** É "içada" para o topo do seu contexto e inicializada com `undefined`.

### 1.2 `let` (A Evolução)

- **Função:** Declarar variáveis que podem ser alteradas (reatribuídas) com **escopo de bloco**.
- **Vantagem:** Fica restrita às chaves `{}` onde foi criada. É ideal para contadores e valores temporários.

### 1.3 `const` (A Regra de Ouro)

- **Função:** Declarar valores que não serão reatribuídos. Também possui **escopo de bloco**.
- **Nota Importante:** `const` garante que o *identificador* não mude. Se for um objeto, você ainda pode alterar suas propriedades internas (mutação).

---

## 2. Escopo: Onde seu código "enxerga"?

### 2.1 Escopo Global

Variáveis declaradas fora de qualquer função ou bloco. São acessíveis de qualquer lugar do código.
> [!WARNING]
> Evite ao máximo! Muitas variáveis globais causam "poluição", colisões de nomes e bugs difíceis de encontrar.

### 2.2 Escopo de Função

Variáveis criadas dentro de uma `function`. Elas são "privadas" para aquela função e não podem ser acessadas de fora.

### 2.3 Escopo de Bloco (ES6)

Introduzido por `let` e `const`. Qualquer par de chaves `{ }` cria um novo escopo.

#### Comparação Visual

```javascript
function teste() {
    if (true) {
        var functionScoped = "Eu existo na função inteira";
        let blockScoped = "Eu só existo dentro deste IF";
    }
    console.log(functionScoped); // Funciona!
    console.log(blockScoped);    // ReferenceError!
}
```

---

## 3. Hoisting e a Zona Morta Temporal (TDZ)

**Hoisting** é o comportamento do motor JS de processar as declarações antes de executar o código.

- Com `var`: Você pode usar a variável antes da linha de declaração (ela será `undefined`).
- Com `let` e `const`: A variável é "içada", mas não inicializada. O intervalo entre o início do bloco e a declaração é a **Temporal Dead Zone**. Se tentar usar a variável ali, o código quebra.

---

## 4. Boas Práticas (Guia de Estilo)

Seguir boas práticas torna seu trabalho profissional e mais fácil de manter em equipe.

1. **Use `const` por padrão:** Só mude para `let` se você tiver certeza de que o valor precisará ser alterado. Isso evita mudanças acidentais.
2. **NUNCA use `var`:** Em projetos modernos, o `var` é considerado uma prática ruim. Use `let` e `const`.
3. **Nomes Descritivos:**
   - ❌ `let x = 10;`
   - ✅ `let totalProdutosCarrinho = 10;`
4. **CamelCase:** O padrão do JavaScript é iniciar com minúscula e cada nova palavra com maiúscula. Ex: `usuarioEstaLogado`.
5. **Declare no Topo:** Declare suas variáveis no início do escopo para melhor leitura (mesmo que o hoisting permita o contrário).
6. **Evite Números Mágicos:** Em vez de usar um número solto no código, declare uma constante.
   - ❌ `valorFinal = 100 * 0.15;`
   - ✅ `const TAXA_IMPORTACAO = 0.15; valorFinal = 100 * TAXA_IMPORTACAO;`

---

> [!TIP]
> **Resumo Mental:**
>
> - Preciso mudar? `let`.
> - É fixo? `const`.
> - Escopo? Sempre o mais fechado (bloco) possível!
