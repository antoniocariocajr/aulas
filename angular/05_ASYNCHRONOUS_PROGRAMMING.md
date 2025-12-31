# **Asynchronous Programming in TypeScript**

Asynchronous programming is a fundamental concept in modern web development. It allows your application to perform tasks without blocking the main thread, ensuring a smooth user experience.

## **Promises**

A `Promise` is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

### **Creating a Promise**

```typescript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("The operation was successful!");
    } else {
      reject("The operation failed.");
    }
  }, 1000);
});
```

### **Consuming a Promise**

You can consume a promise using the `.then()` and `.catch()` methods.

```typescript
myPromise
  .then(result => {
    console.log(result); // "The operation was successful!"
  })
  .catch(error => {
    console.error(error); // "The operation failed."
  });
```

## **Async/Await**

`async/await` is a modern syntax for working with promises that makes your asynchronous code look more like synchronous code.

> **`async`** functions always return a promise.
> **`await`** can only be used inside an `async` function and pauses the execution of the function until the promise is resolved.

### **Using `async/await`**

```typescript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

fetchData();
```

## **Observables (RxJS)**

Observables are a more powerful way to handle asynchronous operations, especially in Angular. They are part of the RxJS library, which is a key part of Angular.

> **Observables** are like streams of data that you can subscribe to. They can emit multiple values over time.

### **Creating and Subscribing to an Observable**

```typescript
import { Observable } from 'rxjs';

const myObservable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

myObservable.subscribe({
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});
```

Observables are used extensively in Angular for handling events, HTTP requests, and state management.
