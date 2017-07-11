// - - - custom components
import ChangeLang from 'Containers/common/changeLangContainer/ChangeLangContainer.js';

import ModalContainer from 'Containers/ModalContainer/ModalContainer.js';

// - - - for react animation
import {CSSTransitionGroup} from 'react-transition-group';

// - - - for react routing
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'

// - - - common styles
import './common.scss';

//--------------------------------------------------------------

let RootComponent = function (props) {
  return (
      <div className='rootComponent'>

        <CSSTransitionGroup component="div"
                            className='cssForApp'
                            transitionName='routing-fade'
                            transitionEnter={true}
                            transitionLeave={false}
                            transitionEnterTimeout={250}>
          {React.cloneElement(
              props.children,
              {key: props.location.pathname}
          )}
        </CSSTransitionGroup>

        <Link to='/registration'>На регистрацию &nbsp;</Link>
        <Link to='/authorization'>На авторизацию &nbsp;</Link>
        <Link to='/'>На APP &nbsp;</Link>

        <ChangeLang/>

        <ModalContainer/>

      </div>
  );
};

//--------------------------------------------------------------

export default RootComponent;


