//[순수 노드로만 짠 서버 생성]
/*
const http = require('http');
console.log(http);

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

//[express에서 적용한 서버 페이지의 생성]
/*
const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("http://127.0.0.1:3000");
});
//아무것도 작성한 부분이 없다보니, 가져올 내용이 없는 상태 (사이트가 존재하지 않다는 것은 아님)
*/

//[서버로부터 경로 구성하기]
/*
const express = require("express");
const app = express();

//URL 창에 http://127.0.0.1:3000/ 입력하면
app.use("/", express.static("./public"));
//html, css, javascript 파일들은 정적인 파일이기 때문에 검사창에서 소스가 모두 노출된다.그래서 public이라는 폴더에 정적인 파일을 모두 넣는다(View). 그외의 파일은 사용자에게 보여줄 필요는 없다.
// "/"는 폴더로 접근하겠어요. 경로로 접근을 하면 public 폴더를 열겠어요. 그내부의 index.html을 찾아감. refresh 라는 구동 동작을 통해서 http://127.0.0.1:3000/html/index.html  주소로 화면이 표현된다.

app.listen(3000, () => {
    console.log("http://127.0.0.1:3000");
});
*/

//[get 방식으로 무작위로 설정된 단어를 URL 창의 우측에 입력하면 페이지를 구성하는 과정]
/*
const express = require("express");
const app = express();
const path = require("path");

//절대 경로의 값으로 찾아가는 방법
//console.log(path);
console.log(path.join(__dirname, './public'));  //C:\Users\hi\Desktop\01_NODE_HELLO\public
//URL 창에 http://127.0.0.1:3000 을 입력하면 가져오는 화면은 위의 화면과 동일하다.
app.use("/", express.static(path.join(__dirname, './public')));

//URL 창에 http://127.0.0.1:3000/ajw 를 입력하면 설정된 값을 화면에 작성
app.get("/ajw", (req, res) => {
    res.send('<h1>제 이름은 안재욱입니다.</h1>');
});

//URL 창에 http://127.0.0.1:3000/loop 입력하면
app.get("/loop", (req, res) => {
    let html = "";
    for(let i = 0; i < 10; i++){
        html += `<h2>반복 ${i}</h2>`;
    }
    res.send(html);
});

app.listen(3000, () => {
    console.log("http://127.0.0.1:3000");
});
*/


//[get 방식으로 무작위로 설정된 단어를 URL 창의 우측에 입력하면 페이지를 구성하는 과정 + 스타일 적용]
const express = require("express");
const app = express();
const path = require("path");

//절대 경로의 값으로 찾아가는 방법
//console.log(path);
console.log(path.join(__dirname, './public'));  //C:\Users\hi\Desktop\01_NODE_HELLO\public
//URL 창에 http://127.0.0.1:3000 을 입력하면 가져오는 화면은 위의 화면과 동일하다.
app.use("/", express.static(path.join(__dirname, './public')));

//URL 창에 http://127.0.0.1:3000/ajw 를 입력하면 설정된 값을 화면에 작성
app.get("/ajw", (req, res) => {
    res.send('<h1>제 이름은 안재욱입니다.</h1>');
});

//URL 창에 http://127.0.0.1:3000/loop 입력하면 + <<스타일 적용>>
app.get("/loop", (req, res) => {
    let html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="/css/common.css">
        </head>
        <body>
    `;
    //CSS 파일의 경로는 app.use() 라는 곳에서 설정한 값을 기준으로 위치를 부여한다. 
    for(let i = 0; i < 10; i++){
        html += `<h2>반복 ${i}</h2>`;
    }
    html += `
        </body>
    </html>
    `;
    res.send(html);
});

app.listen(3000, () => {
    console.log("http://127.0.0.1:3000");
});
