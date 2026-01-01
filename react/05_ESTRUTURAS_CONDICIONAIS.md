# 🔀 Estruturas Condicionais em React (Renderização Condicional)

> **Definição**: Técnicas para renderizar diferentes marcações JSX com base no estado ou nas props do componente. É assim que você torna sua UI dinâmica e responsiva aos dados.

---

## **1. Operador Ternário (`? :`) para `if-else` em Linha**

Esta é a maneira mais comum e concisa de lidar com uma condição `if-else` simples diretamente dentro do seu JSX.

**Sintaxe**: `condicao ? <ExpressaoSeVerdadeiro /> : <ExpressaoSeFalso />`

```jsx
import { useState } from 'react';

function BotaoDeLogin() {
  const [estaLogado, setEstaLogado] = useState(false);

  return (
    <div>
      <p>
        {estaLogado ? 'Bem-vindo de volta!' : 'Por favor, faça o login.'}
      </p>
      <button onClick={() => setEstaLogado(!estaLogado)}>
        {estaLogado ? 'Sair' : 'Entrar'}
      </button>
    </div>
  );
}
```

---

## **2. E Lógico (`&&`) para "se verdadeiro, então renderize"**

Use isso quando você quiser renderizar algo *apenas se* uma condição for verdadeira, e não renderizar nada caso contrário. É uma forma abreviada de um ternário com `null` no ramo `else`.

**Sintaxe**: `condicao && <ExpressaoParaRenderizar />`

```jsx
function EmblemaDeNotificacao({ contagem }) {
  return (
    <div>
      <span>Você tem uma nova mensagem</span>
      {contagem > 0 && <span className="badge">{contagem}</span>}
    </div>
  );
}

// O span do emblema só será renderizado se a contagem for maior que 0.
```

---

## **3. Usando `if`/`else` com uma Variável**

Para lógicas mais complexas que parecem confusas dentro do JSX, você pode usar uma declaração `if`/`else` padrão do JavaScript fora da declaração de retorno para preparar uma variável e, em seguida, renderizar essa variável.

```jsx
function SaudacaoUsuario({ tipoUsuario }) {
  let componenteSaudacao;

  if (tipoUsuario === 'admin') {
    componenteSaudacao = <h1>Painel do Administrador</h1>;
  } else if (tipoUsuario === 'assinante') {
    componenteSaudacao = <h1>Bem-vindo, Valioso Assinante!</h1>;
  } else {
    componenteSaudacao = <h1>Bem-vindo, Convidado!</h1>;
  }

  return (
    <div>
      {componenteSaudacao}
    </div>
  );
}
```

---

## **4. Declarações `switch` (ou Mapeamento de Objeto) para Múltiplas Opções**

Embora você não possa usar uma declaração `switch` diretamente dentro do JSX, você pode usar o mesmo padrão da variável `if/else`. Uma abordagem mais "React-y" e muitas vezes mais limpa é usar um objeto como um mapa.

**Com uma função auxiliar e `switch`:**

```jsx
function obterIconeParaStatus(status) {
  switch (status) {
    case 'sucesso':
      return <IconeDeSucesso />;
    case 'aviso':
      return <IconeDeAviso />;
    case 'erro':
      return <IconeDeErro />;
    default:
      return <IconeDeInformacao />;
  }
}

function IndicadorDeStatus({ status }) {
  return <div>{obterIconeParaStatus(status)}</div>;
}
```

**Com um mapa de objeto (muitas vezes preferido):**

```jsx
const ICONES_DE_STATUS = {
  sucesso: <IconeDeSucesso />,
  aviso: <IconeDeAviso />,
  erro: <IconeDeErro />,
  info: <IconeDeInformacao />,
};

function IndicadorDeStatus({ status }) {
  // Use o mapa para obter o componente, com um fallback
  const icone = ICONES_DE_STATUS[status] || ICONES_DE_STATUS.info;

  return <div>{icone}</div>;
}
```
Essa abordagem é muito declarativa e fácil de ler.

---

## **Melhores Práticas**

1.  **Prefira Ternário e `&&` para casos simples:** Eles mantêm seu JSX limpo e em linha.
2.  **Mova lógicas complexas para fora do JSX:** Para lógicas `if-else-if` de múltiplos caminhos ou `switch`, prepare o conteúdo em uma variável ou função auxiliar antes da declaração `return`.
3.  **Evite renderizar valores "falsy":** Esteja ciente de que `condicao && <div />` renderizará `0` se `condicao` for `0`. Para evitar isso, garanta que sua condição seja um booleano: `Boolean(condicao) && <div />` ou `condicao > 0 && <div />`.
4.  **Não mute:** A renderização condicional deve ser baseada em props e estado; não altere variáveis dentro da própria lógica de renderização.

---

## **Resumo**

> Para controlar o que é renderizado no React, use o **operador ternário (`? :`)** para lógicas `if-else` simples, o **E lógico (`&&`)** para mostrar um elemento apenas se uma condição for atendida, e **variáveis JavaScript** para cenários mais complexos do tipo `if-else-if` ou `switch`.
