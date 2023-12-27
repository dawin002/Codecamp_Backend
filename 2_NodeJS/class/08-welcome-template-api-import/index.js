// 현 위치의 email.js 파일에서 4개의 함수 불러오기
import {
    checkEmail,
    getWelcomeTemplate,
    sendTemplateToEmail,
} from "./email.js";

const createUser = function () {
    const isValid = checkEmail({ email });
    if (!isValid) return;

    const welcomeTemplate = getWelcomeTemplate({
        name,
        age,
        school,
    });

    sendTemplateToEmail({ email, welcomeTemplate });
};

const name = "철수";
const age = 8;
const school = "다람쥐초등학교";
const email = "cheulsoo@gmail.com";
// const createdDate = getToday();

createUser({ name, age, school, email });
