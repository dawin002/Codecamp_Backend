// for문 심화 : for-in, for-of


// for-in

// for-in 은 객체의 키(인덱스)를 받아와서 반복함
// 꼭 key라는 변수 사용 안해도 됨
// 주로 배열보다는 객체에서 사용

const arr = ['a', 'b', 'c', 'd', 'e'];

for(let key in arr) {
    console.log(key);
}
// 0 1 2 3 4

for(let a in arr) {
    console.log(arr[a]);
}
// a b c d e

const person = {
    name: "dawin",
    age: 27,
    gen: "male",
    school: "ynu"
};

for(let a in person) {
    console.log(a);
}

// for-of

// for-of 는 배열의 요소를 하나씩 받아와서 반복
// 사용법은 for-in과 동일
// 파이썬의 for in 문, 자바의 forEach 문과 동일하게 동작

arr = ['a', 'b', 'c', 'd', 'e'];

for(let a of arr) {
    console.log(a);
}
// a b c d e