export class CouponController {

    cashService;

    constructor(cashService) {
        this.cashService = cashService;
    }

    // 쿠폰 구매 기능
    buyCoupon = (req, res) => {
        // 1. 구매자 계좌 잔고 검증
        // const cashService = new CashService();
        const hasMoney = this.cashService.checkValue();
    
        // 2. 상품 구매하는 코드
        if(hasMoney) {
            res.send("상품 구매 완료!!")
        }
    }
}
