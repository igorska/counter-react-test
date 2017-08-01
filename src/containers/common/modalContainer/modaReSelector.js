// - - - import reselect for memoization
import {createSelector} from 'reselect';

//-----------------------------------------------------------

let modalSelector = function (state) {
  return state.modal;
};

let modalReSelector = createSelector(
    [modalSelector],
    function (modalSelectorValue) {
      return modalSelectorValue;
    }
);

//-----------------------------------------------------------

export default modalReSelector;