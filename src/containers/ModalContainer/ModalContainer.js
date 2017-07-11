// - - -   ModalManager
import ModalManager from './ModalManager';

// - - - connect from redux
import {connect} from 'react-redux';

// - - - reSelector for Modal
import modalReSelector from './modaReSelector';

//-----------------------------------------------------------------

// - - - data about modal with data for modal
const mapStateToProps = (state) => {
  return {
    modal: modalReSelector(state)
  };
};

const ModalContainer = connect(
    mapStateToProps
)(ModalManager);

//-----------------------------------------------------------------

export default ModalContainer;
