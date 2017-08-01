// - - - routing
import {Route, IndexRoute} from 'react-router'

// - - - custom components
import RootComponent from 'Components/stateCommonBlocks/RootComponent/RootComponent.jsx';

import App from 'Components/stateCommonBlocks/App/App.js';

import AuthorizationContainer from 'Containers/auth/AuthorizationContainer.js';

import Registration from 'Components/registration/Registration.jsx';

import CheckAuthContainer from 'Containers/checkAuthContainer/CheckAuthContainer.jsx';

//------------------------------------------------------------------

const routes = (
    <Route path='/' component={RootComponent}>
      <IndexRoute component={Registration}/>
      <Route path='registration' component={Registration}/>

      <Route
          path='app'
          component={CheckAuthContainer}
          targetComponent={App}/>

      <Route path='authorization' component={AuthorizationContainer}/>
    </Route>
);

//------------------------------------------------------------------

if (process.env.NODE_ENV !== 'production') {

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('Components/stateCommonBlocks/RootComponent/RootComponent.jsx', () => {
      render(RootComponent)
    });
  }
}
// - - - realizing HMR for Components in Development mode

//------------------------------------------------------------------

export default routes ;

