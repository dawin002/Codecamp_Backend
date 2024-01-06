// GraphQL 게시판 api 만들기 with Apollo Server

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
    # 입력 양식 : type 아닌 input 키워드 써야함!!!
    input CreateBoardInput {
        writer: String
        title: String
        contents: String
    }

    # 반환 양식
    type MyResult {
        number: Int
        writer: String 
        title: String
        contents: String
    }

    # 쿼리 함수 설명
    type Query {
        # fetchBoards: MyResult # 객체 1개를 의미
        fetchBoards: [MyResult] # 배열 안에 객체 1개 이상을 의미
        # 반환 타입 MyResult 선언해서 사용하기
    }

    # 뮤테이션 함수 설명
    type Mutation {
        # createBoard(writer: String, title: String, contents: String): String
        # 괄호 : args로 들어올 인자 이름과 타입(타입 뒤 느낌표: 필수 입력)
        createBoard(createBoardInput: CreateBoardInput!): String
        # 매개변수 타입 CreateBoardInput로 선언해서 사용하기
    }
`

const resolvers = {
    Query: {
        // 게시물 목록 조회 (Boards -> s 붙어서 목록 조회)
        fetchBoards: (parent, args, context, info) => {
            // 1. DB 접속해 데이터 조회했다고 가정
            const result = [
                { number: 1, writer: "짱구", title: "제목 1", contents: "1번 글의 내용입니다!!" },
                { number: 2, writer: "철수", title: "제목 2", contents: "2번 글의 내용입니다!!" },
                { number: 3, writer: "유리", title: "제목 3", contents: "3번 글의 내용입니다!!" }
            ];

            // 2. DB에서 꺼내온 결과 응답
            return result;
        }
    },

    Mutation: {
        createBoard: (parent, args, context, info) => {
            // 1. 브라우저의 요청 데이터 확인
            console.log(args.createBoardInput.writer)
            console.log(args.createBoardInput.title)
            console.log(args.createBoardInput.contents)

            // 2. DB 접속해 데이터 저장했다고 가정

            // 3. DB에 저장한 결과 응답
            return "게시물 등록에 성공했습니다."
        }
    }
}

const server = new ApolloServer({
    typeDefs,  // value 생략(shorthand-prorerty)
    resolvers,
    cors: true // 모든 사이트 cors 허용
    // cors: {origin: ["https://naver.com", "https://google.com"]} // 특정 사이트만 cors 허용
})


startStandaloneServer(server)