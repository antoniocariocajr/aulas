# 📋 Component Types: Functional vs. Class Components

In React, there are two primary ways to define a component: as a **JavaScript function** (a Functional Component) or as an **ES6 class** (a Class Component).

While you will encounter both in existing codebases, **Functional Components with Hooks are the modern, recommended standard for all new development.**

---

## **1. Functional Components (The Modern Standard)**

A functional component is a plain JavaScript function that accepts `props` as an argument and returns JSX. To add state or lifecycle features, you use **Hooks** (like `useState` and `useEffect`).

-   **Analogy**: Think of these like Java `record`s or simple static utility classes. They are concise, clear, and focus on the inputs (`props`) and outputs (JSX).

### **Example**

```jsx
import React, { useState, useEffect } from 'react';

// This is a Functional Component
function Counter({ initialCount }) {
  // 1. State is managed with the useState Hook
  const [count, setCount] = useState(initialCount);

  // 2. Side effects (like fetching data or setting timers) are managed with useEffect
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // This effect re-runs only when 'count' changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

---

## **2. Class Components (The Original Approach)**

A class component is an ES6 class that extends `React.Component`. It must include a `render()` method that returns JSX. State and lifecycle methods are handled through the class instance itself (`this.state`, `this.setState`, `componentDidMount`, etc.).

-   **Analogy**: This is like a traditional Java class. It has a constructor, instance variables (`this.state`), and methods (`this.setState`).

### **Example (Same Counter)**

```jsx
import React, { Component } from 'react';

// This is a Class Component
class Counter extends Component {
  // 1. The constructor is used to initialize state
  constructor(props) {
    super(props);
    this.state = {
      count: props.initialCount,
    };
  }

  // 2. Lifecycle methods handle side effects
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  // Helper method
  handleIncrement = () => {
    // State is updated with this.setState
    this.setState({ count: this.state.count + 1 });
  };

  // 3. render() is required and returns the JSX
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleIncrement}>
          Click me
        </button>
      </div>
    );
  }
}
```

---

## **Summary Table: Functional vs. Class**

| Feature | Functional Component | Class Component |
| --- | --- | --- |
| **Syntax** | Plain function | Extends `React.Component` |
| **State** | `useState` Hook | `this.state`, `this.setState()` |
| **Props** | Passed as function arguments (`props`) | Accessed via `this.props` |
| **Lifecycle** | `useEffect` Hook | `componentDidMount`, `componentDidUpdate`, etc. |
| **`this` keyword** | Not needed | Used extensively (`this.props`, `this.state`) |
| **Code Length** | More concise, less boilerplate | More verbose |
| **Current Status**| **Recommended Standard** | Legacy (still supported) |

---

## **Why Functional Components Won?**

1.  **Simpler and More Readable:** Less boilerplate code makes components easier to write and understand.
2.  **No `this` Keyword:** Managing `this` in JavaScript classes is a common source of bugs and confusion. Functional components eliminate this entirely.
3.  **Easier Logic Reuse:** Hooks (like `useEffect` and custom Hooks) provide a much cleaner and more powerful way to share stateful logic between components compared to older patterns like Mixins or Higher-Order Components used with classes.
4.  **Better for Optimization:** Functional components can be easier for the React team to optimize in the future.

> **Conclusion**: While you should understand how to read a Class Component, you should always choose **Functional Components with Hooks** for any new React code you write.
