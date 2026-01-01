# **Estruturas de Dados em TypeScript**

Estruturas de dados são fundamentais para organizar e armazenar dados de forma eficiente. O TypeScript, assim como o JavaScript, oferece várias estruturas de dados nativas.

## **Array**

Um `Array` é uma coleção ordenada de elementos. Os arrays em TypeScript podem ser tipados.

```typescript
// Array de strings
const nomes: string[] = ["Alice", "Bob", "Charlie"];

// Array de números
const numeros: Array<number> = [10, 20, 30];

// Adicionar um elemento
numeros.push(40);

// Iterar sobre um array
numeros.forEach(numero => {
  console.log(numero);
});
```

## **Set**

Um `Set` é uma coleção de elementos **únicos**. Ele é útil para remover duplicatas de um array.

```typescript
const numerosUnicos = new Set<number>();

numerosUnicos.add(1);
numerosUnicos.add(2);
numerosUnicos.add(1); // Este não será adicionado

console.log(numerosUnicos); // Set { 1, 2 }
```

## **Map**

Um `Map` é uma coleção de pares chave-valor. As chaves podem ser de qualquer tipo.

```typescript
const contatos = new Map<string, string>();

contatos.set("Alice", "alice@email.com");
contatos.set("Bob", "bob@email.com");

// Obter um valor
const emailDoBob = contatos.get("Bob");

console.log(emailDoBob); // "bob@email.com"
```
