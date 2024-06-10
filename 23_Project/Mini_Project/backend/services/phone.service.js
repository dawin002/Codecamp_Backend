import 'dotenv/config';
import coolsms from 'coolsms-node-sdk';
import { Token } from '../models/token.model.js';

const mysms = coolsms.default;

export const createToken = () => {
  const token = String(Math.floor(Math.random() * 1_000_000)).padStart(6, '0');
  return token;
};

export const getTokenByPhone = async ({ phone }) => {
  return await Token.findOne({ phone: phone });
};

export const updateToken = async ({ savedToken, tokenNumber }) => {
  savedToken.token = tokenNumber;
  await savedToken.save();
  console.log(`토큰이 업데이트되었습니다.`);
};

export const saveNewToken = async ({ phone, tokenNumber }) => {
  const newToken = new Token({
    token: tokenNumber,
    phone,
    isAuth: false,
  });
  await newToken.save();
  console.log(`새 토큰이 저장되었습니다.`);
};

export const validatePhoneNumber = ({ phone }) => {
  if (phone.length < 11 || phone.length > 11) {
    throw new Error('에러!! 휴대폰 번호를 정확히 입력하세요.');
  }
};

export const verifyPhoneTokenExists = ({ savedToken }) => {
  if (!savedToken) {
    throw new Error('일치하는 휴대폰 번호가 없습니다.');
  }
};

export const verifyTokenMatch = ({ savedToken, tokenNumber }) => {
  if (savedToken.token !== tokenNumber) {
    throw new Error('토큰 번호가 일치하지 않습니다.');
  }
};

export const verifyTokenAuthentication = ({ savedToken }) => {
  if (!savedToken.isAuth) {
    throw new Error('에러!! 핸드폰 번호가 인증되지 않았습니다.');
  }
};

export const authorizeToken = async ({ savedToken }) => {
  if (!savedToken.isAuth) {
    savedToken.isAuth = true;
    await savedToken.save();
  }
};

export const sendTokenToSMS = async ({ phone, token }) => {
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
  // console.log(res);
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
  return '핸드폰으로 인증 문자가 전송되었습니다!';
};
