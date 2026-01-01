# State Management in React

State management is a crucial aspect of building complex React applications. As your application grows, managing state that is shared across multiple components can become challenging.

## Built-in State Management in React

React provides a few built-in ways to manage state:

- **`useState`:** A hook that lets you add state to functional components. It's ideal for local component state.
- **`useReducer`:** A hook that's an alternative to `useState`. It's usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.
- **Context API:** A way to pass data through the component tree without having to pass props down manually at every level. It's designed to share data that can be considered "global" for a tree of React components.

## State Management Libraries

For large-scale applications, you might want to use a dedicated state management library. These libraries provide a centralized store for your application's state and make it easier to manage and debug.

| Library | Description |
| --- | --- |
| **Redux** | One of the most popular state management libraries for React. It's based on the Flux architecture and provides a predictable state container. |
| **MobX** | A library that makes state management simple and scalable by transparently applying functional reactive programming. |
| **Zustand** | A small, fast, and scalable state management solution. It's based on hooks and is very easy to use. |
| **Recoil** | An experimental state management library from Facebook. It provides a more React-ish way of managing state with atoms and selectors. |

## Example with Redux

```jsx
// store.js
import { createStore } from 'redux';

const initialState = {
  count: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;

// Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter</h2>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
}

export default Counter;

// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './Counter';

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
```
