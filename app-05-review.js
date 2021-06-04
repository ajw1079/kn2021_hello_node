//********[외부 모듈 불러오기]********//
const express = require('express');
const app = express();
const path = require('path');   //내부의 파일을 연동하는 경로를 설정하기 위함

//********[절대 주소 등록] : 실제 화면상에 구현될 view 페이지를 불러옴********//
//console.log(path.join(__dirname, ''));  //C:\Users\hi\Desktop\01_NODE_HELLO
const publicPath = path.join(__dirname, './public');  //C:\Users\hi\Desktop\01_NODE_HELLO/public/(index.html)

//********[서버 구동]********//
app.listen(3000, () => { console.log('http://127.0.0.1:3000')});

//********[정적(static) 등록]********//
app.use('/', express.static(publicPath));

//********[동적(dynamic) 등록]********//

//**<응답파트(res)의 파생 메서드>**//

//http://127.0.0.1:3000/test_string
app.get('/test_string', (req, res) => {
    res.send('Test1의 응답');  //res.send(문자열 또는 문자열을 포함한 변수) : 문자열을 화면상에 보여주겠어요.
});
//http://127.0.0.1:3000/test_json
app.get('/test_json', (req, res) => {
    res.json({
        firstName : "길동",
        lastName : "홍"
    });  //res.json(json 데이터 또는 json 데이터를포함한 변수명) : json 데이터를 화면상에 보여주겠어요.
});
//http://127.0.0.1:3000/test_download
app.get('/test_download', (req, res) => {
    res.download(path.join(__dirname, './public/css/common.css'));  //res.download(반드시 다운로드가 가능한 경로) : 해당하는 파일을 다운로드 하겠어요. (화면 전환은 없음)
});
//http://127.0.0.1:3000/test_redirect
app.get('/test_redirect', (req, res) => {
    //res.redirect('/');  //http://127.0.0.1:3000  =>  app.use('/', express.static(publicPath));  =>  http://127.0.0.1:3000/public/index.html  =<meta> refresh에 의해 =>  http://127.0.0.1:3000/public/html/index.html

    res.redirect('/html/index-public.html');  
    //res.redirect('이동시킬 경로') : 다시 지정된 페이지로 보내줄께요.
});


//**<요청파트(req)의 역할>**//
//http://127.0.0.1:3000/req1?name=홍길동&age=25
//?name=홍길동&age=25 => query key내부에 객체 데이터로 존재 시킨다.  query = {name : "홍길동", age : '25'}
app.get('/req1', (req, res) => {
    console.log(req.query);
    res.send('req1의 요청');
});

//http://127.0.0.1:3000/req2?name=홍길동&age=25
app.get('/req2', (req, res) => {
    console.log(req.query.name);
    console.log(req.query.age);
    sql = "SELECT * FROM user WHERE name='"+req.query.name+"' AND age="+req.query.age;
    res.send(sql);
});

//http://127.0.0.1:3000/req3/홍길동전
app.get('/req3/:title', (req, res) => {
    const title = req.params.title;
    console.log(title);
    const books = {
        홍길동전 : "아버지를 아버지라...",
        별주부전 : "용왕이 나의 간을...",
        심청전 : "아버지의 눈을 위해...",
        춘향전 : "그네타고 놀다가...",
        구운몽전 : "모든 것이 한 여름밤의 꿈이..."
    }
    if(books[title]) res.send(`요청하신 ${title} 책의 내용은 [${books[title]}] 입니다.`);
    else res.send(`요청하신 ${title} 책을 찾을 수가 없습니다.`);
});




//result[key] = value;  vs   result.key = value;  결과 비교
/*
var obj_01 = new Object();   //var obj_01 = {};
var obj_02 = new Object();   //var obj_02 = {};

obj_01.name = "아이폰";  
console.log(obj_01);   //{name: "아이폰"}
obj_02["name"] = "아이폰";
console.log(obj_02);   //{name: "아이폰"}

var obj_string = "cellphone";
obj_01.obj_string = "갤럭시10";
console.log(obj_01);  //{name: "아이폰", obj_string: "갤럭시10"}

obj_02[obj_string] = "갤럭시11";
console.log(obj_02);  //{name: "아이폰", cellphone: "갤럭시11"}
console.log(obj_02.cellphone);
*/