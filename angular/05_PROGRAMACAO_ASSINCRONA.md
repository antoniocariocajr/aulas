# **Programação Assíncrona em TypeScript**

A programação assíncrona é um conceito fundamental no desenvolvimento web moderno. Ela permite que sua aplicação execute tarefas sem bloquear a thread principal, garantindo uma experiência de usuário fluida.

## **Promises**

Uma `Promise` é um objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona e seu valor resultante.

### **Criando uma Promise**

```typescript
const minhaPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const sucesso = true;
    if (sucesso) {
      resolve("A operação foi bem-sucedida!");
    } else {
      reject("A operação falhou.");
    }
  }, 1000);
});
```

### **Consumindo uma Promise**

Você pode consumir uma promise usando os métodos `.then()` e `.catch()`.

```typescript
minhaPromise
  .then(resultado => {
    console.log(resultado); // "A operação foi bem-sucedida!"
  })
  .catch(erro => {
    console.error(erro); // "A operação falhou."
  });
```

## **Async/Await**

`async/await` é uma sintaxe moderna para trabalhar com promises que faz seu código assíncrono parecer mais com código síncrono.

> **Funções `async`** sempre retornam uma promise.
> **`await`** só pode ser usado dentro de uma função `async` e pausa a execução da função até que a promise seja resolvida.

### **Usando `async/await`**

```typescript
async function buscarDados() {
  try {
    const resposta = await fetch("https://api.example.com/data");
    const dados = await resposta.json();
    console.log(dados);
  } catch (erro) {
    console.error("Falha ao buscar dados:", erro);
  }
}

buscarDados();
```

## **Observables (RxJS)**

Observables são uma maneira mais poderosa de lidar com operações assíncronas, especialmente no Angular. Eles fazem parte da biblioteca RxJS, que é uma parte fundamental do Angular.

> **Observables** são como fluxos de dados nos quais você pode se inscrever. Eles podem emitir múltiplos valores ao longo do tempo.

### **Criando e se Inscrevendo em um Observable**

```typescript
import { Observable } from 'rxjs';

const meuObservable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

meuObservable.subscribe({
  next(x) { console.log('valor obtido ' + x); },
  error(err) { console.error('ocorreu um erro: ' + err); },
  complete() { console.log('concluído'); }
});
```

Observables são usados extensivamente no Angular para lidar com eventos, requisições HTTP e gerenciamento de estado.
