// 데이터베이스 설계

// 데이터베이스 기본 개념

//      테이블

//          데이터베이스에서 행과 열로 이루어진 데이터의 집합

//      릴레이션

//          관계형 데이터베이스에서 테이블에 특별한 조건을 추가한 것
//          1. 모든 값은 유일한 값을 가진다
//          2. 하나의 릴레이션에서 중복되는 행이 존재하면 안된다

//          => 위 조건을 충족하는 테이블만이 릴레이션
//          => 모든 릴레이션은 테이블이지만, 모든 테이블은 릴레이션이 아님

//      행 (Row)

//          테이블에서 가로로 묶은 데이터셋
//          일반적으로 한 행은 한 객체에 대한 정보를 가짐
//          관계형 DB에서는 레코드(Record), 튜플(Tuple) 이라고 함

//      열 (Column)

//          테이블에서 세로로 묶은 데이터셋
//          일반적으로 열은 그 테이블의 속성을 의미
//          열을 구성하는 값들은 같은 도메인으로 되어있음
//          관계형 DB에서는 속성(Attribute), 필드(Field) 라고 함

//      도메인 (Domain)

//          DB에서 필드(열)에 채워질 수 있는 값의 집합
//          어떤 속성에 포함될 수 있는 값들의 집합

//      키 (Key)

//          데이터베이스에서 각 행(레코드)을 구분하는 유일한 식별자
//          일반적으로 키는 테이블에서 하나 이상의 열로 구성되며 해당 열 값은 유일하고 불변해야 함

//          주키
//              Primary Key (PK)
//              하나의 레코드를 구분할 수 있는 유일한 키

//          복합키
//              Composite Key
//              하나의 레코드를 대표하는 키가 여러 개의 열(필드)로 구성된 것

//          외래키(참조키)
//              Foreign key (FK)
//              두 테이블을 연결할 때 한 테이블의 주키에 연결되는 다른 테이블의 동일한 필드
//              ex) 학생 테이블의 학생학번 필드가 주키, 
//                  지도교수 테이블의 학생학번 필드가 외래키

// 정규화 & 정규형

//      정규화
//          데이터를 중복 저장 하지 않기 위해 테이블을 분리하는 것
//          정규화를 할 때는 반드시 분리한 테이블을 다시 연결할 수 있어야 함

//      정규형
//          NF (Normal Form)
//          중복된 데이터를 분해한 결과

//          정규형에서 가장 중요한 개념은 '중복 데이터를 없앴는가?'


// 정규형 종류

//          1NF, 2NF, 3NF, BCNF, 4NF, 5NF
//          실무용은 1~3NF 정도

//      비정규화

//          모든 데이터가 하나의 테이블에 담겨있는 상태
//          == 정규화되지 않은 상태

//          한 칸에 여러 개의 데이터가 담겨 있음
//          => 다가 속성

//      제 1 정규형 (1NF)

//          모든 도메인(각 칸의 값)이 원자값(하나의 값)을 가져야 한다
//          == 하나의 칸(셀)이 하나의 값만 가지고 가지고 있는 상태

//          한 열에 여러 가지의 속성이 섞여 있을 수 있음
//          => 복합 속성

//          중복데이터가 발생할 수 있음

//      제 2 정규형 (2NF)

//          제 1 정규형을 만족해야 한다

//          모든 속성의 부분적 종속 없이, 완전 함수 종속을 만족해야 한다
//          == 오로지 기본키(PK)만으로 다른 속성이 결정되어야 한다
//          * 기본키의 일부만으로도 다른 속성이 결정되어서는 안된다

//      제 3 정규형 (3NF)

//          제 1, 2 정규형을 만족해야 한다
//          기본키를 제외한 속성들 간 이행 종속성이 없어야 한다

//          * 이행 종속성
//              X -> Y 이고 Y -> Z 일 때, X -> Z 인 경우
//              X 의 Y 를 변경했을 때 해당 레코드의 Z가 영향을 받지 않아야 한다? 정도로 이해함
//              이렇게 한 테이블 안에서 연관된 X Y Z 가 있는 경우 X Y 테이블, Y Z 테이블로 분리해야 함


// 관계형 데이터베이스의 연결


//      관계
//          테이블과 테이블을 연결할 때 두 테이블이 어떤 관계인지 설정해야 함

//      1:1 관계
//          A 테이블의 레코드가 가질 수 있는 B 테이블의 레코드가 하나인 경우

//          학생 테이블과 성적 테이블의 관계

//          한 학생은 하나의 성적만을 가질 수 있는 경우

//      1:N 관계
//          A 테이블의 레코드에 해당하는 B 테이블의 레코드가 여러 개인 경우

//          지도교수 테이블과 학생 테이블의 관계

//          한 지도교수가 여러 학생을 담당할 수 있고, 한 학생은 한 지도교수에게만
//           지도받을 수 있는 경우

//      N:M 관계
//          A 테이블의 레코드가 B 테이블의 여러 레코드를 가질 수도 있고,
//           B 테이블의 레코드가 A 테이블의 여러 레코드를 가질 수도 있는 경우

//          학생 테이블과 수업 테이블의 관계

//          한 학생이 여러 수업을 들을 수 있고, 한 수업에 여러 학생이 들어올 수 있는 경우

//          * 중간 테이블
//              N:M 관계에서는 중간 테이블을 만들어 사이에 두고 각각 1:N 관계를 갖도록 함

//              학생 테이블 <-> 학생_수업 테이블 <-> 수업 테이블
//                       1:N 관계            N:1 관계

//              TypeORM 에서 N:M 관계를 만들어도 자동적으로 중간 테이블을 만들어 줌

//      ERD
//          Entity Relationship Diagram
//          객체(엔티티, 테이블)들이 어떤 관계를 가지고 있는지 보여주는 다이어그램

//          ERDCloud
//              ERD 도구 중 무료로 사용할 수 있는 툴
//              https://www.erdcloud.com/