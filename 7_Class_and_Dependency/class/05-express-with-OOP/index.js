import express from 'express'
import { CashService } from './cash.js'
import { ProductService } from './product.js'

const app = express()

// 상품 구매하기 API
app.post('/products/buy', (req, res) => {

    // 1. 구매자 계좌 잔고 검증 
    // (CashService 클래스로 분리, 10줄 => 2줄)
    const cashService = new CashService();
    const hasMoney = cashService.checkValue();

    // 2. 현재 상품의 판매 여부 검증 
    // (ProductService 클래스로 분리, 10줄 => 2줄)
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 3. 상품 구매하는 코드
    if(hasMoney && !isSoldout) {
        res.send("상품 구매 완료!!")
    }

})

// 상품 환불하기 API
app.post('/products/refund', (req, res) => {

    // 1. 현재 상품의 판매 여부 검증 
    // (ProductService 클래스로 분리, 10줄 => 2줄)
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 2. 상품 환불하는 코드
    if(isSoldout) {
        res.send("상품 환불 완료")
    }
    
})

app.listen(3000)

// => API 함수에 직접 구현한 서비스 코드를 클래스로 분리
// ==> API 함수 길이가 짧아져 동작을 한눈에 알기 쉬움, 재사용성 증가