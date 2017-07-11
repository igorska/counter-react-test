/*
* This is file helps to determine final main target language,
* that will use in our application. For example detected language
* can be EN-GB. The final main target language (we needed) is only EN!
* */

//----------------------------------------------------------------

function toNormalizeDetectedLang(detectedLanguage, languages) {

  // - - - is empty object?
  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  // - - - LC means LowerCase, to lowercase all strings - parameters
  let detectedLanguageLC = detectedLanguage.toLowerCase(); // in lowerCase
  let languagesLC = []; // in lowerCase
  let subStringIndexes = {}; // example in future - {"ru": -1, "de": 5, "en": 0}
  let pureLang; // final lang

  languages.forEach((currentValue, index, array) => {
    languagesLC.push(currentValue.toLowerCase());
  });

  // - - - searching indexes of languages in detectedLanguage
  languagesLC.forEach((currentValue, index, array) => {
    subStringIndexes[currentValue] = detectedLanguageLC.indexOf(currentValue);
  });

  // - - - find the lowest index of lang, that !== -1, and appropriate Lang
  // delete langs with indexes < 0
  for (let currentLang in subStringIndexes){
    if(subStringIndexes[currentLang] < 0){
      delete subStringIndexes[currentLang];
    }
  }

  // find lang with min positive index
  if(isEmpty(subStringIndexes)){
    pureLang='ru';
  } else {

    let tempArrIndexes = [];
    let minIndexLang;

    // making temporary array for indexes of languages
    for (let currentLang in subStringIndexes){
      tempArrIndexes.push(subStringIndexes[currentLang]);
    }

    // find the min index of lang
    minIndexLang = Math.min.apply(null, tempArrIndexes);

    // find the lang with min index
    for (let currentLang in subStringIndexes){
      if (subStringIndexes[currentLang] === minIndexLang){
        pureLang =  currentLang;
      }
    }

  }

  return pureLang;

}

//----------------------------------------------------------------

export default toNormalizeDetectedLang;