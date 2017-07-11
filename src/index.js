// - - - react + redux
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from 'Store/configureStore.js'
import {AppContainer} from 'react-hot-loader';

// - - - routing
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import routes from './routes/routes.jsx';

// - - - favicon
import 'Assets/images/favicon.ico';
import 'Assets/images/apple-favicon-114x114.png';
import 'Assets/images/apple-favicon-72x72.png';
import 'Assets/images/apple-favicon.png';

// - - - FontAwesome
import '../node_modules/font-awesome/scss/font-awesome.scss';

// - - - common styles for all Application
import 'components/blocks/RootComponent/common.scss';

// - - - internationalization
import {I18nextProvider} from 'react-i18next';
import {i18n, pureLang} from 'Helpers/internationalization/i18n.js';

//--------------------------------------------------------------

const initialState = {
  lang: pureLang
};
// - - - initial state

const store = configureStore(initialState);

// - - - making remain redux store

const render = () => {
  ReactDOM.render(
      <Provider store={store}>
        <I18nextProvider i18n={ i18n }>
          <AppContainer>
            <Router history={browserHistory} routes={routes} />
          </AppContainer>
        </I18nextProvider>
      </Provider>,

      document.getElementById('root')
  );
};

/*
 * rendering our Application, wrapped in
 * Provider for management of Redux and wrapped in
 * AppContainer for HMR and wrapped in
 * Router for routing in Application
 */

render();


/*
 * import aaa from './delete.js';
 * */

