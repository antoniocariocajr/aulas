# 🔧 **Entrada de Dados (Formulários) e Saída (Exibindo Estado)**

> **Objetivo**: Aprender como capturar a entrada do usuário a partir de formulários e exibi-la de volta na UI usando o gerenciamento de estado do React. Este é o equivalente web de ler do console e imprimir um resultado.

---

## **A Ideia Central: Componentes Controlados**

No React, um "componente controlado" é um elemento de formulário de entrada cujo valor é controlado pelo estado do React.

1.  Criamos uma parte do estado usando `useState` para armazenar o valor da entrada.
2.  O atributo `value` da entrada é explicitamente definido para a nossa variável de estado.
3.  Um manipulador de eventos `onChange` atualiza o estado toda vez que o usuário digita.

Isso torna o estado do React a "única fonte da verdade", e o componente "controla" a entrada.

---

## **Construindo um Formulário Simples**

Vamos construir um formulário que pede o nome de um usuário e o exibe ao vivo.

```jsx
import React, { useState } from 'react';

function FormularioDeNome() {
  // 1. Crie o estado para armazenar o valor da entrada
  const [nome, setNome] = useState('');

  // 3. Esta função é executada toda vez que a entrada muda
  const handleChange = (event) => {
    // Ela atualiza o estado com o valor atual da entrada
    setNome(event.target.value);
  };

  return (
    <div>
      <form>
        <label>
          Nome:
          {/* 2. O valor da entrada está vinculado ao estado */}
          <input type="text" value={nome} onChange={handleChange} />
        </label>
      </form>

      {/* Saída: Exibindo o valor do estado */}
      <h2>Olá, {nome || 'Estranho'}!</h2>
    </div>
  );
}
```

### **Como Funciona**

-   `useState('')`: Inicializamos o estado `nome` com uma string vazia.
-   `value={nome}`: O campo de entrada sempre exibe o valor atual do estado `nome`.
-   `onChange={handleChange}`: Quando o usuário digita, a função `handleChange` é chamada.
-   `event.target.value`: Dentro de `handleChange`, isso nos dá o texto atual dentro da caixa de entrada.
-   `setNome(...)`: Atualizamos o estado, o que faz com que o componente seja renderizado novamente, exibindo o novo nome tanto no `<h2>` quanto no próprio `<input>`.

---

## **Lidando com a Submissão de Formulários**

Normalmente, você quer fazer algo com os dados depois que o usuário clica em um botão "Enviar". Lidamos com isso com o evento `onSubmit` do elemento `<form>`.

```jsx
import React, { useState } from 'react';

function FormularioDeInscricao() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    // Previne o comportamento padrão do navegador de recarregar a página inteira
    event.preventDefault();

    // Agora você pode usar o estado capturado
    alert(`Obrigado por se inscrever com: ${email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Inscrever-se</button>
    </form>
  );
}
```

### **Pontos Chave para Submissão**

-   `onSubmit={handleSubmit}`: O manipulador é colocado na tag `<form>`, não no botão.
-   `event.preventDefault()`: Isso é **crucial**. Sem isso, o navegador tentará enviar o formulário e recarregar a página, o que não é como as Aplicações de Página Única (SPAs) como o React funcionam.
-   Os dados já estão em nosso estado (`email`), então podemos usá-los diretamente no manipulador de submissão (ex: enviá-lo para uma API, atualizar o estado do componente pai, etc.).

---

## **Resumo de Entrada/Saída em React**

| Conceito | Equivalente em Java | Implementação em React |
| --- | --- | --- |
| **Fonte de Entrada** | `System.in` (Teclado) | Elementos de Formulário HTML (`<input>`, `<textarea>`) |
| **Lendo a Entrada** | `scanner.nextInt()`, `scanner.nextLine()` | Manipulador de eventos `onChange` no elemento de entrada. |
| **Armazenando Dados** | Variáveis locais (`int idade`, `String nome`) | Estado do React (`useState`) |
| **Exibindo Dados**| `System.out.println()`, `System.out.printf()` | Renderizando variáveis de estado dentro do JSX (`<p>{nome}</p>`) |
| **Sinal de "Concluído"**| O programa continua ou termina | Manipulador de eventos `onSubmit` no `<form>`. |

---

## **Resumo**

> No React, use **componentes controlados** para lidar com a entrada do usuário. Armazene o valor das entradas do formulário no **`useState`**, atualize-o com **`onChange`**, e processe os dados finais no manipulador **`onSubmit`** do `<form>` (lembrando sempre de chamar `event.preventDefault()`).
