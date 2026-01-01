import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Exemplo de Classe (similar ao Java)
class Pessoa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idade: props.idade,
    };
  }

  aniversario = () => {
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
function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: 'Aprender React', completa: false },
    { id: 2, texto: 'Construir um projeto', completa: false },
  ]);

  const alternarTarefa = (id) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, completa: !tarefa.completa } : tarefa
      )
    );
  };

  return (
    <div>
      <h2>Exemplo de Imutabilidade</h2>
      <ul>
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            onClick={() => alternarTarefa(tarefa.id)}
            style={{ textDecoration: tarefa.completa ? 'line-through' : 'none', cursor: 'pointer' }}
          >
            {tarefa.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Rotas ---
function PaginaInicial() {
  return <h2>Página Inicial</h2>;
}

function PerfilDoUsuario() {
  const { userId } = useParams();
  return <h2>Perfil do Usuário: {userId}</h2>;
}

function ExemploDeRotas() {
  return (
    <Router>
      <div>
        <h2>Exemplo de Rotas</h2>
        <nav>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/usuario/1">Usuário 1</Link></li>
            <li><Link to="/usuario/2">Usuário 2</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/usuario/:userId" element={<PerfilDoUsuario />} />
          <Route path="/" element={<PaginaInicial />} />
        </Routes>
      </div>
    </Router>
  );
}

// --- Gerenciamento de Estado (Redux) ---
const estadoInicial = { contador: 0 };

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

function Contador() {
  const contador = useSelector((estado) => estado.contador);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Contador (Redux)</h3>
      <p>{contador}</p>
      <button onClick={() => dispatch({ type: 'INCREMENTAR' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENTAR' })}>-</button>
    </div>
  );
}

function ExemploRedux() {
  return (
    <Provider store={store}>
      <div>
        <h2>Exemplo de Gerenciamento de Estado com Redux</h2>
        <Contador />
      </div>
    </Provider>
  );
}

// --- Padrões de Projeto: Hook Customizado ---
function useFetch(url) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setDados(data);
        setCarregando(false);
      });
  }, [url]);

  return { dados, carregando };
}

function PerfilDeUsuarioComHook() {
  const { dados: usuario, carregando } = useFetch('https://jsonplaceholder.typicode.com/users/1');

  if (carregando) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div>
      <h3>{usuario.name}</h3>
      <p>Email: {usuario.email}</p>
    </div>
  );
}

function ExemploHookCustomizado() {
  return (
    <div>
      <h2>Exemplo de Padrão de Projeto (Hook Customizado)</h2>
      <PerfilDeUsuarioComHook />
    </div>
  );
}

// --- Testes ---
export function Saudacao({ nome }) {
  return <p>Olá, {nome}!</p>;
}


// Componente principal que renderiza todos os exemplos
export default function Exemplos() {
  return (
    <div>
      <h1>Galeria de Exemplos React</h1>
      <hr />
      <Pessoas />
      <hr />
      <ListaDeTarefas />
      <hr />
      <ExemploDeRotas />
      <hr />
      <ExemploRedux />
      <hr />
      <ExemploHookCustomizado />
      <hr />
      <div>
        <h2>Exemplo de Componente Testável</h2>
        <Saudacao nome="Mundo" />
      </div>
    </div>
  );
}
