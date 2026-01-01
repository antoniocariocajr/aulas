# **Programação Orientada a Objetos (POO) em TypeScript**

O TypeScript é uma linguagem orientada a objetos que suporta os princípios fundamentais da POO: encapsulamento, herança, polimorfismo e abstração.

## **Encapsulamento**

Encapsulamento é o agrupamento de dados (propriedades) e métodos que operam nesses dados em uma única unidade (uma classe). Este exemplo espelha a classe `ContaBancaria` do guia de Java.

```typescript
class ContaBancaria {
  private saldo: number = 0;

  constructor(saldoInicial: number) {
    this.saldo = saldoInicial;
  }

  public depositar(valor: number): void {
    if (valor > 0) {
      this.saldo += valor;
    }
  }

  public getSaldo(): number {
    return this.saldo;
  }
}
```

## **Herança**

Herança é um mecanismo onde uma nova classe herda propriedades e métodos de uma classe existente. Este exemplo espelha as classes `Animal` e `Cachorro` do guia de Java.

```typescript
class Animal {
  protected nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  public comer(): void {
    console.log(`${this.nome} está comendo.`);
  }
}

class Cachorro extends Animal {
  constructor(nome: string) {
    super(nome); // Chama o construtor da classe base
  }

  public latir(): void {
    console.log("Au au!");
  }

  // Sobrescrita de Método
  public comer(): void {
    console.log(`${this.nome} está comendo ração de cachorro.`);
  }
}

const cachorro = new Cachorro("Rex");
cachorro.latir();
cachorro.comer();
```

## **Polimorfismo**

Polimorfismo permite que objetos de diferentes classes sejam tratados como objetos de uma superclasse comum.

```typescript
class Gato extends Animal {
  public comer(): void {
    console.log(`${this.nome} está comendo peixe.`);
  }
}

const animais: Animal[] = [new Cachorro("Rex"), new Gato("Mimi")];

animais.forEach(animal => {
  animal.comer(); // Cada animal come de forma diferente
});
```

## **Abstração**

Abstração é o conceito de esconder detalhes complexos de implementação. Isso é frequentemente alcançado com classes abstratas. Este exemplo espelha a classe `FormaGeometrica` do guia de Java.

```typescript
abstract class FormaGeometrica {
  abstract calcularArea(): number;
}

class Retangulo extends FormaGeometrica {
  constructor(private largura: number, private altura: number) {
    super();
  }

  calcularArea(): number {
    return this.largura * this.altura;
  }
}

const retangulo = new Retangulo(10, 5);
console.log(retangulo.calcularArea()); // 50
```
