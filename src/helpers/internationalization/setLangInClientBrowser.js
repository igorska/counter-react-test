//----------------------------------------------------------------

let setLangInClientBrowser = function  (lang) {

  // - - - helper function to set Cookie
  function setCookie(name, value, options) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires == "number" && expires) {
      let d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }

    let updatedCookie = name + "=" + value;

    for (let propName in options) {
      updatedCookie += "; " + propName;
      let propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }

    document.cookie = updatedCookie;
  }

  // check LocalStorage Support
  if (typeof(Storage) === "undefined") {
    console.log("Sorry! No Web Storage support...");

    // BE CAREFUL! This i18next is from I18next languageDetector
    // for Cookie key
    setCookie('i18next', lang, {'expires': 43200});
    return;
  }

  // BE CAREFUL! This i18nextLng is from I18next languageDetector
  // for LocalStorage key
  localStorage.setItem("i18nextLng", lang);

};

//----------------------------------------------------------------

export default setLangInClientBrowser;
