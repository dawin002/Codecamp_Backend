import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { UserDatabase } from './database/user.database.js';
import { CoffeeDatabase } from './database/coffee.database.js';

import { options } from './swagger/config.js';

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.listen(3000);
