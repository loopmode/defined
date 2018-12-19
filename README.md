# @loopmode/defined

A utility function for extracting defined values from an object.

## Installation

Install the package in your project.

Using yarn:

```
yarn add @loopmode/defined
```

Using npm:

```
npm install @loopmode/defined --save
```

## Usage

In the default configuration, you import the function and pass it an object. It returns all values that are not `undefined` or an empty object.

```javascript
import getDefined from '@loopmode/defined';

const obj = {
    a: 'a',
    b: null,
    c: undefined,
    d: {},
    e: 0
};

const defined = getDefined(obj); // {a: 'a', b: null, e: 0}
```

The value `null` is not omitted per default, as it's common to send it to server backends in order to clear values.

Empty objects are omitted due to the original use case involving react, state and changes.

### Options

#### drop

An array of values that will be omitted if they strictly match. Defaults to `[undefined]`.

```javascript
import getDefined from '@loopmode/defined';

const obj = {
    a: 'a',
    b: null,
    c: undefined
};

console.log(getDefined(obj)); // {a: 'a', b: null}
console.log(getDefined(obj, { drop: [undefined, null] })); // {a: 'a'}
```

#### keepObjects

A boolean flag for whether to keep values that are an empty object without keys. Defaults to `false`.

```javascript
import getDefined from '@loopmode/defined';

const obj = {
    a: 'a',
    b: {}
};

console.log(getDefined(obj)); // {a: 'a'}
console.log(getDefined(obj, { keepObjects: true })); // {a: 'a', b: {}}
```
