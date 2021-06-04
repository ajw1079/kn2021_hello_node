const ajw = {
/*    
    createServer(){
        console.log("여기 서버가 구축 되었습니다.");
    }
*/
    createServer(fn){
        const req = {name : "요청하라"}
        const res = {name : "응답하라"}
        fn(req, res);  //콜백
    }
}
module.exports = ajw;

//시니어 개발자들이 객체 모듈을 구성
//주니어 개발자가 app.js 파일에서 객체 모듈을 사용한다.