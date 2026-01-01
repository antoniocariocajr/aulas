# 🗂️ Estruturas de Dados em React (Gerenciando Estado com Objetos e Arrays)

Em React, as estruturas de dados mais comuns que você gerenciará no estado são **Arrays** e **Objetos**. Embora o JavaScript não tenha um framework de coleções tão extenso quanto o do Java, seus `Array` e `Object` nativos são incrivelmente versáteis.

A regra de ouro é a **imutabilidade**: nunca modifique objetos ou arrays de estado diretamente. Sempre crie um novo.

---

## **1. Arrays no Estado**

Arrays são usados para armazenar listas de itens, como tarefas, usuários ou posts.

### **Adicionando um Item a um Array**
Use a sintaxe de propagação (`...`) para criar um novo array com o novo item.

```jsx
const [tarefas, setTarefas] = useState(['Aprender React']);

function adicionarTarefa() {
  // Crie um novo array, copiando os itens antigos e adicionando um novo
  setTarefas([...tarefas, 'Dominar o Estado']);
}
```

### **Removendo um Item de um Array**
Use o método `filter()` para criar um novo array que exclui o item que você deseja remover.

```jsx
const [usuarios, setUsuarios] = useState([
  { id: 1, nome: 'Alice' },
  { id: 2, nome: 'Bob' },
]);

function removerUsuario(idParaRemover) {
  // Crie um novo array contendo apenas os usuários cujo ID não corresponde
  setUsuarios(usuarios.filter(usuario => usuario.id !== idParaRemover));
}
```

### **Atualizando um Item em um Array**
Use o método `map()` para criar um novo array. Dentro do map, use um operador ternário para encontrar o item que você quer mudar e retorne um novo objeto para ele. Para todos os outros itens, retorne-os como estão.

```jsx
function atualizarUsuario(idParaAtualizar, novoNome) {
  setUsuarios(usuarios.map(usuario => {
    if (usuario.id === idParaAtualizar) {
      // Para o usuário correspondente, retorne um novo objeto com o nome atualizado
      return { ...usuario, nome: novoNome };
    }
    // Para todos os outros usuários, retorne o objeto original
    return usuario;
  }));
}
```

---

## **2. Objetos no Estado**

Objetos são usados para armazenar dados estruturados, como o perfil de um usuário ou o estado de um formulário.

### **Atualizando um Campo em um Objeto**
Use a sintaxe de propagação (`...`) para criar um novo objeto, copiando as propriedades antigas e, em seguida, substituindo a que você deseja alterar.

```jsx
const [usuario, setUsuario] = useState({ nome: 'Alex', idade: 30 });

function atualizarNomeDoUsuario() {
  // Crie um novo objeto, copiando as propriedades antigas e definindo um novo nome
  setUsuario({ ...usuario, nome: 'Alexis' });
}
```

### **Atualizando um Objeto Aninhado**
Ao lidar com objetos aninhados, você precisa usar a propagação em cada nível do objeto que está atualizando.

```jsx
const [perfil, setPerfil] = useState({
  id: 1,
  detalhes: {
    nome: 'Sam',
    endereco: {
      cidade: 'Nova York',
    }
  }
});

function atualizarCidade() {
  setPerfil({
    ...perfil, // 1. Copie as propriedades de nível superior
    detalhes: {
      ...perfil.detalhes, // 2. Copie as propriedades aninhadas de 'detalhes'
      endereco: {
        ...perfil.detalhes.endereco, // 3. Copie as propriedades aninhadas de 'endereco'
        cidade: 'Londres' // 4. Substitua o valor final
      }
    }
  });
}
```
*Bibliotecas como o Immer podem simplificar atualizações profundamente aninhadas.*

---

## **Escolhendo a Estrutura de Estado Correta**

- **Plano é melhor:** Evite estados profundamente aninhados quando possível. É mais fácil de atualizar.
- **Agrupe estados relacionados:** Se duas variáveis de estado sempre mudam ao mesmo tempo, considere colocá-las em um único objeto ou array.
- **Evite redundância:** Não armazene no estado dados que podem ser calculados a partir de props ou outras variáveis de estado durante a renderização.

---

## **Resumo das Operações Imutáveis**

| Tarefa | `ArrayList` do Java (Mutável) | Estado do React (Imutável) |
| --- | --- | --- |
| **Adicionar** | `lista.add(novoItem);` | `setLista([...lista, novoItem]);` |
| **Remover** | `lista.removeIf(item -> ...);` | `setLista(lista.filter(item -> ...));` |
| **Atualizar** | `lista.get(i).setField(val);` | `setLista(lista.map(item -> ... ? novoItem : item));`|
| **Atualizar Campo**| `obj.setField(val);` | `setObj({...obj, field: val});` |

---

## **Resumo**

> Em React, gerencie coleções com **Arrays** do JavaScript e dados estruturados com **Objetos**. Sempre trate o estado como **imutável**. Use métodos que retornam novos arrays (`map`, `filter`) e a sintaxe de propagação (`...`) para criar cópias atualizadas do seu estado, o que garante que o React renderize novamente de forma correta.
