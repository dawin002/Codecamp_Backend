// Point Transaction ACID Transcation

//      Transaction 트랜잭션이란?

//          DB의 여러가지 쿼리를 하나의 그룹으로 묶어주는 작업의 단위

//          ex) createPointTransaction()의 트렌젝션

//              1. PointTransaction 테이블에 충전했다고 1줄 작성
//              2. User 테이블에서 철수 데이터를 가져옴
//              3. 기존 500원에 충전 3000원을 더한 3500원으로 업데이트

//              위 상황에서 1번은 성공했는데 2번에서 실패한 경우
//              1번의 실행 결과가 DB에 남아있게 됨
//              => 데이터의 오염이 발생

//              => 123번 작업을 트랜잭션으로 묶어 전부 다시 시도해야됨

//      ACID Transaction

//          A

//          C

//          I

//          D

//      트랜잭션의 단계

//          startTransaction
//              : 트랜잭션의 시작을 알림

//          commit
//              : 트랜잭션이 모두 정상적으로 완료되어 저장

//          rollback
//              : 트랜잭션이 중간에 실패한 경우 원래대로 되돌림


// ACID Transaction 실습

//      실습은 강의자료 참고