// Mocking 사용해 Test 하기

//      Mock

//          가짜
//          함수 또는 DB 등 여러가지를 Mocking 할 수 있음

//          데이터베이스에서 많이 사용됨
//          실제 DB에 테스트용 데이터를 저장하면 안되기 때문에
//           가짜 DB를 클래스 형태로 만들어 놓고 Mocking 해서 사용함

//  Mocking 실습

//      강의자료에 없는 내용만 필기

//      가짜 AppService 만들기

//          MockAppService 를 만들 때 주의할 점

`               class MockAppService {
                  getHello(): string {
                    return '나는 가짜다!!!';
                  }
                }
`
//              가짜 AppService 클래스인 MockAppService 를 만들어 의존성을 주입할 때는
//              MockAppService 를 주입해도 동일한 서비스 함수를 실행할 수 있어야 하기 때문에
//              AppService 의 함수들과 동일한 이름, 매개변수, 리턴타입을 가진 함수를
//              MockAppService 에 선언해야 함


//          모듈의 providers: [] 안에 들어가는 객체

`               const app: TestingModule = await Test.createTestingModule({
                  controllers: [AppController],
                  providers: [
                    {
                      provide: AppService, //   // AppService 가 들어갈 자리에
                      useClass: MockAppService, // MockAppService 를 넣어줌
                    },
                  ],
                }).compile();
`
//              사실 providers 안에는 provide 와 useClass 필드를 가진 객체가 들어감
//              지금까지는 provide와 useClass 값이 똑같아서 생략한 것

//              provide: AppService,
//              : AppService 라는 의존성이 들어갈 자리에

//              useClass: MockAppService
//              : MockAppService 라는 의존성을 넣어줌

//              => AppController 의 AppService 의존성을 주입하는 자리에 MockAppService 의존성이 주입됨