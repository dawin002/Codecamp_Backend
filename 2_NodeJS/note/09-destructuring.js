// Destructuring 구조분해할당

//      구조분해할당 (== 비구조화할당)


// 객체의 구조분해할당

//      객체의 구조분해할당은 순서는 중요하지 않고 변수명(키 이름)이 중요함

//      객체의 속성을 변수에 할당
const child = {
    name: "철수",
    age: 13,
    school: "다람쥐초등학교"
};

//      기존 방식
const nameOri = child.name;
const ageOri = child.age;
const schoolOri = child.school;

console.log(nameOri, ageOri, schoolOri);

//      구조분해할당 방식
const {name, age, school} = child;

console.log(name, age, school);

//      구조분해할당 변수명 변경 방식

const {name: nameDes, age:ageDes, school: schoolDes} = child;

console.log(nameDes, ageDes, schoolDes);


// 배열 구조분해할당

//      배열 구조분해할당은 순서가 중요하고 할당할 변수명은 중요하지 않음

//      배열의 요소를 변수에 할당
const classmates = ["철수", "영희", "훈이"];

//      기존 방식
const child1 = classmates[0];
const child2 = classmates[1];
const child3 = classmates[2];

console.log(child1, child2, child3);

//      구조분해할당 방식
const [childD1, childD2, childD3] = classmates;

console.log(childD1, childD2, childD3);

//      특정 요소를 제외한 구조분해할당 방식

const [childOnly1, ,] = classmates;
const [, childOnly2,] = classmates;
const [, , childOnly3] = classmates;

console.log(childOnly1, childOnly2, childOnly3);