// - - - base packages for internationalization
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// - - - import language resources
import * as resources from './resources.js';

// - - - helper to find user lang from client side at first user visit
import toNormalizeDetectedLang from './toNormalizeDetectedLanguage.js';

// - - - helper to set Lang in LocalStorage of client browser
import setLangInClientBrowser from './setLangInClientBrowser';

//-----------------------------------------------------------
// init i18n core object
i18n
    .use(LanguageDetector)
    .init({
      fallbackLng: 'en',
      debug: true,
      resources:resources,

      react: {
        wait: false,
        // set to true if you like to wait for loaded in every translated hoc

        nsMode: 'default'
        // set it to fallback to let passed namespaces
        // to translated hoc act as fallbacks
      }
    });

// - - - this is langs, thar are used in our application
let languages = ['ru', 'en'];

// - - -  this is lang from client side
// (Cookie localstorage... see specific i18n LanguageDetector)
let detectedLanguage =i18n.language;

// this is normalized lang from clientSide ('ru' is fallback)
let pureLang = toNormalizeDetectedLang(detectedLanguage, languages);

//-----------------------------------------------------------

// set lang in client browser in LocalStorage (if not  - then in Cookie)
setLangInClientBrowser(pureLang);

//-----------------------------------------------------------

export {pureLang};
export  {i18n};
