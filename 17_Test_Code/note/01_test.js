// 테스트

//      vscode 에서 바로 실습 진행

//      강의자료에 없는 내용만 필기

//      yarn test 종류

//          package.json 의 "scripts"에서 확인 가능

//          "test": "jest"
//              jest 실행해 테스트

//          "test:watch": "jest --watch"
//              테스트가 끝나도 테스트가 계속 켜져있음
//              테스트 코드를 수정하면 자동으로 리프레시되어 다시 테스트

//          "test:cov": "jest --coverage"
//              coverage 테스트
//              작성한 테스트코드가 기능을 얼만큼 테스트하는지 확인하며 테스트

//          "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
//              디버그 하며 테스트

//          "test:e2e": "jest --config ./test/jest-e2e.json"
//              끝에서 끝까지 시나리오대로 테스트

//  실습 필기

//      AppController 테스트

//          aaa2.spec.ts 파일의 AppController 테스트에서 
//           AppService 와 AppController 의 의존성을 주입할 때
//           왜 app.module.ts 에서 하는 것 처럼 의존성 주입 안하고
//           고전적인 방식으로 new 써서 직접 주입하지?

//              yarn start:dev 를 했을 때는 nest 프레임워크가 작동해
//               AppModule 의 코드를 읽고 dist 폴더를 만들어 의존성을 주입해주지만,

//              yarn test 를 했을 때는 nest 와 관련이 없어서
//               파일 이름에 spec 이라고 적힌 테스트 코드만 읽어서 실행하는 것

//              => nest 의 기능을 사용하지 않기 때문에 고전적인 방식으로 의존성을 주입하는 것