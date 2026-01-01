# 📡 Buscando Dados de APIs (Data Fetching)

A busca de dados em React geralmente envolve três estados:
1.  **Carregando (Loading)**: A requisição está em andamento.
2.  **Sucesso (Success)**: Os dados foram recebidos com sucesso.
3.  **Erro (Error)**: Ocorreu um erro durante a requisição.

---

## **1. Padrão Básico: `fetch` dentro do `useEffect`**

A forma mais fundamental de buscar dados é usar a [Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API) do navegador dentro de um hook `useEffect`.

```jsx
import { useState, useEffect } from 'react';

function PerfilDeUsuario({ userId }) {
  // 1. Definir os três estados
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // 2. A função de busca de dados
    async function fetchUserData() {
      try {
        setCarregando(true);
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar dados');
        }
        const data = await response.json();
        setUsuario(data); // Estado de sucesso
      } catch (err) {
        setErro(err); // Estado de erro
      } finally {
        setCarregando(false); // Fim do estado de carregamento
      }
    }

    fetchUserData();
  }, [userId]); // 3. Re-executa o fetch se o userId mudar

  // 4. Renderização condicional baseada nos estados
  if (carregando) {
    return <div>Carregando...</div>;
  }

  if (erro) {
    return <div>Erro: {erro.message}</div>;
  }

  return (
    <div>
      <h1>{usuario.name}</h1>
      <p>{usuario.email}</p>
    </div>
  );
}
```

---

## **2. Isolando a Lógica: Criando uma Camada de API**

Repetir a lógica de `fetch` em vários componentes é ineficiente. Podemos isolá-la em funções separadas, criando uma "camada de serviço de API".

**`services/api.js`:**
```javascript
const BASE_URL = 'https://api.example.com';

// Uma função para buscar um usuário por ID
export async function getUserById(userId) {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  if (!response.ok) {
    throw new Error('Usuário não encontrado');
  }
  return await response.json();
}

// Uma função para buscar todos os posts
export async function getAllPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error('Falha ao buscar posts');
  }
  return await response.json();
}
```

**Uso no componente (muito mais limpo):**
```jsx
import { useState, useEffect } from 'react';
import { getUserById } from './services/api';

function PerfilDeUsuario({ userId }) {
  const [usuario, setUsuario] = useState(null);
  // ... (estados de carregando e erro)

  useEffect(() => {
    getUserById(userId)
      .then(data => setUsuario(data))
      .catch(err => setErro(err))
      .finally(() => setCarregando(false));
  }, [userId]);

  // ... (renderização condicional)
}
```

---

## **3. Abstração Avançada: O Hook Customizado `useFetch`**

Podemos ir além e criar um Hook Customizado `useFetch` que encapsula não apenas a chamada da API, mas também o gerenciamento dos estados `carregando`, `dados` e `erro`.

**`hooks/useFetch.js`:**
```javascript
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setCarregando(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('A resposta da rede não foi ok');
        const jsonData = await response.json();
        setDados(jsonData);
      } catch (err) {
        setErro(err);
      } finally {
        setCarregando(false);
      }
    }

    fetchData();
  }, [url]);

  return { dados, carregando, erro };
}
```

**Uso no componente (extremamente limpo):**
```jsx
import { useFetch } from './hooks/useFetch';

function PerfilDeUsuario({ userId }) {
  const { data: usuario, carregando, erro } = useFetch(`https://api.example.com/users/${userId}`);

  if (carregando) return <div>Carregando...</div>;
  if (erro) return <div>Erro: {erro.message}</div>;

  return <h1>{usuario.name}</h1>;
}
```

---

## **Bibliotecas Populares**

Bibliotecas como **React Query (TanStack Query)** e **SWR** automatizam a busca de dados em React. Elas oferecem, prontas para uso:
-   Gerenciamento de cache
-   Sincronização em segundo plano
-   Gerenciamento de estados de carregando/erro
-   Paginação e "rolagem infinita"

**Exemplo com React Query:**
```jsx
import { useQuery } from '@tanstack/react-query';
import { getUserById } from './services/api';

function PerfilDeUsuario({ userId }) {
  const { data: usuario, isLoading, isError, error } = useQuery({
    queryKey: ['user', userId], // Chave de cache
    queryFn: () => getUserById(userId), // Função de fetch
  });

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro: {error.message}</div>;

  return <h1>{usuario.name}</h1>;
}
```

> **Resumo**: Em React, a busca de dados é um **efeito colateral** gerenciado com `useEffect`. Para um código limpo e reutilizável, **isole a lógica de `fetch`** em **funções de serviço** ou, melhor ainda, em **Hooks Customizados (`useFetch`)**. Para aplicações complexas, utilize bibliotecas como **React Query**, que abstraem e simplificam todo o processo.
