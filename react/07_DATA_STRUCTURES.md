# 🗂️ Data Structures in React (Managing State with Objects and Arrays)

In React, the most common data structures you'll manage in state are **Arrays** and **Objects**. While JavaScript doesn't have the extensive built-in collections framework of Java, its native `Array` and `Object` are incredibly versatile.

The golden rule is **immutability**: never modify state objects or arrays directly. Always create a new one.

---

## **1. Arrays in State**

Arrays are used to store lists of items, such as to-dos, users, or posts.

### **Adding an Item to an Array**
Use the spread syntax (`...`) to create a new array with the new item.

```jsx
const [todos, setTodos] = useState(['Learn React']);

function addTodo() {
  // Create a new array, copying old items and adding a new one
  setTodos([...todos, 'Master State']);
}
```

### **Removing an Item from an Array**
Use the `filter()` method to create a new array that excludes the item you want to remove.

```jsx
const [users, setUsers] = useState([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]);

function removeUser(idToRemove) {
  // Create a new array containing only users whose ID does not match
  setUsers(users.filter(user => user.id !== idToRemove));
}
```

### **Updating an Item in an Array**
Use the `map()` method to create a new array. Inside the map, use a ternary operator to find the item you want to change and return a new object for it. For all other items, return them as they are.

```jsx
function updateUser(idToUpdate, newName) {
  setUsers(users.map(user => {
    if (user.id === idToUpdate) {
      // For the matching user, return a new object with the updated name
      return { ...user, name: newName };
    }
    // For all other users, return the original object
    return user;
  }));
}
```

---

## **2. Objects in State**

Objects are used to store structured data, like a user's profile or form state.

### **Updating a Field in an Object**
Use the spread syntax (`...`) to create a new object, copying the old properties and then overriding the one you want to change.

```jsx
const [user, setUser] = useState({ name: 'Alex', age: 30 });

function updateUserName() {
  // Create a new object, copying old properties and setting a new name
  setUser({ ...user, name: 'Alexis' });
}
```

### **Updating a Nested Object**
When dealing with nested objects, you need to spread at each level of the object that you are updating.

```jsx
const [profile, setProfile] = useState({
  id: 1,
  details: {
    name: 'Sam',
    address: {
      city: 'New York',
    }
  }
});

function updateCity() {
  setProfile({
    ...profile, // 1. Copy top-level properties
    details: {
      ...profile.details, // 2. Copy nested 'details' properties
      address: {
        ...profile.details.address, // 3. Copy nested 'address' properties
        city: 'London' // 4. Override the final value
      }
    }
  });
}
```
*Libraries like Immer can simplify deeply nested updates.*

---

## **Choosing the Right State Structure**

- **Flat is better:** Avoid deeply nested state when possible. It's easier to update.
- **Group related state:** If two state variables always change at the same time, consider putting them in a single object or array.
- **Avoid redundancy:** Don't store data in state that can be calculated from props or other state variables during render.

---

## **Summary of Immutable Operations**

| Task | Java `ArrayList` (Mutable) | React State (Immutable) |
| --- | --- | --- |
| **Add** | `list.add(newItem);` | `setList([...list, newItem]);` |
| **Remove** | `list.removeIf(item -> ...);` | `setList(list.filter(item -> ...));` |
| **Update** | `list.get(i).setField(val);` | `setList(list.map(item -> ... ? newItem : item));`|
| **Update Field**| `obj.setField(val);` | `setObj({...obj, field: val});` |

---

## **Resumo**

> In React, manage collections with JavaScript **Arrays** and structured data with **Objects**. Always treat state as **immutable**. Use methods that return new arrays (`map`, `filter`) and the spread syntax (`...`) to create updated copies of your state, which ensures React re-renders correctly.
