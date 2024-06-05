import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import mongoose from 'mongoose';
import cors from 'cors';
import { options } from './swagger/config.js';
import { UserDatabase } from './database/user.database.js';
import { CoffeeDatabase } from './database/coffee.database.js';
import { checkPhoneNumber, createToken, sendTokenToSMS } from './phone.js';
import {
  getWelcomeTemplate,
  sendTemplateToEmail,
  checkEmail,
} from './email.js';

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

app.post('/tokens/phone', function (req, res) {
  console.log(req.body);
  const phoneNumber = req.body.phoneNumber;
  const isValid = checkPhoneNumber(phoneNumber);
  if (!isValid) return;
  const token = createToken();
  sendTokenToSMS(phoneNumber, token);
  console.log(token);
  res.send('인증 완료');
});

app.post('/users', function (req, res) {
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
