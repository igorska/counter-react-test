// - - - styles
import styles from './App.scss';

// - - - images
import Eghik from './eghik.jpg' ;
import Earth from './earth.svg';

//--------------------------------------------------------------

const App = () => (
    <div className='app container'>
      <h2>Hello</h2>

      <div className="dropup">
        <button className="btn btn-default dropdown-toggle" type="button"
                id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
          Dropup sds
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" className="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      </div>

      <i className="glyphicon glyphicon-signal"></i>

    </div>
);

//--------------------------------------------------------------

export default App;