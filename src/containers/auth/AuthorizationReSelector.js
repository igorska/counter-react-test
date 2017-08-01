// - - - reselect
import { createSelector } from 'reselect';

//---------------------------------------------------------------

// - - - create simple selector
let authSelector = function  (state) {
  return state.checkAuth;
};

// - - - create authReSelector
let authReSelector = createSelector([authSelector], function  (authReSelectorValue) {
  return authReSelectorValue;
});

//---------------------------------------------------------------

export default authReSelector;
