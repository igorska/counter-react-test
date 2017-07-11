// - - - wrap component for modals, is responsible of common view of modals
import WrapModalCommon from '../../WrapModals/WrapModalComon/WrapModalCommon.jsx';

// - - - styles
import './modalSpinner.scss';

// - - - img spinner
import spinner from './default.gif';

//-------------------------------------------------------------
// - - - Component ModalSpinnerContainer - - -

class ModalSpinner extends React.Component {
  
  closeModal(){

    this.props.dataModal.dispatch({
      type:"CHANGE_MODAL",
      payload:{
        newModal: "NO_MODAL"
      }
    });
  }

  render() {
    return (
        <WrapModalCommon>

          <h3 className="modalSpinner__title">Внимание!</h3>

          <article className="modalSpinner__article">
            Все, что вы сейчас видите перед собой не является готовыми
            комопонентами. Это всего-лишь экспериментальные наработки,
            похожие на внешний вид приложения ASER. Еще раз... <br/>
            Готовых компонентов авторизации и регистрации НЕТ! Это все
            все равно будет удалено и переписано.
          </article>

          <div className="modalSpinner__wrapImg">
            <img className="modalSpinner__img" src={spinner}/>
          </div>

          <button style={{color:'green'}} onClick={this.closeModal.bind(this)}>Закрыть модальное окно</button>

        </WrapModalCommon>
    )
  }

}

// - - - Component ModalSpinnerContainer - - -
//-------------------------------------------------------------

export default ModalSpinner;

