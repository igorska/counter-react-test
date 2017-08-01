// - - - combine reducer for splitting rootReducer
import { combineReducers } from 'redux';

// - - - import partial reducers
import changeLangReducer from 'Reducers/common/changeLang/changeLangReducer.js';
import modalReducer from 'Reducers/common/modal/modalReducer.js';
import checkAuthReducer from "Reducers/checkAuth/checkAuthReducer.js";

// - - -  react-router-redux
import {routerReducer} from 'react-router-redux';

//----------------------------------------------------------


const rootReducer = combineReducers({
  lang: changeLangReducer,
  modal: modalReducer,
  routing: routerReducer,
  checkAuth: checkAuthReducer

});

//----------------------------------------------------------

export default rootReducer;