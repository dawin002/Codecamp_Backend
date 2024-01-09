// 동기 / 비동기 방식

//          API가 요청을 보내고 응답을 받을 때까지 다른 작업을 할지 말지에 대한 개념

//      동기 방식

//          서버 컴퓨터가 작업이 끝날 때까지 기다리는 통신
//          API 응답이 돌아올 때까지 기다리자

//      비동기 방식

//          서버 컴퓨터가 작업이 끝날 때까지 기다리지 않는 통신
//          API 응답이 돌아올 때까지 기다리지 말자


//      동기 방식이 필요한 경우

//          요청을 처리하기 위해 선행되어야 하는 다른 요청이 있을 때

//          1. 글을 등록하고 불러오기 했는데 안불러와지는 상황
//              글 등록이 완료되기 전에 불러오기 요청이 전송되어서
//              DB에 글이 저장되지 않은 상태로 불러오기 작업이 시작됨

//          2. 글을 등록하고 등록된 글을 보여주는 기능
//              글 등록 api 요청이 전달된 후 글 상세조회 api 요청이 바로 전송되면 안됨
//              글 등록 api 응답이 돌아올 때까지 기다려야 함

//          => 동기 방식 필요

//      비동기 방식이 필요한 경우

//          요청들이 서로 기다릴 필요가 없을 때
//          동시에 여러 일을 할 때

//          1. 화면에 동시에 여러 정보를 띄워줄 때
//              Boards, Products 등 메인 화면에 여러 정보를 동시에 띄워줄 때는 기다릴 필요 없음

//          2. 파일을 다운받을 때
//              파일을 다운받으면서 웹서핑을 할 때 기다려주면 파일이 다운받아지는 동안 다른 작업 못함

//          => 비동기 방식 필요


// VSCODE 에서의 비동기

//          프로그래밍 언어의 작동은 기본적으로 동기 방식

//          외부에 API를 요청하는 등의 기능은 기본적으로 비동기 방식

//      비동기 방식 예시

            const data = axios.get('https://koreanjson.com/posts/1');
            console.log(data);   // Promise

//          디폴트로 비동기로 작동하기 때문에 api 요청을 보낸 후 즉시 다음 라인 실행
//          data 에는 Promise 객체가 저장되어 출력됨


// 비동기를 동기 방식으로 바꾸기

//          async 와 await 을 모두 사용해야 함

//      async
//          비동기 통신을 의미하는 명령어
//          비동기 작업을 수행하고자 하는 함수 앞에 async를 표기

//      await
//          특정 코드를 동기로 바꿔주는 명령어
//          응답이 돌아올 때까지 다음 코드 실행을 막음
//          함수 내부에서 실직적인 동기 작업이 필요한 위치마다 await를 표기

            async function 함수이름() {
                const data = await axios.get('https://koreanjson.com/posts/1');
                console.log(data);
            }

// Axios 를 이용한 async, await 사용하기

//      axios
//          async, await 을 지원하는 라이브러리

//      1. axios 설치
//          1) 프로젝트 폴더 통합 터미널에서 열기
//          2) package.json 생성 : yarn init
//          3) axios 다운로드
                yarn add axios
//          4) 모듈 사용 설정 : package.json 에 "type": "module" 속성 추가

//      2. axios 사용
//          1) axios 모듈 가져오기
               import axios from 'axios'
//          2) axios.get('api 주소') 로 요청 보내기
               axios.get('http://exampleAPI.com/boards');
//          3) 요청 전송 코드 앞에 await 키워드 사용해 동기 작업으로 전환하기
               await axios.get('http://exampleAPI.com/boards');
//          4) await 코드가 포함된 함수에 async 키워드 사용해 비동기 작업으로 전환하기
               const getBoards = async () => {
                await axios.get('http://exampleAPI.com/boards');
               }