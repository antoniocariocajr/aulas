# Performance e Otimização no JavaScript

Escrever código que funciona é apenas o primeiro passo. No nível avançado, precisamos garantir que o código seja **rápido**, use pouca memória e proporcione uma experiência fluida para o usuário.

---

## 1. Debounce e Throttle

Técnicas essenciais para controlar a frequência de execução de funções ativadas por eventos rápidos (como digitar ou redimensionar a janela).

- **Debounce:** Espera o usuário "parar" de agir por `X` milissegundos antes de executar. (Ex: Barra de pesquisa).
- **Throttle:** Garante que a função execute no máximo uma vez a cada `X` milissegundos. (Ex: Scroll infinito).

---

## 2. Memoization (Cache de Funções)

Otimiza funções pesadas guardando os resultados de cálculos anteriores. Se a função for chamada com os mesmos argumentos, ela retorna o valor do cache em vez de calcular tudo de novo.

```javascript
const cache = {};
function fatorialMemo(n) {
    if (n in cache) return cache[n];
    // ... cálculo pesado ...
    cache[n] = resultado;
    return resultado;
}
```

---

## 3. Lazy Loading (Carregamento Preguiçoso)

Consiste em carregar partes do código apenas quando elas forem realmente necessárias. No JavaScript, fazemos isso usando o **Dynamic Import**.

```javascript
botao.addEventListener('click', async () => {
    const modulo = await import('./moduloPesado.js');
    modulo.executar();
});
```

---

## 4. Gerenciamento de Memória e Memory Leaks

O JavaScript possui um *Garbage Collector* (Coletor de Lixo), mas ele não é infalível.

- **Evite:** Variáveis globais esquecidas, timers (`setInterval`) que nunca são parados e event listeners em elementos que já foram removidos do DOM.

---

## 5. Boas Práticas

1. **Meça antes de otimizar:** Use o `console.time()` ou a aba *Performance* do Chrome DevTools para identificar gargalos reais. Não otimize por palpite.
2. **Code Splitting:** Divida seu código em pequenos "chunks" (pedaços) para que o navegador não tenha que baixar um arquivo enorme de uma vez só.
3. **Evite Aninhamentos Profundos:** Loops dentro de loops (O(n²)) devem ser evitados em grandes volumes de dados. Tente usar Mapas (`New Map()`) para buscas rápidas.
4. **Imagens e Ativos:** Lembre-se que a performance não é só código. Use formatos modernos (WebP) e carregamento tardio para imagens.
