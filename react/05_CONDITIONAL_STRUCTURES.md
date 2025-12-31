# 🔀 Conditional Structures in React (Conditional Rendering)

> **Definition**: Techniques for rendering different JSX markup based on the component's state or props. This is how you make your UI dynamic and responsive to data.

---

## **1. Ternary Operator (`? :`) for Inline `if-else`**

This is the most common and concise way to handle a simple `if-else` condition directly inside your JSX.

**Syntax**: `condition ? <ExpressionIfTrue /> : <ExpressionIfFalse />`

```jsx
import { useState } from 'react';

function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <p>
        {isLoggedIn ? 'Welcome back!' : 'Please sign in.'}
      </p>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </button>
    </div>
  );
}
```

---

## **2. Logical AND (`&&`) for "if true, then render"**

Use this when you want to render something *only if* a condition is true, and render nothing otherwise. It's a shorthand for a ternary with `null` in the `else` branch.

**Syntax**: `condition && <ExpressionToRender />`

```jsx
function NotificationBadge({ count }) {
  return (
    <div>
      <span>You have a new message</span>
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
}

// The badge span will only be rendered if count is greater than 0.
```

---

## **3. Using `if`/`else` with a Variable**

For more complex logic that feels cluttered inside JSX, you can use a standard JavaScript `if`/`else` statement outside of the return statement to prepare a variable, and then render that variable.

```jsx
function UserGreeting({ userType }) {
  let greetingComponent;

  if (userType === 'admin') {
    greetingComponent = <h1>Admin Dashboard</h1>;
  } else if (userType === 'subscriber') {
    greetingComponent = <h1>Welcome, Valued Subscriber!</h1>;
  } else {
    greetingComponent = <h1>Welcome, Guest!</h1>;
  }

  return (
    <div>
      {greetingComponent}
    </div>
  );
}
```

---

## **4. `switch` Statements (or Object Mapping) for Multiple Options**

While you can't use a `switch` statement directly inside JSX, you can use the same pattern as the `if/else` variable. A more "React-y" and often cleaner approach is to use an object as a map.

**With a helper function and `switch`:**

```jsx
function getIconForStatus(status) {
  switch (status) {
    case 'success':
      return <SuccessIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'error':
      return <ErrorIcon />;
    default:
      return <InfoIcon />;
  }
}

function StatusIndicator({ status }) {
  return <div>{getIconForStatus(status)}</div>;
}
```

**With an object map (often preferred):**

```jsx
const STATUS_ICONS = {
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
};

function StatusIndicator({ status }) {
  // Use the map to get the component, with a fallback
  const icon = STATUS_ICONS[status] || STATUS_ICONS.info;

  return <div>{icon}</div>;
}
```
This approach is very declarative and easy to read.

---

## **Best Practices**

1.  **Prefer Ternary and `&&` for simple cases:** They keep your JSX clean and inline.
2.  **Move complex logic outside JSX:** For multi-way `if-else-if` or `switch` logic, prepare the content in a variable or a helper function before the `return` statement.
3.  **Avoid rendering "falsy" values:** Be aware that `condition && <div />` will render `0` if `condition` is `0`. To prevent this, ensure your condition is a boolean: `Boolean(condition) && <div />` or `condition > 0 && <div />`.
4.  **Don't mutate:** Conditional rendering should be based on props and state; don't change variables inside the render logic itself.

---

## **Resumo**

> To control what gets rendered in React, use the **ternary operator (`? :`)** for simple `if-else` logic, the **logical AND (`&&`)** to show an element only if a condition is met, and **JavaScript variables** for more complex `if-else-if` or `switch`-like scenarios.
