//test.js 가져오기
//직접 대입 방식
const util = require('./modules/test');
console.log(util);  //{ zp: [Function: zp], greeting: [Function: greeting] }

console.log(util.zp(5));
console.log(util.greeting('안재욱'));

//비구조 할당 방식으로 대입
const {zp, greeting} = require('./modules/test');

console.log(zp);
console.log(greeting);

console.log(zp(7));
console.log(greeting('홍길동'));

//test2.js 가져오기
const test2 = require('./modules/test2');
//test2();
console.log(test2());


