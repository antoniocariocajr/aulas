import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Exemplo de Classe (similar ao Java)
class Pessoa extends React.Component {
  constructor(props) {
    super(props);
    // State inicial do componente
    this.state = {
      idade: props.idade,
    };
  }

  aniversario = () => {
    // Atualiza o estado de forma imutável
    this.setState({ idade: this.state.idade + 1 });
  };

  render() {
    const { nome } = this.props;
    const { idade } = this.state;

    return (
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <h3>{nome}</h3>
        <p>Idade: {idade}</p>
        <button onClick={this.aniversario}>Fazer Aniversário</button>
      </div>
    );
  }
}

// Exemplo de Componente Funcional com Hooks
function Pessoas() {
  const [pessoas, setPessoas] = useState([
    { id: 1, nome: 'Alice', idade: 30 },
    { id: 2, nome: 'Bob', idade: 25 },
  ]);

  return (
    <div>
      <h2>Lista de Pessoas</h2>
      {pessoas.map((pessoa) => (
        <Pessoa key={pessoa.id} nome={pessoa.nome} idade={pessoa.idade} />
      ))}
    </div>
  );
}

// --- Imutabilidade ---
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Aprender React', completed: false },
    { id: 2, text: 'Construir um projeto', completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h2>Exemplo de Imutabilidade</h2>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Rotas ---
function Home() {
  return <h2>Página Inicial</h2>;
}

function User() {
  const { userId } = useParams();
  return <h2>Perfil do Usuário: {userId}</h2>;
}

function RoutingExample() {
  return (
    <Router>
      <div>
        <h2>Exemplo de Rotas</h2>
        <nav>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/user/1">Usuário 1</Link></li>
            <li><Link to="/user/2">Usuário 2</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/user/:userId" element={<User />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

// --- State Management (Redux) ---
const initialState = { count: 0 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(reducer);

function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Contador (Redux)</h3>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}

function ReduxExample() {
  return (
    <Provider store={store}>
      <div>
        <h2>Exemplo de State Management com Redux</h2>
        <Counter />
      </div>
    </Provider>
  );
}


// Componente principal que renderiza todos os exemplos
export default function Exemplos() {
  return (
    <div>
      <h1>Galeria de Exemplos React</h1>
      <hr />
      <Pessoas />
      <hr />
      <TodoList />
      <hr />
      <RoutingExample />
      <hr />
      <ReduxExample />
    </div>
  );
}
