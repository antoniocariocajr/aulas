# Assincronismo: Promises, Async/Await e APIs

O JavaScript é *single-threaded*, mas consegue lidar com operações demoradas (como chamadas de API ou leitura de arquivos) sem travar a interface. Isso é possível graças ao modelo assíncrono.

---

## 1. Promises (Promessas)

Uma Promise representa um valor que pode estar disponível **agora**, no **futuro** ou **nunca**.

- **Estados:** `Pending` (Pendente), `Fulfilled` (Realizada), `Rejected` (Rejeitada).
- **Consumo:** `.then()` para sucesso e `.catch()` para erros.

```javascript
const promessa = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Dados recebidos!"), 2000);
});

promessa
    .then(res => console.log(res))
    .catch(err => console.error(err));
```

---

## 2. Async / Await

É o "syntax sugar" para Promises. Permite escrever código assíncrono que parece síncrono, facilitando muito a leitura.

- `async`: Declara que a função é assíncrona.
- `await`: Pausa a execução até que a Promise seja resolvida.

```javascript
async function buscarDados() {
    try {
        const resposta = await fetch('https://api.github.com/users/octocat');
        const dados = await resposta.json();
        console.log(dados.name);
    } catch (error) {
        console.log("Erro na busca:", error);
    }
}
```

---

## 3. Fetch API vs Axios

Para fazer requisições HTTP, temos o `fetch` nativo e bibliotecas como o `Axios`.

| Característica | `fetch` (Nativo) | `Axios` (Lib) |
| :--- | :--- | :--- |
| **Erros HTTP** | Não rejeita 404/500 automaticamente | Rejeita erros 4xx e 5xx |
| **JSON** | Precisa de `.json()` manual | Já devolve o dado convertido |
| **Timeout** | Requer `AbortController` | Simples parâmetro `timeout` |

---

## 4. Por que usar cada uma?

- **Callbacks:** Evite hoje em dia (geram o "Callback Hell").
- **Promises:** Boas para operações simples em cadeia.
- **Async/Await:** **Padrão ouro** atual. Use sempre que possível, especialmente com `try/catch`.

---

## 5. Boas Práticas

1. **Sempre trate erros:** Nunca deixe um `await` sem um `try/catch` ao redor ou um `.catch()` no final.
2. **Paralelismo:** Se você tem duas buscas independentes, não use `await` nelas sequencialmente. Use `Promise.all([p1, p2])` para ganhar performance.
3. **Loading States:** Ao lidar com APIs, sempre informe ao usuário que algo está carregando.
4. **Verifique `res.ok` no Fetch:** Lembre-se que o `fetch` só entra no `catch` se houver erro de rede. Erros 404/500 ainda caem no `then`.
