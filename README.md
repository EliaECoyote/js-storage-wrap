# Js storage wrap &middot; [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/asulta/js-storage-wrap.svg?branch=master)](https://travis-ci.org/asulta/js-storage-wrap) [![Coverage Status](https://coveralls.io/repos/github/asulta/js-storage-wrap/badge.svg?branch=master)](https://coveralls.io/github/asulta/js-storage-wrap?branch=master)


`js-storage-wrap` is a simple web storage interface


## Features
- simple api
- transparent json parse logic
- optional ttl


## Installation

`npm install --save js-storage-wrap`\
or\
`yarn add js-storage-wrap`\
\
After installation, it will be available through:\
`Import StorageWrap from 'js-storage-wrap';`

## Api
To access to localStorage and sessionStorage respectively:
- `StorageWrap.local`
- `StorageWrap.session`

#### Storage methods: 
### `load(itemName: string): any`
Loads item from storage. Returns null if item or storage is not available
```javascript
const token = StorageWrap.local.load('my_token');
```
### `set(itemName: string, item: any, lifespan: ?number): Bool`
Adds / replaces item in storage.\
Returns a Bool that indicates the success of the operation.\
the item attribute can be: 
- any primitive value
- object
- array

if `lifespan === 0`, than the item won't be stored. `lifespan` can be omitted.
```javascript
const success = StorageWrap.local.set('my_token', 'bearer test', 3000); // expires after 3 seconds
```
### `has(itemName: string): Bool`
Returns a bool that indicates if the item exists and it isn't expired.
```javascript
const isItemAvailable = StorageWrap.local.has('my_token');
```

### `setLifespan(itemName: string, lifespan: number)`
Sets the lifespan of a specific item.\
This requires the previous item to have a valid ttl assigned
```javascript
const success = StorageWrap.local.setLifespan('my_token', 3000);
```

### `developmentMode()`
This fn activates informative logs emitted upon errors / ttl reached
```javascript
StorageWrap.developmentMode();
```

### Contibruting
Any pull request / ideas for improvements or bugfixing is welcome.\
This repository follows semantic versioning. &nbsp; &nbsp; [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

### License
`js-storage-wrap` is [MIT licensed](./LICENSE).
