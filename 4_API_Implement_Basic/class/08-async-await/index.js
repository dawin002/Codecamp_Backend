import axios from 'axios'

// 1. 비동기 방식 조회
function fetchAsync() {
    const result = axios.get("https://koreanjson.com/posts/1")
    console.log("비동기 방식 : ", result); // Promise { <pending> }
}

fetchAsync()

// 2. 동기 방식 조회
// async function fetchSync() {         => 함수 중복 선언 무제를 피하자!!! (화살표 함수로 변경)
//     const result = await axios.get("https://koreanjson.com/posts/1")
//     console.log("동기 방식 : ", result); 
//     console.log("응답 바디 데이터 : ", result.data);
//     console.log("title : ", result.data.title);
// }

const fetchSync = async () => { // 화살표 함수로 만들었을 때는 함수의 시작 부분(괄호 앞)에 async를 붙임
    const result = await axios.get("https://koreanjson.com/posts/1")
    console.log("동기 방식 : ", result); // 제대로된 결과 => { title: '...', ... }
    console.log("응답 바디 데이터 : ", result.data); // 바디 데이터만 고르기
    console.log("title : ", result.data.title); // 바디의 title이 키인 값만 고르기
}

fetchSync()