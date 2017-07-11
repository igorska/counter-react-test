//-------------------------------------------------------------

let langReducer = function  (state = "ru", action) {

  switch (action.type) {
    case "CHANGE_LANG":
      return action.payload.newLang;

    default:
      return state;
  }

};

//-------------------------------------------------------------

export default langReducer;
