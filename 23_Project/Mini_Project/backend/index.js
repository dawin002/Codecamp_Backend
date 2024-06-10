import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import mongoose from 'mongoose';
import cors from 'cors';
import { options } from './swagger/config.js';
import {
  createUser, //
  getUsers,
  saveUser,
} from './services/user.service.js';
import {
  authorizeToken,
  createToken,
  getTokenByPhone,
  sendTokenToSMS,
  saveNewToken,
  updateToken,
  validatePhoneNumber,
  verifyPhoneTokenExists,
  verifyTokenAuthentication,
  verifyTokenMatch,
} from './services/phone.service.js';
import {
  getWelcomeTemplate,
  sendTemplateToEmail,
} from './services/email.service.js';
import { getOpenGraph } from './services/scraping.service.js';

const app = express();
app.use(cors());
app.use(express.json()); // JSON 적용시키기 (axios 요청에서 데이터를 읽으려면 필요함)
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post('/users', async (req, res) => {
  const { name, email, personal, prefer, password, phone } = req.body;
  try {
    const savedToken = await getTokenByPhone({ phone });
    verifyTokenAuthentication({ savedToken });
    const og = await getOpenGraph({ prefer });
    const newUser = createUser({ ...req.body, og });
    await saveUser({ newUser });
    const welcomeTemplate = getWelcomeTemplate({
      name,
      phone,
      prefer,
    });
    // await sendTemplateToEmail({ email, welcomeTemplate });
    res.send(newUser._id);
  } catch (error) {
    console.error(error.message);
    res.status(422).send(error.message);
  }
});

app.get('/users', async (req, res) => {
  const users = await getUsers();
  console.log(users);
  res.send(users);
});

app.post('/tokens/phone', async (req, res) => {
  const { phone } = req.body;

  try {
    validatePhoneNumber({ phone });

    const savedToken = await getTokenByPhone({ phone });
    const tokenNumber = createToken();

    if (savedToken) {
      await updateToken({ savedToken, tokenNumber });
    } else {
      await saveNewToken({ phone, tokenNumber });
    }

    // const message = await sendTokenToSMS({ phone, token });
    // res.send(message);
    res.send('인증 번호를 전송했습니다.');
  } catch (error) {
    console.error(error.message);
    res.status(422).send(error.message);
  }
});

app.patch('/tokens/phone', async (req, res) => {
  const { phone, tokenNumber } = req.body;

  try {
    const savedToken = await getTokenByPhone({ phone });
    verifyPhoneTokenExists({ savedToken });
    verifyTokenMatch({ savedToken, tokenNumber });
    await authorizeToken({ savedToken });
    res.send(true);
  } catch (error) {
    console.error(error.message);
    res.send(false);
  }
});

mongoose.set('debug', true);
mongoose
  .connect('mongodb://my-database:27017/mydocker')
  .then(() => console.log('mongoose db 접속 성공'))
  .catch(() => console.log('mongoose db 접속 실패'));

app.listen(3000);
