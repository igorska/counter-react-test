// - - - connect from redux
import {connect} from 'react-redux';

// - - - ReSelector for lang key from state
import changeLangReSelector from './changeLangReSelector';

// - - - import view ChangeLang
import ChangeLang from 'Components/stateCommonBlocks/ChangeLang/ChangeLang.jsx';

// - - - import actionCreator for changing language
import ChangeLangActionCreator from 'ActionCreators/common/changeLang/changeLangActionCreator.js';

// - - - internationalization needs to change language
import {i18n} from 'Helpers/internationalization/i18n.js';

// - - - delete
import modalActionCreator from 'ActionCreators/common/modal/modalActionCreator.js';

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

        // check, if new lang was initialized correctly
        if(i18n.language !== newLang){
          console.log("Sorry! Changing Langauge with i18n is unsuccessful" +
              "The state isn't changed!");
          return;
        }

      } catch (err) {

        console.log("Sorry! Changing Language with i18n is unsuccessful" +
            "The state isn't changed!");
        console.log(err);
        return;

      }

      dispatch(ChangeLangActionCreator(newLang));

      // - - - check modal work / can be delete completely
      /*setTimeout(()=>{dispatch(modalActionCreator('SPINNER_MODAL'))},2000);
      setTimeout(()=>{dispatch(modalActionCreator('NO_MODAL'))},6000 );*/


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