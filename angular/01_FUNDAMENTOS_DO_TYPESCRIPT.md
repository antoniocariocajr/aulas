# **Fundamentos do TypeScript**

O TypeScript é um superconjunto do JavaScript que adiciona tipos estáticos. O Angular é construído com TypeScript, e é a linguagem recomendada para construir aplicações Angular.

## **Tipos Básicos**

O TypeScript estende os tipos primitivos do JavaScript com um sistema de tipos estáticos.

| Tipo | Descrição | Exemplo |
| --- | --- | --- |
| `string` | Dados textuais | `let nome: string = "João";` |
| `number` | Valores numéricos (inteiro ou ponto flutuante) | `let idade: number = 30;` |
| `boolean` | Valores `true` ou `false` | `let isLoggedIn: boolean = false;` |
| `any` | Um tipo dinâmico que pode conter qualquer valor (use com moderação) | `let qualquerCoisa: any = "olá";` |
| `null` | Representa a ausência intencional de um valor de objeto | `let usuario: string | null = null;` |
| `undefined`| Representa uma variável que não foi atribuída a um valor | `let cidade: string | undefined;` |
| `void` | Usado para funções que não retornam um valor | `function logMessage(): void { console.log("Olá!"); }` |

### **Arrays e Tuplas**

```typescript
// Array de números
let lista: number[] = [1, 2, 3];

// Tupla com um número fixo de elementos de um tipo específico
let pessoa: [string, number] = ["João", 30];
```

### **Enums**

Enums permitem que você defina um conjunto de constantes nomeadas.

```typescript
enum Cor {
  Vermelho,
  Verde,
  Azul
}

let c: Cor = Cor.Verde; // 1
```

---

## **Inferência de Tipo**

O TypeScript muitas vezes consegue inferir o tipo de uma variável, então você nem sempre precisa declará-lo explicitamente.

```typescript
let nome = "João"; // TypeScript infere 'string'
let idade = 30; // TypeScript infere 'number'
```

---

## **Tipos de União**

Os tipos de união permitem que uma variável contenha um valor de múltiplos tipos.

```typescript
function imprimirId(id: number | string) {
  console.log("Seu ID é: " + id);
}

imprimirId(101); // OK
imprimirId("202"); // OK
```

---

## **Apelidos de Tipo (Type Aliases)**

Você pode criar um novo nome para um tipo usando a palavra-chave `type`.

```typescript
type StringOuNumero = string | number;

function imprimirValor(valor: StringOuNumero) {
  console.log(valor);
}
```
