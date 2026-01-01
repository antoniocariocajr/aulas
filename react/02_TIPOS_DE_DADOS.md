# 🔍 Tipos de Dados em React (e JavaScript)

No React, você trabalha com os tipos de dados padrão do JavaScript. A distinção mais importante a ser entendida é entre **tipos primitivos** e **objetos/arrays**, especialmente ao gerenciar o estado (state).

## **Tipos Primitivos**

- Estes são os tipos de dados mais básicos fornecidos pelo JavaScript.
- Eles são **imutáveis** e suas variáveis armazenam o valor diretamente.

| Tipo | Descrição | Exemplo |
| --- | --- | --- |
| `string` | Uma sequência de caracteres | `const nome = 'Alice';` |
| `number` | Valores numéricos (inteiro ou float) | `const idade = 30;` |
| `boolean` | Representa `true` ou `false` | `const logado = true;` |
| `null` | Representa a ausência intencional de qualquer valor de objeto | `let usuario = null;` |
| `undefined` | Uma variável que foi declarada mas não teve um valor atribuído | `let cidade;` |
| `symbol` | Um valor primitivo único e imutável | `const id = Symbol('id');` |
| `bigint` | Para inteiros de precisão arbitrária | `const numeroGrande = 9007199254740991n;` |

Quando você atualiza uma variável de estado que contém um primitivo, a detecção de mudanças do React funciona como esperado.

```jsx
import { useState } from 'react';

function Contador() {
  const [contagem, setContagem] = useState(0); // 'contagem' é um número (primitivo)

  return (
    <button onClick={() => setContagem(contagem + 1)}>
      Contagem é {contagem}
    </button>
  );
}
```

---

## 2️⃣ **Objetos e Arrays (Tipos de Referência)**

- São **coleções de valores** ou entidades mais complexas.
- Variáveis que contêm objetos ou arrays armazenam uma **referência (ou ponteiro)** para a localização na memória onde o objeto está armazenado.
- Eles são **mutáveis**, o que significa que seu conteúdo pode ser alterado.

| Tipo | Descrição | Exemplo |
| --- | --- | --- |
| `Object` | Uma coleção de pares chave-valor | `const pessoa = { nome: 'Bob', idade: 42 };` |
| `Array` | Uma lista ordenada de valores | `const numeros = [1, 2, 3];` |

### **O Desafio com o State: Imutabilidade**

Este é o conceito mais crítico. O React determina se deve renderizar novamente um componente verificando se seu estado mudou. Para objetos e arrays, ele apenas verifica se a **referência** mudou.

Se você **mutar** um objeto ou array no estado diretamente, a referência não muda, e **o React não vai renderizar novamente o seu componente**.

**❌ Maneira Incorreta (Mutação):**

```jsx
import { useState } from 'react';

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState(['Aprender React', 'Escrever Código']);

  function adicionarTarefa() {
    //  ERRADO: Isso muta o array original.
    // A referência para 'tarefas' não muda.
    tarefas.push('Nova Tarefa');
    setTarefas(tarefas); // O React vê a mesma referência, sem nova renderização!
  }

  return <button onClick={adicionarTarefa}>Adicionar Tarefa</button>;
}
```

**✅ Maneira Correta (Imutabilidade):**

Para atualizar um objeto ou array no estado, você deve criar um **novo** objeto ou array e passá-lo para a função de atualização do estado. Isso fornece uma nova referência, e o React sabe que precisa renderizar novamente. A sintaxe de espalhamento (`...`) é perfeita para isso.

```jsx
import { useState } from 'react';

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState(['Aprender React', 'Escrever Código']);

  function adicionarTarefa() {
    // CORRETO: Crie um *novo* array com os itens antigos e o novo.
    const novasTarefas = [...tarefas, 'Nova Tarefa'];
    setTarefas(novasTarefas); // O React vê uma nova referência e renderiza novamente!
  }

  // ...
}
```

### **Tabela Resumo – Primitivo vs. Objeto/Array no State**

| Característica | Primitivo | Objeto / Array |
| --- | --- | --- |
| **Variável Armazena** | O valor real | Uma referência (endereço de memória) |
| **Atualização de State** | Passe o novo valor diretamente | Passe um **novo** objeto/array |
| **Imutabilidade** | inerentemente imutável | Deve ser tratado como imutável no state |
| **Erro Comum** | (raro) | Mutação direta (ex: `.push()`, `obj.chave = val`) |
| **Abordagem Correta** | `setContagem(contagem + 1)` | `setTarefas([...tarefas, novoItem])` ou `setUsuario({...usuario, nome: 'novo'})` |

---

### **Resumo**

> No React, **nunca mute objetos ou arrays no estado diretamente**. Sempre crie uma **nova cópia** com suas alterações. Isso garante que a detecção de mudanças do React funcione corretamente e que sua UI seja atualizada como esperado.
