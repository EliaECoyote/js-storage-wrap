# Js storage wrap &middot; [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/asulta/js-storage-wrap.svg?branch=master)](https://travis-ci.org/asulta/js-storage-wrap) [![Coverage Status](https://coveralls.io/repos/github/asulta/js-storage-wrap/badge.svg?branch=master)](https://coveralls.io/github/asulta/js-storage-wrap?branch=master)

`js-storage-wrap` is a simple web storage interface.

Features:

- json parsing logic
- TTL handling &middot; optional lifespan can be associated to each saved element
- node friendly &middot; won't invoke the storage functions in node
- TS definitions

## Installation

### npm

```sh
npm install --save js-storage-wrap
```

### yarn

```sh
yarn add js-storage-wrap
```

It will be available through:

```js
Import StorageWrap from 'js-storage-wrap';
```

### CDN

```html
<script crossorigin src="https://unpkg.com/js-storage-wrap@0.1.1/dist/bundle.min.js"></script>
```

## Api

In order to access localStorage and sessionStorage you'll use respectively:

- `StorageWrap.local`
- `StorageWrap.session`

### Storage methods

#### `load(itemName: string): any`

Loads item from storage. Returns null if item or storage is not available

```js
const token = StorageWrap.local.load('my_token');
```

#### `set(itemName: string, item: any, lifespan: ?number): boolean`

Adds / replaces item in storage.\
Returns a boolean that indicates the success of the operation.\
the item attribute can be:

- any primitive value
- object
- array

if `lifespan === 0`, than the item won't be stored. `lifespan` can be omitted.

```js
const success = StorageWrap.local.set('my_token', 'bearer test', 3000); // expires after 3 seconds
```

#### `has(itemName: string): boolean`

Returns a boolean that indicates if the item exists and it isn't expired.

```js
const isItemAvailable = StorageWrap.local.has('my_token');
```

#### `setLifespan(itemName: string, lifespan: number): boolean`

Sets the lifespan of a specific item.\
This requires the previous item to have a valid ttl assigned

```js
const success = StorageWrap.local.setLifespan('my_token', 3000);
```

## Contibruting

Any pull request / ideas for improvements or bugfixing is welcome.\
This repository manages semantic versioning with the [semantic release module](https://github.com/semantic-release/semantic-release)

## License

`js-storage-wrap` is [MIT licensed](./LICENSE).
