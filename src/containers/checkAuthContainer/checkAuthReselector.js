// - - - import reselect for memoization
import {createSelector} from 'reselect';

//-----------------------------------------------------------

// - - - simple selector to return user slice from state
let checkAuthSelector = function (state) {
  return state.checkAuth;
};

let checkAuthReSelector = createSelector(
    [checkAuthSelector],
    function (checkAuthSelectorValue) {
      return checkAuthSelectorValue;
    }
);

//-----------------------------------------------------------

export default checkAuthReSelector;