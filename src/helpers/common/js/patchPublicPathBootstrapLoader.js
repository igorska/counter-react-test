const fs = require('fs');
// подключаем модуль для работы с файловой системой

module.exports = function (pathName, strOption) {

  let contents;

  try {
    contents = fs.readFileSync(pathName, 'utf8');
    // считываем содержимое файла в строку

  }
  catch (err) {

    console.log("Sorry. The file not found. Check path argument or may be the" +
        "bootstrap-loader has changed. See it's documentation");
    console.log(err.message);

    process.exit(-1);
    //  прибиваем весь процесс дальнейшей сборки , просто выходим из node
  }

  let isOptions = contents.indexOf("omit");
  if (isOptions === -1) {
    console.log("Sorry. The TargetFile does not have queryString options" +
        "May be the plugin bootstrap-loader has updated");
    process.exit(-1);
  }
  // проверяем, есть ли вообще строка с опциями, куда можно добавить
  // свой publicPath, если нет, выходим

  let isPublicPath = contents.indexOf("publicPath");
  // проверяем, есть ли уже опция publicPath

  if (isPublicPath === -1) {  // если нет, добавляем свой publicPath
    let newContents =
        contents.replace(/"omit":1/, (' "omit":1,' + strOption));
    fs.writeFileSync(pathName, newContents, 'utf8');
    return;
  } else {
    return; // если да, то ничего делать не надо, завершаем работу функции
  }

};


