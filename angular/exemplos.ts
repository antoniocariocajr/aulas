// =====================================================================
// == 01: TypeScript Fundamentals Examples
// =====================================================================

let nome: string = "Maria";
let idade: number = 30;
let isEstudante: boolean = true;
type StringOuNumero = string | number;
let id: StringOuNumero = "abc-123";

function log(mensagem: string): void {
  console.log(mensagem);
}

// =====================================================================
// == 02: Classes and Interfaces Examples (Mirrors Java Pessoa)
// =====================================================================

interface IPessoa {
  nome: string;
  idade: number;
  fazerAniversario(): void;
}

class Pessoa implements IPessoa {
  constructor(public nome: string, public idade: number) {}

  fazerAniversario(): void {
    this.idade++;
    log(`${this.nome} agora tem ${this.idade} anos.`);
  }
}

const pessoa = new Pessoa("Maria", 30);
pessoa.fazerAniversario();

// =====================================================================
// == 03: OOP in TypeScript Examples (Mirrors Java Animal/Cachorro)
// =====================================================================

abstract class Animal {
  constructor(protected nome: string) {}
  abstract comer(): void;
}

class Cachorro extends Animal {
  comer(): void {
    log(`${this.nome} está comendo ração de cachorro.`);
  }
  latir(): void {
    log("Au au!");
  }
}

class Gato extends Animal {
  comer(): void {
    log(`${this.nome} está comendo peixe.`);
  }
}

const rex = new Cachorro("Rex");
rex.comer();

const animais: Animal[] = [rex, new Gato("Mimi")];
animais.forEach(animal => animal.comer());


// =====================================================================
// == 04: Error Handling Examples
// =====================================================================

class SaldoInsuficienteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SaldoInsuficienteError";
  }
}

function sacar(valor: number, saldo: number): void {
  if (valor > saldo) {
    throw new SaldoInsuficienteError(`Saldo insuficiente. Saldo: ${saldo}`);
  }
  log(`Saque de ${valor} realizado com sucesso.`);
}

try {
  sacar(100, 50);
} catch (error) {
  if (error instanceof SaldoInsuficienteError) {
    log(`Erro: ${error.message}`);
  }
}

// =====================================================================
// == 05: Asynchronous Programming Examples
// =====================================================================

import { Observable } from 'rxjs';

const promise = new Promise((resolve) => {
  setTimeout(() => resolve("Promise resolvida!"), 1000);
});

async function executarAsync() {
  const resultado = await promise;
  log(resultado as string);
}

const observable = new Observable(subscriber => {
  subscriber.next('Observable emitiu!');
  subscriber.complete();
});

executarAsync();
observable.subscribe(valor => log(valor));
