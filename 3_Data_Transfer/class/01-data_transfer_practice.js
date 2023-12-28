// Playground 실습

//      http://backend-example.codebootcamp.co.kr/graphql API 연습

//      Profile -> Board -> Products 순으로 실습
//          Profile의 문제점 해결해 Board에 적용됨
//          Board의 문제점 해결해 Products에 적용됨



// 1. Profile 관련 API

// 1-1. 프로필 추가 요청

// mutation {
//     createProfile(name: "짱구", age: 5, school: "떡잎유치원") {
//         message      // ProfileReturn 데이터로 message 만 받겠다
//     }
// }

// 1-2. 프로필 추가 응답

// {
//     "data": {
//         "createProfile": {
//             "message": "프로필이 정상적으로 등록되었습니다."
//         }
//     }
// }

// 1-3. 프로필 상세 조회 요청

// query {
//     fetchProfile(name: "짱구") {
//         number,
//         name,
//         age,
//         school,
//         __typename
//     }
// }

// 1-4. 프로필 상세 조회 응답

// {
//     "data": {
//         "fetchProfile": {
//             "number": 1262,
//             "age": 5,
//             "school": "우정유치원",
//             "__typename": "ProfileReturn"
//         }
//     }
// }

//   => 내가 입력했던 데이터가 아님
//      fetchProfile() 은 프로필 목록이 아닌 하나의 프로필만 가져오는 함수
//      프로필의 이름이 동명이인인 경우 다른 사람이 등록한 프로필이 반환될 수 있음

//   ==> fetchProfile() 은 잘못 만든 API 이다.



// 2. Board 관련 API

// 2-1. 게시글 등록 요청

// mutation {
//     createBoard(writer: "짱구", title: "일기", contents: "울라울라~" ) {
//         number       // 보통 BoardReturn 으로 게시글 번호를 받음
//     }
// }

// 2-2. 게시글 등록 응답

// {
//     "data": {
//         "createBoard": {
//             "number": 20843      // 게시글 번호가 리턴됨
//         }
//     }
// }

// 2-3. 게시글 상세 조회 요청

// query {
//     fetchBoard(number: 20843) {
//         writer
//         title
//         contents
//         like
//         createdAt        // => Return 을 줄바꾸며 입력할 때는 콤마(,) 생략 가능
//     }
// }

// 2-4. 게시글 상세 조회 응답

// {
//     "data": {
//         "fetchBoard": {
//             "writer": "짱구",
//             "title": "일기",
//             "contents": "울라울라~",
//             "like": 0,
//             "createdAt": "2023-12-28T11:09:00.059Z"
//         }
//     }
// }

//   => 내가 등록한 게시글이 정확히 조회됨
//      DB에서 유일한 게시글 번호로 조회 요청을 보냈기 때문

// 2-5. 게시글 수정 API 명세

// updateBoard(
//     number: Int
//     writer: String
//     title: String
//     contents: String
// ): Return

//   => number로 찾은 게시글의 writer을 수정한다는건지
//      writer로 찾은 게시글의 number을 수정한다는건지 명확하지 않음

//   ==> updateBoard() 는 잘못 만든 API 이다.


// 3. Product 관련 API

// 3-0. 상품 수정 API 명세

// updateProduct(
//     productId: ID
//     updateProductInput: UpdateProductInput!
// ): Return

// 타입 설명
// type UpdateProductInput {    // 객체 타입
//     name: String
//     detail: String
//     price: Int
// }

//   => 어떤 기준으로 상품을 찾아 어떤 내용을 수정하는지 명확
//          productId 로 상품을 찾아 
//          UpdateProductInput 타입의 객체로 받은 내용을 수정

// 3-1. 상품 등록 요청 

// mutation {
//     createProduct(
//         seller: "짱구"
//         createProductInput: {
//             name: "짱구의 옷"
//             detail: "똑같은 옷 개많음"
//             price: 300000
//         }
//     ) {
//         _id
//         number
//         message
//     }
// }

// 3-2. 상품 등록 응답

// {
//     "data": {
//         "createProduct": {
//             "_id": "525c655c-a069-4150-b838-c53a4728747e",   // 이 아이디로 상품 탐색 가능
//             "number": null,
//             "message": "상품이 정상적으로 등록되었습니다."
//         }
//     }
// }

// 3-3. 상품 상세 조회 요청

// query {
//     fetchProduct(productId: "525c655c-a069-4150-b838-c53a4728747e") {
//         name
//         price
//     }
// }

// 3-4. 상품 상세 조회 응답

// {
//     "data": {
//         "fetchProduct": {
//             "name": "짱구의 옷",
//             "price": 300000
//         }
//     }
// }

// 3-5. 상품 수정 요청

// mutation {
//     updateProduct(
//         productId: "525c655c-a069-4150-b838-c53a4728747e"
//         updateProductInput: {
//             price: 450000        // 수정하고 싶은 항목만 입력하면 해당 항목만 수정됨
//         }
//     ) {
//         _id
//         message
//     }
// }

// 3-6. 상품 수정 응답

// {
//     "data": {
//         "updateProduct": {
//             "_id": "525c655c-a069-4150-b838-c53a4728747e",   // 아이디는 바뀌지 않음
//             "message": "상품이 정상적으로 수정되었습니다."
//         }
//     }
// }

// 3-7. 상품 조회 요청

// query {
//     fetchProduct(productId: "525c655c-a069-4150-b838-c53a4728747e") {
//         name
//         price                // 상품 수정한 결과가 적용되었는지 조회
//     }
// }

// 3-8. 상품 상세 조회 응답

// {
//     "data": {
//         "fetchProduct": {
//             "name": "짱구의 옷",
//             "price": 450000
//         }
//     }
// }

//   => Product 관련 API의 방식을 실무에서 가장 많이 사용함

// 3-9. 상품 개수 조회 요청

//      매개변수 없음, 리턴타입 객체 아님

// query {
//     fetchProductsCount   // (), {} 적으면 안됨
// }

// 3-9. 상품 개수 조회 응답

// {
//     "data": {
//         "fetchProductsCount": 14170
//     }
// }