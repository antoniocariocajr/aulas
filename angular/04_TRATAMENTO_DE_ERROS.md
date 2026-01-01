# **Tratamento de Erros em TypeScript**

O tratamento de erros é uma parte crucial da escrita de aplicações robustas. O TypeScript, assim como o JavaScript, usa o bloco `try...catch...finally` para lidar com exceções.

## **O Bloco `try...catch`**

A declaração `try...catch` marca um bloco de declarações para tentar e especifica uma resposta caso uma exceção seja lançada.

```typescript
try {
  // Código que pode lançar um erro
  const resultado = 10 / 0;
  if (resultado === Infinity) {
    throw new Error("Não é possível dividir por zero");
  }
} catch (error) {
  // Código para lidar com o erro
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Ocorreu um erro desconhecido");
  }
}
```

## **O Bloco `finally`**

O bloco `finally` é executado após os blocos `try` e `catch`, independentemente de uma exceção ter sido lançada ou capturada.

```typescript
let conexao;
try {
  // conexao = abrirBancoDeDados();
  // usarConexao(conexao);
} catch (error) {
  console.error("Ocorreu um erro");
} finally {
  // fecharBancoDeDados(conexao);
  console.log("Conexão com o banco de dados fechada.");
}
```

## **A Declaração `throw`**

Você pode usar a declaração `throw` para lançar suas próprias exceções.

```typescript
function validarIdade(idade: number): void {
  if (idade < 0) {
    throw new Error("A idade não pode ser negativa");
  }
}

try {
  validarIdade(-5);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message); // "A idade não pode ser negativa"
  }
}
```

## **Erros Personalizados**

Você pode criar suas próprias classes de erro personalizadas estendendo a classe `Error` nativa. Isso é útil para criar erros mais específicos e descritivos.

```typescript
class ErroDeValidacao extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ErroDeValidacao";
  }
}

function salvarUsuario(nome: string): void {
  if (nome.length === 0) {
    throw new ErroDeValidacao("O nome não pode estar vazio");
  }
}

try {
  salvarUsuario("");
} catch (error) {
  if (error instanceof ErroDeValidacao) {
    console.error(`Falha na validação: ${error.message}`);
  }
}
```
