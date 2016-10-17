# React-stubs [![Build Status](https://travis-ci.org/Quadric/babel-plugin-inline-import.svg?branch=master)](https://travis-ci.org/Quadric/react-stubs)


## Setup

### Configure webpack

It will force your `*.stub.jsx?` files to overlap the non stub files in a given Webpack config file.


```js
const webpack = require('webpack');

module.exports = function(storybookBaseConfig, configType) {
  const jsExtensions = /(\.jsx?)$/;

  storybookBaseConfig.plugins.unshift(
    new webpack.NormalModuleReplacementPlugin(jsExtensions, function(hit) {
      if (!hit.userRequest) {
        return;
      }

      const stub = hit.userRequest.replace(jsExtensions, '.stub$1');

      try {
        require.resolve(stub);

        hit.request = hit.request.replace(hit.userRequest, stub);
        hit.resource = hit.resource.replace(hit.userRequest, stub);
        hit.userRequest = stub;
      } catch(error) {
        if (error.code !== 'MODULE_NOT_FOUND') {
          throw error;
        }
      }
    })
  );
```

## API

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
