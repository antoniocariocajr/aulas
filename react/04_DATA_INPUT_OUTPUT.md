# 🔧 **Data Input (Forms) and Output (Displaying State)**

> **Objective**: Learn how to capture user input from forms and display it back in the UI using React's state management. This is the web equivalent of reading from the console and printing a result.

---

## **The Core Idea: Controlled Components**

In React, a "controlled component" is an input form element whose value is controlled by React state.

1.  We create a piece of state using `useState` to hold the input's value.
2.  The input's `value` attribute is explicitly set to our state variable.
3.  An `onChange` event handler updates the state every time the user types.

This makes the React state the "single source of truth," and the component "controls" the input.

---

## **Building a Simple Form**

Let's build a form that asks for a user's name and displays it live.

```jsx
import React, { useState } from 'react';

function NameForm() {
  // 1. Create state to hold the input value
  const [name, setName] = useState('');

  // 3. This function runs every time the input changes
  const handleChange = (event) => {
    // It updates the state with the input's current value
    setName(event.target.value);
  };

  return (
    <div>
      <form>
        <label>
          Name:
          {/* 2. The input's value is tied to the state */}
          <input type="text" value={name} onChange={handleChange} />
        </label>
      </form>

      {/* Output: Displaying the state value */}
      <h2>Hello, {name || 'Stranger'}!</h2>
    </div>
  );
}
```

### **How It Works**

-   `useState('')`: We initialize the `name` state with an empty string.
-   `value={name}`: The input field always displays the current value of the `name` state.
-   `onChange={handleChange}`: When the user types, the `handleChange` function is called.
-   `event.target.value`: Inside `handleChange`, this gives us the current text inside the input box.
-   `setName(...)`: We update the state, which causes the component to re-render, displaying the new name in both the `<h2>` and the `<input>` itself.

---

## **Handling Form Submission**

Usually, you want to do something with the data after the user clicks a "Submit" button. We handle this with the `<form>` element's `onSubmit` event.

```jsx
import React, { useState } from 'react';

function SignUpForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    // Prevents the default browser behavior of a full page reload
    event.preventDefault();

    // Now you can use the captured state
    alert(`Thank you for signing up with: ${email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### **Key Points for Submission**

-   `onSubmit={handleSubmit}`: The handler is placed on the `<form>` tag, not the button.
-   `event.preventDefault()`: This is **crucial**. Without it, the browser will try to submit the form and reload the page, which is not how Single Page Applications (SPAs) like React work.
-   The data is already in our state (`email`), so we can use it directly in the submit handler (e.g., send it to an API, update parent state, etc.).

---

## **Summary of Input/Output in React**

| Concept | Java Equivalent | React Implementation |
| --- | --- | --- |
| **Input Source** | `System.in` (Keyboard) | HTML Form Elements (`<input>`, `<textarea>`) |
| **Reading Input** | `scanner.nextInt()`, `scanner.nextLine()` | `onChange` event handler on the input element. |
| **Storing Data** | Local variables (`int age`, `String name`) | React State (`useState`) |
| **Outputting Data**| `System.out.println()`, `System.out.printf()` | Rendering state variables inside JSX (`<p>{name}</p>`) |
| **"Done" Signal**| Program proceeds or ends | `onSubmit` event handler on the `<form>`. |

---

## **Resumo**

> In React, use **controlled components** to handle user input. Store the value of form inputs in **`useState`**, update it with **`onChange`**, and process the final data in the `<form>`'s **`onSubmit`** handler (always remembering to call `event.preventDefault()`).
