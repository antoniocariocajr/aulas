# 🧪 Testes em React (Testing)

Assim como JUnit e Mockito são essenciais para o ecossistema Java, o ecossistema React possui ferramentas poderosas para garantir que seus componentes funcionem como esperado. A estratégia de testes geralmente se divide em três níveis.

> **Pirâmide de Testes em React**:
> 1.  **Testes Unitários (Unit Tests)**: Testa a menor parte do código (um componente ou função) de forma isolada. São rápidos e baratos.
> 2.  **Testes de Integração (Integration Tests)**: Testa a interação entre vários componentes.
> 3.  **Testes de Ponta a Ponta (End-to-End - E2E)**: Testa a aplicação inteira em um ambiente de navegador real, simulando o fluxo de um usuário. São lentos e caros.

---

## **Ferramentas Principais**

-   **Jest**: Um framework de testes do Facebook que fornece o ambiente para rodar os testes (`test runner`), asserções (`expect`) e mocks. É o padrão para aplicações React.
-   **React Testing Library (RTL)**: Uma biblioteca que ajuda a renderizar componentes em um ambiente de teste e a interagir com eles da mesma forma que um usuário faria (encontrando elementos por texto, label, etc.). **Esta é a abordagem recomendada atualmente.**
-   **Vitest**: Uma alternativa moderna ao Jest, especialmente popular em projetos que usam Vite. Oferece uma API compatível com Jest e é extremamente rápida.
-   **Cypress / Playwright**: Ferramentas para testes E2E que controlam um navegador real para simular interações complexas do usuário.

---

## **1. Testes Unitários com Jest e RTL**

O objetivo é testar um componente isoladamente, passando `props` e verificando se ele renderiza a saída correta.

**Cenário**: Testar um componente `Button` simples.

```jsx
// components/Button.jsx
export function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
```

**Teste (`components/Button.test.jsx`):**
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

// `describe` agrupa testes relacionados
describe('Button Component', () => {

  // `test` ou `it` define um caso de teste individual
  test('deve renderizar com o texto correto', () => {
    // 1. Renderiza o componente
    render(<Button>Clique aqui</Button>);

    // 2. Busca o elemento na "tela" (screen)
    // A RTL incentiva buscar elementos como o usuário faria
    const buttonElement = screen.getByText(/clique aqui/i);

    // 3. Faz a asserção (assertion)
    expect(buttonElement).toBeInTheDocument();
  });

  test('deve chamar a função onClick quando clicado', () => {
    // `jest.fn()` cria uma função "mock" para espionar chamadas
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Clique aqui</Button>);

    const buttonElement = screen.getByText(/clique aqui/i);

    // `fireEvent` simula a interação do usuário
    fireEvent.click(buttonElement);

    // Verifica se a função mock foi chamada exatamente uma vez
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## **2. Testes de Integração**

Aqui, testamos como os componentes trabalham juntos. Por exemplo, um formulário que, ao ser submetido, exibe uma mensagem de sucesso.

**Cenário**: Testar um formulário de login simples.

```jsx
// components/LoginForm.jsx
import { useState } from 'react';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <p>Bem-vindo, {username}!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Usuário</label>
      <input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
```

**Teste (`components/LoginForm.test.jsx`):**
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

test('deve mostrar a mensagem de boas-vindas após o login', () => {
  render(<LoginForm />);

  // Simula o usuário digitando no campo de input
  const input = screen.getByLabelText(/usuário/i);
  fireEvent.change(input, { target: { value: 'Alice' } });

  // Simula o clique no botão de submit
  const button = screen.getByRole('button', { name: /entrar/i });
  fireEvent.click(button);

  // Após a interação, a mensagem de boas-vindas deve aparecer
  const welcomeMessage = screen.getByText(/bem-vindo, alice!/i);
  expect(welcomeMessage).toBeInTheDocument();

  // O formulário original não deve mais estar visível
  expect(screen.queryByRole('button', { name: /entrar/i })).not.toBeInTheDocument();
});
```

---

## **3. Mockando Módulos e APIs**

Assim como o Mockito em Java, o Jest permite "mockar" dependências externas, como chamadas de API, para que os testes não dependam de serviços externos.

**Cenário**: Testar um componente que busca dados de uma API.

```jsx
// services/api.js
export async function fetchUser(userId) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  return await response.json();
}
```

**Teste com Mock da API:**
```jsx
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';
import { fetchUser } from '../services/api';

// Mocka todo o módulo da API
jest.mock('../services/api');

test('deve exibir o nome do usuário após o fetch', async () => {
  // Define o que a função mockada deve retornar para este teste
  fetchUser.mockResolvedValueOnce({ name: 'Bob' });

  render(<UserProfile userId="1" />);

  // `waitFor` espera que a asserção seja verdadeira (útil para código assíncrono)
  await waitFor(() => {
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});
```

> **Resumo**: Testar em React é crucial para a manutenibilidade. Use **React Testing Library** para focar em como o usuário interage com a UI. Comece com **testes unitários** para componentes isolados e avance para **testes de integração** para fluxos de usuário. Utilize o **Jest** para mockar dependências e criar um ambiente de teste controlado e rápido.
