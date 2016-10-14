import webpack from 'webpack';

export default class SuperimposeStubs extends webpack.NormalModuleReplacementPlugin {
  constructor() {
    const jsExtensions = /(\.jsx?)$/;

    super(jsExtensions, (hit) => {
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
    });
  }
}
