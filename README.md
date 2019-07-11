# Author
Ilya Suglobov

# About Project
The app is designed for the personal usage. It is my React version 
of Google Keep.
Everyone can use on either mobile phone or desktop:
https://my-keep-cc2eb.firebaseapp.com/

## Installation

Use the package manager yarn or npm to install dependencies.

```
yarn install
```
## Usage

```
// development server
yarn start

yarn build-dev
yarn build-prod
```

## Testing
For correct e2e tests it is necessary to clean 
Firestore data in a testing account (user).
```
yarn test-e2e
```

## Technologies and Libraries
- React, and React libraries
- Redux
- SCSS
- Webpack
- Jest + Enzyme, Nightwatch
