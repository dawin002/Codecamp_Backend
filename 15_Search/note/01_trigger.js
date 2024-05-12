// Trigger & Procedure

//      데이터베이스의 대표적인 기본 기능 Trigger와 Procedure 알아보기

//      Trigger
//          A 작업이 끝나면 B 작업을 실행해줘
//          ex) 특정 작업을 수행할 때 로그 기록하기

//      Procedure
//          DB 에서 함수 만들기
//          ex) 더미(가짜) 데이터 만들기

// Trigger 실습

//      강의자료 참고해 vscode 에서 실습 진행

//          프로젝트 폴더 복사는 14-07-file-upload-cloud-functions 복제할 것
//          (내가 이름 바꿈, 원래는 14-07-file-upload-thumbnail-trigger)

//      ** subscriber

//          구독자, 
//          엔티티를 계속 관측하고 있다가 변화가 생기면 자신의 코드를 실행

//      1. 트리거는 언제 사용하면 안될까?

//          트랜잭션으로 연결된 중요한 내용들...
//          트리거로 구현된줄 모르고 중복으로 구현할 수 있기 때문

//      2. 어떤 것들을 사용하면 좋을까?

//          메인 로직에 큰 피해를 끼치지 않는 로직들...(통계 계산하기, 로그 쌓기)


// 트리거로 로그 찍어보기

//      createProduct API 요청

`           mutation {
              createProduct(createProductInput: {
                name: "모니터",
                description: "좋은 모니터",
                price: 9000,
              	productSaleslocation: {
                  address: "구로",
                  addressDetail: "구로역",
                  lat: 101.111,
                  lng: 25.123,
                  meetingTime: "2022-11-11"
                },
                productTags: ["구로", "모니터"],
                productCategoryId: "(DBever에서 카테고리 ID 하나 복사해 넣기)"
              }) {
                id
              }
            }
`

//      createProduct API 응답
`           {
              "data": {
                "createProduct": {
                  "id": "(DB에 등록된 상품 ID)"
                }
              }
            }
`

//      백엔드 서버에서 찍힌 로그
`           (DB에 등록된 상품 ID) 모니터 좋은 모니터 9000 false
`