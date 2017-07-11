// - - - connect from redux
import {connect} from 'react-redux';

// - - - ReSelector for lang key from state
import changeLangReSelector from './changeLangReSelector';

// - - - import view ChangeLang
import ChangeLang from 'Components/blocks/ChangeLang/ChangeLang.jsx';

// - - - import actionCreator for changing language
import ChangeLangActionCreator from 'ActionCreators/common/ChangeLangActionCreator.js';

// - - - internationalization needs to change language
import {i18n} from 'Helpers/internationalization/i18n.js';

//------------------------------------------------------------------

// get current lang and pass it to props of view ChangeLang
const mapStateToProps = (state) => {
  return {
    currentLang: changeLangReSelector(state)
  }
};

// function handler for click event to change lang in view ChangeLang
const mapDispatchToProps = (dispatch) => {
  return {

    toChangeLang: function (newLang) {

      try {

        // function to set new lang in I18next
        i18n.changeLanguage(newLang);

      } catch (err) {

        console.log("Sorry! Changing Langauge with i18n is unsuccessful" +
            "The state isn't changed!");
        console.log(err);
        return;

      }

      dispatch(ChangeLangActionCreator(newLang));
    }
  }
};

// HOC component that injects results of mapStateToProps and mapDispatchToProps
const ChangeLangContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeLang);

//------------------------------------------------------------------

export default ChangeLangContainer;

//------------------------------------------------------------------