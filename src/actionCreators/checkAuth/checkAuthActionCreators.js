// - - - import auth action Constants
import authConstants from 'Constants/actions/checkAuth/checkAuthConstants.js';

// - - - import Modal actionCreator
import modalActionCreator from 'ActionCreators/common/modal/modalActionCreator.js'

// - - - import modal constants for various types of modal
import modalConstants from 'Constants/actions/common/modal/modalActions';

// - - - check SupportLocalStorage
import isLocalStorageAvailable from 'Helpers/common/js/isLocalStorageAvaliable.js';

//--------------------------------------------------------------------

// - - - newRoles must be array
let setRoles = function (newRoles) {

  return {
    type: authConstants.SET_ROLES,
    payload: newRoles
  }

};

// - - - newLocation must be object
let setInitAuthReqLocation = function (newLocation) {

  return {
    type: authConstants.SET_REQ_LOCATION,
    payload: newLocation
  }

};

// - - - setIsAuthenticated must be boolean
let setIsAuthenticated = function (isAuthenticated) {

  return {
    type: authConstants.SET_IS_AUTHENTICATED,
    payload: isAuthenticated
  }

};

// - - - metaInfo must be object
let setMetaInfo = function (metaInfo) {

  return {
    type: authConstants.SET_META_INFO,
    payload: metaInfo
  }

};

// - - - error must be object
let setError = function (error) {

  return {
    type: authConstants.SET_AUTH_ERROR,
    payload: error
  }

};

// - - - requesting must be boolean
let setAuthRequesting = function (requesting) {

  return {
    type: authConstants.SET_AUTH_REQUESTING,
    payload: requesting
  }

};

/*
 * configObj =
 * {
 *
 * isAuthenticated(pin): boolean
 * roles(pin): [] array
 * metaInfo(pin): { } object
 * initAuthReqLocation(pin): {} object
 * error: {} object
 * requesting: boolean
 * }
 *
 * */
let set_Auth_config = function (configObj) {

  return {
    type: authConstants.SET_AUTH_CONFIG,
    payload: configObj
  }

};

let toLogin = function (email, password) {

  return function (dispatch) {

    // 1) запустить модалку спиннера авторизации
    dispatch(modalActionCreator(modalConstants.SPINNER_MODAL));

    // 1) Установить переменную индикатор процесса авторизации
    dispatch(setAuthRequesting(true));

    /*--------------------------------------------------------------------*/

    // 2) подготовить данные для  запроса к серверу через fetch

    // FormData - встроенный объект, который собирает поля формы, кодирует
    // их как multipart/form-data, и все это автоматом всвтроено в браузер
    let formData = new FormData();
    formData.append("loginForm[email]", email);
    formData.append("loginForm[password]", password);

    // определяем опции запроса, разрешив кроссдоменный запрос, включая
    // credentials - различные учетные параметры, например, Cookie
    let options = {
      credentials: 'include',
      method: "POST",
      body: formData,
      mode: "cors"
    };

    /*--------------------------------------------------------------------*/

    // 2) сделать запрос к серверу через fetch

    fetch('http://stable.test/api/v1/user/login', options)

    // 3) Если ответ есть, определить, успешнна была авторизация или нет.
        .then(function (response) {

          if (response.ok === true) {

            // возвращаем промис, результатом которого будет распарсенный
            // объект ответа от сервера
            return response.json();
          }

          // сервер ответил отказом авторизации, чтож - формируем объъект
          // ошибки для ближайшего catch
          let errorObj = {};
          errorObj.status = response.status;
          errorObj.statusMessage = response.statusText;

          // отрпавляем объект ошибки в ближайший catch
          return Promise.reject(errorObj);

        })

        // вот тут у нас уже все как полагается. Пришло успешное тело овтета с
        // сервера. Мы его можем просмотреть и сформировать данные для
        // успешной записи в state пройденной авторизации
        .then(function (serverAnswer) {

          // записываем в LocalStorage время успешной авторизации
          if(isLocalStorageAvailable() === true){
            localStorage.setItem('lastTimeVisited', Number(new Date()));
          }

          // 5) Когда придет ответ(неважно какой), модалку спиннера снять
          dispatch(modalActionCreator(modalConstants.NO_MODAL));

          // вытягиваем массив ролей пользователя из ответа сервера
          let rolesValue = serverAnswer.roleArr;
          if (!(Array.isArray(rolesValue))) {
            rolesValue = [];
          }

          // вытягиваем доп инфу о пользователе из ответа сервера
          let metaInfoValue = serverAnswer.metaInfo;
          if (metaInfoValue === undefined) {
            metaInfoValue = {};
          }

          //  сформировать объект для записи в state успешной авторизации
          // флаг авторизации в true, ошибки обнуляем
          let configObj = {
            isAuthenticated: true,
            roles: rolesValue,
            metaInfo: metaInfoValue,
            error: {},
            requesting: false
          };

          // послать action, который установит state.checkAuth в успешную авт-ю
          dispatch(set_Auth_config(configObj));

        })

        /*--------------------------------------------------------------*/

        // 4) Если сервер вообще отказал в запросе
        //    - 4.1 определить код ошибки, и текст ошибки
        //    - 4.2 на основе предыдущих данных сформировать action с типом
        // неуспешной отправки (сервер не ответил)
        //    - 4.3 диспатчнуть экшен о том что сервер не ответил
        .catch(function (error) {

          let configObj = {};

          // если у ошибки есть имя, значит это не наша рукотворная ошибка,
          // а ошибка javascript при попытке обратиться к серверу. Формируем
          // соотвествующий объект для записи в state
          if (error.name !== undefined) {
            configObj = {
              isAuthenticated: false,
              roles: [],
              metaInfo: {},
              error: {
                code: 404, // внимание, здесь мы сами определяем код ошибки
                message: error.message
              },
              requesting: false
            }
          } else {
            // мы поймали свою ошибку, например, данные авторизации не
            // верны. Формируем следующий объект для записи в state
            configObj = {
              isAuthenticated: false,
              roles: [],
              metaInfo: {},
              error: {
                code: error.status,
                message: error.statusMessage
              },
              requesting: false
            }
          }

          // 5) Когда придет ответ(неважно какой), модалку спиннера снять
          dispatch(modalActionCreator(modalConstants.NO_MODAL));

          // 5) отправить описание ошибки в state
          dispatch(set_Auth_config(configObj));

        });

  }

};

let toLogout = function  () {
  return function  (dispatch) {

    // 1) Послать запрос fetch серверу, что я выхожу из аккаунта
    let options = {
      credentials: 'include',
      method: "POST",
      mode: "cors"
    };

    fetch("http://stable.test/api/v1/user/logout", options);


    // 2) Удалить авторизационную Cookie из бразура. Какой интересный облом.
    // А куки нельзя выкинуть. Они посланы со специальным заголовком,
    // который запрещает их чтение и тем более модификацию. Для javascript
    // их просто не существует.

    // 3) Сбросить состояние state авторизации в первоначальный.
    // Пустая строка или undefined вместо объекта конфигурации также
    // приведут к сбросу конфигурации checkAuth в state
    dispatch(set_Auth_config())
  }


};


//--------------------------------------------------------------------

export {
  setRoles,
  setInitAuthReqLocation,
  setIsAuthenticated,
  setMetaInfo,
  set_Auth_config,
  setError,
  toLogin,
  setAuthRequesting,
  toLogout
};
