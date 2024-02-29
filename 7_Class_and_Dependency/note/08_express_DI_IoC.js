// Express 에 DI, IoC 적용하기

//      DI
//          Dependency Injection
//          의존성 주입

//      IoC
//          Inversion of Controll
//          제어 역전


// DI 개념 설명

//      1. MVC 패턴의 Express 기본 동작 흐름

//          1) index 에서 API 요청을 받음
//          2) index -> Controller 로 API 실행 함수 호출
//          3) Controller -> Service 로 비지니스 로직 함수 호출


//      2. DI 필요한 이유

//          Controller 에서 특정 Service 가 여러번 사용되는 경우
//           Service가 사용될 때마다 Service 객체를 생성해야 함

//          이때 이 Service 를 교체하는 상황에서는 이 Controller 내에 있는
//           모든 Service의 이름을 바꿔줘야 하는데 누락이 발생할 수 있음

//          => Controller 가 Service 에 의존하고 있는 상황
//              Controller 가 의존하는 Service : 의존성

//          따라서 한 Controller 에서 여러번 사용되는 의존성을
//           함수의 매개변수처럼 인자로 받아와 사용하는 것이 안전함

//          => 의존성 주입


//      3. 의존성 주입 장점

//          1) 한번 생성한 객체를 모든 곳에서 재사용 가능 -> 메모리 절약
//          2) 여러번 사용되는 객체 변경시 한번에 변경 가능 -> 유지보수 효율 높아짐
//          3) 여러번 사용되는 객체 변경시 안전하게 변경 가능 -> 안전성 보장

//          ** 싱글톤 패턴 : 한번 생성한 객체를 모든 곳에서 재사용


//      4. 의존성에 따른 '강한 결합', '느슨한 결합'

//          강한 결합 
//              tight-coupling
//              컨트롤러 내에서 서비스 객체 생성하는 경우
//              컨트롤러 클래스가 서비스 클래스를 강하게 의존하고 있음

//          느슨한 결합 
//              loose-coupling
//              밖에서 생성된 서비스 객체를 컨트롤러가 인자로 전달받는 경우
//              컨트롤러 클래스가 서비스 클래스를 약하게 의존하고 있음
//              (인자로 전달받는 의존성의 경우 언제든 바꿔치기할 수 있기 때문)

//          강한 결합을 느슨한 결합으로 개선할 필요가 있음
//          의존성 주입을 통해 개선 가능


//      5. IoC

//          제어의 역전 (Inversion of Controll)

//          NestJS 에서는 의존성 주입를 우리가 직접 관리하지 않고 설정 파일을 
//           변경함에 따라 알아서 의존성 주입 코드를 관리해줌

//          이 역할을 해주는 NestJS의 기능 : IoC 컨테이너

//          우리가 통제해야 할 것이 NestJS 로 넘어갔기 때문에 '제어의 역전'


//      6. 싱글톤 패턴

//          의존성 주입을 통해 한번 생성한 객체를 모든 곳에서 재사용하는 싱글톤 패턴 가능

//          '의존성 주입'이면, '싱글톤 패턴'인 것인가?? ==> 그건 아님
//          => 동일 클래스로 2개의 객체를 만들어 각기 다른 클래스에 의존성 주입 가능
//          ==> 하나의 클래스에서 하나의 객체만 생성한 것이 아니기 때문에 싱글톤 아님


// 의존성 주입 실습

//          CashService 객체를 ProductController 에서 생성하지 않고
//           index.js 에서 생성해 ProductController의 생성자에 주입하는 방법

//      1. CashService 생성 위치 이동

//          ProductController 에서 index.js로 코드 이동

//          1) CashService 객체 생성
`               const cashService = new CashService();
`
//          2) CashService 가져오기
`               import { CashService } from './mvc/controllers/services/cash.service.js''
`
//      2. ProductController 에서 의존성 주입 받기

//          1) CashService 객체(의존성) 담을 필드 선언
`               cashService;
`
//          2) 생성자 함수 선언
`               constructor(cashService) {
                    this.cashService = cashService;
                }
`//             생성자를 통해 의존성을 주입받는 것

//          3) CashService 객체 사용 코드 수정
`               const hasMoney = this.cashService.checkValue();
`//             CashService 객체 생성하는 코드 삭제
//              cashService -> this.myCashService 로 변경

//      3. 의존성 주입 테스트

//          1) CouponController 에 CashService 주입
//          2) 서버 실행 후 Postman으로 쿠폰 구매 API 요청
//          3) '돈이 있는지 검사합니다.' 로그가 콘솔에 출력되는지 확인

//          4) CouponController 에 의존성 PointService 로 변경
//          5) 서버 실행 후 Postman으로 쿠폰 구매 API 요청
//          6) '포인트가 있는지 검사합니다.' 로 로그가 변경되어 출력되는지 확인