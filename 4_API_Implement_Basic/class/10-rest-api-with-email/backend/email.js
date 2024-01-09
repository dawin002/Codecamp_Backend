import { getToday } from "./utils.js";

// 환경변수 dotenv 모듈 가져오기
import "dotenv/config";

// nodemailer 모듈 가져오기
import nodemailer from "nodemailer";

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
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 500px;">
                        <h1>${name}님, 가입을 환영합니다!</h1>
                        <hr/>
                        <div style="color: red;">이름: ${name}</div>
                        <div>나이: ${age}</div>
                        <div>학교: ${school}</div>
                        <div>가입일: ${getToday()}</div>
                    </div>
                </div>
            </body>
        </html>
    `;
    return welcomeTemplate;
};

// 이메일 템플릿 전송(동기 작업 수행을 위한 비동기 작업 수행 async)
export const sendTemplateToEmail = async function ({ email, welcomeTemplate }) {
    // 전송자 생성
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_AUTH_USER,
            pass: process.env.GMAIL_AUTH_PASS,
        }
    });

    // 메일 발송, 발송 잘됐는지 확인하기 위한 동기 작업 await
    const res = await transporter.sendMail({
        from: "daiwn002@gamil.com",
        to: email,
        subject: "[백엔드] 가입을 축하합니다!!!",
        html: welcomeTemplate,
    });

    // 발송이 잘 됐는지 확인하기 위한 res 출력
    console.log(res);   // 이 res 는 nodemailer api에 대한 응답

    // console.log(email + " 이메일로 가입환영 템플릿 " + welcomeTemplate + "을 전송합니다.");
};