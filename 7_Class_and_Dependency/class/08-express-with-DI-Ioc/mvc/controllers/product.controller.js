export class ProductController {
    cashService; // 의존성 담을 필드
    productService;

    // 생성자 이용해 의존성 주입받기
    constructor(cashService, productService) {
        this.cashService = cashService;
        this.productService = productService;
    }

    // 상품 구매 함수
    buyProduct = (req, res) => {
        // 1. 구매자 계좌 잔고 검증
        // const cashService = new CashService();
        const hasMoney = this.cashService.checkValue();

        // 2. 현재 상품의 판매 여부 검증
        // const productService = new ProductService();
        const isSoldOut = this.productService.checkSoldOut();

        // 3. 상품 구매하는 코드
        if (hasMoney && !isSoldOut) {
            res.send("상품 구매 완료!!");
        }
    };

    // 상품 환불 함수
    refundProduct = (req, res) => {
        // 1. 현재 상품의 판매 여부 검증
        // const productService = new ProductService();
        const isSoldOut = this.productService.checkSoldOut();

        // 2. 상품 환불하는 코드
        if (isSoldOut) {
            res.send("상품 환불 완료");
        }
    };
}
