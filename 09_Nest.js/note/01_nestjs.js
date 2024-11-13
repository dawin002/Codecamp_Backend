// NestJS

//      왜 NestJS 인가?

//          Node.js로 백엔드를 만드는 것은 너무 제약이 없고, 너무 자유로워서
//           프로젝트로 협업을 진행할 경우 개발자간 소통 비용이 증가,
//           생산성 저하와 유지 보수의 어려움이 발생할 수 있음

//          이를 방지하기 위해 프로젝트 폴더 구조나 코딩 스타일을 통일시킬 수
//           있는 프레임워크가 필요하여 만들어짐


//      NestJS 개념

//          TypeScript 를 지원하는 효율적이고 확장 가능한 Node.js 서버 애플리케이션 프레임워크
//          OOP, FP(Functional Programming), FRP(Functional Reactive Programming) 요소를 결합

//          큰 규모의 백엔드 프레임워크
//          * DI 프레임워크 : 의존성 주입을 지원하는 프레임워크
//          express 프레임워크가 포함됨 (자동 설치)

//          Java       ->  스프링 (DI 프레임워크)
//          Python     ->  장고 + DI 라이브러리
//          JavaScript ->  express + DI 라이브러리 

//          였는데

//          JavaScript ->  NestJS (DI 프레임워크)
//                          등장하며 스프링의 많은 기능 가져옴

//          NestJS 만 설치하면 필요한 툴들 거의 다 자동으로 설치됨


//      NestJS 특징

//          Architecture
//              Architecture 구조를 제공함으로써 Node.js의 주요 문제를 해결
//              여러 개발자들이 Architecture를 통일 
//              -> 소통 비용 절감, 확장성 있고 효율적인 개발 가능

//          효율성
//              즉시 사용 가능한 애플리케이션 아키텍처 제공
//              -> 고도로 테스트가 가능하고, 확장 가능하고, 느슨하게 결합되고 
//                 유지관리 쉬운 애플리케이션 개발 가능
//              Dependency Injection, Inversion of Control, 모듈을 통한 구조화 
//               등을 제공해 생산성에 용이

//          안정성
//              TypeScript 도입을 통해 서버 개발 시 발생 가능한 오류들을 사전에 방지
//              세부적인 모듈로 나누어져 있어 독립적인 유닛 테스트 쉽게 작성 가능

//          확장성
//              모듈 Class 지원, 각 모듈의 기능 캡슐화 및 서로 Import 가능한 모듈 구조
//               -> 조직적(Organize) 아키텍쳐 구성, 느슨한 결합(Loose Coupling) 가능
//                -> 확장성(Extensible)과 테스트 가능성(Testable) 높임


// NestJS 설치

//      1. NestJS 설치 방식 1 : @nestjs/cli 그냥 설치하기 (실습X)

//          @nestjs/cli 는 NestJS를 설치하고 난 후에 쓸모가 없음
//          따라서 실습은 하지 않지만 그래도 그냥 설치하는 방법 알아보기

//          1) 프로젝트 생성할 (부모)폴더 통합 터미널에서 열기
//          2) @nestjs/cli 설치
//              yarn add @nestjs/cli
//          3) NestJS 프로젝트 생성
//              @nestjs/cli new 프로젝트이름

//      2. NestJS 설치 방식 2 : @nestjs/cli 설치하고 지우기

//          @nestjs/cli 는 프로젝트 생성시 한번만 사용되기 때문에
//           명령(프로젝트 생성)을 수행한 후 자동으로 삭제되는 방법 사용 

//          1) 프로젝트 생성할 (부모)폴더 통합 터미널에서 열기

//          2) @nestjs/cli 설치, 명령 수행, 삭제
`               npx @nestjs/cli new project1
`//             - npx : 다운받고 지우는 명령어
//              - new project1 : 다운받고 실행할 명령
//              @nestjs/cli 는 new project1 명령을 수행한 뒤 바로 삭제됨

//          3) 패키지 매니저 선택
//              proceed 에 한번 y 로 동의하고 나면 패키지 매니저 목록 출력
//              npm, yarn, pnpm 중 설치할 사용할 패키지 매니저 선택
`               yarn 선택해 진행
`
//          4) 프로젝트 폴더가 생성되는 것을 확인


// NestJS 뜯어보기

//      보일러 플레이트 (초기 폴더 구조)

//          처음 프로젝트를 생성했을 때 기본적으로 만들어져 있는 폴더 구조

//          node_modules   : 모듈이 설치된 폴더
//          src             : 소스 코드 (API, TypeScript 파일)
//                            * 여기에 controller, module, services 파일 저장
//          test            : 테스트 코드 (TDD)
//          .eslintrc.js    : 코딩문법규칙('==' 금지 등) 정하기 (협업용)
//                            * eslintrc 는 '린터'의 한 종류(문법규칙 정하는 애들)
//          .gitignore      : git 제외 파일
//          .prettierrc     : 코딩정리규칙(줄바꿈, 들여쓰기 등) 정하기
//                            * prettierrc 는 '포멧터'의 한 종류(정리규칙 정하는 애들)
//          nest-cli.json   : Nest 설정 파일
//          package.json    : 기본 메뉴얼 (라이브러리 설치 히스토리)
//          README.md       : 상세 설명서
//          tsconfig.build.json : TypeScript 설정파일-1
//          tsconfig.json   : TypeScript 설정파일-2
//          yarn.lock       : 버전 잠금 파일 (라이브러리 버전 기록)


