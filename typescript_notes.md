# TypeScript Notes

## Classes

- Classes are blueprints used to create an object with fields and methods to create an abstract representation of a 'thing'
- Example of a class:

  ```typescript
  class Vehicle {
    drive(): void {
      console.log('vrooom vrooom');
    }
    honk(): void {
      console.log('BEEP!');
    }
  }

  const vehicle = new Vehicle();
  vehicle.drive();
  vehicle.honk();
  ```

- Typescript provides Classes have 3 types of access modifiers

  - Public (Default): method has no restrictions on when and where it can be called
  - Private: method can only called by other methods within the same class
  - Protected: method can be called by other methods in the same class or by other methods in child classes

- Example of classes with Modifiers:

  ```typescript
  class Vehicle {
    drive(): void {
      console.log('vrooom vrooom');
    }
    protected honk(): void {
      console.log('BEEP!');
    }
  }

  class Car extends Vehicle {
    private race(): void {
      this.drive();
      this.drive();
    }
    startRace(): void {
      this.honk();
      this.race();
    }
  }

  const car = new Car();
  car.startRace();
  car.honk();
  ```

- Typescript access modifiers can also be applied to class fields as well as methods

  - Public (Default): field has no restrictions on when and where it can be called
  - Private: field can only be referenced by fields/methods within the same class
  - Protected: field can be references by other fields/methods in the same class or by other fields/methods in child classes

- Example of fields with access modifiers:

  ```typescript
  class Vehicle {
    // constructor is called when a Vehicle Object is initialized
    // constructor assigns a color field value based on input string upon initialization
    constructor(public color: string) {}
    drive(): void {
      console.log('vrooom vrooom');
    }
    protected honk(): void {
      console.log('BEEP!');
    }
  }

  class Car extends Vehicle {
    // child class does not need to specify modifier on field defined in parent class
    // super method must be called to call constructor of parent class which will set color field value
    constructor(public wheels: string, color: string) {
      super(color);
    }
    private race(): void {
      this.drive();
      this.drive();
    }
    startRace(): void {
      this.honk();
      this.race();
    }
  }

  const vehicle = new Vehicle('orange');
  vehicle.drive();
  vehicle.honk();

  const car = new Car(4, 'red');
  car.startRace();
  car.honk();
  ```

- Why use classes?

  - Classes and interfaces result in code reuse in TypeScript
  - Control what actions are available outside of the Class

- What is an Abstract Class?

  - An abstract class is a class which is declared with an abstract keyword and cannot be instantiated directly
  - In addition some properties of an astract class include:

    1. Only used as a parent class
    2. Can contain real imlementation for some methods
    3. Implemented methods can refere to toether methods that don't actually exist yet (names and types must still be provided)
    4. Can make child classes promise to implement some other method

  - Example Abstract Class:

  ```typescript
  export abstract class Sorter {
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;
  abstract length: number;

  sort(): void {
    const { length } = this;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }

  class NumbersCollection extends Sorter {
    constructor(public data: number[]) {
      super();
    }
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    // reference length without calling function
    get length(): number {
      return this.data.length;
    }
    compare(leftIndex: number, rightIndex: number): boolean {
      return this.data[leftIndex] > this.data[rightIndex];
    }
    swap(leftIndex: number, rightIndex: number): void {
      const leftHand = this.data[leftIndex];
      this.data[leftIndex] = this.data[rightIndex];
      this.data[rightIndex] = leftHand;
    }
  }

  class CharactersCollection extends Sorter {
    constructor(public data: string) {
      super();
    }
    get length(): number {
      return this.data.length;
    }
    compare(leftIndex: number, rightIndex: number): boolean {
      return (
        this.data[leftIndex].toLocaleLowerCase() >
        this.data[rightIndex].toLocaleLowerCase()
      );
    }
    swap(leftIndex: number, rightIndex: number): void {
      const characters = this.data.split('');
      const leftHand = characters[leftIndex];
      characters[leftIndex] = characters[rightIndex];
      characters[rightIndex] = leftHand;
      this.data = characters.join('');
    }
  }

  const numbersCollection = new NumbersCollection([100, 10, -60, 3, -5, 0]);
  numbersCollection.sort();
  console.log(numbersCollection.data);

  const charactersCollection = new CharactersCollection('Xaayb');
  charactersCollection.sort();
  console.log(charactersCollection.data);
  ```

## Interfaces vs Inheritance/Abstract Classes (UPDATE)

- Use Interfaces to:

  - Set up constract betwee different classes
  - Allow different objects to have similar functionality
  - Promote loose coupling

