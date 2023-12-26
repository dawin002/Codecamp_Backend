// Welcome Email Template

const getWelcomeTemaplate = function({name, age, school, joinedDate}) {

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
    `

    console.log(welcomeTemplate);
}

const name = "정다윈";
const age = 27;
const school = "영남대학교"
const joinedDate = "2023-11-15";

getWelcomeTemaplate({name, age, joinedDate}); // school 누락
// 구조분해할당으로 인자를 전달할 경우 데이터 누락이 발생해도 누락된 매개변수에서만 정확히 오류가 발생함
// -> <div>학교: undefined</div>