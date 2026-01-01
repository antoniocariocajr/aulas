# Routing in React

Routing is the process of navigating between different pages or views in a web application. In a single-page application (SPA) like React, routing is handled on the client-side.

## React Router

React Router is the most popular library for routing in React. It provides a set of components that allow you to build a declarative routing system.

### Core Components of React Router

| Component | Description |
| --- | --- |
| **`BrowserRouter`** | A router that uses the HTML5 history API to keep your UI in sync with the URL. |
| **`Routes`** | A component that renders the first child `<Route>` that matches the current URL. |
| **`Route`** | A component that renders some UI when its path matches the current URL. |
| **`Link`** | A component that provides declarative, accessible navigation around your application. |

### Example of React Router

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

## Dynamic Routing

React Router also supports dynamic routing, which allows you to match URL patterns and pass parameters to your components.

### Example of Dynamic Routing

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

function User() {
  let { userId } = useParams();
  return <h2>User ID: {userId}</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/user/1">User 1</Link>
            </li>
            <li>
              <Link to="/user/2">User 2</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/user/:userId" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```
