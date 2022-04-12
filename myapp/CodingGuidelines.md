
With React, we loosly follow the Ant Design Pro structure guidelines https://pro.ant.design/docs/folder


### Names

* Use PascalCase for classes, types, namespaces, enums and enum members

   ```typescript
   // Bad
   enum something {
     MEMBER_OF_ENUM = "MEMBER_OF_ENUM"
   }
  
   // Good
   enum Something {
     MemberOfEnum = "MemberOfEnum"
   }
   ```

* Don’t use the types Number, String, Boolean, as these types refer to non-primitive boxed object, use the lower case variants instead
  ```ts
  // Bad
  type Example = Number | String | Boolean
    
  // Good
  type Example = number | string | boolean
    ```

* Annotate arrays as members: Member\[\], rather than members: Array

  ```typescript
  // Bad
  const examples: Array<Example> = someValue;
  
  // Good
  const examples: Example[] = someValue;
   ```

* Do **not** use `I` as a prefix for interface names.

  ```typescript
  // Bad
  interface IExample {}
  // Good
  interface Example {}
  ```
  
* Use camelCase for function names, property names and local variables.

  ```typescript
  // Bad
  function GetName(SomeValue: string): void {
    const SomeOtherValue = SomeValue;
  }
  
  // Good
  function getName(someValue: string): void {
    const someOtherValue = someValue;
  }
  ```

* Use whole words in names when possible. Only use abbreviations where their use is common and obvious.

  ```typescript
  // bad
  const value = 'Robin';
  
  // bad
  const val = 'Robin';
  
  // good
  const firstName = 'Robin';
  ```
  
* Do not use "_" as a prefix for private properties.

  ```typescript
  // bad
  class SomeClass {
    private _firstName = 'Robin';
  }
  
  // good
  class SomeClass {
    private firstName = 'Robin';
  }
  ```
* Suffixing Observables with `$` is a common external convention and can help resolve confusion regarding observable values vs concrete values.

  ```typescript
  // bad
  const observable = Observable<SomeType>;
  
  // good
  const observable$ = Observable<SomeType>;
  ```

### Exceptions
* Always use new Error() when instantiating exceptions, instead of just calling Error() 
  ```typescript
  // bad
  throw Error('Something went wrong');
  
  // good
  throw new Error('Something went wrong');
  ```

### General
* Only use the .tsx file extension if JSX is actually used
* Use the `export default` syntax when exporting a single class or function
* Do not use `for..in` statements; instead, use `ts.forEach`, `ts.forEachKey` and `ts.forEachValue`. Be aware of their slightly different semantics.
* Try to use `ts.forEach`, `ts.map`, and `ts.filter` instead of loops when it is not strongly inconvenient.

### Comments
* Use `/** JSDoc */` comments for documentation, i.e. comments a user of the code should read.
* Use `// line comments` for implementation comments, i.e. comments that only concern the implementation of the code itself.
* Document crazy stuff. Always add @see <url> and the current date when referencing external resources, blog posts, tweets, snippets, gists, issues etc.

### Style
* Omit curly braces from single-line code blocks...
  ```typescript
  // bad
  if (hour < 18) {
    return "Good day";
  }
  
  // good
  if (hour < 18)
    return "Good day"
  ```
* ...unless related blocks require braces
  ```typescript
  // bad
  if (hour < 18) {
    doSomething();
    greeting = "Good day";
  } else if (hour < 18)
    greeting = "Good day";
  
  // good
  if (hour < 18) {
    doSomething();
    greeting = "Good day";
  } else if (meow) {
    greeting = "Good day";
  }
  ```

* Only surround arrow function parameters when necessary.
  ```typescript
  //bad
  (x) => x + x
  
  //good
  x => x + x
    
    //good
  (x,y) => x + y
  
  //good
  <T>(x: T, y: T) => x === y
  ```

* Use a single declaration per variable statement
  ```typescript
  //bad
  var x = 1, y = 2;
  
  //good
  var x = 1; var y = 2;
  ```

* Open curly braces always go on the same line as whatever necessitates them.
* Use single quotes for strings. Double quotes around JSX string props.

### Types
* Do not export types/functions unless you need to share it across multiple components.
* Do not introduce new types/values to the global namespace.
* Shared types should be defined in 'types.ts'.
* Within a file, type definitions should come first (after the imports).
* Prefer interface over type, use type when you need a union or intersection

### Compoenents
  >>>TODO
