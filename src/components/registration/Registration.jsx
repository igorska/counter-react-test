// - - - styles
import './registration.scss';

// - - - components
import {
  Form,
  Text,
  Select,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  NestedForm,
  FormError
} from 'react-form';

// - - - custom components
import Logo from 'Components/common/logo/Logo.jsx';
import ContactInfo from 'Components/common/contactInfo/ContactInfo.jsx';

// - - - routing
import {Link} from 'react-router';

/*import JarvisWidget from '../../components/WidgetGrid/JarvisWidget.jsx'
 import { Form, Text, Select, Checkbox, Textarea, Radio } from 'react-form'*/

//--------------------------------------------------------------

class Register extends React.Component {

  componentDidMount() {
    /*this.props.RegisterActions.loadAvailableRegions();*/

    function toControlTooltip() {

      // - - - inputs are used under tooltips
      let onlyInputs = $('.FormInput');

      // - - - function for optionsForTooltip to show tooltip and
      // change it's position
      function toPlaceTooltip(tooltipDomNode, triggeringDomNode) {
        $(tooltipDomNode).addClass('registerFormField__tooltip--jsNewPosVisible fade');
      }

      onlyInputs.each((index, domElement) => {

        // - - - take tooltip template for optionsForTooltip
        let tooltipForInput = $(domElement).next('.registerFormField__tooltip');

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

    toControlTooltip();

  }

  validateForm(values, state, props, instance) {

    console.log(values);
    console.log("-------------");

    console.log(state);
    console.log("-------------");

    console.log(props);
    console.log("-------------");

    console.log(instance);
    console.log("-------------");
  }

  render() {

    return (
        <div className='wrapRegister'>

          <div className="registerTop">

            <Logo/>

          </div>

          <div className="registerFormContainer">

            <Form
                component={false}
                onSubmit={
                  (values) => {
                    console.log(values)
                  }
                }
                validate={
                  (values) => {
                    return {
                      password_1: !values.password_1
                          ?
                          'A password is required'
                          :
                          undefined
                    }
                  }
                }
            >

              {
                (props) => {
                  return (
                      <form className="registerForm">

                        <header className="registerForm__header">
                          Регистрация
                        </header>

                        <fieldset className="registerForm__main">

                          {/* - - - email */}
                          <section className="registerForm__section">

                            <div className="registerFormField">

                              <i className="fa fa-envelope registerFormField__icon"/>

                              <Text onChange={
                                (e, onChange) => {
                                  onChange();
                                }
                              }
                                    field='email'
                                    placeholder='E-mail'
                                    className="registerFormField__input"
                                    type="email"
                              />

                              <b className="registerFormField__tooltip">
                                <i className="fa fa-envelope "/> &nbsp;
                                Введите email
                              </b>

                            </div>

                          </section>

                          {/* - - - input password */}
                          <section className="registerForm__section">

                            <div className="registerFormField">

                              <i className="fa fa-lock registerFormField__icon"/>

                              <Text onChange={
                                (e, onChange) => {
                                  onChange();
                                }
                              }
                                    field='password_1'
                                    placeholder='Password'
                                    className="registerFormField__input"
                                    type="password"
                              />

                              <b className="registerFormField__tooltip">
                                <i className="fa fa-lock "/> &nbsp;
                                Введите пароль
                              </b>

                            </div>

                          </section>

                          {/* - - - repeat password */}
                          <section className="registerForm__section">

                            <div className="registerFormField">

                              <i className="fa fa-lock registerFormField__icon"/>

                              <Text onChange={
                                (e, onChange) => {
                                  onChange();
                                }
                              }
                                    field='password_2'
                                    placeholder='Password'
                                    className="registerFormField__input"
                                    type="password"
                              />

                              <b className="registerFormField__tooltip">
                                <i className="fa fa-lock "/> &nbsp;
                                Повторите пароль
                              </b>

                            </div>

                          </section>

                          {/* - - - PHIO */}
                          <section className="registerForm__section">

                            <div className="registerFormField">

                              <i className="fa fa-user registerFormField__icon"/>

                              <Text onChange={
                                (e, onChange) => {
                                  onChange();
                                }
                              }
                                    field='phio'
                                    placeholder='PHIO'
                                    className="registerFormField__input"
                                    type="text"
                              />

                              <b className="registerFormField__tooltip">
                                <i className="fa fa-user "/> &nbsp;
                                Введите PHIO
                              </b>

                            </div>

                          </section>

                          {/* - - - phone */}
                          <section className="registerForm__section">

                            <div className="registerFormField">

                              <i className="fa fa-mobile registerFormField__icon"/>

                              <Text onChange={
                                (e, onChange) => {
                                  onChange();
                                }
                              }
                                    field='phone'
                                    placeholder='Phone'
                                    className="registerFormField__input"
                                    type="tel"
                              />

                              <b className="registerFormField__tooltip">
                                <i className="fa fa-mobile "/> &nbsp;
                                Введите телефон
                              </b>

                            </div>

                          </section>

                          {/* - - - position */}
                          <section className="registerForm__section">

                            <div className="registerFormField">

                              <i className="fa
                              fa-black-tie
                              registerFormField__icon"/>

                              <Text onChange={
                                (e, onChange) => {
                                  onChange();
                                }
                              }
                                    field='position'
                                    placeholder='Position'
                                    className="registerFormField__input"
                                    type="text"
                              />

                              <b className="registerFormField__tooltip">
                                <i className="fa fa-black-tie "/> &nbsp;
                                Введите должность
                              </b>

                            </div>

                          </section>

                          {/* - - - city */}
                          <section className="registerForm__section">

                            <div className="registerFormField">

                              <i className="fa fa-map registerFormField__icon"/>

                              <Select onChange={
                                (e, onChange) => {
                                  onChange();
                                }
                              }
                                      field='city'
                                      className="registerFormField__input"
                                      options={[{
                                        label: 'city_1',
                                        values: true
                                      }, {
                                        label: 'city_2',
                                        value: false
                                      }]}
                              />

                              <b className="registerFormField__tooltip">
                                <i className="fa fa-map"/> &nbsp;
                                Выберите город
                              </b>

                            </div>

                          </section>

                          {/* - - - provider */}
                          <section className="registerForm__section">

                            <div className="registerFormField">

                              <i className="fa fa-truck registerFormField__icon"/>

                              <Select onChange={
                                (e, onChange) => {
                                  onChange();
                                }
                              }
                                      field='provider'
                                      className="registerFormField__input"
                                      options={[{
                                        label: 'provider_1',
                                        values: true
                                      }, {
                                        label: 'provider_2',
                                        value: false
                                      }]}
                              />

                              <b className="registerFormField__tooltip">
                                <i className="fa fa-truck "/> &nbsp;
                                Выберите поставщика
                              </b>

                            </div>

                          </section>

                        </fieldset>

                        <footer className="registerForm__footer">

                          <button className="btn btn-primary registerForm__btn"
                                  type='submit'
                                  onClick={props.submitForm}>
                            Зарегистрироваться
                          </button>

                        </footer>

                      </form>
                  );
                }
              }

            </Form>


            <ContactInfo />

          </div>

        </div>
    );
  }

}

//--------------------------------------------------------------

export default Register