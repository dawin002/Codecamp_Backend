// eslint 와 prettier

//      코드 린터 / 코드 포맷터

//      Code Linter

//          코드 문법에 대한 규칙을 정하고 확인하는 도구
//          import 순서, == 금지 === 허용 등

//          eslint : 가장 대표적인 린터

//      Code Formatter

//          코드 문법적인 것 외에 대한 규칙을 정하는 도구
//          들여쓰기 공백 2칸, 한 줄에 n글자 넘으면 줄바꿈 등

//          prettier : 가장 대표적인 포맷터

// eslint

//      eslint 설정 파일

//          .eslintrc.js 파일
//          rc : run command 약자, 명령어를 실행시키라는 의미

//          eslint 규칙을 개발자가 원하는 대로 수정할 수 있음

//      husky

//          github 에 커밋을 할 때 코드 린터 규칙이 지켜졌는지
//           확인할 수 있는 라이브러리

//          git add commit 할 때 규칙이 지켜지지 않은 상태면
//           업로드를 못하게 방어할 수 있음

//          npmjs.com 에서 라이브러리 설치 가능

// prettier

//      prettier 설정 파일

//          .prettierrc 파일
//          rc : 마찬가지로 명령어를 실행시키라는 의미

// eslint 실습

//      1. eslint 확장 프로그램 설치

//          vscode 확장에서 ESLint 프로그램 설치

//          eslint 라이브러리는 NestJS 설치할 때 같이 설치됨

//      2. eslint 경고 확인하기

//          eslint 경고는 .ts 파일에서 확인 가능

//          1) src\app.controller.ts 파일 열기

//          2) 경고 발생하는 코드 작성하기
`               const qqq = 3;
`//             qqq가 선언되었으나 사용되지 않았다는 경고 
//              qqq에 노란줄(eslint 경고) 뜸

//      3. eslint 규칙 변경하기

//          eslint 경고는 문법적 오류는 아니기 때문에
//           규칙을 수정해 경고가 뜨지 않게 수정 가능

//          1) 경고 내용에 있는 경고 이름 복사
`               @typescript-eslint/no-unused-vars
`//              .eslintrc.js 파일 열기 

//          2) eslint 설정 파일에서 해당 경고 끄기
//              rules 에서 해당 규칙 off로 추가하기
`               rules: {
                    '@typescript-eslint/no-unused-vars': 'off',
                }
`
//      3. eslint 적용 안될 때

//          eslint 경고가 뜨지 않는 경우 vscode 확장으로도 설치 가능

//          1) vscode 확장에서 ESLint 라이브러리 설치

//          2) 설치해도 뜨지 않는 경우 vscode 껐다 켜보기

//          난 둘 다 안돼서 구글링함
//              eslint 적용 안됨 검색
//              eslint, prettier 둘 다 다시 설치
//              eslint --init 으로 eslint 초기화
//              eslint 와 prettier 충돌 안나게 해주는 플러그인 2개 설치
//              이렇게 하면 eslint 드디어 에러가 뜨는데
//               경고(노란줄)로 떠야 하는게 에러(빨간줄)로 떠서
//               .eslintrc.js 에서 경고 표시 방식을 warn 으로 바꿈

// prettier 실습

//      1. prettier 확장 프로그램 설치

//          prettier 라이브러리는 NestJS 프로젝트 생성할 같이 설치됨

//          vscode 확장에서 Prettier - Code formatter 설치

//      2. settings.json 에서 prettier 사용 설정하기

//          ** settings.json 사용해 설정
//              vscode 에서의 prettier 사용 설정은 vscode 설정에서 변경할 수 있음
//              하지만 협업시 내 vscode 설정을 바꿔도 ide나 컴퓨터에서 적용 안됨
//              따라서 settings.json 에서 해당 프로젝트의 설정을 지정해줘야 함

//          1) settings.json 파일 생성
//              전체 프로젝트의 설정을 관리하는 파일
//              전체 프로젝트의 root 폴더에 .vscode 폴더 만들고 settings.json 파일 생성

//          2) 기본 포맷터 설정
//              settings.jon 파일에 기본 포멧터를 지정하는 코드 추가
`               "editor.defaultFormatter": "esbenp.prettier-vscode",
`
//          3) 파일 저장시 포맷 자동 수정 설정
//              settings.jon 파일에 해당 설정 코드 추가
`               "editor.formatOnSave": true,
`
//      3. prettier 규칙 변경하기

//          .prettierrc 파일에서 prettier 규칙 추가 가능

//          1) tabWidth 규칙
//              들여쓰기 몇 칸으로 적용할지에 대한 규칙
`               "tabWidth": 2
`//             들여쓰기를 공백 2칸으로 지정

//          2) singleQuote 규칙
//              문자열의 따옴표를 쌍따옴표로 할지 홑따옴표로 할지에 대한 규칙
`               "singleQuote": true
`//             홑따옴표(1개짜리 따옴표)로 고정

//          3) trailingComma 규칙
//              객체의 마지막 필드 뒤에 쉼표를 붙이는 것에 대한 규칙
`               "trailingComma": "all"
`//             객체의 마지막 필드의 끝에 항상 쉼표를 붙이는 것으로 지정
//              "none" 으로 변경시 끝에 항상 쉼표를 붙이지 않음

//          4) semi 규칙
//              명령문의 끝에 세미콜론을 인쇄할지에 대한 규칙
`               "semi": true
`//             명령문의 끝에 세미콜론을 항상 붙이도록 지정

//          ** 명령문 끝에 세미콜론이 필요한 이유

//              기본적으로 JS에서는 명령문 끝에 세미콜론을 붙이지 않아도
//               컴퓨터가 알아서 세미콜론을 붙여서 코드를 해석

//              하지만 대입식(a = b) 아래 줄에 변수에 대입하지 않은
//               배열([1,2,3])을 붙여 사용하는 경우 b와 []가 붙어서
//               컴퓨터가 b[1,2,3] 으로 인식해 b가 배열이 아니라는 에러가 발생

//              따라서 JS에서도 명령문 끝에 세미콜론을 항상 붙이는 것이 좋음