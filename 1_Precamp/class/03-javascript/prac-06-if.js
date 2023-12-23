// 조건문

let a = 2;
let b = 3;

if(a === 0) {
    pass;
} else if(a === 1) {
    pass;
} else {
    pass;
}


if((a===b)&&(b===3)) {
    pass;
} else {
    pass;
}


// 거짓같은 값
0          // 숫자 0
-0         // 음수 0
0n         // 불리언으로 사용될 경우 거짓의 값
" "        // 빈 String
null       // 아무런 값도 없음
undefined  // 원시값
NaN        // 숫자가 아님

// 그외 정수나 비어있지 않은 문자열은 모두 참으로 취급


// 조건문 실습 1

if(1+1 === 2){
    console.log("정답입니다");
} else {
    console.log("틀렸습니다");
}
// 정답입니다

if(true){ "..." }
// 정답입니다

if(!true){ "..." }
// 틀렸습니다

if(0){ "..." }
// 틀렸습니다

if(3){ "..." }
// 정답입니다

if("a") { "..." }
// 정답입니다



// 조건문 실습 2

const profile = {
    name: "철수",
    age: 12,
    school: "다람쥐초등학교",
}
// undefined

if(profile.age >= 20) {
    console.log("성인입니다.");
} else if (profile.age >= 8) {
    console.log("학생입니다.");
} else if (profile.age >= 0) {
    console.log("어린이입니다.");
} else {
    console.log("잘못된 입력입니다.");
}
// VM1723:4 학생입니다.



