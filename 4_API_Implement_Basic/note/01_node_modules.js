// nodejs 모듈

// nodejs 모듈 설치 전 수행 작업

//      1. package.json 파일 생성
//          package.json : 패키지의 기능을 관리하는 파일
//          1) 프로젝트 폴더 통합 터미널에서 열기
//          2) yarn init 명령어 실행
//          3) 엔터엔터엔터엔터엔터

//      2. import 명령어 인식시키기
//          1) package.json 파일 열기
//          2) 중괄호 안에 "type": "module" 코드 추가

// nodejs 모듈 설치

//      1. 모듈 설치
//          1) 터미널에서 yarn add (모듈 이름) 명령어 실행
//             npm install (모듈 이름) 써도 되지만 드려서 yarn 사용
//             npm으로 설치할 수 있는 파일은 yarn으로 설치 가능

//      2. 모듈 설치 확인
//          1) package.json 파일 dependencies 확인
//             모듈 이름과 버전이 추가되었는지 확인

//             * dependencies
//                  설치했던 목록(히스토리 파일)
//                  지금 설치가 안되어있을 수도 있음
//                  버전 때문에 기록하는 것

// 설치한 모듈 구성

//      1. node_modules
//          설치한 모듈의 코드가 저장되는 디렉토리
//          설치한 모듈을 구성하는 다른 모듈들의 모드도 포함됨
//          node_modules에 있는 파일 지우면 설치한 모듈 제거됨

//          다시 설치하는 법: 
//              1) package.json 있는 폴더에서 터미널 열기
//              2) yarn install 명령어 실행
//              3) dependencies에 기록된 버전으로 재설치됨

//      2. yarn.lock
//          모듈 버전을 관리하는 파일
//          설치한 모듈을 구성하는 여러 모듈의 버전도 포함됨


// Github 업로드시 주의할 점

//      node_modules 제외하고 업로드 해야함
//          1) node_modules 용량이 너무 큼
//          2) yarn install 명령어로 언제든 다운 받을 수 있음

//      git ignore 사용
//          : node_modules 제외하고 업로드 하는 방법
//            깃허브에 업로드할 때 무시할 파일들

//          1) 작업공간 가장 외부에 .gitignore 파일 생성
//          2) 무시할 폴더(node_modules) 이름 파일에 입력
//          3) 파일 저장

//      대신 다음 두 파일은 반드시 github에 업로드되어야 함
//          package.json
//          yarn.lock