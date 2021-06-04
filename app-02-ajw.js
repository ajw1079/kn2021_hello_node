const express = require("express");  //express 함수를 호출한 것과 동일
const app = express();

//console.log(express);
//console.log(app);
const http = require("http");  //통신모듈 (내장모듈 : url, http, querystring) : 브라우저의 URL 창의 접근 모듈

const ajw = require('./modules/ajw');
console.log(ajw);  //{ createServer: [Function: createServer] } 함수문만 가져온 것임
//ajw.createServer();  //여기 서버가 구축 되었습니다.  
//모든 앱의 중심(컨트롤타워)은 app.js
//외부의 모듈에 서버를 하나 생성한다. 그것을 가져오겠다. 

ajw.createServer((req, res) => {
    console.log(`${req.name} 나와랏!!`);
    console.log(`${res.name} 나와랏!!`);
});