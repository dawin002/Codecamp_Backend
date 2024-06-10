import 'dotenv/config';
import nodemailer from 'nodemailer';
import { MyDate } from '../../utils/mydate.js';

export class EmailService {
  checkEmail = function ({ email }) {
    if (!email) {
      console.log('[ERROR] 이메일이 비어있습니다.');
      return false;
    }
    if (email.indexOf('@') === -1) {
      console.log('[ERROR] 올바른 이메일 형식이 아닙니다.');
      return false;
    }
    return true;
  };

  getWelcomeTemplate = function ({ name, phone, prefer }) {
    let phone1 = phone.substr(0, 3);
    let phone2 = phone.substr(3, 4);
    let phone3 = phone.substr(7, 4);
    const welcomeTemplate = `
          <html>
              <body>
                  <div style="display: flex; flex-direction: column; align-items: center;">
                      <div style="width: 500px;">
                          <h1>${name}님 가입을 환영합니다.</h1>
                          <hr/>
                          <div>이름: ${name}</div>
                          <div style="color: purple;">전화번호: ${phone1}-${phone2}-${phone3}</div>
                          <div style="color: purple;">좋아하는 사이트: ${prefer}</div>
                          <div style="color: red;">가입일: ${MyDate.getToday()}</div>
                      </div>
                  </div>
              </body>
          </html>
      `;
    return welcomeTemplate;
  };

  // 이메일 템플릿 전송(동기 작업 수행을 위한 비동기 작업 수행 async)
  sendTemplateToEmail = async function ({ email, welcomeTemplate }) {
    // 전송자 생성
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_AUTH_USER,
        pass: process.env.GMAIL_AUTH_PASS,
      },
    });

    // 메일 발송, 발송 잘됐는지 확인하기 위한 동기 작업 await
    const res = await transporter.sendMail({
      from: 'daiwn002@gamil.com',
      to: email,
      subject: '가입을 환영합니다^^',
      html: welcomeTemplate,
    });

    // 발송이 잘 됐는지 확인하기 위한 res 출력
    console.log(res); // 이 res 는 nodemailer api에 대한 응답

    // console.log(email + " 이메일로 가입환영 템플릿 " + welcomeTemplate + "을 전송합니다.");
  };
}
