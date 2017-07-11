import commonConstants from 'Constants/commonConstants.js';

//--------------------------------------------------------------

let modalActionCreator = function (typeOfModal, data = "NO_DATA") {
  return {
    "type": commonConstants.MODAL.CHANGE_MODAL,
    "payload": {
      "newModal": typeOfModal,
      "data": data
    }
  }
};

//--------------------------------------------------------------

export default modalActionCreator;
