# JavaScript Intermediário – Hub Central

Este documento organiza os conceitos que levam você do básico para a construção de aplicações reais. Aqui você aprende a manipular dados de forma eficiente e a lidar com o tempo (assincronismo).
**[Voltar para o índice](../aulas/README.md)**

---

## 1. Manipulação de Dados (Arrays e Objetos)

👉 **[Acesse aqui: ARRAYS_OBJETOS.md](./ARRAYS_OBJETOS.md)**
(Aprenda `map`, `filter`, `reduce`, Desestruturação e o poder do Spread/Rest).

---

## 2. O Tempo no JS (Assincronismo)

👉 **[Acesse aqui: ASSINCRONISMO.md](./ASSINCRONISMO.md)**
(Entenda Promises, facilite sua vida com `Async/Await` e aprenda a buscar dados de APIs).

---

## 3. Interatividade (DOM e Eventos)

👉 **[Acesse aqui: DOM.md](./DOM.md)**
(Como selecionar elementos, mudar estilos sem quebrar o CSS e usar Delegação de Eventos).

---

## 4. O Novo Padrão (Modern JS)

👉 **[Acesse aqui: MODERN_JS.md](./MODERN_JS.md)**
(Módulos `import/export`, Template Strings e melhorias sintáticas fundamentais).

---

## 5. Lógica Avançada (Funções e Escopo)

👉 **[Acesse aqui: FUNCOES_AVANCADAS.md](./FUNCOES_AVANCADAS.md)**
(Closures, Recursividade e o uso profissional de Higher-Order Functions).

---

## Resumo: "Qual ferramenta usar?"

| Situação | Ferramenta Recomendada | Vantagem |
| :--- | :--- | :--- |
| **Transformar lista** | `.map()` | Mantém o original intacto. |
| **Pegar dado de API** | `fetch` + `async/await` | Código mais limpo e tratável. |
| **Copiar Objeto** | `{ ...objeto }` | Evita bugs de referência. |
| **Muitos Eventos** | Delegação de Eventos | Ganho de performance e memória. |
| **Variável Privada** | Closures | Protege dados sensíveis. |
