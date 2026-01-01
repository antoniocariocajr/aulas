# 📋 Tipos de Componentes: Funcionais vs. de Classe

Em React, existem duas maneiras principais de definir um componente: como uma **função JavaScript** (um Componente Funcional) ou como uma **classe ES6** (um Componente de Classe).

Embora você encontre ambos em bases de código existentes, **Componentes Funcionais com Hooks são o padrão moderno e recomendado para todo novo desenvolvimento.**

---

## **1. Componentes Funcionais (O Padrão Moderno)**

Um componente funcional é uma função JavaScript pura que aceita `props` como argumento e retorna JSX. Para adicionar estado ou recursos de ciclo de vida, você usa **Hooks** (como `useState` e `useEffect`).

-   **Analogia**: Pense neles como `record`s do Java ou classes de utilitários estáticos simples. Eles são concisos, claros e focam nas entradas (`props`) e saídas (JSX).

### **Exemplo**

```jsx
import React, { useState, useEffect } from 'react';

// Este é um Componente Funcional
function Contador({ contagemInicial }) {
  // 1. O estado é gerenciado com o Hook useState
  const [contagem, setContagem] = useState(contagemInicial);

  // 2. Efeitos colaterais (como buscar dados ou definir temporizadores) são gerenciados com useEffect
  useEffect(() => {
    document.title = `Você clicou ${contagem} vezes`;
  }, [contagem]); // Este efeito é executado novamente apenas quando 'contagem' muda

  return (
    <div>
      <p>Você clicou {contagem} vezes</p>
      <button onClick={() => setContagem(contagem + 1)}>
        Clique em mim
      </button>
    </div>
  );
}
```

---

## **2. Componentes de Classe (A Abordagem Original)**

Um componente de classe é uma classe ES6 que estende `React.Component`. Ele deve incluir um método `render()` que retorna JSX. O estado e os métodos de ciclo de vida são tratados através da própria instância da classe (`this.state`, `this.setState`, `componentDidMount`, etc.).

-   **Analogia**: Isso é como uma classe Java tradicional. Tem um construtor, variáveis de instância (`this.state`) e métodos (`this.setState`).

### **Exemplo (O Mesmo Contador)**

```jsx
import React, { Component } from 'react';

// Este é um Componente de Classe
class Contador extends Component {
  // 1. O construtor é usado para inicializar o estado
  constructor(props) {
    super(props);
    this.state = {
      contagem: props.contagemInicial,
    };
  }

  // 2. Métodos de ciclo de vida lidam com efeitos colaterais
  componentDidMount() {
    document.title = `Você clicou ${this.state.contagem} vezes`;
  }

  componentDidUpdate() {
    document.title = `Você clicou ${this.state.contagem} vezes`;
  }

  // Método auxiliar
  handleIncremento = () => {
    // O estado é atualizado com this.setState
    this.setState({ contagem: this.state.contagem + 1 });
  };

  // 3. render() é obrigatório e retorna o JSX
  render() {
    return (
      <div>
        <p>Você clicou {this.state.contagem} vezes</p>
        <button onClick={this.handleIncremento}>
          Clique em mim
        </button>
      </div>
    );
  }
}
```

---

## **Tabela Resumo: Funcional vs. Classe**

| Característica | Componente Funcional | Componente de Classe |
| --- | --- | --- |
| **Sintaxe** | Função pura | Estende `React.Component` |
| **Estado** | Hook `useState` | `this.state`, `this.setState()` |
| **Props** | Passadas como argumentos da função (`props`) | Acessadas via `this.props` |
| **Ciclo de Vida** | Hook `useEffect` | `componentDidMount`, `componentDidUpdate`, etc. |
| **Palavra-chave `this`** | Não é necessária | Usada extensivamente (`this.props`, `this.state`) |
| **Tamanho do Código** | Mais conciso, menos boilerplate | Mais verboso |
| **Status Atual**| **Padrão Recomendado** | Legado (ainda suportado) |

---

## **Por Que os Componentes Funcionais Venceram?**

1.  **Mais Simples e Legíveis:** Menos código boilerplate torna os componentes mais fáceis de escrever e entender.
2.  **Sem a Palavra-chave `this`:** Gerenciar o `this` em classes JavaScript é uma fonte comum de bugs e confusão. Os componentes funcionais eliminam isso completamente.
3.  **Reutilização de Lógica Mais Fácil:** Os Hooks (como `useEffect` e Hooks customizados) fornecem uma maneira muito mais limpa e poderosa de compartilhar lógica com estado entre componentes, em comparação com padrões mais antigos como Mixins ou Componentes de Ordem Superior usados com classes.
4.  **Melhor para Otimização:** Componentes funcionais podem ser mais fáceis para a equipe do React otimizar no futuro.

> **Conclusão**: Embora você deva entender como ler um Componente de Classe, você deve sempre escolher **Componentes Funcionais com Hooks** para qualquer novo código React que você escrever.
