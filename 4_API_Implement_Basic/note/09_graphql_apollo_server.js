// GraphQL api 시작하기

// Apollo Server 설치하기

//      Apollo Server 공식 Docs를 보고 설치하는 방법과
//      mdnjs의 @apollo/server docs를 보고 설치하는 방법 중
//      더 간단한 mdnjs 방법으로 실습 진행

//      0. 설치 전 수행할 작업
//          1) 백엔드 폴더 생성
//          2) 백엔드 폴더 통합 터미널에서 열기
//          3) package.json 파일 생성(yarn init)
//          4) "type": "module" 속성 추가

//      1. apollo server 설치 코드 확인
//          1) mdnjs.com에 apollo server 검색
//          2) @apollo/server 문서 클릭
//          3) 다운로드 및 setup 코드 확인

//      2. vscode에 Apollo Server 설치
//          1) 백엔드 폴더 통합 터미널에서 열기
//          2) 설치 명령어 입력: yarn add @apollo/server

//      3. vscode에 GraphQL 설치
//          1) 백엔드 폴더 통합 터미널에서 열기
//          2) 설치 명령어 입력: yarn add graphql

//      ** 한번에 설치하는 법
//           : yarn add 뒤에 설치할 모듈 연달아서 쓰기
//             yarn add @apollo/server graphql


// Apollo Server 주요 코드 설명

        // apollo server 기능 가져오기
        import { ApolloServer } from '@apollo/server';

        // 요청 기다리는 기능 가져오기
        import { startStandaloneServer } from '@apollo/server/standalone';

        // api docs 작성
        const typeDefs = `#graphql
            type Query {
                board: String
            }

            type Mutation {
        
            }
        `
        //      백틱 내 코드는 GraphQL 문법
        //      type Query {}    : 쿼리 메서드 api 설명
        //      type Mutation {} : 뮤테이션 메서드 api 설명
        //      board: String    : endpoint 이름과 반환값

        //  api 구현
        const resolvers = {
            Query: {
                board: () => {
                    return 'This is baord query response.'
                }
            },

            Mutation: {

            }
        };
        //      Query: {}       : 쿼리 메서드 api 구현
        //      Mutation: {}    : 뮤테이션 메서드 api 구현
        //      board: () => {} : board 조회 함수 구현
        //      return ...      : 응답 바디

        // apollo 서버 설정
        const server = new ApolloServer({
            typeDefs: typeDefs,     // docs 설정
            resolvers: resolvers    // api 설정
        })

        // 요청 기다리기
        startStandaloneServer(server)


// Apollo Server 실행하기

//      1) 터미널에서 node index.js로 서버 실행
//      2) 브라우저에서 localhost:4000/graphql 주소 접속
//      3) 중앙의 에디터 사용해 api 요청해보기

//      Apollo Server는 기본적으로 4000번 포트 사용

//      Apollo Server 사이트 구성
//          왼쪽   : api docs
//          중앙   : api 요청 입력 에디터
//          오른쪽 : api 응답 결과 출력창