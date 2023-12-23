// 반복문 기초 - 자바와 동일

const children = ['a', 'b', 'c']
// undefined

for(let i=0; i<3; i++) {
    console.log(children[i]);
}
// VM2000:2 a
// VM2000:2 b
// VM2000:2 c

for(let i=0; i<4; i++) {
    console.log(children[i]);
}
// VM2004:2 a
// VM2004:2 b
// VM2004:2 c
// VM2004:2 undefined


// 반복문 실습 1

let persons = [
    {name: 'a', age: 17},
    {name: 'b', age: 20},
    {name: 'c', age: 5},
    {name: 'd', age: 25},
    {name: 'e', age: 13}
]

for(let count=0; count < persons.length; count++) {
    if(persons[count].age >= 19) {
        console.log("성인입니다.");
    } else {
        console.log("미성년자입니다.");
    }
}
// VM2552:5 미성년자입니다.
// VM2552:3 성인입니다.
// VM2552:5 미성년자입니다.
// VM2552:3 성인입니다.
// VM2552:5 미성년자입니다.


for(let count=0; count < persons.length; count++) {
    if(persons[count].age >= 19) {
        console.log(persons[count].name + "님은 성인입니다.");
    } else {
        console.log(persons[count].name + "님은 미성년자입니다.");
    }
}
// VM2658:5 a님은 미성년자입니다.
// VM2658:3 b님은 성인입니다.
// VM2658:5 c님은 미성년자입니다.
// VM2658:3 d님은 성인입니다.
// VM2658:5 e님은 미성년자입니다.


// 반복문 실습 2

const fruits = [
    {number: 1, title: "딸기"},
    {number: 2, title: "사과"},
    {number: 3, title: "포도"},
    {number: 4, title: "수박"},
    {number: 5, title: "메론"},
]

for(let k=0; k<fruits.length; k++) {
    console.log(`${fruits[k].number} ${fruits[k].title}`);
    // console.log(fruits[k].number + " " + fruits[k].title); 와 동일
}

// console.log(`${변수}`)
// 콘솔 로그로 출력할 때 `(백틱)${ 변수명 }`(백틱) 으로 감싸면 변수에 저장된 값이 출력됨
// 파이썬으로 치면 f-string 같은 출력 서식