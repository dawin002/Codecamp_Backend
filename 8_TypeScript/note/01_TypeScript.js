// TypeScript

//      TypeScript란?

//          JavaScript의 타입을 강제시키는 언어

//          JavaScript는 변수를 선언할 때 타입을 지정하지 않음
//          그래서 원래 저장했던 데이터와 타입이 다른 데이터가 저장될 수 있음

//          => 오류가 발생해도 감지를 못할 가능성 있음

//          TypeScript로 코드를 작성해 실행하면 JavaScript로 변경되어 실행됨
//          코드의 작성에서만 에러 감지를 도와주는 것일 뿐 실질적인 실행은 JS


//      TypeScript 특징

//          파일 확장자
//              aaa.ts 처럼 .ts 확장자 사용

//          변수 선언
`               let aaa: string = '안녕'
`//             변수를 선언할 때 변수명 오른쪽에 ': string' 처럼 타입 지정

//          타입 에러 발생
`               aaa = 123
`//             변수 선언시 지정한 타입이 아닌 데이터를 저장하면 에러 발생


//      TypeScript 타입

//          문자열 타입
//              string
`               let aaa: string = "안녕"
`
//          숫자 타입
//              number
`               let bbb: number = 123
`
//          불리언 타입
//              boolean
`               let ccc: boolean = true
`
//          객체 타입
//              직접 정의해서 사용
`               Interface IProfile {
                    name: string;
                    age: number;
                }

                let profile: IProfile = { name: "철수", age: 13 }
`
//              - Interface : 타입을 만들 때 사용하는 키워드
//              - IProfile : 타입명, 보편적으로 타입명 앞에 'I' 붙임(Interface의 첫글자)


// TypeScript 설치

//      1. package.json 파일 생성 및 설정
//          1) 설치할 폴더에서 통합 터미널 열기
//          2) yarn init
//          3) 엔터엔터...
//          4) package.json 파일에 "type": "module", 속성 추가

//      2. TypeScript 모듈 설치
//          1) 터미널에 설치 명령어 입력
`               yarn add typescript --dev
`
//      3. TypeScript 설정 파일 생성 및 설정
//          1) 설치 폴더에 tsconfig.json 파일 생성

//          2) 설정 파일 코드 복사
//              TypeScript 공식문서 -> Docs -> What is a tsconfig.json
//               -> github.com/tsconfig/bases 링크 -> Recommended 링크
//               -> @tsconfig/recommended 링크 -> tsconfig.json 코드 복사
//              최종 링크 여기임 https://www.npmjs.com/package/@tsconfig/recommended

//          3) 설정 파일 코드 작성
//              tsconfig.json 파일에 아래 코드 복붙
`               {
                  "compilerOptions": {
                      "target": "es2015",
                      "module": "commonjs",
                      "strict": true,
                      "esModuleInterop": true,
                      "skipLibCheck": true,
                      "forceConsistentCasingInFileNames": true
                  },
                  "$schema": "https://json.schemastore.org/tsconfig",
                  "display": "Recommended"
                }
`//             들여쓰기 2칸 주의
//              - "target": "es2015", : TypeScript를 변환할 JavaScript 버전

//      => 여기까지 모두 설정하면 완료된 것

//          실습은 다음 시간에~ 