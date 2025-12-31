# ⚛️ Components: The Building Blocks of React

In React, a **component** is the "blueprint" for a piece of the user interface. It's a self-contained, reusable block of code that defines how a part of the UI should look and behave. This is the direct equivalent of a **class** in Object-Oriented Programming.

If an application were a house made of Lego bricks, each individual brick would be a component.

## Structure of a React Component

A modern React component is typically a JavaScript function. It's composed of:
1.  **Props**: Inputs to the component, similar to constructor arguments.
2.  **State**: The component's internal data, like attributes or instance variables.
3.  **Logic**: Functions and calculations that determine the component's behavior.
4.  **JSX**: The "return value," a description of the UI that the component will render.

```jsx
import React, { useState } from 'react';

// 'UserProfile' is the component (the blueprint)
function UserProfile({ initialName, initialAge }) { // 1. Props are the inputs

  // 2. State is the internal data
  const [name, setName] = useState(initialName);
  const [age, setAge] = useState(initialAge);

  // 3. Logic/Behavior (an event handler)
  function handleBirthday() {
    setAge(age + 1);
    console.log(`${name} is now ${age + 1} years old.`);
  }

  // 4. JSX is the rendered output
  return (
    <div className="user-profile">
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <button onClick={handleBirthday}>Have a Birthday</button>
    </div>
  );
}
```

---

## **Props (Properties)**

**Props** (short for "properties") are how components receive data from their parents. They are **read-only**. A component must never modify its own props.

-   **Analogy**: Props are like the arguments passed to a function or a class constructor.

```jsx
// Parent component passing props
function App() {
  return <UserProfile initialName="Alice" initialAge={30} />;
}
```
Inside `UserProfile`, `initialName` is "Alice" and `initialAge` is 30.

---

## **State**

**State** is data that is managed *inside* the component. It represents information that can change over time, usually in response to user actions. When state changes, React automatically re-renders the component.

-   **Analogy**: State is like the instance variables or attributes of an object. Each instance has its own state.

In the `UserProfile` example, `name` and `age` are pieces of state, managed by the `useState` Hook.

---

## **Instance**

An **instance** is a concrete rendered element created from a component blueprint.

If `UserProfile` is the class (the blueprint), then every time you use `<UserProfile />` in your application, you are creating a new, independent **instance** of that component. Each instance has its own separate state.

### **Analogy**

| React Component (Blueprint) | React Instance (Rendered Element) |
| --- | --- |
| `function UserProfile() { ... }` | `<UserProfile name="Alice" />` |
| Describes **how** a profile works | **A specific** user profile on the screen |

### **In Practice**

```jsx
function App() {
  return (
    <div>
      {/* Instance 1: Its state is independent */}
      <UserProfile initialName="Alice" initialAge={30} />

      {/* Instance 2: Its state is also independent */}
      <UserProfile initialName="Bob" initialAge={42} />
    </div>
  );
}
```
If you click the "Have a Birthday" button for Alice's profile, only her age will increase. Bob's profile remains unchanged because they are separate instances with their own private state.
