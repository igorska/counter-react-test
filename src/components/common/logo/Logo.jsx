// - - - styles
import './logo--top.scss';

// - - - images
import logo from './images/earth.svg';

//-----------------------------------------------------------

let Logo = ()=>{

  return (
      <div className="logo">
        <img className="logo__image"
             src={logo}
             alt="Aser"/>
      </div>
  )

};

//-----------------------------------------------------------

export default Logo

