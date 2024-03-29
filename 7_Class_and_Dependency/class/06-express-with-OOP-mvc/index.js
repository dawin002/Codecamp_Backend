import express from 'express'
import { ProductController } from './mvc/controllers/product.controller.js'

const app = express()

// 상품 API
const productController = new ProductController()
app.post('/products/buy', productController.buyProduct) // 상품 구매하기 API
app.post('/products/refund', productController.refundPorduct) // 상품 환불하기 API

// 게시판 API
// app.get("/boards/...")

app.listen(3000)

// => api 함수의 실행문에 해당하는 부분을 controller 클래스로 분리
// ==> api 함수가 많아져도 한 눈에 구분 가능