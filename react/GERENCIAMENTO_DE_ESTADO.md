# Gerenciamento de Estado em React

O gerenciamento de estado é um aspecto crucial na construção de aplicações React complexas. À medida que sua aplicação cresce, gerenciar o estado que é compartilhado entre múltiplos componentes pode se tornar desafiador.

## Gerenciamento de Estado Embutido no React

O React fornece algumas maneiras embutidas de gerenciar o estado:

- **`useState`:** Um hook que permite adicionar estado a componentes funcionais. É ideal para o estado local do componente.
- **`useReducer`:** Um hook que é uma alternativa ao `useState`. Geralmente é preferível ao `useState` quando você tem uma lógica de estado complexa que envolve múltiplos sub-valores ou quando o próximo estado depende do anterior.
- **Context API:** Uma maneira de passar dados através da árvore de componentes sem ter que passar props manualmente em todos os níveis. É projetado para compartilhar dados que podem ser considerados "globais" para uma árvore de componentes React.

## Bibliotecas de Gerenciamento de Estado

Para aplicações de grande escala, você pode querer usar uma biblioteca de gerenciamento de estado dedicada. Essas bibliotecas fornecem um armazenamento centralizado para o estado da sua aplicação e facilitam o gerenciamento e a depuração.

| Biblioteca | Descrição |
| --- | --- |
| **Redux** | Uma das bibliotecas de gerenciamento de estado mais populares para React. É baseada na arquitetura Flux e fornece um contêiner de estado previsível. |
| **MobX** | Uma biblioteca que torna o gerenciamento de estado simples e escalável, aplicando de forma transparente a programação reativa funcional. |
| **Zustand** | Uma solução de gerenciamento de estado pequena, rápida e escalável. É baseada em hooks e é muito fácil de usar. |
| **Recoil** | Uma biblioteca de gerenciamento de estado experimental do Facebook. Ela fornece uma maneira mais "React-ish" de gerenciar o estado com átomos e seletores. |

## Exemplo com Redux

```jsx
// store.js
import { createStore } from 'redux';

const estadoInicial = {
  contador: 0,
};

function reducer(estado = estadoInicial, acao) {
  switch (acao.type) {
    case 'INCREMENTAR':
      return { contador: estado.contador + 1 };
    case 'DECREMENTAR':
      return { contador: estado.contador - 1 };
    default:
      return estado;
  }
}

const store = createStore(reducer);

export default store;

// Contador.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Contador() {
  const contador = useSelector(estado => estado.contador);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Contador</h2>
      <p>{contador}</p>
      <button onClick={() => dispatch({ type: 'INCREMENTAR' })}>Incrementar</button>
      <button onClick={() => dispatch({ type: 'DECREMENTAR' })}>Decrementar</button>
    </div>
  );
}

export default Contador;

// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Contador from './Contador';

function App() {
  return (
    <Provider store={store}>
      <Contador />
    </Provider>
  );
}

export default App;
```
