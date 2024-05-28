// 프로젝트 설계

//      강의자료 없음

// 프로젝트 설계 방법

//      엑셀을 사용해 프로젝트 설계

//      디자이너가 피그마 등의 툴을 사용해 화면을 만들어주면
//      화면을 보고 DB 구성과 API 구성 등을 설계해야 함

//      1. 기능 명세서 작성

//          구현해야 하는 화면의 모든 기능을 정리

//          DB와 효율적인 API를 만들기 위해 어떤 기능이 필요한지 분석

//          어떤 데이터에 DB가 필요한지에 초점을 맞추고 작성해야 함

//          화면(페이지)의 각 항목마다 기능이름, 기능타입, DB연동, DB컬럼 작성

//      2. ERD 작성

//          기능 명세서를 작성하며 DB에 필요한 테이블과 컬럼을 조사했음

//          1) 테이블과 컬럼을 ERD에 표 형식으로 작성
//              테이블간의 연관 관계는 외래키로 작성

//          2) 정규화/확장성 고려해 설계
//              기본적인 테이블, 컬럼, 관계를 작성한 뒤 필요하다면 정규화/확장성 고려해 설계
//              확장성: 이후에 추가될 기능을 미리 예상해 설계할 것
//              확장성은 1단계 정도만 고려, A가 필요하겠지? A가 있으려면 B도 필요하겠지? 안됨

//          3) 예시 데이터 작성해보기
//              브라우저에서 실제로 버튼을 눌렀다고 가정했을 때 데이터가 DB의 어떤 컬럼에 
//              들어가는지, 어떤 데이터가 조회되는지 직접 ERD 컬럼에 예시 데이터 입력/조회 해보기

//              누락한 컬럼이 존재하는지, 잘못 설계한 컬럼 없는지 확인하기 위함
//              개발 도중 잘못 설계된 컬럼 발생시 대처하기 어렵기 때문에 미리 확인
//              주로 수정, 삭제 기능에서 실수 많이 나옴

//              ex) 상품 등록 기능
//                  상품명, 상품내용, 상품이미지 작성 후 상품등록버튼을 눌렀다고 가정
//                  ERD의 해당 컬럼들에 예시 데이터 채워보기
//                  상품판매위치 컬럼이 누락됨 => ERD의 상품판매위치 컬럼 추가하기

//          4) ERD 클라우드 작성
//              작성한 ERD를 토대로 ERD 클라우드 (다이어그램) 그리기
//              ERD 클라우드를 파일 또는 출력물로 팀원과 공유

//      3. API 명세서 만들어보기 (선택)

//          페이지에서 사용될 API를 미리 설계해서 작성

//          기능명세서에 통합해도 되고 API명세서 시트를 만들어 작성해도됨

//          페이지별 필요한 API 함수 이름과 파라미터 작성

//      4. 시퀀스 다이어그램 작성 (선택)

//          복잡한 API, 로직 정리

//          복잡한 로직이 필요한 API의 경우 시퀀스 다이어그램으로 작성

//          모든 API의 시퀀스 다이어그램을 만들기는 힘들고 핵심 API 또는 복잡한 API에 한해 작성