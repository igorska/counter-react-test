/*
 * REDUCERS
 * ACTIONS
 * CONTAINERS
 * COMPONENTS
 * FORMS
 * SECTIONS
 * CONTROLS
 * VALIDATORS
 * UTILITIES
 */

const {Provider} = ReactRedux;

const {
    Field,
    FormSection,
    reduxForm
} = ReduxForm;


function shipmentsReducer(state = [], action) {
  if (action.type === 'SHIPMENT_ADD') {
    return [
      ...state,
      action.shipment
    ];
  }
  return state;
}

const shipmentActions = {
  add: shipment => ({
    type: 'SHIPMENT_ADD',
    shipment
  })
};

//----------------------------------------------------------------------

//*** call 1
setTimeout(() => {
  const store = configureStore({});
  ReactDOM.render((
      <Provider {...{store}}>
        <AppContainer />
      </Provider>
  ), document.getElementById('js-app'));
}, 0);
//*** call 1

//----------------------------------------------------------------------

//*** call 2
function configureStore(initialState) {
  const reducers = Redux.combineReducers({
    shipments: shipmentsReducer,
    form: ReduxForm.reducer // this is how redux-form gets into the reducers
  });
  return Redux.createStore(reducers, initialState);
}
//*** call 2

//----------------------------------------------------------------------

//*** call 3
const AppContainer = ReactRedux.connect(state => ({
  shipments: state.shipments
}), {
  resetForm: ReduxForm.reset,
  shipmentAdd: shipmentActions.add
})(AppComponent);
//*** call 3

//----------------------------------------------------------------------

//*** call 4
class AppComponent extends React.Component {

  static propTypes = {
    resetForm: React.PropTypes.func.isRequired,
    shipmentAdd: React.PropTypes.func.isRequired,
    shipments: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.onSubmit();
  }

  onSubmit() {
    return values => {
      this.props.shipmentAdd(values);
      this.props.resetForm('shipments');
    };
  }

  render() {
    const {shipments} = this.props;
    const initialValues = {
      senderDetails: {
        name: 'ACME Co.',
        address: '123 Fake Ln.'
      }
    };

    return (
        <div className="o-wrapper">
          <div className="o-layout">
            <div className="o-layout__item u-1/2@tablet">
              <h1 className="c-h1">{'Create a shipment'}</h1>
              <p>{'Use the form below to create shipment records'}</p>


              <ShipmentForm
                  onSubmit={this.handleSubmit}
                  {...{initialValues}}
              />

              <ShipmentsList {...{shipments}} />



            </div>
            <div className="o-layout__item u-1/2@tablet">
              <h1 className="c-h1">{'A simple redux-form demo'}</h1>
              <p>{'This is a very basic form with validations and error messages.'}</p>
              <ul className="o-list">
                <li className="u-margin-bottom-small">{'Attempting to submit an invalid form displays validation errors.'}</li>
                <li className="u-margin-bottom-small">{'Fields can be populated with initial values.'}</li>
                <li className="u-margin-bottom-small">{'The Delivery Date and Quantity fields are formatted.'}</li>
                <li className="u-margin-bottom-small">{'Once the form passes validation on submit, the values are returned in a callback'}</li>
              </ul>
              <p>{'The Container is responsible for handling the final form data, it can easily be sent to an API request.'}</p>
            </div>
          </div>
        </div>
    );
  }
}
//*** call 4

//----------------------------------------------------------------------

//*** call 5
const ShipmentForm = reduxForm({
  form: 'shipments',
  validate: validateFields({
    senderDetails: validators.personDetails,
    recipientDetails: validators.personDetails,
    messageDetails: validators.messageDetails
  })
})(ShipmentComponent);

const validators = {
  personDetails: values => {
    const errors = {};
    if (!values || !values.name) {
      errors.name = 'Required';
    }
    if (!values || !values.address) {
      errors.address = 'Required';
    }
    return errors;
  },

  messageDetails: values => {
    const errors = {};
    if (!values || !values.deliveryDate) {
      errors.deliveryDate = 'Required';
    } else if (!$.payment.validateCardExpiry.apply({}, values.deliveryDate.split(' / '))) {
      errors.deliveryDate = 'Invalid';
    }
    if (!values || !values.quantity) {
      errors.quantity = 'Required';
    } else if (/^\d+$/.test(values.quantity) === false) {
      errors.quantity = 'Must be an integer';
    }
    if (!values || !values.type) {
      errors.type = 'Required';
    }
    return errors;
  }
};

function validateFields(validators) {
  return values => {
    return Object.keys(validators).map(name => ({
      name, // 5625463739
      error: validators[name](values[name])
    })).reduce((p, {name, error}) => (
        Object.keys(name).length ? {
              ...p,
              [name]: error
            } : p
    ), {});
  };
}

//*** call 5

//----------------------------------------------------------------------

//*** call 6
class ShipmentComponent extends React.Component {
  render() {
    const {handleSubmit} = this.props;
    return (
        <form onSubmit={handleSubmit}>
          <h4 className="c-h4 u-margin-bottom-small">{'Sender Details'}</h4>
          <FormSection name="senderDetails">
            <PersonDetailsSection />
          </FormSection>
          <h4 className="c-h4 u-margin-bottom-small">{'Recipient Details'}</h4>
          <FormSection name="recipientDetails">
            <PersonDetailsSection />
          </FormSection>
          <h4 className="c-h4 u-margin-bottom-small">{'Order Details'}</h4>
          <FormSection name="messageDetails">
            <OrderDetailsSection />
            <DeliveryOptions />
          </FormSection>
          <button
              className="c-form-button c-form-button--primary c-form-button--block"
              type="submit"
          >{'Submit'}</button>
          <p className="c-text-small c-text-small--muted u-center-text">{'All fields are required'}</p>
        </form>
    );
  }
}

