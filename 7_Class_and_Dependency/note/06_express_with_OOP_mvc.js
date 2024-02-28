// express에 MVC 패턴 적용

// MVC 패턴이란

//      MVC
//          Model, View, Controller 로 구성되는 디자인 패턴

//      Model
//          데이터베이스에 해당되는 부분
//          MongoDB 실습때 다뤘던 model 정의 파일 등이 해당됨

//      View
//          보여지는 부분
//          HTML 코드가 여기에 해당됨
//          * HTML이 백엔드에 왜있음?
//          -> 예전에는 개발자가 html까지 브라우저로 쏴줬기 때문
//             (지금은 프론트/백 분리)

//      Controller
//          API에 관련된 부분
//          index.js에 모든 api 함수를 구현하기 복잡하기 때문에
//          연관된 api 함수의 구현부끼리 묶어 controller 파일로 분리
//          api 함수의 구현부를 새로운 함수로 선언해 사용하는 것

//          controller 분리시 장점
//          - api 함수 하나당 한 줄에 적을 수 있어 api가 많아지더라도
//            index.js 파일을 한 눈에 볼 수 있음

// MVC 패턴 실습

//      1. mvc 폴더 생성
//          1) 실습 폴더에 mvc 폴더 생성
//          2) mvc 폴더 하위에 3개의 폴더 생성
//              models 폴더
//              views 폴더
//              controllers 폴더

//      2. mvc 폴더에 파일 생성
//          1) view 파일 생성
//              views 폴더에 product.html 파일 생성
//              (프론트 영역이므로 사용하지는 않을 것)

//          2) model 파일 생성
//              models 폴더에 product.model.js 파일 생성
//              MongoDB 실습때 다뤘던 model 정의 파일

//          3) controller 파일 생성
//              controllers 폴더에 product.controller.js 파일 생성
//              게시판 api 분리할 board.controller.js 파일 생성

//      3. api 함수의 실행문 controller 클래스로 분리

//          1) product.controller.js 파일 열기

//          2) ProductController 클래스 선언
`               class ProductController {

                }
`
//          3) api 함수의 실행문 코드를 클래스 함수로 선언
`               buyProduct = (req, res) => {
                    const cashService = new CashService();
                    const hasMoney = cashService.checkValue();

                    const productService = new ProductService();
                    const isSoldout = productService.checkSoldout();

                    if(hasMoney && !isSoldout) {
                        res.send("상품 구매 완료!!");
                    }
                }
`//             상품 구매 api의 실행문(화살표 함수)을 클래스의 메서드로 선언

//          4) 서비스 클래스 import 옮기기

//              옮기기 전에 cash.js 와 product.js 파일 위치를 변경해주기
//              보통 controllers 폴더 안에 services 폴더를 생성해 그 안에 넣음
`               controllers/services/cash.service.js
                controllers/services/products.service.js
`//             파일 이름에 service 추가 : cash.service.js

//              CashService, ProductService 클래스의 import문을
//              index.js 파일에서 product.controller.js 파일로 옮기기
`               import { CashService } from './services/cash.service.js'
                import { ProductService } from './services/product.service.js'
`//             파일 위치에 맞게 파일 경로도 수정

//          5) controller 클래스 export 하기
//              product.controller.js 파일의 ProductController 클래스 export 하기
`               export class ProductController { ... }
`
//      4. index.js 파일에서 controller 클래스 사용하기

//          1) controller 클래스 import 하기
//              index.js 파일에서 ProductController 클래스 import 하기
`               import { ProductController } from './mvc/controllers/product.controller.js'
`
//          2) productController 객체 생성
`               const productController = new ProductController()
`
//          3) 상품 구매 api 실행문에 메서드 연결
`               app.post('/products/buy', productController.buyProduct)
`//             실행 부분에 productController.buyProduct 까지만 입력하기!
//              buyProduct 뒤에 () 붙여서 실행시키면 안됨!!!
//              지금은 연결만 시키고 api 요청이 왔을 때 실행되어야하기 때문


// NestJS 의 백엔드 구조

//          현재 구현한 mvc 패턴에서는 api 요청이 
//           index.js -> ProductController -> ProductService 순서로 연결됨

//          - index.js : module
//          - ProductController : controller
//          - ProcudtService : service

//          NestJS의 구조 또한 module, controller, service 로 이루어져있고
//          api를 요청했을 때 
//          - module 의 API 함수가 controller 의 기능 함수를 호출
//          - controller 의 기능 함수가 service 의 비지니스 로직 함수를 호출
//          하는 순서로 module, controller, service가 단계적으로 동작함