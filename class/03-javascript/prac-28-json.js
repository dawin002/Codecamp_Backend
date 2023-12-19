
/* JSON 타입 */

//      텍스트형 데이터 포맷
//      객체나 데이터를 문자열 타입으로 변환한 것

const person = {
    name : 'Dylan',
    age : 26,
    graduated : true,
};


/* JSON.stringify() */

//      어떤 객체(데이터)를 JSON 타입으로 변환하는 함수
//      문자열 데이터로 변환됨

let jsonPerson = JSON.stringify(person);

console.log(jsonPerson);
console.log(typeof(jsonPerson));
// {"name":"Dylan","age":26,"graduated":true}
// string


/* JSON.parse() */

//      JSON 타입의 데이터를 원본 타입으로 변환하는 함수
//      헤더가 포함된 response는 원본 타입으로 변환할 수 없음
//      -> .json() 함수 사용해야 함

let oriPerson = JSON.parse(jsonPerson);

console.log(oriPerson);
console.log(typeof(oriPerson));
// { name: 'Dylan', age: 26, graduated: true }
// object


/* .json() */

//      응답 JSON 데이터를 JavaScript Object 형식으로 변환하는 함수
//      헤더와 바디가 존재하는 응답 객체를 받아서 바디만 읽음
//      JSON 데이터를 변환해서 Promise 객체를 반환

//      *** 응답 JSON 데이터에만 사용할 수 있다

//      예시 코드 (실제로 동작하진 않음)
fetch(
    'https://api.dawinopenapi.org/data/2.8/onecall?appid=apikey123'
).then((ex_res) => {
    return ex_res.json();
    // 여기서 json()이 Promise 객체를 반환하기 때문에 한번 더 then() 함수가 필요
}).then((ex_json) => {
    console.log(ex_json);
    console.log(typeof(ex_json));
});