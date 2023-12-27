// 데이터 통신 기초


//  두 컴퓨터간 데이터 전송


// 데이터 종류에 따른 통신 종류

//      FTP
//          File Transfer Protocol
//          파일을 주고받음

//      SMTP
//          Simple Mail Transfer Protocol
//          간단한 메일을 주고받음

//      HTTP
//          Hyper Text Transfer Protocol
//          텍스트 / 하이퍼텍스트를 주고받음
//          (하이퍼텍스트: HTML 코드 (Hyper Text Markup Language))
//          얘를 가장 많이 씀


// HTTP 요청과 응답

//      요청
//          Request
//          하나의 컴퓨터가 먼저 요청을 전송

//      응답
//          Response
//          요청에 대해 처리를 한 결과를 응답으로 전송


// HTTP 메시지의 구조

//      요청 메시지
//          시작 라인, 헤더, 바디로 구성

//          시작 라인
//              HTTP 메서드(GET, POST 등), 요청 엔드포인트('/board), HTTP 버전이 포함됨

//          헤더
//              Host(요청을 보내는 브라우저 주소),
//              Content-Type(응답하는 메시지의 내용이 어떤 종류인지 ex: JSON)
//              등 요청에 대한 정보가 포함됨

//          요청 바디
//              다른 컴퓨터나 서버로 전송할 실제 데이터가 포함됨

//      응답 메시지
//          시작 라인, 헤더, 바디로 구성

//          시작 라인
//              HTTP 버전, HTTP 상태 코드(200, 400, 500 등)가 포함됨

//          응답 헤더
//              보내는 사람(: 백엔드 컴퓨터), 
//              Content-Type(응답하는 메시지의 내용이 어떤 종류인지 ex: JSON)
//              등 응답에 대한 정보가 저장됨
//              요청 헤더와는 다른 데이터와 구조로 이루어짐

//          요청 바디
//              요청에 대한 대답(: 메시지 전송 성공!)이나 요청한 실제 데이터가 저장됨

//          상태 코드
//              HTTP 요청이 성공적으로 완료되었는지, 실패했는지 등을 알려주는 3자리 숫자 코드
//              응답 메시지의 시작 라인에 포함됨
//              요청 바디의 요청에 대한 대답(성공했습니다!)와는 다름
//              - 요청에 대한 대답은 백엔드 개발자가 작성한 메시지
//              - 상태 코드는 규칙에 따라 전송되는 정해진 서버 응답 코드
//              흔한 HTTP 상태 코드 : 성공(200), Front-end 에러(400), Back-end 에러(500) 
//              다양한 HTTP 상태 코드(MDN): https://developer.mozilla.org/ko/docs/Web/HTTP/Status


// JSON

//      JSON 이란?
//          JavaScript Object Notation
//          자바스크립트 객체 표기법

//      JSON 활용
//          객체를 JSON 문자열로 바꾸어 많은 데이터를 전송
//          HTTP 통신에서 전달하는 데이터의 타입


// API

//      API란?
//          컴퓨터간 통신을 할 때 요청을 보내고 응답을 받는 기능을 하는 백엔드 함수
//          예시 : 게시물 저장 API, 프로필 저장 API, 프로필 조회 API, ...
//          맡은 기능에 따라 무수히 많은 API가 필요함

// API의 종류

//      Rest-API
//          데이터를 통으로 가져오는 방식?

//      GraphQL-API
//          REST API의 문제점을 보완하기 위해 Facebook에서 만든 방식
//          필요한 정보만 골라서 조회할 수 있는 방식

//      그럼에도 REST API를 알아야 하는 이유
//          1. 많은 회사가 아직 REST를 사용
//          2. 취업한 회사에서 REST를 사용할 수 있음
//          3. OPEN-API에서 일반적으로 REST를 제공

// Rest-API 와 GraphQL-API 의 차이

//      함수 이름의 차이

//          Rest-API
//              홈페이지 주소처럼 생긴 이름
//              ex1) 네이버에서 1번 게시글 조회: https://naver.com/board/1
//              ex2) 네이버에서 철수 프로필 조회: https://naver.com/profile/철수

//          GraphQL-API
//              일반 함수와 같은 이름
//              ex1) 네이버에서 1번 게시글 조회: board(1)
//              ex2) 네이버에서 철수 프로필 조회: profile(철수)

//      응답 결과물의 차이

//          Rest-API
//              응답 결과로 back-end 개발자가 만든 함수에서 보내주는 모든 데이터를 받아야만 함
//              모든 데이터를 받아야만 하기 때문에 응답의 용량이 커서 속도가 느림

//          GraphQL-API
//              응답 결과로 back-end 개발자가 만든 함수에서 필요한 데이터만 골라 받을 수 있음
//              필요한 데이터만 골라서 받을 수 있기 때문에 응답의 용량이 작아 속도가 빠름


// CRUD 

//      (크러드 라고 읽음)
//      Create(등록), Read(조회), Update(수정), Delete(삭제)
//      어떤 API를 만들 때 CRUD를 모두 만들어야 한다

//      CRUD+1
//          +1: Read
//          두 개의 Read가 필요함
//          : 하나의 Read는 상세 조회, 하나의 Read는 목록 조회

//      CRUD의 두 가지 방식

//          Rest-API 방식

//              CRUD 마다 사용하는 HTTP Method가 존재

//              - CREATE : POST 메서드
//              - UPDATE : PUT 메서드
//              - DELETE : DELETE 메서드
//              - READ   : GET 메서드

//          GraphQL-API 방식

//              데이터를 조작할 때는 MUTATION을 사용
//              데이터를 조작하지 않고 조회만 할 때는 QUERY 사용

//              - CREATE, UPDATE, DELETE : MUTATION
//              - READ                   : QUERY


// 프론트엔드(VSCode)에서의 API 사용

//      Rest-API

import axios from 'axios';

const result_c = axios.post('API 이름');
const result_r = axios.get('API 이름');
const result_u = axios.put('API 이름');
const result_d = axios.delete('API 이름');

//      GraphQL-API

import { useMutation, useQuery } from '@apollo/client';

const result_m = useMutation('API 이름');
const result_q = useQuery('API 이름');


// 프론트엔드 API 활용 개발

//      Rest-API
//          API 연습 : 포스트맨(Postman) 연습 도구 사용해 연습
//          API 설명서(Docs) : 스웨거(Swagger) 사용해 숙지

//      GraphQL-API
//          API 연습 & API 설명서 : 플레이그라운드(Playground) 로 한번에 숙지 및 연습