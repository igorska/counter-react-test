// - - - styles
import './changeLang.scss';

// - - - propTypes for checking props
import PropTypes from 'prop-types';

//--------------------------------------------------------------------

let ChangeLang = function (props) {

  let toSwitchLang = function (event) {

    let li = event.target;

    // this is insurance if you change HTML for ChangeLang view component
    if (typeof event.target === undefined) {
      console.log("Can not find the span with choosen language. " +
          "Please check html");
      return;
    }

    // read language NOT from innerText or innerHtml.
    // It's view layer and can be changed
    let dataLang = li.getAttribute('data-lang');

    // to lowerCase for normalization language/ useful for State
    let clickedLangLC = dataLang.toLowerCase();

    // not change state if user clicked on the same language as he has now
    if (clickedLangLC === props.currentLang) {
      return;
    }

    // function for set new lang in state
    props.toChangeLang(clickedLangLC);

  };

  return (
      <ul className='changeLang'>
        <li className='changeLang__item'>
          <span className='changeLang__label'
                data-lang='ru'
                onClick={toSwitchLang}>
            RU
          </span>
        </li>
        <li className='changeLang__item'>
          <span className='changeLang__label'
                data-lang='en'
                onClick={toSwitchLang}>
            EN
          </span>
        </li>
      </ul>
  );
};

//--------------------------------------------------------------------

// - - - Prop types for ChangeLang view
ChangeLang.propTypes = {
  currentLang: PropTypes.string.isRequired,
  toChangeLang: PropTypes.func.isRequired
};

//--------------------------------------------------------------------

export default ChangeLang;
