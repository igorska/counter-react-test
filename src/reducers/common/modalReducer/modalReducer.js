import commonConstants from 'Constants/commonConstants.js';
//-------------------------------------------------------------

/*
 //  - - -
 this is action example

 {
 "type": commonConstants.MODAL.CHANGE_MODAL,  - тип action
 "payload": {
 "newModal": typeOfModal, - тип нового модального окна
 "data": data - данные , передаваемые в модальное окно извне
 }
 }

 * */
//-------------------------------------------------------------

let initState = {
  type: commonConstants.MODAL.NO_MODAL,
  data: commonConstants.MODAL.NO_MODAL_DATA
};

let modalReducer = function (state = initState, action) {

  switch (action.type) {
    case "CHANGE_MODAL":

      // if NO_MODAL was sent
      if (action.payload.newModal === commonConstants.MODAL.NO_MODAL) {
        return initState;
      }

      // if user didn't send data, create empty object in data
      if(action.payload.data === undefined){
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
