
// Web Storage

//      Browser에 데이터를 저장할 수 있는 기술
//      두 종류 : Session storage, Local storage

// Session storage

//      key-value 형태로 저장
//      로컬 환경에 데이터 저장

//      세션 단위로 구분되며 활용
//      * 세션 : 사용자가 브라우저를 통해 웹 페이지에 접속한 시점부터 
//              해당 웹 페이지 접속을 종료하는 시점 까지를 의미하는 단위
//      브라우저, 탭을 종료하면 영구 삭제

// Local storage

//      key-value 형태로 저장
//      로컬 환경에 데이터 저장

//      도메인 단위로 구분되며 활용
//      * 도메인 : localhost 이런게 도메인
//               localhost 뒤에 어떤 url이 오든 저장된 데이터 사용 가능
//      브라우저, 컴퓨터 자체를 종료해도 존재 => 비회발성 메모리
//      우리 실습에서는 http://127.0.0.1:5500 도메인에 저장됨

// Local storage 접근 방법

//      JS 파일에서 접근 가능

//      저장
//      localStorage.setItem('key', value);

//      불러오기
//      const value = localStorage.getItem('key');