// - - - routing
import {Route, IndexRoute} from 'react-router'

// - - - custom components
import RootComponent from 'Components/blocks/RootComponent/RootComponent.jsx';
import App from 'Components/blocks/App/App.js';
import ContainerAuthorization from 'Containers/authorization/ContainerAuthorization';
import Registration from 'Components/registration/Registration.jsx';

//------------------------------------------------------------------

const routes = (
    <Route path='/' component={RootComponent}>
      <IndexRoute component={App}/>
      <Route path='registration' component={Registration}/>
      <Route path='authorization' component={ContainerAuthorization}/>
    </Route>
);

//------------------------------------------------------------------

if (process.env.NODE_ENV !== 'production') {

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('Components/blocks/RootComponent/RootComponent.jsx', () => {
      render(RootComponent)
    });
  }
}
// - - - realizing HMR for Components in Development mode

//------------------------------------------------------------------

export default routes ;

