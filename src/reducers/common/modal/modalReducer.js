import modalConstants from 'Constants/actions/common/modal/modalActions.js';
//-------------------------------------------------------------

/*
 //  - - -
 this is action example

 {
 "type": modalConstants.MODAL.CHANGE_MODAL,  - тип action
 "payload": {
 "newModal": typeOfModal, - тип нового модального окна
 "data": data - данные , передаваемые в модальное окно извне
 }
 }

 * */
//-------------------------------------------------------------

let initState = {
  type: modalConstants.NO_MODAL,
  data: modalConstants.NO_MODAL_DATA
};

let modalReducer = function (state = initState, action) {

  switch (action.type) {
    case modalConstants.CHANGE_MODAL:

      // if NO_MODAL was sent
      if (action.payload.newModal === modalConstants.NO_MODAL) {
        return initState;
      }

      // if user didn't send data, create empty object in data
      if(action.payload.data === undefined || action.payload.data === 'NO_DATA'){
        action.payload.data = {}
      }

      // if data, that was sent in modal isn't object
      if(typeof (action.payload.data) !== "object"){
        console.warn("please check your data, that you sent in modal!" +
            " It must be an object. Now - reducing your action as NO_MODAL");
        return initState;
      }

      // type - kindModal, data - object
      return {
        type: action.payload.newModal,
        data: action.payload.data
      };

    default:
      return state;
  }

};

//-------------------------------------------------------------

export default modalReducer;
