# 🎨 Padrões de Projeto em React (Design Patterns)

Assim como em Java, Padrões de Projeto em React são soluções reutilizáveis para problemas comuns no desenvolvimento de software. Eles ajudam a escrever componentes mais desacoplados, reutilizáveis e fáceis de manter.

---

## **1. Padrão Container/Apresentação (Container/Presentational)**

Este padrão separa os componentes em duas categorias:
-   **Containers (Inteligentes)**: Focados na **lógica**. Eles gerenciam o estado, buscam dados e passam as informações para os componentes de apresentação.
-   **Componentes de Apresentação (Burros)**: Focados na **UI**. Eles recebem dados via `props` e simplesmente os renderizam. Eles não possuem estado próprio.

**Vantagem**: Reutilização clara da UI. Um mesmo componente de apresentação pode ser usado por vários containers diferentes.

**Exemplo:**
```jsx
// --- Container (lógica) ---
function UserProfileContainer({ userId }) {
  const { data: user, loading } = useFetch(`/api/users/${userId}`);

  if (loading) return <p>Carregando...</p>;

  return <UserProfileDisplay user={user} />;
}

// --- Apresentação (UI) ---
function UserProfileDisplay({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```
*Com Hooks, essa separação se tornou mais natural. O próprio componente pode ter a lógica no topo e o JSX de apresentação no final.*

---

## **2. Padrão de Componente de Ordem Superior (Higher-Order Component - HOC)**

Um HOC é uma função que recebe um componente como argumento e retorna um novo componente com lógica adicional. É uma forma de reutilizar a lógica do ciclo de vida e de estado.

**Vantagem**: Encapsula e reutiliza lógica sem repetir código.
**Desvantagem**: Pode levar ao "wrapper hell" (muitos componentes aninhados) e dificultar o rastreamento das `props`. **Hooks customizados são a abordagem moderna preferida.**

**Exemplo: Um HOC `withAuth`:**
```jsx
// 1. O HOC
function withAuth(WrappedComponent) {
  // 2. Retorna um novo componente
  return function(props) {
    const { isAuthenticated } = useAuth(); // Hook de autenticação fictício

    if (!isAuthenticated) {
      return <p>Você precisa estar logado para ver este conteúdo.</p>;
    }

    // 3. Renderiza o componente original com as props
    return <WrappedComponent {...props} />;
  }
}

// 4. Componente que queremos proteger
function PainelSecreto() {
  return <h2>Informações Confidenciais</h2>;
}

// 5. "Envolvendo" o componente com o HOC
const PainelSecretoComAutenticacao = withAuth(PainelSecreto);
```

---

## **3. Padrão de Render Props**

Este padrão envolve passar uma função como `prop` para um componente. O componente executa essa função para renderizar seu conteúdo, permitindo que o pai controle o que é renderizado.

**Vantagem**: Inverte o controle, dando mais flexibilidade ao componente pai.
**Desvantagem**: Pode ser verboso e menos intuitivo que os Hooks.

**Exemplo: Um componente `MouseTracker`:**
```jsx
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({ x: event.clientX, y: event.clientY });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {/* Executa a função 'render' passada como prop */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Uso
function App() {
  return (
    <MouseTracker render={({ x, y }) => (
      <h1>A posição do mouse é ({x}, {y})</h1>
    )}/>
  );
}
```

---

## **4. Padrão Provedor (Provider Pattern)**

Utiliza a **Context API** do React para passar dados para componentes descendentes sem ter que passá-los manualmente por `props` em cada nível.

**Vantagem**: Evita o "prop drilling" (passar props por muitos níveis). Ideal para dados globais como tema (claro/escuro), estado de autenticação ou idioma.

**Exemplo: Um `ThemeProvider`:**
```jsx
// 1. Crie o Contexto
const ThemeContext = React.createContext('light');

// 2. Crie o Provedor que envolve a aplicação
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. Um componente descendente pode usar o contexto
function Toolbar() {
  const theme = useContext(ThemeContext); // Acessa o valor 'dark'
  return <Button theme={theme} />;
}
```

---

## **5. Padrão de Hooks Customizados (A Abordagem Moderna)**

Este é o padrão mais importante e moderno para reutilizar lógica com estado. A lógica é extraída para uma função `use...` que pode ser chamada por qualquer componente funcional.

**Vantagem**: Mais simples, mais limpo, mais fácil de compor e testar do que HOCs ou Render Props.

**Exemplo (revisto do HOC `withAuth`):**
```jsx
// 1. O Hook Customizado
function useAuth() {
  // Lógica para verificar se o usuário está autenticado...
  const isAuthenticated = checkUserSession();
  return { isAuthenticated };
}

// 2. O componente usa o hook diretamente
function PainelSecreto() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <p>Você precisa estar logado.</p>;
  }

  return <h2>Informações Confidenciais</h2>;
}
```

> **Resumo**: Enquanto padrões como **Container/Apresentação**, **HOCs** e **Render Props** foram importantes na história do React, os **Hooks Customizados** e o **Padrão Provedor (Context API)** são as ferramentas modernas e preferenciais para criar aplicações React limpas, reutilizáveis e fáceis de manter.
