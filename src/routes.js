// @flow
const routes = {
  path: '/',
  indexRoute: {
    getComponent: (nextState, callback) => {
      import('./components/App').then((module) => {
        callback(null, module.default);
      }).catch((error) => {
        // TODO error
        console.log(error);
      });
    },
  },
  childRoutes: [
    {
      path: ':id',
      getComponent: (nextState, callback) => {
        import('./components/Message').then((module) => {
          callback(null, module.default);
        }).catch((error) => {
          // TODO error
          console.log(error);
        });
      },
    },
  ],
};

export default routes;