- Use Inheritance/Abstract Classes to:
  - Set up a contract between different classes
  - Create a definition for an object
  - Strongly cuple classes together

## How to add JS Libraries to TS project

- Idealy the install of the JS Library will include TS definitions which provide information TS requires to evaluate

  1. which functions/methods are avaialble
  2. what parameters and types are accepted
  3. what values are expected to be returned

- In some cases the JS Library does not contain TS definition which results in the following message:

  - "Could not find a declaration file for module 'SOME_MODULE'"

- Most popular libraries have third party type definition files available from the **Definitely Typed Naming Scheme** project

  - The types definition are usually found using **@types/{library_name}** naming scheme
  - Check NPM for availability
  - npm install @types/{library_name}

- Node Library type definitions are under the name of 'node'
  - npm install @types/node

## How to generate a Typescript configuration file

- Run the following command from the terminal:
  - **tsc --init**
- To generate TS file in corresponding folders edit the follwing properties
  - **"outDir": "./build"**
    - Redirect output structure to the directory
  - **"rootDir": "./src"**
    - Specify the root directory of input files. Use to control the output directory structure with --outDir

## How to set up node with Typescript

- to genegrate node package.json file run:
  - npm init -y
- Install packages to facilitate development
  - npm install nodemon concurrently --save-dev
- set up npm scripts
  ```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:build": "tsc -w",
    "start:run": "nodemon build/index.js",
    "start": "concurrently npm: start:*"
  }
  ```

## Using a Type Guard

- Used to narrow down the type of the expected variable in a case where the expected input type is not clear
  - **typeof** - used only to check for primitive types: number, string, boolean, symbol, null, undefined and bigint
  - **instanceof** - used test whether the prototype property of a constructor appears anywhere in the prototype chain of an object

```typescript
const someFunction = (collection: number[] | string) => {
  if (this.collection instanceof Array) {
    // Do something only when input is an array
  }

  if (typeof this.collection === 'string') {
    // Do something only when input is a string
  }
};
```

## Tuple

- Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same. For example, you may want to represent a value as a pair of a string and a number:

  ```typescript
  // Declare a tuple type
  type DataRow: [Date, string, number];
  // Initialize it
  let fileData: DataRow = [new Date([2019,6,11]), "hello", 10]; // OK
  // Initialize it incorrectly
  fileData = [10, "hello",new Date([2019,6,11])]; // Error
  ```

- When accessing an element with a known index, the correct type is retrieved:

  ```typescript
  console.log(fileData[1].substring(1)); // OK
  console.log(fileData[2].substring(1)); // Error, 'number' does not have 'substring'
  ```

- Accessing an element outside the set of known indices fails with an error:

  ```typescript
  fileData[3] = 'world'; // Error, Property '3' does not exist on type '[Date, string, number]'.

  console.log(fileData[5].toString()); // Error, Property '5' does not exist on type '[Date, string, number]'.
  ```

## Enums

- Object that stores a **small fixed set** of **closely related** values usually numbers or strings that are **known at compiled time**
- Mainly used to signal to other engineers there are closely related values
- Using enums results in the creation of a specific type for the enum object

  ```typescript
  enum MatchResult = {
    HomeWin ='H',
    AwayWin = 'A',
    Draw = 'D'
  };

  const match = 'H';

  if(match === MatchResult.HomeWin){
    console.log('We won the match at home!');
  }
  ```

- An enum without explicitly set values will contain values starting at '0' but the starting point can be manually set by providing a starting value

  ```typescript
  enum Color {
    Red,
    Green,
    Blue,
  }
  let c: Color = Color.Green;
  // c = 1
  enum ColorEdited {
    Red = 1,
    Green,
    Blue,
  }
  let c: ColorEdited = Color.Green;
  // c = 2
  ```

- Enum names can be access by referecing the enum value

  ```typescript
  enum Color {
    Red = 1,
    Green,
    Blue,
  }
  let colorName: string = Color[2];

  console.log(colorName);
  // Displays 'Green' as its value is 2 above
  ```

## Generics

