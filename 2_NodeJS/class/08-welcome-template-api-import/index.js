// 현 위치의 email.js 파일에서 4개의 함수 불러오기
import {
    checkEmail,
    getWelcomeTemplate,
    sendTemplateToEmail,
} from "./email.js";

const createUser = function ({ name, age, school, email }) {
    // 1. 이메일이 정상인지 확인하기(빈칸 여부, '@'포함 여부)
    const isValid = checkEmail({ email });
    if (!isValid) return;

    // 2. 가입환영 템플릿 만들기
    const welcomeTemplate = getWelcomeTemplate({
        name,
        age,
        school,
    });

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail({ email, welcomeTemplate });
};

const name = "철수";
const age = 8;
const school = "다람쥐초등학교";
const email = "cheulsoo@gmail.com";
// const createdDate = getToday();

createUser({ name, age, school, email });
