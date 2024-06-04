// 백엔드와 프론트엔드 연결하기

// Vscode에서 API 요청 보내는 법

//      지금까지 했던건 postman을 통해 api 요청을 보낸 거였음

//      api 요청을 보내기 위한 도구가 필요
//          fetch, axios 등이 있음
//          다운로드 받아서 사용해야 함

//      fetch
//          vscode에 내장되어 있는 api 요청 도구

//      axios
//          가장 많이 사용하는 api 요청에 필요한 도구

// axios 설치하기

//      - MDN(yarn)을 사용한 axios 다운로드 방식
//          mdn(yarn)으로 node 모듈을 다운로드 받는 방법
//          nodejs를 통해 axios를 실핼해야 함
//          HTML에서는 axios 사용 불가능

//      - CDN을 사용한 axios 다운로드 방식
//          HTML 문서의 script 태그에 cdn 주소를 넣어 axios를 다운로드 받는 방법
//          HTML에서 axios를 사용할 수 있음
//          * CDN:
//              콘텐츠 전송 네트워크(Content Delivery Network)
//              서버를 여러 곳에 두고 가장 가까운 서버에서 다운받는 방식

//          1. 구글에서 axios 검색 후 axios 공식 문서 클릭
//          2. cdn 사용한 설치 코드 확인
`               <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
`//         3. html 파일의 head 태그 안에 axios cdn 설치 코드 추가
//          4. 코드 실행하기

//          => 브라우저가 위 cdn 코드를 읽을 때 src 주소에서 axios를 다운로드 받음
//          => axios라는 함수로 저장되어 기능 사용 가능

//          axios는 window 객체에 저장됨
//              * window 객체:
//                  alert(), close() 등의 함수가 저장되어 있는 객체
//                  window.alert() 에서 window 생략 가능

// axios 사용하기

//      axios api 요청

//          html의 script 내 api 요청 코드 입력

//          axios.HTML메서드("api 주소", { 요청 바디 }).then({응답 매개변수) => { 응답 처리 });
//              - HTML메서드 : get, post 등의 요청할 html 메서드 입력
//              - api 주소 : http:// 로 시작하는 api 요청 전체 주소 입력
//              - 요청 바디 : 요청으로 전달할 데이터를 담을 바디
//              - 응답 매개변수 : api로부터 받은 응답 객체를 저장하는 매개변수
//              - 응답 처리 : api의 응답을 받은 후 실행될 코드
//          ex)
                axios.post("http://localhost:3000/tokens/phone", {
                    phoneNumber: "01055168448"
                }).then((res) => {
                    alert(res.data);
                });

// cors 에러 해결하기

//      axios로 api 요청을 하면 cors 관련 에러가 발생
//      해결하는 방법 먼저 확인하자

//      1. cors 다운로드
//          1) backend 폴더 통합 터미널에서 열기
//          2) yarn add cors 명령어 입력

//      2. 백엔드에서 cors 허용하기
//          1) import cors from 'cors'; 명령어 추가
//          2) app.use(cors()); 명령어 추가