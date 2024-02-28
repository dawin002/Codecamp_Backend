// Express 에 Class 적용하기

//          Express 로 API 구현한 코드에서 공통적인 코드를
//          class로 빼서 재사용하기 실습

// 서비스 만들기 실습

//          서비스 : API에서 사용되는 핵심 로직 

//          공통되는 서비스 코드를 하나의 파일로 빼기

//      1. product.js 파일로 상품 관련 로직 분리
//          1) product.js 파일 생성

//          2) ProductService 클래스 생성
                `export class ProductService {

                }
`//             index.js에서 클래스를 사용할 것이므로 export 붙이기

//          3) 클래스에 판매 완료 여부 확인 함수 선언
//              공통으로 사용되는 판매 완료 여부 확인 코드 분리
`               checkSoldout = () => {
                    // 현재 상품의 판매 여부 검증 코드 (대략 10줄)
                    // ...
                    // ...
                }
`
//      2. cash.js 파일로 잔고 관련 로직 분리
//          1) cash.js 파일 생성
//          2) CashService 클래스 생성
//          3) 현재 잔고 확인 함수 선언
//          세부 내용은 Product 관련 로직 분리와 동일

//      3. index.js 파일에서 클래스 사용
//          1) 사용할 클래스 가져오기
`               import { CashService } from './cash.js'
                import { ProductService } from './product.js'
`
//          2) 잔고 관련 로직 사용
`               const cashService = new CashService();
                const hasMoney = cashService.checkValue();
`
//          3) 상품 관련 로직 사용
`               const productService = new ProductService();
                const isSoldout = productService.checkSoldout();
`