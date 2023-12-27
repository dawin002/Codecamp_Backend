import { getToday } from "./utils.js";

export const checkEmail = function ({ email }) {
    if (!email) {
        console.log("[ERROR] 이메일이 비어있습니다.");
        return false;
    }
    if (email.indexOf("@") === -1) {
        console.log("[ERROR] 올바른 이메일 형식이 아닙니다.");
        return false;
    }
    return true;
};

export const getWelcomeTemplate = function ({ name, age, school, createdDate }) {
    const welcomeTemplate = `
        <html>
            <body>
                <h1>${name}님, 가입을 환영합니다!</h1>
                <hr/>
                <div>이름: ${name}</div>
                <div>나이: ${age}</div>
                <div>학교: ${school}</div>
                <div>가입일: ${getToday()}</div>
            </body>
        </html>
    `;
    return welcomeTemplate;
};

export const sendTemplateToEmail = function ({ email, welcomeTemplate }) {
    console.log(
        email +
            " 이메일로 가입환영 템플릿 " +
            welcomeTemplate +
            "을 전송합니다."
    );
};