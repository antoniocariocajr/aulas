# Modern JavaScript: ES6+ Features

O "Modern JavaScript" se refere às funcionalidades introduzidas a partir do ES6 (2015) que tornaram a linguagem mais poderosa, legível e segura.

---

## 1. Módulos: `import` e `export`

Antigamente, todo o código JS ficava em um único arquivo gigante ou em vários arquivos que compartilhavam o escopo global (o que era perigoso). Com módulos, cada arquivo é um mundo isolado.

- **`export default`:** Usado quando o arquivo exporta apenas uma coisa principal.
- **`export` (nomeado):** Usado quando o arquivo tem várias constantes ou funções úteis.

```javascript
// math.js
export const somar = (a, b) => a + b;
export default function calcular() { ... }

// main.js
import calcular, { somar } from './math.js';
```

---

## 2. Template Literals

Substituem a concatenação manual de strings com `+`.

- Permitem quebras de linha.
- Permitem interpolar variáveis com `${}`.

```javascript
const user = "Antônio";
console.log(`Bem-vindo, ${user}!
Hoje é um ótimo dia.`);
```

---

## 3. Melhorias em Objetos (Enhanced Object Literals)

Se o nome da variável for igual ao nome da chave do objeto, você pode omitir o valor.

```javascript
const nome = "Ana";
const idade = 25;

// Antes: { nome: nome, idade: idade }
// Agora:
const user = { nome, idade };
```

---

## 4. Default Parameters

Evite erros de `undefined` definindo valores padrão direto na assinatura da função.

```javascript
function configurar(tema = 'claro', fonte = 16) {
    console.log(`Tema: ${tema}, Fonte: ${fonte}`);
}
```

---

## 5. Boas Práticas

1. **Sempre use `import/export`:** Nunca dependa de variáveis globais entre arquivos.
2. **Organize por funcionalidade:** Módulos devem ser focados (ex: `api.js`, `utils.js`, `view.js`).
3. **Use Template Strings:** Elas são muito mais legíveis que `"str" + var + "str"`.
4. **Cuidado com Default Exports:** Embora práticos, exports nomeados ajudam mais no autocompletar do editor e tornam as buscas por referências mais fáceis.
