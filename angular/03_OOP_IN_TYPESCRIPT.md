# **Object-Oriented Programming (OOP) in TypeScript**

TypeScript is an object-oriented language that supports the core principles of OOP: encapsulation, inheritance, polymorphism, and abstraction.

## **Encapsulation**

Encapsulation is the bundling of data (properties) and methods that operate on that data into a single unit (a class). This example mirrors the `ContaBancaria` class from the Java guide.

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

## **Inheritance**

Inheritance is a mechanism where a new class inherits properties and methods from an existing class. This example mirrors the `Animal` and `Cachorro` classes from the Java guide.

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
    super(nome); // Call the constructor of the base class
  }

  public latir(): void {
    console.log("Au au!");
  }

  // Method Overriding
  public comer(): void {
    console.log(`${this.nome} está comendo ração de cachorro.`);
  }
}

const cachorro = new Cachorro("Rex");
cachorro.latir();
cachorro.comer();
```

## **Polymorphism**

Polymorphism allows objects of different classes to be treated as objects of a common superclass.

```typescript
class Gato extends Animal {
  public comer(): void {
    console.log(`${this.nome} está comendo peixe.`);
  }
}

const animais: Animal[] = [new Cachorro("Rex"), new Gato("Mimi")];

animais.forEach(animal => {
  animal.comer(); // Each animal eats differently
});
```

## **Abstraction**

Abstraction is the concept of hiding complex implementation details. This is often achieved with abstract classes. This example mirrors the `FormaGeometrica` class from the Java guide.

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
