// mongoose 의 진실

// __v

//      __v 란?

//          MongoDB 에서 mongoose 로 저장한 데이터를 확인해보면 각 document에 __v 라는 필드가 있음
//          __v 는 버전을 관리해주기 위해 자동 생성되는 필드 

//          데이터를 수정했을 때 수정한 버전을 기록해주는 기능
//          단, 배열 데이터의 내용이 수정되었을 때만 버전이 변경됨
//          배열이 아닌 데이터가 수정되었을 때는 버전 변경 없음

//          배열 데이터에서는 두명 이상의 사람이 동시에 데이터에 접근했을 때
//          데이터의 수정이 발생하는 경우 데이터가 꼬일 수 있기 때문에 이를 방지하기 위한 기능


// 디버그 모드

//      디버그 모드란?

//          mongoose 명령어가 어떤 MongoDB 명령어로 변환되어 동작하는지 
//          log로 변경 결과를 볼 수 있게 해주는 모드

//          백엔드 소스코드에 mongoose.set("debug", true); 코드를 넣은 뒤 docker를 빌드, 실행하면
//          DB를 조작하는 api 요청이 실행될 때 터미널에 변환된 MongoDB 쿼리문이 출력됨

//      예시)
//          몽구스 코드  --------> 몽고DB 코드
//          Board.find()          db.board.find()


// mongoose 스키마와 MongoDB의 관계

//      mongoose 스키마와 MongoDB는 연동이 될까?

//          mongoose 스키마와 MongoDB는 관계가 없음

//          MongoDB는 NoSQL 데이터베이스라서 실제 스키마 구조가 존재하지 않음
//          -> 스키마리스 데이터베이스

//          mongoose 스키마는 우리가 백엔드에서 MongoDB로 보낼 내용을 필터링(제한)하는 역할일 뿐

//          MongoDB Compass에서 데이터를 직접 추가하면 mongoose 스키마로 정해두지 않은 데이터도
//          마음대로 추가할 수 있음

//          하지만 mongoose를 통해 DB에 데이터를 추가할 때는 mongoose 스키마로 정해둔 내용이 아닌
//          경우 스키마가 아닌 내용은 무시됨(저장 안됨)