let prototype;

try {
  const webpack = require('webpack');
  prototype = webpack.NormalModuleReplacementPlugin.prototype;
} catch (e) {
  module.exports = () => {
    throw new Error('SuperimposeStubs depends on Webpack and NormalModuleReplacementPlugin and they could not be found.');
  };
}

function SuperimposeStubs() {
  const jsExtensions = /(\.jsx?)$/;

  this.resourceRegExp = jsExtensions;
  this.newResource = function newResource(hit) {
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
  };
}

if (prototype) {
  SuperimposeStubs.prototype = prototype;
  module.exports = SuperimposeStubs;
}
