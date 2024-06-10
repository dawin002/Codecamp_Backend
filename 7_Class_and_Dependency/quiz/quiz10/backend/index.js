import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import mongoose from 'mongoose';
import cors from 'cors';
import { options } from './swagger/config.js';
import { TokenController } from './controllers/token.controller.js';
import { UserController } from './controllers/user.controller.js';
import { EmailService } from './controllers/services/email.service.js';
import { TokenService } from './controllers/services/token.service.js';
import { UserService } from './controllers/services/user.service.js';

const app = express();
app.use(cors());
app.use(express.json()); // JSON 적용시키기 (axios 요청에서 데이터를 읽으려면 필요함)
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const tokenService = new TokenService();
const userService = new UserService();
const emailService = new EmailService();

const userController = new UserController({
  userService,
  tokenService,
  emailService,
});
app.post('/users', userController.signUpUser);
app.get('/users', userController.getUserInfo);

const tokenController = new TokenController({ tokenService });
app.post('/tokens/phone', tokenController.createAndSendPhoneToken);
app.patch('/tokens/phone', tokenController.verifyPhoneToken);

mongoose.set('debug', true);
mongoose
  .connect('mongodb://my-database:27017/mydocker')
  .then(() => console.log('mongoose db 접속 성공'))
  .catch(() => console.log('mongoose db 접속 실패'));

app.listen(3000);
