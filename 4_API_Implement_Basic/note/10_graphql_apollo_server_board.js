// GraphQL board api 구현 with Apollo Server 실습

// CORS 허용하기

//      apollo server에 cors가 내장되어 있어 cors 설치 필요없음
//      server 설정 코드(ApolloServer 생성자) 안에 속성으로 추가해주면 됨

//      모든 사이트 cors 허용하기
        cors: true    // -> 단 한줄로 cors 기능 사용 가능

//      특정 사이트만 cors 허용하기
        cors: {origin: ["https://naver.com", "https://google.com"]}


// api 함수 구조
Query: {
    fetchBoards: (parent, args, context, info) => {
        // 요청 데이터 확인
        console.log(args.qqq)

        // DB 요청 처리(했다고 가정)

        // 데이터 응답
        return result;
    }
}
//      함수 이름:
//          fetchBoards와 같이 

//      매개변수
//          parent
//              (쉬운 말)백엔드에서 백엔드로 api가 요청될 때 요청 데이터가 전달되는 매개변수 
//              (어려운 말)부모 타입 resolver에서 반환된 결과를 가진 객체
//          args
//              (쉬운 말)요청 바디에 해당하는 실제 데이터가 전달되는 매개변수
//              (어려운 말)쿼리 요청 시 전달된 parameter를 가진 객체
//          context
//              (쉬운 말)request, response가 모두 전달되는 매개변수
//              (어려운 말)GraphQL의 모든 resolver가 공유하는 객체로서 로그인 인증, 데이터베이스 접근 권한 등에 사용
//          info
//              (쉬운 말)요청에 대한 정보가 전달되는 매개변수
//              (어려운 말)명령 실행 상태 정보를 가진 객체

//          미사용 매개변수 생략
//              (parent, args, context, info) => {...} 에서
//              args 만 사용하는 경우
//              방법 1. (_, args, _, _) 로 생략 가능
//              방법 2. (_, args) 로 생략 가능


// api docs 구조

//          api docs 까지 만들어야 실행 가능
//          (api만 구현한 상태로는 실행 안됨)

