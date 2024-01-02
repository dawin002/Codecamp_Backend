// express 사용해 api 만들기

// express 적용
// const express = require('express') // 예전 방식 : common js
import express from 'express'         // 최신 방식 : module

const app = express()

// api 만들기
app.get('/qqq', function (req, res) {
    res.send('Hello World! My name is Darwin Jung.')
})

app.listen(3000)

// Postman 에서 http://localhost:(포트번호)(endpoint 주소) 로 API 호출