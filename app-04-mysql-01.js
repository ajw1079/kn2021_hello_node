//************외부 모듈 Import(연동하기)*************//
const express = require("express");  //node에서 좀더 편하게 화면 구동시킬 수 있는 용도
const app = express();
//const http = require("http");
const path = require("path");  //내부의 문서를 연동하기 위한 용도

const mysql = require("mysql2");  //mySQL의 DB 연동하기 위한 모듈을 사용할 것이다.


//************서버 구동*************//
app.listen(3000, () => {console.log('http://127.0.0.1:3000')});  //화면을 보여줄 주소를 제공


//*********[[ JSON, req.body 파싱(브라우저가 인식할 수 있도록 구성) ]]**********//
app.use(express.json());  //내가 전송한 방식을 json 형식으로 파싱하겠다는 의미
app.use(express.urlencoded({extended:false}));  //post 방식으로 전송한 데이터들을 req.body 로 접근할 수 있게 바꿔주세요. 인코딩
// 핵심사항(DB 전송간에 문제점으로 발생됨) ==> 결론적으로 두문장을 작성해야 JSON 형식으로 데이터들을 받아올 수 있으며, post 방식으로 전송된 데이터들을 브라우저에서 읽을 수 있음  



//************정적 폴더 등록*************//
app.use('/', express.static(path.join(__dirname, './public')));  //화면에 무엇을 보여줄 것인가에 대한 경로를 설정
//  ==>  '/'(루트 http://127.0.0.1:3000 )로 접근하면 public 폴더로 이동하세요.

//터미널 창에 nodemon 또는 supervisor 설치 : 서버를 지속적으로 감시하기 때문에, 서버의 종료 및 재실행을 하지 않아도 됨(개발자들이 매우 선호하는 외부모듈 - 오직 설치로 모든것이 진행됨)
//npm i -g supervisor nodemon 입력 (맥, 리눅스 : sudo npm i -g supervisor nodemon)
//nodemon app 문구를 입력 => 저장시마다 계속 app.js의 변화되는 모습을 감시하여 restart를 진행
//sudo nodemon app


//************DB(bitnami의 MYSQL)로 접근*************//

//mySQL로 접근을 하려면 DB(bitnami의 MYSQL) 접근을 시도
//기본적으로 노드에 DB의 선정이 내장 모듈에 없음. 외부의 mySQL을 불러올 수 있는 모듈을 설치해야 함
//터미널 창에 npm i mysql2 를 입력하여 설치 진행

//여기서 mysql2 모듈은 현존하는 mysql 명령체계 및 접근체계를 모두 포함하는 모듈


//****MYSQL2 연결(db_con.php)****//
const connect = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '000000',
    port : '3306',
    database : 'test1'
});
//Database의 연결 통로인 port 번호가 3306(기본값)이 아닐 경우 반드시 port : '포트번호'를 객체 데이터로 넣어주어야 한다.






//****라우터(Router) 등록****//
/*
app.get('/user/save', (req, res) => {
    res.send('Hi~~!!');
});
*/
//get 방식으로 /user/save 로 접근하면 요청을 받아 아래에 작성된 문구를 출력할 것이다.
//위에 구성한 html/index.html의 화면에서 4가지 입력상자에 값을 작성하고 전송 버튼을 클릭하면 http://127.0.0.1:3000/user/save?userid=bbb&userpw=bbb&username=bbb&email=bbb URL이 변경되면서 get 방식으로 입력한 정보들이 들어온다. 브라우저의 문서 공간에는 Hi~~!! 출력된다.
//userid=bbb&userpw=bbb&username=bbb&email=bbb의 문구는 요청(req)에 의한 query로 정의된 문자열 (req.query)
/*
app.get('/user/save', (req, res) => {
    const user = {
        userid : req.query.userid,
        userpw : req.query.userpw,
        username : req.query.username,
        email : req.query.email,
    }
    res.send(`${user.userid} / ${user.userpw} / ${user.username} / ${user.email}`);
});
*/
//get 방식으로 들어온 URL의 출력형태는 입력한 문자열이 노출됨 (해킹의 대상)

//위의 문장을 좀더 간결한 형태로 변경을 한다면, 비구조 할당 방식으로 접근을 시킬 수도 있음
app.get('/user/save', (req, res) => {
    //객체 펼침 연산자
    /*
    const user = {...req.query};
    res.send(user);
    res.send(`${user.userid} / ${user.userpw} / ${user.username} / ${user.email}`);
    */
    //비구조 할당 방식
    const {userid, userpw, username, email} = req.query;  
    res.send(`${userid} / ${userpw} / ${username} / ${email}`);
});

//위의 get 방식은 아이디와 패스워드 등의 개인정보가 노출된다는 문제점을 계속 갖고 있음.

//post 방식으로 접근하여 노출을 막는 데이터 형태로 값을 전달할 예정

app.post('/user/save', (req, res) => {
    //res.send("Hello~~");
    //응답할 수 있는 문서가존재하지 않기때문에 크롬 브라우저는 계속 대기를 하고 있음. (5분)응답이 없음을 인지하기 위한 최소시간 설정되어 있음... 네트워크의 문제인가? < 서버의 문제인가?
    /*
    const {userid, userpw, username, email} = req.query;  //get 방식으로 접근되어지는 URL 창의 문자열(?이후의 문자열만 포함)
    res.send(`${userid} / ${userpw} / ${username} / ${email}`);  //  undefined / undefined / undefined / undefined
    */

    //post 방식은 실제 데이터를 body라는 영역으로 가져온다.
    const {userid, userpw, username, email} = req.body;
    //res.send(`${userid} / ${userpw} / ${username} / ${email}`);

    //sql에서 회원가입 데이터 MYSQL DB의 users 라는 테이블에 넣기
    const sql = `INSERT INTO users SET userid='${userid}', userpw='${userpw}', username='${username}', email='${email}'`;  //현재 입력된 모든 데이터들은 char(문자열) 이라는 형식을 갖고 있기 때문에 ''(작은 따옴표)를 넣고 그 변수 값을 넣어준다.
    connect.query(sql, function(err, result){
        res.json(result);
    });
});






