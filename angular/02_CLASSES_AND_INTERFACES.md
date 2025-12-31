# **Classes and Interfaces in TypeScript**

Classes in TypeScript are a cornerstone of object-oriented programming and are fundamental to building Angular applications. Interfaces are used to define contracts for the shape of an object.

## **Classes**

A class in TypeScript is a blueprint for creating objects. It can contain properties, methods, and a constructor.

### **Structure of a Class**

This example mirrors the `Pessoa` class from the Java study guide.

```typescript
class Pessoa {
  // 1. Properties
  private nome: string;
  public idade: number;

  // 2. Constructor
  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  // 3. Methods
  public fazerAniversario(): void {
    this.idade++;
    console.log(`${this.nome} agora tem ${this.idade} anos.`);
  }

  public getNome(): string {
    return this.nome;
  }
}

// Creating an instance of a class
const pessoa = new Pessoa("Maria", 30);
pessoa.fazerAniversario(); // "Maria agora tem 31 anos."
```

### **Access Modifiers**

TypeScript provides access modifiers to control the visibility of class members.

| Modifier | Description |
| --- | --- |
| `public` | (Default) Members are accessible from anywhere. |
| `private` | Members are only accessible within the class. |
| `protected` | Members are accessible within the class and by subclasses. |
| `readonly` | A property that can only be set in the constructor. |

---

## **Interfaces**

An interface is a way to define a contract for an object's shape. It specifies the names and types of properties and methods that an object must have.

> **Interfaces** define **what an object should look like**, but they don't provide an implementation.

### **Defining an Interface**

```typescript
interface IPessoa {
  nome: string;
  idade: number;
  fazerAniversario(): void;
}
```

### **Implementing an Interface**

A class can implement an interface, which forces the class to adhere to the contract defined by the interface.

```typescript
class Funcionario implements IPessoa {
  nome: string;
  idade: number;

  constructor(nome: string, idade: number, private cargo: string) {
    this.nome = nome;
    this.idade = idade;
  }

  fazerAniversario(): void {
    this.idade++;
    console.log(`${this.nome} (${this.cargo}) agora tem ${this.idade} anos.`);
  }
}
```
