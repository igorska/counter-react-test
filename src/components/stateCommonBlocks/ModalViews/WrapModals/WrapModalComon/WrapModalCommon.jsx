// - - - styles
import './WrapModalCommon.scss';

//-------------------------------------------------------------
// - - - Component wrapModalCommon - - -

let wrapModalCommon = function (props) {
  return (
      <div className="wrapCommonModal">
        оберка модального окна
        {props.children}
      </div>
  );
};

// - - - Component wrapModalCommon - - -
//-------------------------------------------------------------

export default wrapModalCommon;