# 🔁 Estruturas de Repetição em React (Renderizando Listas)

No React, você não usa laços tradicionais como `for` ou `while` diretamente no seu JSX. Em vez disso, você renderiza listas de componentes transformando um array de dados em um array de elementos JSX. O método padrão para isso é o `Array.prototype.map()` nativo do JavaScript.

---

## **O Método `.map()`**

O método `.map()` cria um **novo array** chamando uma função em cada elemento do array original. No React, nós o usamos para mapear nossos dados (ex: um array de objetos) para um array de componentes.

```jsx
const numeros = [1, 2, 3, 4, 5];

// Mapeia o array de números para um array de elementos <li>
const itensDaLista = numeros.map((numero) => <li>{numero}</li>);

// Em seguida, renderiza o novo array dentro de um <ul>
return <ul>{itensDaLista}</ul>;
```

### **Exemplo em Linha**

É mais comum realizar a operação `.map()` diretamente dentro do seu JSX.

```jsx
function ListaDeTarefas({ tarefas }) {
  // 'tarefas' é um array de objetos, ex: [{ id: 1, texto: 'Aprender React' }]

  return (
    <ul>
      {tarefas.map((tarefa) => (
        <li key={tarefa.id}>{tarefa.texto}</li>
      ))}
    </ul>
  );
}
```

---

## **A Prop `key`: Um Requisito Crucial**

Quando você renderiza uma lista de elementos, você deve fornecer uma prop `key` única para cada item na lista.

**Por que a `key` é necessária?**
O React usa a `key` para identificar quais itens mudaram, foram adicionados ou removidos. Ela ajuda o React a realizar atualizações no DOM de forma mais eficiente, reconhecendo um item específico através de novas renderizações.

**Regras para as Keys:**
1.  **Única Entre Irmãos:** As keys só precisam ser únicas entre seus irmãos diretos no array.
2.  **Estável:** A key não deve mudar entre as renderizações. Deve ser um identificador estável.
3.  **Use IDs dos Dados:** A melhor key geralmente é um ID único dos seus dados, como `tarefa.id` de um banco de dados.
4.  **Último Recurso: Índice:** Usar o índice do array (`(item, indice) => ... key={indice}`) **não é recomendado** se a lista puder ser reordenada, ter itens adicionados ou filtrados. Isso pode levar a bugs com o estado do componente e atualizações incorretas do DOM. Use-o apenas para listas estáticas e imutáveis.

**Uso Correto com um ID Estável:**
```jsx
const listaDeUsuarios = [
  { id: 'a', nome: 'Alice' },
  { id: 'b', nome: 'Bob' },
];

function ComponenteUsuario() {
  return (
    <ul>
      {listaDeUsuarios.map((usuario) => (
        <li key={usuario.id}>{usuario.nome}</li>
      ))}
    </ul>
  );
}
```

---

## **Filtrando e Transformando Listas**

Antes de mapear, você pode usar outros métodos de array como `.filter()` para criar um novo array apenas com os itens que deseja exibir.

```jsx
function UsuariosAtivos({ usuarios }) {
  // 'usuarios' é [{ id: 1, nome: 'Alice', estaAtivo: true }, ...]

  // Primeiro, filtre para obter apenas os usuários ativos
  const usuariosAtivos = usuarios.filter(usuario => usuario.estaAtivo);

  // Em seguida, mapeie o array filtrado para elementos JSX
  return (
    <ul>
      {usuariosAtivos.map(usuario => (
        <li key={usuario.id}>{usuario.nome}</li>
      ))}
    </ul>
  );
}
```
Você também pode encadear esses métodos para transformações mais complexas.

---

## **`break` e `continue`?**

Não há um equivalente direto de `break` ou `continue` dentro de uma função `.map()`.
-   Para **"continuar"** (pular um item), você pode retornar `null` do callback do map, mas é muito mais limpo usar `.filter()` primeiro.
-   Para **"parar"** (parar de renderizar mais cedo), você pode usar o método `.slice(0, indice)` no array antes de mapear.

**Exemplo de "parada" após 3 itens:**
```jsx
const tresPrimeirosItens = itens.slice(0, 3).map(item => (
  <li key={item.id}>{item.nome}</li>
));
```

---

## **Resumo**

> Para renderizar uma lista de itens no React, use o método **`.map()`** no seu array de dados para transformá-lo em um array de elementos JSX. Sempre forneça uma prop **`key` estável e única** ao elemento de nível superior dentro do map para garantir atualizações eficientes e sem bugs. Para renderização condicional de itens de lista, use **`.filter()`** antes de mapear.
