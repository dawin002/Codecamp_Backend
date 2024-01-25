// 백엔드와 데이터베이스

// 서비스 전체 구조 이해

//      프론트엔드
//          고객 사용자(User-customer), 관리자(Admin), 사장님 사용자(User-manager) 등으로 나눠질 수 있음
//          여러개의 프론트엔드(+모바일)가 존재할 수 있음
//          여러 프론트엔드로 나누어져도 백엔드와 데이터는 공유

//      백엔드
//              
 
//      데이터베이스
//          대표적으로 SQL, NoSQL 방식으로 나뉨

//          SQL
//              테이블(표)형태의 저장 구조
//              row(가로로 긴 줄, 레코드), column(세로로 긴 줄, 속성)
//              테이블 안에 row와 column이 존재

//              관계형 데이터베이스(RDB)
//              테이블끼리 key를 사용해 join으로 연결할 수 있음
//              -> 테이블끼리 관계가 있어서 관계형 데이터베이스
//              대표적으로 MySQL, PostgreSQL, Oracle 등

//          NoSQL
//              객체 형태의 저장 구조
//              한 종류의 객체 데이터 묶음을 collection으로 저장
//              하나의 객체 데이터를 document로 저장
//              collection 안에 document가 존재

//              비관계형 데이터베이스()
//              대표적으로 MongoDB, Redis, Firebase

//          Query문
//              데이터베이스를 조작할 때 사용되는 명령어(질의문)
//              SQL과 NoSQL은 사용하는 Query문이 다름

//              데이터베이스 조작을 위해 쿼리문을 다 외워야 하는데 너무 많음
//              -> 백엔드에 ORM, ODM 이라는 도구(라이브러리)가 나옴(npm으로 다운로드)

//              ORM
//                  Object-Relational Mapper
//                  객체를 관계형 데이터베이스로 맵핑시켜주는 라이브러리
//                  테이블로 이루어진 데이터베이스를 다룰 때 사용하는 SQL을 다른 언어에서 쉽게 사용하도록 해줌
//                  Sequelize, TypeORM, Prisma 등이 있음

//              ODM
//                  Object-Document Mapper
//                  객체를 document 데이터베이스로 맵핑시켜주는 라이브러리
//                  문서(document)와 collection으로 이루어진 NoSQL 데이터베이스를 다룰 수 있도록 해줌
//                  Mongoose 등이 있음