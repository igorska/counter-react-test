// - - -  import various modals
import ModalSpinner from 'Components/blocks/ModalViews/Modals/ModalSpinner/ModalSpinner.jsx';

// - - - import translate function form I18next
import {translate} from 'react-i18next';

// - - - for react animation
import {CSSTransitionGroup} from 'react-transition-group';

//-------------------------------------------------------------
// - - - Component ModalManager - - -   

class ModalManager extends React.Component {

  appearModal() {

    let typeModel = this.props.modal.type;
    let currentModal = "NO_MODAL";

    switch (typeModel) {

      case ("NO_MODAL"):
        currentModal = "";
        break;

      case ("SPINNER_MODAL") :
        currentModal = ModalSpinner;
        break;

      default:
        currentModal = "";
        break;

    }

    // empty quotes means NO_MODAL option means no render any modal at all
    if (currentModal === "") {
      return null;
    }

    return translate("translation")(currentModal);

  }

  render() {

    // may be we have no Modal to render
    let TranslatedModal = null;

    // may be we have Modal to render
    let TranslatedModalFunc = this.appearModal();

    // having modal, turn it in ReactComponent and give props from ModalManager
    if (TranslatedModalFunc) {
      TranslatedModal =
          <TranslatedModalFunc dataModal={this.props}
                               key={this.props.modal.type}/>;
    }

    return (
        <CSSTransitionGroup component="div"
                            className="cssForModalManager"
                            transitionName="modalControlAnimation"
                            transitionEnter={true}
                            transitionLeave={true}
                            transitionAppear={true}
                            transitionEnterTimeout={250}
                            transitionAppearTimeout={250}
                            transitionLeaveTimeout={250}>
          {TranslatedModal}

        </CSSTransitionGroup>
    )
  }

}

// - - - Component ModalManager - - -  
//-------------------------------------------------------------

export default ModalManager;
