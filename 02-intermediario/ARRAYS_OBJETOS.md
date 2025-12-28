# Arrays e Objetos no JavaScript Intermediário

Neste nível, deixamos de apenas declarar listas e objetos e passamos a manipulá-los de forma profissional, utilizando técnicas da programação funcional e as facilidades do ES6+.

---

## 1. Métodos de Array de Alta Ordem (HOF)

Estes métodos são essenciais para manipular dados sem mutar o array original.

| Método     | Retorno        | Quando usar                          |
|------------|----------------|--------------------------------------|
| `map`      | **Novo Array** | Quando quer transformar cada item.    |
| `filter`   | **Novo Array** | Quando quer remover itens da lista.   |
| `reduce`   | **Único Valor**| Quando quer agregar (soma, média, etc).|
| `find`     | **1 Elemento** | Quando quer achar o primeiro item.    |
| `forEach`  | **undefined**  | Apenas para efeitos colaterais.       |

### Exemplo Prático

```javascript
const usuarios = [
    { nome: 'Ana', idade: 25, ativo: true },
    { nome: 'Beto', idade: 17, ativo: false },
    { nome: 'Carla', idade: 30, ativo: true }
];

// Pegar apenas os nomes dos usuários ativos
const nomesAtivos = usuarios
    .filter(u => u.ativo)
    .map(u => u.nome); // ['Ana', 'Carla']
```

---

## 2. Destructuring (Desestruturação)

Permite extrair dados de arrays ou objetos em variáveis individuais com uma sintaxe limpa.

- **Objetos:** Usa os nomes das chaves.
- **Arrays:** Usa a posição (índice).

```javascript
const user = { nome: 'Ana', idade: 25, cidade: 'SP' };

// Em objetos
const { nome, idade } = user; 

// Em arrays
const [primeira, segunda] = ['Maçã', 'Banana', 'Uva'];
```

---

## 3. Spread (`...`) e Rest (`...`)

Embora usem o mesmo sinal, suas funções são opostas:

- **Spread (Espalhar):** "Abre" um array ou objeto. Útil para cópias e mesclagem.
- **Rest (Agrupar):** Junta vários argumentos em um único array (usado em parâmetros de função).

```javascript
// Spread: Criando uma cópia independente
const original = [1, 2];
const copia = [...original, 3]; // [1, 2, 3]

// Rest: Aceitando infinitos argumentos
function somar(...numeros) {
    return numeros.reduce((a, b) => a + b, 0);
}
```

---

## 4. Métodos do Objeto Global

Utilitários para trabalhar com as chaves e valores de qualquer objeto.

- `Object.keys(obj)`: Retorna as chaves.
- `Object.values(obj)`: Retorna os valores.
- `Object.entries(obj)`: Retorna pares `[chave, valor]`.

---

## 5. Boas Práticas

1. **Imutabilidade:** Prefira `map/filter` ao `forEach` quando o objetivo for gerar novos dados. Não mude o array original.
2. **Destructuring em Parâmetros:** Use nos argumentos de funções para deixar claro quais propriedades o objeto precisa.
    `function saudar({ nome }) { ... }`
3. **Use Spread para Cópias:** Nunca faça `const b = a` para objetos, pois isso copia a referência. Use `const b = { ...a }`.
4. **JSON Seguro:** Sempre use `try/catch` ao fazer `JSON.parse()`, pois ele quebra o código se a string for inválida.
