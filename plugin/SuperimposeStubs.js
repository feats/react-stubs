function SuperimposeStubs() {
  const jsExtensions = /(\.jsx?)$/;

  this.resourceRegExp = jsExtensions;
  this.newResource = function(hit) {
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

export default SuperimposeStubs;

SuperimposeStubs.prototype.apply = function(compiler) {
  const webpack = require('webpack');
  const fn = webpack.NormalModuleReplacementPlugin.prototype.apply;

  return fn.apply(this, [compiler]);
};
