# **Error Handling in TypeScript**

Error handling is a critical part of writing robust applications. TypeScript, like JavaScript, uses the `try...catch...finally` block to handle exceptions.

## **The `try...catch` Block**

The `try...catch` statement marks a block of statements to try and specifies a response should an exception be thrown.

```typescript
try {
  // Code that may throw an error
  const result = 10 / 0;
  if (result === Infinity) {
    throw new Error("Cannot divide by zero");
  }
} catch (error) {
  // Code to handle the error
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("An unknown error occurred");
  }
}
```

## **The `finally` Block**

The `finally` block executes after the `try` and `catch` blocks, regardless of whether an exception was thrown or caught.

```typescript
let connection;
try {
  // connection = openDatabase();
  // useConnection(connection);
} catch (error) {
  console.error("An error occurred");
} finally {
  // closeDatabase(connection);
  console.log("Database connection closed.");
}
```

## **The `throw` Statement**

You can use the `throw` statement to throw your own exceptions.

```typescript
function validateAge(age: number): void {
  if (age < 0) {
    throw new Error("Age cannot be negative");
  }
}

try {
  validateAge(-5);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message); // "Age cannot be negative"
  }
}
```

## **Custom Errors**

You can create your own custom error classes by extending the built-in `Error` class. This is useful for creating more specific and descriptive errors.

```typescript
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function saveUser(name: string): void {
  if (name.length === 0) {
    throw new ValidationError("Name cannot be empty");
  }
}

try {
  saveUser("");
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Validation failed: ${error.message}`);
  }
}
```
