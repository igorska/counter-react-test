// - - - combine reducer for splitting rootReducer
import { combineReducers } from 'redux';

// - - - import partial reducers
import changeLangReducer from 'reducers/common/changeLangReducer/changeLangReducer.js';
import modalReducer from 'Reducers/common/modalReducer/modalReducer.js';

//----------------------------------------------------------

const rootReducer = combineReducers({
  lang: changeLangReducer,
  modal: modalReducer
});

//----------------------------------------------------------

export default rootReducer;