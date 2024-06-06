import 'dotenv/config';
import coolsms from 'coolsms-node-sdk';
import { Token } from './models/token.model.js';

const mysms = coolsms.default;

export const checkPhoneNumber = function ({ phone }) {
  if (phone.length < 10 || phone.length > 11) {
    console.log('ERROR: 휴대폰 번호를 정확히 입력하세요.');
    return false;
  }
  return true;
};

export const createToken = function () {
  const token = String(Math.floor(Math.random() * 1_000_000)).padStart(6, '0');
  return token;
};

export const saveToken = async ({ phone, token }) => {
  const savedToken = await Token.findOne({ phone: phone });
  console.log(savedToken);
  if (savedToken) {
    savedToken.token = token;
    await savedToken.save();
    console.log('토큰이 다시 저장되었습니다.');
  } else {
    const newToken = new Token({
      token,
      phone,
      isAuth: false,
    });
    await newToken.save();
    console.log('토큰이 저장되었습니다.');
  }
};

export const sendTokenToSMS = async function ({ phone, token }) {
  const API_KEY = process.env.SMS_API_KEY;
  const API_SECRET = process.env.SMS_API_PW;
  const SMS_SENDER = process.env.SMS_SENDER;

  const messageService = new mysms(API_KEY, API_SECRET);

  const res = await messageService.sendOne({
    to: phone,
    from: SMS_SENDER,
    text: `안녕하세요!! 인증번호는 ${token}입니다!!`,
  });

  // 결과 출력해보기
  console.log(res);
  // {
  //     groupId: 'G4V20240109191902QJGTF6XQOLQWTW1',
  //     to: '01055168448',
  //     from: '01055168448',
  //     type: 'SMS',
  //     statusMessage: '정상 접수(이통사로 접수 예정) ',
  //     country: '82',
  //     messageId: 'M4V20240109191902RSH4MYBSB0Y7B1U',
  //     statusCode: '2000',
  //     accountId: '24010935101680'
  // }
};
