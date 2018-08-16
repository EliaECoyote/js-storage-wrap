# Js storage wrap &middot; [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/asulta/js-storage-wrap.svg?branch=master)](https://travis-ci.org/asulta/js-storage-wrap) [![Coverage Status](https://coveralls.io/repos/github/asulta/js-storage-wrap/badge.svg?branch=master)](https://coveralls.io/github/asulta/js-storage-wrap?branch=master)

`js-storage-wrap` is a simple web storage interface


## Features
- simple api
- json parsing logic wrapped
- optional ttl


## Installation
`js-storage-wrap` comes as a CommonJS module, so it's available trough npm:\
\
`npm install --save js-storage-wrap`\
(with yarn: `yarn add js-storage-wrap`)\
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
