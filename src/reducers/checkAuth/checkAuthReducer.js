// - - - import auth action Constants
import authConstants from 'Constants/actions/checkAuth/checkAuthConstants.js';

//------------------------------------------------------------------

// - - - initial parameters before starting application
let initialState = {

  isAuthenticated: false,
  roles: [],
  metaInfo: {},
  initAuthReqLocation: {},
  error:{},
  requesting: false

};


// - - - reducer for authorization
let authReducer = function (state = initialState, action) {

  switch (action.type) {

    case authConstants.SET_ROLES:
      if(action.payload === '' || action.payload === undefined){
        action.payload=[];
      }
      return {...state, ...{roles: action.payload} };

    case authConstants.SET_IS_AUTHENTICATED:
      return {...state, ...{isAuthenticated: action.payload} };

    case authConstants.SET_REQ_LOCATION:
      return {...state, ...{initAuthReqLocation: action.payload} };

    case authConstants.SET_META_INFO:
      if(action.payload === '' || action.payload === undefined){
        action.payload={};
      }
      return {...state, ...{metaInfo: action.payload} };

    case authConstants.SET_AUTH_ERROR:
      if(action.payload === '' || action.payload === undefined){
        action.payload={};
      }
      return {...state, ...{error: action.payload}};

    case authConstants.SET_AUTH_REQUESTING:
      return {...state, ...{requesting: action.payload}};

    case authConstants.SET_AUTH_CONFIG:
      if(action.payload === '' || action.payload === undefined){
        action.payload=initialState;
      }
      return  {...state, ...(action.payload)};

    default: return state;

  }
};

//------------------------------------------------------------------

export default authReducer;