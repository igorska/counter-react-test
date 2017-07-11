// - - - redux
import {createStore, applyMiddleware, compose} from 'redux';

// - - - middlware (thunkm logger)
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger'

// - - - rootReducer
import rootReducer from 'Reducers/common/rootReducer.js';

//-----------------------------------------------------------------


let composeEnhancers = compose;
let middleware=[];

// - - - if DEVELOPMENT MODE -  include Redux and other middlewares
if (process.env.NODE_ENV !== 'production') {

  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      || compose;
  const loggerMiddleware = createLogger();
  middleware = [thunkMiddleware, loggerMiddleware];
}

// - - - initial configuration of the Store
function configureStore(initialState) {

  const store = createStore(
      rootReducer,
      initialState,
      composeEnhancers(
          applyMiddleware(...middleware)
      )
  );

  // - - - if you want to change your reducer in code
  if (process.env.NODE_ENV !== 'production') {

    if (module.hot) {
      module.hot.accept('Reducers/common/rootReducer.js', () => {
        const nextRootReducer = require('Reducers/common/rootReducer.js').default;
        store.replaceReducer(nextRootReducer);
      });
    }

  }

  return store;

}

//----------------------------------------------------------------

export default configureStore;


