# Roteamento em React

Roteamento é o processo de navegar entre diferentes páginas ou visualizações em uma aplicação web. Em uma aplicação de página única (SPA) como o React, o roteamento é tratado no lado do cliente.

## React Router

O React Router é a biblioteca mais popular para roteamento em React. Ele fornece um conjunto de componentes que permitem construir um sistema de roteamento declarativo.

### Componentes Principais do React Router

| Componente | Descrição |
| --- | --- |
| **`BrowserRouter`** | Um roteador que usa a API de histórico do HTML5 para manter sua UI em sincronia com a URL. |
| **`Routes`** | Um componente que renderiza o primeiro filho `<Route>` que corresponde à URL atual. |
| **`Route`** | Um componente que renderiza alguma UI quando seu caminho corresponde à URL atual. |
| **`Link`** | Um componente que fornece navegação declarativa e acessível em sua aplicação. |

### Exemplo de React Router

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h2>Página Inicial</h2>;
}

function Sobre() {
  return <h2>Sobre</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Página Inicial</Link>
            </li>
            <li>
              <Link to="/sobre">Sobre</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

## Roteamento Dinâmico

O React Router também suporta roteamento dinâmico, que permite corresponder a padrões de URL e passar parâmetros para seus componentes.

### Exemplo de Roteamento Dinâmico

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

function Usuario() {
  let { userId } = useParams();
  return <h2>ID do Usuário: {userId}</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/usuario/1">Usuário 1</Link>
            </li>
            <li>
              <Link to="/usuario/2">Usuário 2</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/usuario/:userId" element={<Usuario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```
