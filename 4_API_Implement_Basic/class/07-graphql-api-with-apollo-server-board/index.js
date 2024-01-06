// 01-rest-api-with-express/index.js와 동일 기능 
//  graphql(apollo server)로 만들어보기

// apollo 서버 가져오기
import { ApolloServer } from '@apollo/server'

// 요청 기다리는 기능 가져오기(express의 app.listen())
import { startStandaloneServer } from '@apollo/server/standalone'

// api docs
const typeDefs = `#graphql
    type Query {
        qqq: String
    }
`

// api 구현
const resolvers = {
    Query: {
        qqq: () => {
            return 'Hello World! I am GraphQL with Apollo Server'
        }
    }
}

// apollo 서버 설정
const server = new ApolloServer({
    // api와 docs를 동시에 만들어야 함
    typeDefs: typeDefs,     // docs
    resolvers: resolvers    // api 구현
})

// 요청 기다리기
startStandaloneServer(server)


// 현재 파일 node로 실행 후
// 브라우저에서 localhost:4000/graphql 접속하기