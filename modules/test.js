//만약 두자리 영역(1~99)까지 표기한다면 -->  10보다 작은 수에서는 01, 02, ... 09 
const zp = v => (v < 10) ? '0' + v : v;

//Hello 홍길동 라고 표현을 해야 한다면
const greeting = name => `Hello ${name}`;

//module.exports = zp;  
//module.exports = greeting;

//비구조 할당 : 객체화
module.exports = {zp, greeting};
