# Manipulação de DOM e Eventos

O DOM (Document Object Model) é a representação do HTML em forma de árvore de objetos que o JavaScript pode manipular para criar interfaces dinâmicas.
**[Voltar para o teoria de intermediário](./teoria.md)**

---

## 1. Selecionando Elementos

O segredo aqui é ser específico para ganhar performance e evitar bugs.

- `getElementById`: O mais rápido para IDs únicos.
- `querySelector`: O mais flexível (usa seletores CSS).
- `querySelectorAll`: Retorna uma lista estática (não atualiza sozinha) de elementos.

```javascript
const titulo = document.querySelector('#main-title');
const itens = document.querySelectorAll('.list-item');
```

---

## 2. Manipulando Conteúdo e Estilo

- **Conteúdo:** Prefira `textContent` a `innerHTML` (por segurança contra ataques XSS).
- **Estilo:** Use `classList` (add, remove, toggle) em vez de mexer no `.style` diretamente. Isso mantém seu CSS separado.

```javascript
const btn = document.querySelector('button');
btn.classList.add('btn-active');
btn.textContent = 'Clique Aqui!';
```

---

## 3. Eventos e Delegação

### 3.1 Event Listeners

A forma moderna de ouvir interações. Permite múltiplos ouvintes para o mesmo elemento.

### 3.2 Event Bubbling (Propagação)

Quando você clica em um botão, o clique "sobe" para o pai, depois para o avô, até chegar no `document`.

### 3.3 Delegação de Eventos (Padrão Pro)

Em vez de colocar um ouvinte em 100 itens de uma lista, coloque apenas **um** no pai e use `event.target` para saber qual filho foi clicado.

```javascript
document.querySelector('#lista').addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        console.log("Você clicou no item:", e.target.textContent);
    }
});
```

---

## 4. Boas Práticas

1. **Não polua o HTML:** Evite `onclick="..."` no HTML. Use `addEventListener` no seu arquivo JS.
2. **Limpeza de Eventos:** Se você cria muitos eventos em elementos que são removidos da tela, remova o listener para evitar vazamento de memória.
3. **Acesse o DOM com sabedoria:** Selecionar elementos é "caro". Salve os elementos em variáveis e não os busque toda vez dentro de um loop.
4. **Semântica:** Use os elementos corretos (`<button>` para cliques, `<a>` para links) para garantir acessibilidade.
