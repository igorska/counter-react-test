
import changeLangConstants from 'Constants/actions/common/changeLang/changeLangActions.js';

//--------------------------------------------------------------

let ChangeLangActionCreator = function  (newLang) {
  return {
    "type": changeLangConstants.CHANGE_LANG,
    "payload":{
      "newLang": newLang
    }
  }
};

//--------------------------------------------------------------

export default ChangeLangActionCreator;