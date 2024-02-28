import { CashService } from './services/cash.service.js'
import { ProductService } from './services/product.service.js'

export class ProductController {
    // 상품 구매 함수
    buyProduct = (req, res) => {

        // 1. 구매자 계좌 잔고 검증 
        const cashService = new CashService();
        const hasMoney = cashService.checkValue();
    
        // 2. 현재 상품의 판매 여부 검증 
        const productService = new ProductService();
        const isSoldout = productService.checkSoldout();
    
        // 3. 상품 구매하는 코드
        if(hasMoney && !isSoldout) {
            res.send("상품 구매 완료!!")
        }
    }

    // 상품 환불 함수
    refundPorduct = (req, res) => {

        // 1. 현재 상품의 판매 여부 검증 
        const productService = new ProductService();
        const isSoldout = productService.checkSoldout();
    
        // 2. 상품 환불하는 코드
        if(isSoldout) {
            res.send("상품 환불 완료")
        }
        
    }
}