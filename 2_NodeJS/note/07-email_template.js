// Email Template

//      웹사이트에 회원가입 등을 했을 때 전송되는 email 은 HTML 코드를 이용한 템플릿이다.

//      템플릿 리터럴(백틱: `)을 활용해 HTML 코드를 문자열로 만들어 전송

//      템플릿 리터럴
//          -> 변수를 문자열 중간에 삽입할 수 있음
//          -> 여러 줄 쓰기가 가능

//      예시
let name = "철수";
let age = 12;
let school = "다람쥐초등학교";

const emailTemplate = `
    <html>
        <body>
            <h1>가입을 축하합니다!</h1>
            <div>이름: ${name}</div>
            <div>나이: ${age}</div>
            <div>학교: ${school}</div>
        </body>
    </html>
`;