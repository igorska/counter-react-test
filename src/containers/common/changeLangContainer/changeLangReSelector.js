// - - - import reselect for memoization
import {createSelector} from 'reselect';

//--------------------------------------------------------

// only derive value of key "lang" from the state
let changeLangSelector = (state) => {
  return state.lang;
};

// memoize the result of selection and return the active valid lang from state
let changeLangReSelector = createSelector(
    [changeLangSelector],
    function (changeLangSelectorValue) {
      return changeLangSelectorValue;
    }
);

//--------------------------------------------------------

export default changeLangReSelector;
