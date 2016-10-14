import webpack from 'webpack';

function SuperimposeStubs() {}

SuperimposeStubs.prototype.apply = function(compiler) {
  const jsExtensions = /(\.jsx?)$/;

  return webpack.NormalModuleReplacementPlugin.apply(compiler, [jsExtensions, (hit) => {
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
  }]);
};

module.exports = SuperimposeStubs;
