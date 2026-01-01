# **Classes e Interfaces em TypeScript**

As classes em TypeScript são um pilar da programação orientada a objetos e são fundamentais para a construção de aplicações Angular. As interfaces são usadas para definir contratos para a forma de um objeto.

## **Classes**

Uma classe em TypeScript é um modelo para a criação de objetos. Ela pode conter propriedades, métodos e um construtor.

### **Estrutura de uma Classe**

Este exemplo espelha a classe `Pessoa` do guia de estudos de Java.

```typescript
class Pessoa {
  // 1. Propriedades
  private nome: string;
  public idade: number;

  // 2. Construtor
  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  // 3. Métodos
  public fazerAniversario(): void {
    this.idade++;
    console.log(`${this.nome} agora tem ${this.idade} anos.`);
  }

  public getNome(): string {
    return this.nome;
  }
}

// Criando uma instância de uma classe
const pessoa = new Pessoa("Maria", 30);
pessoa.fazerAniversario(); // "Maria agora tem 31 anos."
```

### **Modificadores de Acesso**

O TypeScript fornece modificadores de acesso para controlar a visibilidade dos membros da classe.

| Modificador | Descrição |
| --- | --- |
| `public` | (Padrão) Membros são acessíveis de qualquer lugar. |
| `private` | Membros são acessíveis apenas dentro da classe. |
| `protected` | Membros são acessíveis dentro da classe e por subclasses. |
| `readonly` | Uma propriedade que só pode ser definida no construtor. |

---

## **Interfaces**

Uma interface é uma maneira de definir um contrato para a forma de um objeto. Ela especifica os nomes e tipos de propriedades e métodos que um objeto deve ter.

> **Interfaces** definem **como um objeto deve se parecer**, mas não fornecem uma implementação.

### **Definindo uma Interface**

```typescript
interface IPessoa {
  nome: string;
  idade: number;
  fazerAniversario(): void;
}
```

### **Implementando uma Interface**

Uma classe pode implementar uma interface, o que força a classe a aderir ao contrato definido pela interface.

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
