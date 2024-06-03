import express from 'express';

const app = express();

const userData = [
  {
    email: 'aaa@gmail.com',
    name: '짱구',
    phone: '010-1234-1111',
    personal: '220110-1111111',
    prefer: 'https://naver.com/a',
  },
  {
    email: 'bbb@gmail.com',
    name: '철수',
    phone: '010-1234-2222',
    personal: '220110-2222222',
    prefer: 'https://naver.com/b',
  },
  {
    email: 'ccc@gmail.com',
    name: '유리',
    phone: '010-1234-56333378',
    personal: '220110-3333333',
    prefer: 'https://naver.com/c',
  },
  {
    email: 'ddd@gmail.com',
    name: '맹구',
    phone: '010-1234-4444',
    personal: '220110-4444444',
    prefer: 'https://naver.com/d',
  },
  {
    email: 'eee@gmail.com',
    name: '훈이',
    phone: '010-1234-5555',
    personal: '220110-5555555',
    prefer: 'https://naver.com/e',
  },
];

app.get('/users', (req, res) => {
  console.log(userData);
  res.send(userData);
  console.log('유저 데이터 반환 완료!');
});

app.listen(3000);
