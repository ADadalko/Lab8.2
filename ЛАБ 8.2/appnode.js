const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const { send } = require("process");
const { count } = require("console");
  
const app = express();

let firstName = "";
let secondName = "";
let thirdName = "";
let nationality = "";
let country = "";
let select = "";
let radio1 = "";
let radio2 = "";
let check1 = "Пользовательское соглашение не прочтено";
let check2 = "Не присылать уведомления";


app.use(express.static(__dirname + "/html"));
app.use(express.static(__dirname + "/js"));
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/resource"));
app.use(express.static(__dirname + "/files"));

let data1 = "";
let data2 = "";

const urlencodedParser = bodyParser.urlencoded({extended: false});
 
app.get("/html/index.html", urlencodedParser, function (request, response) {
    response.sendFile("index.html");
});
app.post("/", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    firstName = `${request.body.text1}`;
    secondName = `${request.body.text2}`;
    thirdName = `${request.body.text3}`;
    nationality = `${request.body.text4}`;
    country = `${request.body.text5}`;
    select = `${request.body.list}`;
    if(`${request.body.radio1}` == "on") radio1 = "Мужской";
    if(`${request.body.radio2}` == "on") radio2 = "Женский";
    if(`${request.body.check1}` == "on") check1 = "Пользовательское соглашение прочтено";
    if(`${request.body.check2}` == "on") check2 = "Присылать уведомления";
    firstName = `${request.body.text1}`;
    let json = {
    "Имя": `${firstName}`,
    "Фамилия": `${secondName}`,
    "Отчество": `${thirdName}`,
    "Национальность": `${nationality}`,
    "Страна проживания": `${country}`,
    "Пол": `${radio1}${radio2}`,
    "Соглашение": `${check1}`,
    "Уведомления": `${check2}`
    }

    fs.writeFile(__dirname + "/files/file1.json", JSON.stringify(json), function(error){
      if(error) throw error; // если возникла ошибка
      console.log("Содержимое файла file.txt:");
      let data = fs.readFileSync(__dirname + "/files/file1.json", "utf8");
      data1 = data
      console.log(JSON.parse(data));  // выводим считанные данные
    })
    fs.writeFile(__dirname + "/files/file.txt", 
    `
    Имя: ${firstName}
    Фамилия: ${secondName}
    Отчество: ${thirdName}
    Национальность: ${nationality}
    Страна проживания: ${country}
    Пол: ${radio1}${radio2}
    Соглашение: ${check1}
    Уведомления: ${check2}`, function(error){
      if(error) throw error; // если возникла ошибка
      console.log("Содержимое файла file1.json:");
      let data = fs.readFileSync(__dirname + "/files/file.txt", "utf8");
      data2 = data;
      console.log(data);  // выводим считанные данные
  });
    response.sendFile(__dirname + "/html/index.html");
});

app.get("/result", urlencodedParser, function (request, response) {
  if(!request.body) return response.sendStatus(400);
  response.send(`
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <script data-main="js/init" src="js/library/require.js"></script>
    <title>Форма</title>
  </head>
  <body>
    <form action="/" method="post">
    <label for="text1">Имя:
      <input type="text" name="text1" maxlength="25" size="25" id="name"
    /></label>
    <label for="text2">Фамилия:
      <input type="text" name="text2" maxlength="25" size="25" id="secondName"
    /></label>
    <label for="text3">Отчество:
      <input type="text" name="text3" maxlength="25" size="25" id="thirdName"
    /></label>
    <label for="text4">Национальность:
      <input type="text" name="text4" maxlength="25" size="25" id="nationality"
    /></label>
    <label for="text5">Страна проживания:
      <input type="text" name="text5" maxlength="25" size="25" id="country"
    /></label>
    <label for="list">Возраст:
      <select name="list" id="select">
        <option>До 18</option>
        <option>18-30</option>
        <option>30-50</option>
        <option>50+</option>
      </select>
    </label>
    <label for="radio1">
      Пол:
      Мужской
      <input type="radio" name="radio1" id="radio1">
    </label>
    <label for="radio2">Женский:<input type="radio" name="radio2" id="radio2"></label>
    <label for="check1">Пользовательское соглашение:<input type="checkbox" name="check1" id="check1"></label>
    <label for="check2">Присылать ли уведомления:<input type="checkbox" name="check2" id="check2"></label>
    <button type="submit">Отправить</button>
  </form>
    <button onclick="f1();">Считать информацию из файлов</button>
    <p id="p"><h4>Содержимое файла file1.json:</h4>
    ${data1}<br><h4>Содержимое файла file.txt:</h4> ${data2}
    </p>
    <script src="script.js"></script>
  </body>
</html>
`);
});
  
app.get("/", function(request, response){
    response.sendFile("index.html");
});
  
app.listen(3000);