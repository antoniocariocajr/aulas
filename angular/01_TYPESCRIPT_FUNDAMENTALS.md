# **TypeScript Fundamentals**

TypeScript is a superset of JavaScript that adds static types. Angular is built with TypeScript, and it's the recommended language for building Angular applications.

## **Basic Types**

TypeScript extends JavaScript's primitive types with a static type system.

| Type | Description | Example |
| --- | --- | --- |
| `string` | Textual data | `let name: string = "John";` |
| `number` | Numeric values (integer or floating-point) | `let age: number = 30;` |
| `boolean` | `true` or `false` values | `let isLoggedIn: boolean = false;` |
| `any` | A dynamic type that can hold any value (use sparingly) | `let anything: any = "hello";` |
| `null` | Represents an intentional absence of an object value | `let user: string | null = null;` |
| `undefined`| Represents a variable that has not been assigned a value | `let city: string | undefined;` |
| `void` | Used for functions that do not return a value | `function logMessage(): void { console.log("Hello!"); }` |

### **Arrays and Tuples**

```typescript
// Array of numbers
let list: number[] = [1, 2, 3];

// Tuple with a fixed number of elements of a specific type
let person: [string, number] = ["John", 30];
```

### **Enums**

Enums allow you to define a set of named constants.

```typescript
enum Color {
  Red,
  Green,
  Blue
}

let c: Color = Color.Green; // 1
```

---

## **Type Inference**

TypeScript can often infer the type of a variable, so you don't always have to explicitly declare it.

```typescript
let name = "John"; // TypeScript infers 'string'
let age = 30; // TypeScript infers 'number'
```

---

## **Union Types**

Union types allow a variable to hold a value of multiple types.

```typescript
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

printId(101); // OK
printId("202"); // OK
```

---

## **Type Aliases**

You can create a new name for a type using the `type` keyword.

```typescript
type StringOrNumber = string | number;

function printValue(value: StringOrNumber) {
  console.log(value);
}
```
