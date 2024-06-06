import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import mongoose from 'mongoose';
import cors from 'cors';
import { options } from './swagger/config.js';
import { UserDatabase } from './database/user.database.js';
import { CoffeeDatabase } from './database/coffee.database.js';
import {
  checkPhoneNumber,
  createToken,
  saveToken,
  sendTokenToSMS,
} from './phone.js';
import {
  getWelcomeTemplate,
  sendTemplateToEmail,
  checkEmail,
} from './email.js';
import { Token } from './models/token.model.js';

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json()); // JSON 적용시키기 (axios 요청에서 데이터를 읽으려면 필요함)

const userDB = new UserDatabase();
const coffeeDB = new CoffeeDatabase();

app.get('/users', (req, res) => {
  const userData = userDB.getUsers();
  console.log('유저 데이터 출력');
  console.log(userData);
  res.send(userData);
  console.log('유저 데이터 응답 완료!');
});

app.get('/starbucks', (req, res) => {
  const coffeeData = coffeeDB.getCoffees();
  console.log('커피 데이터 출력');
  console.log(coffeeData);
  res.send(coffeeData);
  console.log('커피 데이터 응답 완료!');
});

app.post('/tokens/phone', async (req, res) => {
  const phone = req.body.phone;
  const isValid = checkPhoneNumber({ phone });
  if (!isValid) return;
  const token = createToken();
  saveToken({ phone, token });
  // sendTokenToSMS({ phone, token });
  console.log(token);
  let phone1 = phone.substr(0, 3);
  let phone2 = phone.substr(3, 4);
  let phone3 = phone.substr(7, 4);
  res.send(`${phone1}-${phone2}-${phone3}으로 인증 문자가 전송되었습니다.`);
});

app.patch('/tokens/phone', async (req, res) => {
  const { token, phone } = req.body;
  const savedToken = await Token.findOne({ phone: phone });
  if (!savedToken) {
    console.log('휴대폰 번호가 일치하지 않음');
    res.send(false);
    return;
  }
  if (token !== savedToken.token) {
    console.log(
      `인증번호 불일치, 인증번호: ${savedToken.token}, 입력한 번호: ${token}`,
    );
    res.send(false);
    return;
  }
  savedToken.isAuth = true;
  await savedToken.save();
  console.log('인증번호 일치, 인증 완료됨');
  res.send(true);
});

app.post('/users', (req, res) => {
  const { name, personal, phoneNumber, prefer, email, password } = req.body;

  const isValid = checkEmail({ email });

  if (!isValid) return;

  const welcomeTemplate = getWelcomeTemplate({
    name,
    phoneNumber,
    prefer,
  });

  sendTemplateToEmail({ email, welcomeTemplate });

  res.send('가입이 완료되었습니다.');
});

mongoose
  .connect('mongodb://my-database:27017/mydocker')
  .then(() => console.log('mongoose db 접속 성공'))
  .catch(() => console.log('mongoose db 접속 실패'));

app.listen(3000);
