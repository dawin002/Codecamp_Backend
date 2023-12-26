// Shorthand-Property

const func1 = function(profile) {
    console.log(profile);
    console.log(profile.name);
    console.log(profile.age);
    console.log(profile.school)
};

const name = "철수";
const age = 12;
const school = "다람쥐초등학교";

// const profile = {
//     name: name,
//     age: age,
//     school: school
// };

// shorthand-property
const profile = { name, age, school }; // key와 value가 같아서 value를 생략

// 인자에 중괄호({}) 사용
func1(profile);             // 1. 객체를 변수에 담아서 전달
func1({name, age, school}); // 2. 객체를 변수에 담지 않고 전달
//                             => 결과는 1, 2 방식 모두 동일

