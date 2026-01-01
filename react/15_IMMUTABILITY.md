# Immutability in React

Immutability is a core concept in React that helps in writing predictable and performant code. It means that once an object or a piece of data is created, it cannot be changed.

## Why is Immutability Important in React?

- **Change Detection:** React determines whether to re-render a component by comparing the old state and props with the new state and props. If you mutate an object directly, the reference to the object remains the same, and React won't be able to detect the change.
- **Predictability:** Immutable data makes it easier to reason about your application's state. You can be sure that the data won't be changed unexpectedly in some other part of the application.
- **Performance Optimization:** Immutability allows for cheap and easy change detection, which can lead to significant performance improvements.

## How to Achieve Immutability in JavaScript

### For Arrays:

- **Adding an element:** `const newArray = oldArray.concat([newElement]);` or `const newArray = [...oldArray, newElement];`
- **Removing an element:** `const newArray = oldArray.filter(item => item.id !== idToRemove);`
- **Updating an element:** `const newArray = oldArray.map(item => item.id === idToUpdate ? { ...item, ...updates } : item);`

### For Objects:

- **Updating a property:** `const newObject = { ...oldObject, propertyToUpdate: newValue };`

## Example in a React Component

```jsx
import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
          onClick={() => toggleTodo(todo.id)}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
```
