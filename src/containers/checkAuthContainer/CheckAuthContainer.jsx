// - - - import config roles for comparing current role
import roles from './config.roles.json';

// - - - connect
import {connect} from 'react-redux'

// - - - reSelector for checkAuthReSelector
import checkAuthReSelector from './checkAuthReselector';

// - - - actionCreators of checkAuthContainer
import * as checkAuthActionCreators from 'ActionCreators/checkAuth/checkAuthActionCreators.js'

import isLocalStorageAvailable from 'Helpers/common/js/isLocalStorageAvaliable.js';

//---------------------------------------------------------------
// - - - component CheckAuthContainerBlank

// промежуток времени, в речении которого, данные авторизации в
// LocalStorage будут считаться валидными / в минутах
let timeGapValidAuthLS = 180;

// по умолчанию клиент не авторизован
let isLogin = false;

// по умолчанию у клиента нет никакхи прав
let isHaveRole = false;

// дотупен ли LocalStorage?
let isLocalStorage = isLocalStorageAvailable();

//-     -     -     -     -     -     -     -     -     -     -

class CheckAuthContainerBlank extends React.Component {

  checkRoles(calcCurrentRoles) {

    // объект, с жестко зашитиыми ролями
    let rolesObj = roles;

    // массив с назначенными ролями пользователю
    let currentRoles = calcCurrentRoles;

    // имя в строковом формате целевого компонента
    let nameTargetComponent = this.props.route.targetComponent.name;

    // ищем имя передаваемого компонента в переданном конфигурационном списке
    if (!rolesObj[nameTargetComponent]) {
      isHaveRole = false;
    } else {

      //компонент в заданном списке ролей есть, ищем для него текущую
      // роль, если нашлась, значит устанавливаем флаг просмотра роли в true
      isHaveRole = rolesObj[nameTargetComponent].some(function (curValRolesObj) {
        return currentRoles.some(function (curValRole) {
          return (curValRolesObj === curValRole);
        })
      });

    }

  }

  componentWillUpdate(nextProps) {

    // перед отображением компонента необходимо считать новое свойство
    // isAuthenticated
    isLogin = nextProps.checkAuth.isAuthenticated;

    // читываем текущие роли пользователя
    let currentRoles = nextProps.checkAuth.roles;

    // проверяем, подходят ли они для отображения компонента. IsHaveRole
    // переменная сама автоматически изменится в этой функции.
    this.checkRoles(currentRoles);
  }

  componentWillMount() {

    // перед отображением компонента необходимо считать новое свойство
    // isAuthenticated
    isLogin = this.props.checkAuth.isAuthenticated;
  }

  componentDidMount() {

    // функция диспатчинга экшенов
    let dispatch = this.props.dispatch;

    // проверить, залогинен ли пользователь?
    isLogin = this.props.checkAuth.isAuthenticated;

    if (!isLogin) {

      // объект с информацией о запрошенному маршруте пользователя
      let initAuthReqLocation = this.props.location;

      // запоминаем параметры URL адреса, запрошенного пользователем
      dispatch(
          checkAuthActionCreators.setInitAuthReqLocation(initAuthReqLocation)
      );

      if (!isLocalStorage) {

        //  перенаправить на авторизацию, если не прошел авторизацию ранее,
        // и нет доступа к LocalStorage, где могли бы зраниться его учетные
        // данные
        this.props.router.push('/authorization');

      } else {

        // автороизацию клиент не прошел, но может быть его данные есть в LS
        // проверить время последнего посещения приложения пользователем
        let lastTimeVisited = Number(localStorage.getItem('lastTimeVisited'));
        let newTimeVisited = Number(new Date());

        // если нет последней записи о времени посещения, или у этой записи
        // вышел срок, то перенаправить на страницу авторизации
        if (!lastTimeVisited) {
          this.props.router.push('/authorization');
          return;
        }

        if ((newTimeVisited - lastTimeVisited) > (timeGapValidAuthLS * 60 * 1000)) {
          this.props.router.push('/authorization');
          return;
        }

        // здесь мы точно знаем, что пользователь не залогинен, но у него
        // есть непросроченные данные его прошлой авторизации в
        // LocalStorage. Делаем авторизацию через запрос к серверу

        /*-------------------------------------------------------------*/

        // - считать значение из localStorage имени и пароля
        // - проверить существуют ли они и не пустые ли строки
        // - если не существуют или пустые строки-  отправить на страницу
        // авторизации

        let userEmailLSValue = localStorage.getItem('userEmail');
        let userPasswordLSValue = localStorage.getItem('userPassword');

        if (
            userEmailLSValue === undefined ||
            userEmailLSValue === '' ||
            userPasswordLSValue === undefined ||
            userPasswordLSValue === ''
        ) {
          this.props.router.push('/authorization');
        } else {

          // - если есть значения, делаем запрос
          // авторизации к серверу checkAuthActionCreators.toLogin()
          dispatch(checkAuthActionCreators.toLogin(userEmailLSValue, userPasswordLSValue));

        }

      }

    } else {
      //  пользователь залогинен, зледовательно запускаем проверку роли его прав

      // читываем текущие роли пользователя
      let currentRoles = this.props.checkAuth.roles;

      // проверяем, подходят ли они для отображения компонента. IsHaveRole
      // переменная сама автоматически изменится в этой функции.
      this.checkRoles(currentRoles);

      // Это небольшой фикс для следующей ситуации. У вас компонент уже
      // отрисован, так как render выполнился раньше, чем где мы сейчас
      // находимся (componentDidUpdate). Если мы выявили, что пользователь
      // не авторизован, мы отправляем его на страницу регистрации и все
      // хорошо. Но если пользователь авторизован, а вот права ролей
      // посчитались только сейчас, то перерендера не произойдет.
      //
      // Расчет прав ролей - это сугубо внутренняя операция компонента
      // CheckAuthContainer. Поэтому если рассчитались права ролей, то
      // надо сделать принудительный перерендер компонента. На
      // производительности это никак не скажется, потому что при
      // отсутствующих правах ролей, запрашиваемые компоненты все равно не
      // будут отрисованы. Применимо только здесь в componentDidMount
      if (isHaveRole) {

        this.forceUpdate();

      }

    }

  }

  render() {

    let Component;

    // отрисовка, если не залогинен клиент
    if (!isLogin) {
      Component = () => {
        return (
            <div>
              Извините вы не авторизованы / Sorry, you are not logged in
            </div>
        );
      }
    }

    // отрисовка если залогинен, но роль пользователя не позволяет клиенту
    // просматривать целевой компонент
    if (isLogin && !isHaveRole) {
      Component = () => {
        return (
            <div>
              У вас недостаточно прав для просмотра данного контента /
              You do not have sufficient rights to view this content
            </div>
        )

      };
    }

    // отрисовка, если все хорошо (клиент залогинен, и у него есть роль для
    // просмотра этого компонента)
    if (isLogin && isHaveRole) {

      Component = this.props.route.targetComponent;

    }

    return <Component/>
  }

}

// - - - component CheckAuthContainerBlank
//---------------------------------------------------------------

//---------------------------------------------------------------
// - - - operations for react-redux

const mapStateToProps = function (state) {
  return {
    checkAuth: checkAuthReSelector(state)
  }
};

let CheckAuthContainer = connect(mapStateToProps)(CheckAuthContainerBlank);

// - - - operations for react-redux
//---------------------------------------------------------------

export default CheckAuthContainer;



