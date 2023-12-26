// Welcome Email Template

const getWelcomeTemaplate = function ({ name, age, school, joinedDate }) {
    const welcomeTemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr/>
                <div>이름: ${name}</div>
                <div>나이: ${age}</div>
                <div>학교: ${school}</div>
                <div>가입일: ${joinedDate}</div>
            </body>
        </html>
    `;

    console.log(welcomeTemplate);
};

const name = "정다윈";
const age = 27;
const school = "영남대학교";
const joinedDate = "2023-11-15";

// 변수로 인자를 전달하는 경우
getWelcomeTemaplate(name, age, school, joinedDate);
// 인자를 빠뜨리거나 인자의 순서가 바뀌면 틀린 데이터가 매개변수에 담길 수 있음

// 구조분해할당으로 인자를 전달하는 경우
getWelcomeTemaplate({ name, age, joinedDate }); // school 누락
// 데이터 누락이 발생해도 누락된 매개변수에서만 정확히 오류가 발생함 -> 안전하게 인자 전달 가능
// -> <div>학교: undefined</div>

// 구조분해할당이 안전한 이유
//      인자를 객체로 전달하고,
//      매개변수가 인자를 구조분해할당으로 전달받기 때문
//      (객체 구조분해할당은 순서가 바뀌어도 정상 작동, 누락된 변수 있으면 해당 변수만 데이터 누락)
