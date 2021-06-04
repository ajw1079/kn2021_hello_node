//********[외부 모듈 불러오기]********//
const express = require('express');
const app = express();
const path = require('path'); 

//********[절대 주소 등록] : 실제 화면상에 구현될 view 페이지를 불러옴********//
const publicPath = path.join(__dirname, './public');
const viewPath = path.join(__dirname, './views');

//********[서버 구동]********//
app.listen(3000, () => { console.log('http://127.0.0.1:3000')});

//********[View Engine 등록]********//
app.set('view engine', 'pug');  //pug 파일 형식을 뷰의 엔진 파트로 등록을 할 것이다.
app.set('views', viewPath);  //경로 설정
app.locals.pretty = true;

//********[정적(static) 등록]********//
app.use('/', express.static(publicPath));

//********[동적(dynamic) 등록]********//
app.get('/test', (req, res) => {
    res.render('test.pug');
});

/*웹사이트의 본격적인 구성*/
app.get('/index', (req, res) => {
    res.render('index.pug');
});
app.get('/about', (req, res) => {
    res.render('about.pug');
});
app.get('/pf', (req, res) => {
    res.render('pf.pug');
});
app.get('/join', (req, res) => {
    res.render('join.pug');
});
