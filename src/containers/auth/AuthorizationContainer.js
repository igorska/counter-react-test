// - - - import view Authorization
import Authorization from 'Components/auth/Authorization.jsx';

// - - - connect
import { connect } from 'react-redux'

// - - - bindActionCreators
import {bindActionCreators} from 'redux';

// - - - import translate function form I18next
import { translate } from 'react-i18next';

// - - - reSelector for auth
import authReSelector from './AuthorizationReSelector.js';

// - - - import checkAuthActionCreators for dispatching action Login
import * as checkAuthActionCreators from 'ActionCreators/checkAuth/checkAuthActionCreators.js'

//-------------------------------------------------------------
// - - - Component ContainerAuthorization - - -

// - - - this is HOC wrapper that injects t function in our view Authorization
let AuthorizationContainerTranslated = translate('translation')(Authorization);

// get current state and pass it to props of view Authorization
const mapStateToProps = (state) => {
  return {
    checkAuth: authReSelector(state)
  };
};



const mapDispatchToProps = (dispatch) => {

    return {
      toLogin: bindActionCreators(checkAuthActionCreators.toLogin, dispatch),
      closeError: bindActionCreators(checkAuthActionCreators.setError, dispatch),
    }

};

// HOC component that injects results of mapStateToProps and mapDispatchToProps
const AuthorizationContainer =
    connect(mapStateToProps, mapDispatchToProps)(AuthorizationContainerTranslated);

// - - - Component ContainerAuthorization - - -
//-------------------------------------------------------------

export default AuthorizationContainer;