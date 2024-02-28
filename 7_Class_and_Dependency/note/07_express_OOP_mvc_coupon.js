// Express 에서 MVC 패턴을 활용해 쿠폰 API 추가하기

//      MVC 패턴으로 구현했을 때
//       새로운 API를 추가하는 것이 얼마나 간편해졌는지 실습해보기

// 쿠폰 API 구현하기

//      1. module (index.js)에 쿠폰 API 함수 구현

//          1) 쿠폰 controller 객체 생성
`               const couponController = new CouponController()
`//             (아직 CouponController 클래스 선언 안했음. 일단 코딩)

//          2) 쿠폰 구매 API 함수 생성
`               app.post('/coupons/buy', couponController.buyCoupon)
`//             (아직 buyCoupon 함수 선언 안했음. 일단 코딩)

//          3) 쿠폰 controller 클래스 가져오기
`               import { CouponController } from './mvc/controllers/coupon.controller.js'
`//             (아직 coupon.controller.js 파일 생성 안했음. 일단 코딩)

//      2. CouponController 클래스에 buyCoupon 기능 구현

//          1) controllers 폴더에 coupon.controller.js 파일 생성

//          2) CouponController 클래스 선언
`               export class CouponController {

                }
`//             module 에서 import 할 것이므로 클래스 export

//          3) buyCoupon 함수 선언
`               buyCoupon = (req, res) => {
        
                }
`
//          4) buyCoupon 함수 구현
`               buyCoupon = (req, res) => {

                    const cashService = new CashService();
                    const hasMoney = cashService.checkValue();

                    if(hasMoney) {
                        res.send("상품권 구매 완료!!")
                    }
                }
`//             구매자 잔고만 충분하면 상품권 구매할 수 있게 구현

//          5) CashService 클래스 import
`               import { CashService } from './services/cash.service.js'
`//             이미 구현해둔 CashService 클래스 가져오기


// => 중복된 코드를 service 클래스로 분리 -> 코드의 재사용성이 높아져서 구현이 빨라짐
// => 연관된 코드끼리 controller 클래스로 분리 -> module 코드(index.js)의 가독성이 높아짐