// - - -

class DeliveryOptions extends React.Component {
  render() {
    return (
        <Field
            component={RadioControl}
            name="type"
            options={[
              {
                classes: 'u-1/3',
                label: 'Small',
                value: 'small'
              }, {
                classes: 'u-1/3',
                label: 'Medium',
                value: 'medium'
              }, {
                classes: 'u-1/3',
                label: 'Large',
                value: 'large'
              }
            ]}
        />
    );
  }
}

class PersonDetailsSection extends React.Component {
  render() {
    return (
        <div className="o-layout u-margin-bottom-small">
          <div className="o-layout__item u-1/1 u-1/2@tablet">
            <Field
                component={InputControl}
                name="name"
                placeholder="Name"
                type="text"
            />
          </div>
          <div className="o-layout__item u-1/1 u-1/2@tablet">
            <Field
                component={InputControl}
                name="address"
                placeholder="Address"
                type="text"
            />
          </div>
        </div>
    );
  }
}

class OrderDetailsSection extends React.Component {
  render() {
    return (
        <div className="o-layout u-margin-bottom-small">
          <div className="o-layout__item u-1/1 u-1/2@tablet">
            <Field
                component={InputControl}
                format={formatters.date}
                name="deliveryDate"
                placeholder="MM / YY"
                type="text"
            />
          </div>
          <div className="o-layout__item u-1/1 u-1/2@tablet">
            <Field
                component={InputControl}
                format={formatters.number}
                name="quantity"
                parse={parsers.number}
                placeholder="Quantity"
                type="text"
            />
          </div>
        </div>
    );
  }
}

// - - -

class RadioControl extends React.Component {
  static propTypes = {
    options: React.PropTypes.array.isRequired
  };

  handleChange(value) {
    return () => {
      this.props.input.onChange(value);
    }
  }

  render() {
    const {
        options,
        input: {
            name,
            value
        },
        meta: {
            error,
            touched
        }
    } = this.props;
    const className = classNames({
      'c-radio-control': true,
      'c-radio-control--error': touched && error
    });
    return (
        <div {...{className}}>
          <div className="o-layout">
            {options.map((field, key) => {
              const fieldClassName = classNames({
                'c-radio-control__item': true,
                'o-layout__item': true,
                [field.classes]: true
              });
              return (
                  <div
                      className={fieldClassName}
                      {...{key}}
                  >
                    <input
                        checked={value === field.value}
                        className="c-radio-control__field u-hidden-visually"
                        id={`${name}_${key}`}
                        onChange={this.handleChange(field.value)}
                        type="radio"
                        value={field.value}
                        {...{name}}
                    />
                    <label
                        className="c-radio-control__label"
                        htmlFor={`${name}_${key}`}
                    >{field.label}</label>
                  </div>
              );
            })}
            <div
                className="o-layout__item u-1/1 c-radio-control__hint c-text-small">{touched && error}</div>
          </div>
        </div>
    );
  }
}





class InputControl extends React.Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string.isRequired
  };

  render() {
    const {
        input,
        type,
        placeholder,
        meta: {
            error,
            touched
        }
    } = this.props;
    const className = classNames({
      'c-input-control': true,
      'c-input-control--error': touched && error
    });
    return (
        <div {...{className}}>
          <input
              className="c-input-control__input"
              {...input}
              {...{
                type,
                placeholder
              }}
          />
          <div
              className="c-input-control__hint c-text-small">{touched && error}</div>
        </div>
    );
  }
}





// - - -

const formatters = {
  date: (value = '') => $.payment.formatExpiry(value), // the default return
                                                       // value should always
                                                       // be an empty string
  number: value => value ? (+value).toLocaleString() : ''
};

const parsers = {
  number: value => value ? (value.match(/\d+/g) || []).join('') : ''
};

//*** call 6

//----------------------------------------------------------------------

//*** call 7
class ShipmentsList extends React.Component {
  static propTypes = {
    shipments: React.PropTypes.array.isRequired
  };

  renderShipment({senderDetails, recipientDetails, messageDetails}, key) {
    return (
        <li {...{key}}>
          <hr className="c-hr u-margin-bottom"/>
          <div className="o-media u-margin-top">
            <div className="o-media__img">
              <p>{key + 1}</p>
            </div>
            <div className="o-media__body">
              <div className="o-layout">
                <div className="o-layout__item u-1/2">
                  <dl>
                    <dt>{senderDetails.name}</dt>
                    <dd>{senderDetails.address}</dd>
                  </dl>
                </div>
                <div className="o-layout__item u-1/2">
                  <dl>
                    <dt>{recipientDetails.name}</dt>
                    <dd>{recipientDetails.address}</dd>
                  </dl>
                </div>
                <div className="o-layout__item u-1/1">
                  <p><strong
                      className="u-capitalize-text">{messageDetails.type}</strong>{` delivery of `}<strong>{messageDetails.quantity}</strong>{` units to be delivered by `}<strong>{messageDetails.deliveryDate}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
    );
  }

  render() {
    const {shipments} = this.props;
    return (
        <ul className="o-list-bare">
          {shipments.map(this.renderShipment)}
        </ul>
    );
  }
}
//*** call 7

//----------------------------------------------------------------------

















