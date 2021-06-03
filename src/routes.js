// @flow
const routes = {
  path: process.env.PUBLIC_PATH || '/' ,
  getComponent: (nextState, callback) => {
    import('./components/App').then((module) => {
      callback(null, module.default);
    }).catch((error) => {
      // TODO error
      console.log(error);
    });
  },
  indexRoute: {
    getComponent: (nextState, callback) => {
      import('./pages/Root').then((module) => {
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
        import('./pages/Root').then((module) => {
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
