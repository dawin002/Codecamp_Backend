// GraphQL 게시판 api 만들기 with Apollo Server

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
    type MyResult {
        number: Int
        writer: String 
        title: String
        contents: String
    }

    type Query {
        # fetchBoards: MyResult # 객체 1개를 의미
        fetchBoards: [MyResult] # 배열 안에 객체 1개 이상을 의미
    }

    type Mutation {
        createBoard: String
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
            console.log(args.qqq)

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