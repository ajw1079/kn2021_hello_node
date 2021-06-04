//********[외부 모듈 불러오기]********//
const express = require('express');
const app = express();
const path = require('path'); 

//********[절대 주소 등록] : 실제 화면상에 구현될 view 페이지를 불러옴********//
const publicPath = path.join(__dirname, './public');

//********[서버 구동]********//
app.listen(3000, () => { console.log('http://127.0.0.1:3000')});

//********[정적(static) 등록]********//
app.use('/', express.static(publicPath));

//********[동적(dynamic) 등록]********//