//      package.json

//              package.json 파일에 있는 것들 살펴보기

//          1. "dependencies" 와 "devDependencies"

//              라이브러리 설치 히스토리는 "dependencies" 와 "devDependencies" 로 나뉨

//              dependencies
//                  : 실행할 때 필요한 라이브러리

//              devDependencies
//                  : 개발할 때 (VSCode에서) 필요한 라이브러리
//                    typescript 또한 프로그램이 실행될 때 사용되지 않으므로
//                     devDependencies 에 포함됨

//              dependencies" 와 "devDependencies" 로 나뉘는 이유
//                  둘 다 똑같이 node_modules 에 설치되기는 함
//                  다만 devDependencies 의 라이브러리는 배포할 때 배포할 프로그램에 
//                   포함되지 않아 설치 시간으 단축할 수 있음

//              자동으로 설치된 라이브러리는 기본적으로 유명한 것들

//                  jset : 테스트코드 관련 가장 유명한 라이브러리
//                  eslint : 린터 중 가장 유명한 라이브러리
//                  prettier : 포멧터 중 가장 유명한 라이브러리
//                  typescript
//                  @types/express

//              => express를 사용한다면 이런 라이브러리를 따로 설치해야 하는데
//                  NestJS는 NestJS를 설치할 때 자동으로 같이 설치해줌

//              근데 라이브러리 버전은 yarn.lock에 기록되는거 아니었나?
//                  -> package.json : 라이브러리 버전
//                  -> yarn.lock : 라이브러리 구현에 사용한 라이브러리들의 버전

//          2. "scripts"

//              명령어를 쉽게 실행할 수 있도록 단축 명령어를 만들어 둔 것

//              "build": "nest build"
//                  : 배포하기 전 최적화하는 과정, 최적된 dist 폴더가 만들어짐

//              "prebuild": "rimraf dist"
//                  : build하기 전에 기존의 dist 폴더를 지우는 작업 수행
//                    build 명령어 실행시 build에 앞서 자동 실행
//                    (Windows 에는 없음, rimraf 명령어가 없어서인듯?
//                     다만, build시 자동으로 dist 폴더 삭제하는 듯)

//              "start": "nest start"
//                  : 서버를 실행

//              "start:dev": "nest start --watch"
//                  : --watch 옵션으로 소스코드의 변화를 감지해 서버를 자동 재실행
//                    이 명령어 실행시에도 dist 폴더 만들어지지만 최적화되지 않은 폴더임

//              "start:debug": "nest start --debug --watch"
//                  : 디버그 사용해 서버 실행, 브라우저와 연결해 버그를 자세히 확인 가능

//              "start:prod": "node dist/main"
//                  : prod == production 의 약자, 최종 배포할 때 서버를 실행하는 명령어

//              * dist 폴더
//                  도대체 build 할때도, start:dev 할때도 만들어지는 dist 폴더가 뭔데?
//                  -> 내부를 보면 .ts 소스 파일들과 같은 이름의 .js 파일들이 있음
//                  => TypeScript 파일을 JavaScript 파일로 변환해주는 폴더
//                  실제로 프로그램 실행시에는 JS 파일이 실행됨

//          3. "jest"

//              테스트 관련된 부분
//              백엔드의 테스트는 명령어를 이용해 파일을 실행해서 수행


// NestJS .git 파일 관리

//      .git (숨김 폴더)

//          NestJS 가 설치되며 GIT 도 자동으로 설치됨
//          .gitignore 파일 보면 알 수 있음

//          단, 지금 공부한 것을 깃허브에 업로드할 때는 이 .git 폴더와 내 공부
//           폴더(Codecamp_Backend)의 .git 폴더에서 충돌이 일어남

//          => NestJS 프로젝트 내의 .git 폴더는 삭제하는 것이 좋음

//      NestJS 프로젝트 내의 .git 폴더 삭제하기

//          삭제하지 않으면 내 공부 리포지토리의 .git 폴더와 충돌 일어남

//      * Mac 명령어
//          1) NestJS 프로젝트 폴더 통합 터미널에서 열기
//          2) .git 숨김폴더 확인
`               ls -al
`//             (모든 파일 조회 명령어, 숨김파일 포함)
//          3) .git 폴더 지우기
`               rm -rf .git
`//             (강제 삭제 명령어)
//          4) .git 폴더 삭제 확인
`               ls -al
`//             목록에 .git 없는지 확인

//      * Windows 명령어
//          1) NestJS 프로젝트 폴더 통합 터미널에서 열기
//          2) .git 숨김폴더 확인
`               ls -h
`//             (숨김 파일만 조회 명령어)
//          3) .git 폴더 지우기
`               rm .git -r -force
`//             - rm     : 삭제
//              * rmdir  : 폴더 삭제, 이 명령어 사용해도 됨
//              - -r     : recurse 재귀 삭제 옵션
//              - -force : 접근 권한 제한 파일 강제 삭제 옵션
//                         -f 약자로 쓰이기도 하지만 안스 에러로 안됨
//         4) .git 폴더 삭제 확인
`               ls -h
`//             목록에 .git 없는지 확인