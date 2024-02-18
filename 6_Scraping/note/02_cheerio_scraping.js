// Scraping 과 cheerio


// Scraping

//          특정 사이트의 정보를 가지고 오는 것


// 오픈 그래프

//      Open Graph 프로토콜

//          어떤 사이트의 미리보기 화면의 실체를 구성하는 메타 데이터의 표기 방법

//          어떤 HTML 문서의 메타정보를 쉽게 표시하기 위해서 메타정보에 해당하는 제목, 설명, 
//          문서의 타입, 대표 URL 등 다양한 요소들에 대해서 사람들이 통일해서 쓸 수 있도록 
//          정의해놓은 프로토콜

//      html 문서에서의 OG

//          어떤 사이트의 html 문서를 보면 <head> 태그 안의 <meta 태그 중 proprety="og:..." 
//          가 포함된 태그들이 있음. 여기서 og 가 오픈그래프의 약자.

//          이 태그들을 보면 사이트의 소개 문구, 대표 로고 이미지 등의 정보가 저장되어 있음

//          이 태그의 내용을 보고 사이트의 미리보기 화면을 만듬
//          (카카오톡으로 링크 보낼때 함께 뜨는 화면)


// Scrapping 실습

//      1. 실습 파일 생성
//          1) index.js 파일 생성

//      2. 채팅 입력 함수 생성
//          1) 함수 선언
                `const createMessage = () => { }`

//          2) 입력된 메시지에서 http로 시작하는 문자열 추출
                `const url = "https://www.naver.com";`
//              추출했다고 가정
//              .find() 메서드 등의 알고리즘을 사용해서 추출

//          3) axios 로 Scraping 하기
//              axios.get()으로 api 요청해 html 코드 받아오기
`               const result = await axios.get(url);
                console.log(result.data);
`//             - result.data : api 응답 바디

//              await 사용되었으므로 함수에 async 넣기
                `const createMessage = async () = { ... }`

//          4) cheerio 로 OG 코드 골라내기

//              * cheerio 의 자세한 사용 방법은 공식 문서 참고
//                https://cheerio.js.org

//              응답 바디에서 html 코드 인식해 저장
                `const htmlCode = cheerio.load(result.data);`

//              html 코드에서 meta 태그 선택 후 og 가 포함된 속성
`               htmlCode("meta").each(() => {
                
                })
`
//              - htmlCode("meta") : cheerio 사용해 html 에서 meta 코드만 골라내기
//              - each() : 각각의 meta 태그에 대해 반복문 돌림 (cheerio 제공 기능)