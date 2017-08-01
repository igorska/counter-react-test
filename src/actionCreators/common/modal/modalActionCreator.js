import modalConstants from 'Constants/actions/common/modal/modalActions.js';

//--------------------------------------------------------------

let modalActionCreator = function (typeOfModal, data = "NO_DATA") {
  return {
    "type": modalConstants.CHANGE_MODAL,
    "payload": {
      "newModal": typeOfModal,
      "data": data
    }
  }
};

//--------------------------------------------------------------

export default modalActionCreator;
