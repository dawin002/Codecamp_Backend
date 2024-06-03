// Swagger

//      API 설명서를 만들어주는 프로그램

// Swagger 설치하기

//      1. Swagger 설치 방법 확인
//          1) 브라우저에서 "npmjs.com" 접속
//          2) "swagger-ui-express" 검색
//          3) 설치 명령어 : npm i swagger-ui-express (i는 install 약자)

//      2. 보조도구 swagger-jsdoc 설치 방법 확인
//          1) swagger-ui-express 문서 본문의 사용 방법에서 확인
//          2) 사용 방법 두 가지 중 swagger-jsdoc 문서 클릭
//          3) 설치 명령어 : npm i swagger-jsdoc

//      * swagger.io 공식 홈페이지에서도 문서 확인 가능

//      3. Vscode에 설치
//          1) vscode의 작업 디렉토리에서 통합 터미널에서 열기
//          2) swagger 설치 명령어 입력
`               yarn add swagger-ui-express
`//         3) swagger-jsdoc 설치 명령어 입력
`               yarn add swagger-jsdoc
`
//      4. setup 코드 적용
//          1) swagger-ui-express 적용 코드 추가 (npmjs의 swagger-ui-express 문서)
                import express from 'express';                  // require 문에서 수정
                import swaggerUi from 'swagger-ui-express';     // require 문에서 수정
                const app = express();

                // 아래 두 코드는 사용 안함(swagger-jsdoc 사용 안하는 방식의 코드)
                // import swaggerDocument from './swagger.json'
                // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//          2) swagger-jsdoc 적용 코드 추가 (npmjs의 swagger-jsdoc 문서)
                import swaggerJsdoc from 'swagger-jsdoc';       // require 문에서 수정

                // API docs의 제목을 설정하는 부분
                const options = {
                    definition: {
                        openapi: '3.0.0',
                        info: {
                            title: 'Hello World',
                            version: '1.0.0',
                        },
                    },
                    apis: ['./swagger/*.swagger.js'], // docs 파일의 위치 
                    // (swagger 폴더 안의 .swagger.js 로 끝나는 모든 파일) 
                };

                const swaggerSpec = swaggerJsdoc(options);  // 변수 이름 변경

//          3) swagger-jsdoc 활용한 swagger 셋업 코드 추가 (npmjs의 swagger-ui-express 문서)
                // const swaggerSpec = swaggerJsdoc(options); // 이미 적용됨
                app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger 사용법

//      방식 1. api 코드 위에 작성 (실습때 쓸건 방식 2)

//          api 구현 코드 위에 형식에 맞게 docs 코드 추가
//          -> swagger api docs 에 자동으로 항목 추가

            /**
             * @openapi     // @swagger 써도 됨, 우리 실습에서도 swagger 사용할 것
             * /:                                                // endpoint 주소
             *   get:                                            // 메서드 종류
             *     description: Welcome to swagger-jsdoc!        // api 설명
             *     responses:                                    // 응답
             *       200:                                        // 상태 코드
             *         description: Returns a mysterious string. // 응답 설명
             */
            app.get('/', (req, res) => {
                res.send('Hello World!');
            });

//      방식 2. api 코드와 docs 코드 분리

//          1) 프로젝트 디렉토리에 swagger 디렉토리 생성

//          2) api docs 분리
//              swagger 폴더에 js 파일 생성해 분리
//              api docs를 endpoint 기준으로 각각의 파일에 분리
//              많이 쓰는 이름: "board.swagger.js" , "board-swagger.js"

//          3) option의 apis 프로퍼티 수정
//              api docs가 저장된 위치 알려주는 코드 수정
//              apis: ['./저장한 폴더/*.swagger.js']
//              // *.swagger.js: .swagger.js로 끝나는 모든 파일

//          4) api options 분리
//              swagger 폴더에 config.js 파일 생성
//              config.js로 options 정의 코드 분리 후 export
//              index.js 에서 options import


// Swagger 관련 코드 설명

//      index.js 파일
        import swaggerUi from 'swagger-ui-express'; // swagger 모듈 가져오기
        import swaggerJsdoc from 'swagger-jsdoc';   // swagger-jsdoc 모듈 가져오기

        import {options} from './swagger/config.js';// 분리한 swagger options 가져오기

        const swaggerSpec = swaggerJsdoc(options);  // swagger spec 설정

        // api docs 생성 api 함수
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        //      '/api-docs' 엔드포인트로 요청 들어오면 두 개의 미들웨어 함수 실행
        //      -> Swagger 웹페이지로 연결해 API Docs 생성 후 보여줌

//      config.js 파일
        export const options = {    // api docs 메인 정보(설명) 설정
            definition: {
                openapi: '3.0.0',
                info: {
                    title: '나의 API 설명서',  // api docs 제목
                    version: '1.0.0',       // api docs 버전
                },
            },
            apis: ['./swagger/*.swagger.js'], // api docs 코드 저장 위치
            // swagger 폴더의 '.swagger.js'로 끝나는 모든 파일
        };

//      swagger 폴더의 api 설명 파일(ex: board.swagger.js)

//          여기에 api 별 설명 추가하면 됨
//          헷갈릴 거니까 직접 swagger 열어서 확인해보기
//          더 자세한 내용은 Swagger 공식 문서에서 확인해보기

//          코드 설명
//          /boards:                    // 엔드포인트 주소
//            get:                        // http 메서드 종류
//              summary: 게시글 가져오기        // api 설명 요약
//              tags: [Board]               // 연관된 api 그룹으로 묶는 옵션
//              // 이 아래는 눌렀을 때 보여지는 상세 설명
//              parameters:                 // 파라미터
//                - in: (내용)                 // 각 파라미터 설명
//                name: number                // 파라미터 이름
//                type: int                   // 파라미터 타입
//              responses:                  // 응답
//                200:                        // 상태코드 200일 때의 응답
//                  description: 성공            // 상태코드에 대한 설명
//                  content:                    // 응답 데이터
//                    application/json:           // 응답 타입
//                      schema:
//                        type: array                 // 데이터 타입
//                        items:                      // 배열 각각의 아이템에 대해
//                          properties:                 // 각 아이템의 속성
//                              number:                   // 속성 1
//                                type: int               // 속성 1 데이터 타입
//                                example: 1              // 속성 1 예시 데이터
//                              writer:                   // 속성 2
//                                type: string
//                                example: 철수
//                              title:                    // 속성 3
//                                type: string
//                                example: 좋은아침 입니다~

// Swagger API Docs 열기

//      1. 통합 터미널에서 api 서버 실행
//      2. 브라우저에서 API Docs api 요청
//          주소창에 http://localhost:(포트 번호)/(api docs 엔드포인트 주소) 입력
//          ex) http://localhost:3000/api-docs/


//      발생한 에러

//          Swagger API Docs에서 API를 테스트 하려면 Try it out 버튼과 Execute 버튼을 눌러서
//          테스트할 수 있는데 무한 로딩이 되는 상황이 발생했다

//          원인
//              swagger.js 파일에서 @swagger 로 docs를 정의할 때 api 요청에 인자가 없을 때
//              * parameters: 를 아예 지우지 않아서 그렇다

//          해결
//              * parameters:를 비우지 말고 완전히 삭제하자 API 테스트가 정상적으로 작동했다