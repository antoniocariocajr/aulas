# 🔍 Data Types in React (and JavaScript)

In React, you work with standard JavaScript data types. The most important distinction to understand is between **primitive types** and **objects/arrays**, especially when managing state.

## **Primitive Types**

- These are the most basic data types provided by JavaScript.
- They are **immutable** and their variables directly store the value.

| Type | Description | Example |
| --- | --- | --- |
| `string` | A sequence of characters | `const name = 'Alice';` |
| `number` | Numeric values (integer or float) | `const age = 30;` |
| `boolean` | Represents `true` or `false` | `const isLoggedIn = true;` |
| `null` | Represents the intentional absence of any object value | `let user = null;` |
| `undefined` | A variable that has been declared but not assigned a value | `let city;` |
| `symbol` | A unique and immutable primitive value | `const id = Symbol('id');` |
| `bigint` | For integers of arbitrary precision | `const largeNumber = 9007199254740991n;` |

When you update a state variable holding a primitive, React's change detection works as you'd expect.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // 'count' is a number (primitive)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count is {count}
    </button>
  );
}
```

---

## 2️⃣ **Objects and Arrays (Reference Types)**

- These are **collections of values** or more complex entities.
- Variables holding objects or arrays store a **reference (or pointer)** to the location in memory where the object is stored.
- They are **mutable**, meaning their contents can be changed.

| Type | Description | Example |
| --- | --- | --- |
| `Object` | A collection of key-value pairs | `const person = { name: 'Bob', age: 42 };` |
| `Array` | An ordered list of values | `const numbers = [1, 2, 3];` |

### **The Challenge with State: Immutability**

This is the most critical concept. React determines whether to re-render a component by checking if its state has changed. For objects and arrays, it just checks if the **reference** has changed.

If you **mutate** an object or array in state directly, the reference doesn't change, and **React will not re-render your component**.

**❌ Incorrect Way (Mutation):**

```jsx
import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState(['Learn React', 'Write Code']);

  function handleAddTodo() {
    //  WRONG: This mutates the original array.
    // The reference to 'todos' does not change.
    todos.push('New Todo');
    setTodos(todos); // React sees the same reference, no re-render!
  }

  return <button onClick={handleAddTodo}>Add Todo</button>;
}
```

**✅ Correct Way (Immutability):**

To update an object or array in state, you must create a **new** object or array and pass it to the state setter function. This provides a new reference, and React knows it needs to re-render. The spread syntax (`...`) is perfect for this.

```jsx
import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState(['Learn React', 'Write Code']);

  function handleAddTodo() {
    // CORRECT: Create a *new* array with the old items and the new one.
    const newTodos = [...todos, 'New Todo'];
    setTodos(newTodos); // React sees a new reference and re-renders!
  }

  // ...
}
```

### **Tabela resumo – Primitivo vs. Objeto/Array em State**

| Característica | Primitivo | Objeto / Array |
| --- | --- | --- |
| **Variable Stores** | The actual value | A reference (memory address) |
| **State Update** | Pass the new value directly | Pass a **new** object/array |
| **Immutability** | Inherently immutable | Must be treated as immutable in state |
| **Common Mistake** | (rare) | Direct mutation (e.g., `.push()`, `obj.key = val`) |
| **Correct Approach** | `setCount(count + 1)` | `setTodos([...todos, newItem])` or `setUser({...user, name: 'new'})` |

---

### **Resumo**

> In React, **never mutate objects or arrays in state directly**. Always create a **new copy** with your changes. This ensures React's change detection works correctly and your UI updates as expected.
