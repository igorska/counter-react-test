import changeLangConstants from 'Constants/actions/common/changeLang/changeLangActions.js'

//-------------------------------------------------------------

let langReducer = function  (state = "ru", action) {

  switch (action.type) {
    case changeLangConstants.CHANGE_LANG:
      return action.payload.newLang;

    default:
      return state;
  }

};

//-------------------------------------------------------------

export default langReducer;
