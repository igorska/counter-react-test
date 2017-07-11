
import commonConstants from 'Constants/commonConstants.js';

//--------------------------------------------------------------

let ChangeLangActionCreator = function  (newLang) {
  return {
    "type": commonConstants.LANG.CHANGE_LANG,
    "payload":{
      "newLang": newLang
    }
  }
};

//--------------------------------------------------------------

export default ChangeLangActionCreator;