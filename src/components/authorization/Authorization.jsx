// - - - routing
import {Link} from 'react-router';

// - - - styles
import './authorization.scss';

// - - - custom components
import Logo from 'Components/common/logo/Logo.jsx';
import ContactInfo from 'Components/common/contactInfo/ContactInfo.jsx';

// - - - helper function
import cloneElemDelAllEventListeners from 'Helpers/common/js/cloneElemDelAllEventListeners.js';

//--------------------------------------------------------------

class Authorization extends React.Component {

  toControlTooltip() {
    // - - - inputs are used under tooltips
    let onlyInputs = $('.authFormField__input');

    // - - - function for optionsForTooltip to show tooltip and
    // change it's position
    function toPlaceTooltip(tooltipDomNode, triggeringDomNode) {
      $(tooltipDomNode).addClass('authFormField__tooltip--jsNewPosVisible fade');
    }

    onlyInputs.each((index, domElement) => {

      // - - - take tooltip template for optionsForTooltip
      let tooltipForInput = $(domElement).next('.authFormField__tooltip');

      // - - - tune our tooltips
      let optionsForTooltip = {
        title: ' ',
        placement: toPlaceTooltip,
        html: true,
        trigger: 'focus hover',
        template: tooltipForInput.get(0).outerHTML
      };

      // - - - initialize our tooltips
      $(domElement).tooltip(optionsForTooltip);

    });
  }

  onBtnClick() {
    this.props.actions.login(this.refs.email.value, this.refs.password.value)
  }

  ifNotAuthorization() {

    if (this.props.AuthorizationState.loginError) {
      return (
          <div className="alert alert-danger fade in">
            <button className="close" data-dismiss="alert"> ×</button>
            <i className="fa-fw fa fa-times"/>
            <strong>Ошибка!Неверные Email и пароль </strong>
          </div>
      )
    }

  }

  componentDidMount() {

    this.toControlTooltip();

  }

  componentDidUpdate() {

    // - - - inputs are used under tooltips
    let onlyInputs = $('.authFormField__input');

    //-----------------------------------------------

    onlyInputs.each((index, domElement) => {

      // official destroying tooltip, take a long time=(
      $(domElement).tooltip('destroy');

      // for reduce time del elem complete and make it clean again (clone)
      cloneElemDelAllEventListeners(domElement);

    });

    //-----------------------------------------------

    // reIinit bootstrap tooltip
    this.toControlTooltip();

  }

  componentWillUnmount() {

    // - - - inputs are used under tooltips
    let onlyInputs = $('.authFormField__input');

    onlyInputs.each((index, domElement) => {

      // official destroying tooltip, take a long time=(
      $(domElement).tooltip('destroy');

    });
  }

  render() {

    const t = this.props.t; // pick out t function separately

    return (
        <div className='wrapAuth'>

          <div className="authTop">

            <Logo/>

          </div>

          <div className="authFormContainer">

            <form className="authForm">

              <header className="authForm__header">
                {t("authorization_1")}
                {/*авторизация*/}
              </header>

              <fieldset className="authForm__main">

                <section className="authForm__section">
                  <label className="authForm__label">E-mail</label>

                  <div className="authFormField">

                    <i className="fa fa-user authFormField__icon"/>

                    <input type="email"
                           ref="email"
                           className="authFormField__input"/>

                    <b className="authFormField__tooltip">
                      <i className="fa fa-user "/> &nbsp;
                      {t("authorization_2")}
                      {/*Введите email*/}
                    </b>

                  </div>

                </section>

                <section className="authForm__section">

                  <label className="authForm__label">
                    {t("authorization_3")}
                    {/*Пароль*/}
                  </label>

                  <div className="authFormField">

                    <i className="fa fa-lock authFormField__icon"/>

                    <input type="email"
                           ref="email"
                           className="authFormField__input"/>

                    <b className="authFormField__tooltip">
                      <i className="fa fa-lock "/> &nbsp;
                      {t("authorization_4")}
                      {/*Введите пароль*/}
                    </b>

                  </div>

                </section>

              </fieldset>

              <footer className="authForm__footer">

                <button type="submit" className="btn btn-primary authForm__btn"
                        onClick={this.onBtnClick.bind(this)}>
                  {t("authorization_5")}
                  {/*Войти*/}
                </button>

                <Link className="btn btn-danger authForm__btn"
                      to="/registration">
                  {t("authorization_6")}
                  {/*Регистрация*/}
                </Link>

              </footer>

            </form>

            <ContactInfo />

          </div>

        </div>
    );

  }

}

//--------------------------------------------------------------

export default Authorization;