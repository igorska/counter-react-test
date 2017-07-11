// - - - import view Authorization
import Authorization from 'Components/authorization/Authorization.jsx';

// - - - reselect
import { createSelector } from 'reselect';

// - - - connect
import { connect } from 'react-redux'

// - - - import translate function form I18next
import { translate } from 'react-i18next';

//-------------------------------------------------------------
// - - - Component ContainerAuthorization - - -

// - - - this is HOC wrapper that injects t function in our view Authorization
let ContainerAuthorizationTranslated = translate('translation')(Authorization);

// get current state and pass it to props of view Authorization
const mapStateToProps = (state) => {
  return {
    state: state
  };
};

// HOC component that injects results of mapStateToProps and mapDispatchToProps
const ContainerAuthorization =
    connect(mapStateToProps)(ContainerAuthorizationTranslated);

// - - - Component ContainerAuthorization - - -
//-------------------------------------------------------------

export default ContainerAuthorization;