[TypeScript Docs Reference](!https://www.typescriptlang.org/docs/handbook/generics.html)

```typescript
// Example of generics with functions
function printStrings(arr: string[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

function printNumber(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// Using Generics with functionss
function printAnything<T>(arr: T[]) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

printAnything<string>(['stringOne', 'stringTwo', 'stringThree']);

// Example of generics with classes
// original classes with duplicate logic
class ArrayOfNumbers {
  constructor(public collection: number[]) {}

  get(index: number): number {
    return this.collection[index];
  }
}

class ArrayOfStrings {
  constructor(public collection: string[]) {}

  get(index: number): string {
    return this.collection[index];
  }
}

// using class with Generics
class ArrayOfAnything<T> {
  constructor(public collection: T[]) {}

  get(index: number): T {
    return this.collection[index];
  }
}

new ArrayOfAnything<string>(['stringOne', 'stringTwo', 'stringThree']);

// typescript can infer the type based on the input but it is not recommended
new ArrayOfAnything(['stringOne', 'stringTwo', 'stringThree']);
```

```typescript
// Generic Constraints

class Car {
  print() {
    console.log('I am a car');
  }
}

class House {
  print() {
    console.log('I am a house');
  }
}

interface Printable {
  print(): void;
}

function printHousesOrCars<T extends Printable>(arr: T[]) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].print();
  }
}

printHousesOrCars<House>([new House(), new House()]);
printHousesOrCars<House | Car>([new House(), new Car()]);
printHousesOrCars<Car>([new Car(), new Car()]);
```

## Decorators

- Decorators use functions to add both annotations and a meta-programming syntax for class declarations and members.
  - Note: Decorators only work for TypeScript classes
- Decorators are an experimental TypeScript feature and differ from JavaScript decorators
  ```typescript
  {
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
  }
  ```
- Decorator Evaluation:
  1. The expressions for each decorator are evaluated top-to-bottom.
  2. The results are then called as functions from bottom-to-top.
  3. Decorators are applied when the code for the class is ran/compiled. Not everytime the instance is created.
- Decorator Application Order in Class:
  1. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each instance member.
  2. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each static member.
  3. Parameter Decorators are applied for the constructor.
  4. Class Decorators are applied for the class.
- Decorator function arguments (For Decorators on a property, method or accessor):
  - First Argument: The **prototype** of the object
  - Second Argument: The **key** of the property/method/accessor on the object
  - Third Argument: The **property descriptor**
    - A PropertyDescriptor describes a property on an Object. Any JavaScript object can be used as a PropertyDescriptor where unspecified properties will be treated as undefined or false.
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  ```typescript
  function decoratorName(target: any, key: string, desc: PropertyDescriptor) {
    //do something
  }
  ```
- Example:

```typescript
@classDecorator
class Boat {
  // Decorators cannot edit or modify property definitions
  @testDecorator
  color: string = 'red';

  @testDecorator
  get formattedColor(): string {
    return `This boats color is ${this.color}`;
  }

  @logError('Something bad!')
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: boolean
  ): void {
    if (speed === 'fast') {
      console.log('swish');
    } else {
      console.log('nothing');
    }
  }
}

function classDecorator(constructor: typeof Boat) {
  console.log(constructor);
}

function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index);
}

function testDecorator(target: any, key: string) {
  console.log(key);
}

// Decorator factory needed to pass unique error messages
function logError(errorMessage: string) {
  return function(target: any, key: string, desc: PropertyDescriptor): void {
    // the value property of the property descriptor hold the contents of the method that logError was used on
    const method = desc.value;

    // the original method logError was called upon is now wrapped in logic to log the error by overriding the original value of property descriptor
    desc.value = function() {
      try {
        method();
      } catch (e) {
        console.log(errorMessage);
      }
    };
  };
}
```

## Typescript Integration Issues

- Integrating TypeScript is benificial because it allows devs to address type issues as producing better code as a result.
- Integration poses challanges
  - Type definition files do not provide enough accurate information on how JavaScript is altering properties
    - Middle ware change are good example of this scenario
  - Type definition files are not always accurate
    - For example: the Type Definition file for express defines the body property as:
      ```typescript
      body: any;
      ```
    - however the body property is only available if body parser middleware is used
    - Potential Solution: use a new interface to extend and update the interface provided by the original type definition
      ```typescript
      interface RequestWithBody extends Request {
        body: { [key: sting]: string | undefined };
      }
      ```
  - Inputs are not guaranteed to exist or to be of the correct type

## Composition vs Inheritance

"Favor Composition over Inheritance" Design Patterns Page 20

Delegation is one method of achieving composition

> "For example, instead of making class Window a subclass of Rectangle (because windows happen to be rectangular), the Window class might reuse the behavior of Rectangle by keeping a Rectangle instance variable and delegating Rectangle-specific behavior to it. In other words, instead of a Window being a Rectangle, it would have a Rectangle. Window must now forward requests to its Rectangle instance explicitly, whereas before it would have inherited those operations." - Design Patterns
