# React-stubs [![Build Status](https://travis-ci.org/Quadric/babel-plugin-inline-import.svg?branch=master)](https://travis-ci.org/Quadric/react-stubs)


## API

### `SuperimposeStubs` (webpack plugin)

Force your `*.stub.*` files to overlap the non stub files in a given Webpack config files.

#### Usage with react-storybook

```js
const SuperimposeStubs = require('react-stubs').SuperimposeStubs;

module.exports = function(storybookBaseConfig) {
  storybookBaseConfig.plugins.unshift(
    new SuperimposeStubs()
  );

  return storybookBaseConfig;
};

```

### `composeStub` (react-komposer helper)

The simplest most straightforward composer ever.

#### Usage

```js
import composeStub from 'react-stubs';
import { Address } from './factories';

export default composeStub(({ person }) => ({
  person,
  address: Address.build(),
}));
```

## Motivate
If you like this project just give it a star :) I like stars.
