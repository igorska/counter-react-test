// - - - routing
import {Link} from 'react-router';

// - - - styles
import './authorization.scss';

// - - - custom components
import Logo from 'Components/dummyBlocks/logo/Logo.jsx';
import ContactInfo from 'Components/dummyBlocks/contactInfo/ContactInfo.jsx';

// - - - check SupportLocalStorage
import isLocalStorageAvailable from 'Helpers/common/js/isLocalStorageAvaliable.js';

//--------------------------------------------------------------

class Authorization extends React.Component {

  componentWillMount() {

    let isAuthenticated = this.props.checkAuth.isAuthenticated;
    let router = this.props.router;

    if (isAuthenticated === true) {
      router.push('/app');
    }

  }

  componentWillUpdate(nextProps){

    let isAuthenticated = nextProps.checkAuth.isAuthenticated;
    let router = nextProps.router;

    if (isAuthenticated === true) {
      router.push('/app');
    }

  }

  componentDidMount(){

    let userEmailLS;
    let userPasswordLS;

    // при наличи данных в LocalStorage, считываем их и подставляем в форму
    if(isLocalStorageAvailable()){
      userEmailLS=localStorage.getItem('userEmail');
      userPasswordLS=localStorage.getItem('userPassword');
    }

    if(userEmailLS !== undefined || userEmailLS !== ''){
      this.email.value =userEmailLS;
    }

    if(userPasswordLS !== undefined || userPasswordLS !== ''){
      this.password.value =userPasswordLS;
    }

  }

  onBtnClick(event) {

    // предотвращаем отправку формы
    event.preventDefault();

    // введенный email
    let emailValue = this.email.value;

    // введенный пароль
    let passwordValue = this.password.value;

    // при наличии LocalStorage запись в него введенных данных пользователем
    if(isLocalStorageAvailable()){
      localStorage.setItem('userEmail', emailValue);
      localStorage.setItem('userPassword', passwordValue);
    }

    // отправка данных на сервер с целью авторизации
    this.props.toLogin(emailValue, passwordValue);

  }

  closeError() {
    // this is setError actionCreator with empty data in payload.action
    this.props.closeError();
  }

  render() {
    
    // delete
    console.log("=---------document.cookie-----------");
    console.log(document.cookie);
    

    // t function is function to translate with i18next
    const t = this.props.t; // pick out t function separately

    // define visibility of error block
    let visibleErrorClass = '';
    let error = this.props.checkAuth.error;
    let errorMessage = '';

    // define error message for user
    if (error.code !== undefined) {
      visibleErrorClass = ' authError__visible';

      switch (error.code) {
        case 404 :
          errorMessage = t("authorization_7");
          // Извините, сервер недоступен
          break;

        case 401 :
          errorMessage = t("authorization_8");
          // Данные авторизации не верны. Проверьте правильность их заполнения
          break;

        default:
          errorMessage = t("authorization_9");
          // Неизвестная ошибка
      }

    }

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

                <section
                    className={"authForm__section authError__wrap" + visibleErrorClass}>

                  <span className="authError__inner">
                    {errorMessage}
                  </span>

                  <button className="authError__btnClose"
                          type='button'
                          onClick={this.closeError.bind(this)}>
                    x
                  </button>

                </section>

                <section className="authForm__section">
                  <label className="authForm__label">E-mail</label>

                  <div className="authFormField">

                    <i className="fa fa-user authFormField__icon"/>

                    <input type="email"
                           ref={(inputEmail) => {
                             this.email = inputEmail
                           }}
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

                    <input type="password"
                           ref={(inputPassword) => {
                             this.password = inputPassword
                           }}
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

                <button type="submit"
                        className="btn btn-primary authForm__btn"
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