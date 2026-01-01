# 📡 Buscando Dados de APIs (Data Fetching)

Em Java, o padrão **DAO (Data Access Object)** é usado para isolar a lógica de acesso a dados do resto da aplicação. Em React, o conceito análogo é isolar a lógica de **busca de dados de uma API** (Data Fetching), mantendo os componentes da UI focados em exibir os dados, e não em como eles são obtidos.

O processo de buscar dados em React geralmente envolve três estados:
1.  **Loading**: A requisição está em andamento.
2.  **Success**: Os dados foram recebidos com sucesso.
3.  **Error**: Ocorreu um erro durante a requisição.

---

## **1. Padrão Básico: `fetch` dentro do `useEffect`**

A forma mais fundamental de buscar dados é usar a [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) do navegador dentro de um hook `useEffect`.

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  // 1. Definir os três estados
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2. A função de busca de dados
    async function fetchUserData() {
      try {
        setLoading(true);
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar dados');
        }
        const data = await response.json();
        setUser(data); // Estado de sucesso
      } catch (err) {
        setError(err); // Estado de erro
      } finally {
        setLoading(false); // Fim do estado de loading
      }
    }

    fetchUserData();
  }, [userId]); // 3. Re-executa o fetch se o userId mudar

  // 4. Renderização condicional baseada nos estados
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

---

## **2. Isolando a Lógica: Criando uma Camada de API (Análogo ao DAO)**

Repetir a lógica de `fetch` em vários componentes é ineficiente. Podemos isolá-la em funções separadas, criando uma "camada de serviço de API".

**`services/api.js` (nosso "DAO"):**
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

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  // ... (estados de loading e error)

  useEffect(() => {
    getUserById(userId)
      .then(data => setUser(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [userId]);

  // ... (renderização condicional)
}
```

---

## **3. Abstração Avançada: O Custom Hook `useFetch`**

Podemos ir além e criar um Custom Hook `useFetch` que encapsula não apenas a chamada da API, mas também o gerenciamento dos estados `loading`, `data` e `error`.

**`hooks/useFetch.js`:**
```javascript
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

**Uso no componente (extremamente limpo):**
```jsx
import { useFetch } from './hooks/useFetch';

function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`https://api.example.com/users/${userId}`);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return <h1>{user.name}</h1>;
}
```

---

## **Bibliotecas Populares (Análogo ao Spring Data JPA)**

Assim como o Spring Data JPA automatiza o DAO, bibliotecas como **React Query (TanStack Query)** e **SWR** automatizam o data fetching em React. Elas oferecem, prontas para uso:
-   Gerenciamento de cache
-   Sincronização em segundo plano
-   Gerenciamento de estados de loading/error
-   Paginação e "infinite scroll"

**Exemplo com React Query:**
```jsx
import { useQuery } from '@tanstack/react-query';
import { getUserById } from './services/api';

function UserProfile({ userId }) {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user', userId], // Chave de cache
    queryFn: () => getUserById(userId), // Função de fetch
  });

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro: {error.message}</div>;

  return <h1>{user.name}</h1>;
}
```

> **Resumo**: Em React, a busca de dados é um **efeito colateral** gerenciado com `useEffect`. Para um código limpo e reutilizável, **isole a lógica de `fetch`** em **funções de serviço (análogo ao DAO)** ou, melhor ainda, em **Custom Hooks (`useFetch`)**. Para aplicações complexas, utilize bibliotecas como **React Query**, que abstraem e simplificam todo o processo, assim como o Spring Data JPA faz com o acesso a bancos de dados.
