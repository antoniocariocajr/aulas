# Imutabilidade em React

Imutabilidade é um conceito central em React que ajuda a escrever código previsível e performático. Significa que, uma vez que um objeto ou um dado é criado, ele não pode ser alterado.

## Por que a Imutabilidade é Importante em React?

- **Detecção de Mudanças:** O React determina se deve renderizar novamente um componente comparando o estado e as props antigas com as novas. Se você mutar um objeto diretamente, a referência ao objeto permanece a mesma, e o React não será capaz de detectar a mudança.
- **Previsibilidade:** Dados imutáveis tornam mais fácil raciocinar sobre o estado da sua aplicação. Você pode ter certeza de que os dados não serão alterados inesperadamente em outra parte da aplicação.
- **Otimização de Performance:** A imutabilidade permite uma detecção de mudanças barata e fácil, o que pode levar a melhorias significativas de performance.

## Como Alcançar a Imutabilidade em JavaScript

### Para Arrays:

- **Adicionar um elemento:** `const novoArray = arrayAntigo.concat([novoElemento]);` ou `const novoArray = [...arrayAntigo, novoElemento];`
- **Remover um elemento:** `const novoArray = arrayAntigo.filter(item => item.id !== idParaRemover);`
- **Atualizar um elemento:** `const novoArray = arrayAntigo.map(item => item.id === idParaAtualizar ? { ...item, ...atualizacoes } : item);`

### Para Objetos:

- **Atualizar uma propriedade:** `const novoObjeto = { ...objetoAntigo, propriedadeParaAtualizar: novoValor };`

## Exemplo em um Componente React

```jsx
import React, { useState } from 'react';

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: 'Aprender React', completa: false },
    { id: 2, texto: 'Construir um projeto', completa: false },
  ]);

  const alternarTarefa = (id) => {
    setTarefas(
      tarefas.map(tarefa =>
        tarefa.id === id ? { ...tarefa, completa: !tarefa.completa } : tarefa
      )
    );
  };

  return (
    <ul>
      {tarefas.map(tarefa => (
        <li
          key={tarefa.id}
          onClick={() => alternarTarefa(tarefa.id)}
          style={{ textDecoration: tarefa.completa ? 'line-through' : 'none' }}
        >
          {tarefa.texto}
        </li>
      ))}
    </ul>
  );
}

export default ListaDeTarefas;
```
