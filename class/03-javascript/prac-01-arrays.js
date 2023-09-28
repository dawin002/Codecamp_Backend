// 배열

let arr = ["가", "나", "다", "라"]
console.log(arr)

// arr.length  : 배열 길이 구하기
console.log(arr.length)

// arr[0]  : 배열 값 꺼내기
console.log(arr[0], arr[2])

// arr.push()  : 배열 맨 뒤 값 추가
arr.push('마')
console.log(arr)

// arr.pop()  : 배열 맨 뒤 값 삭제
console.log(arr.pop())
console.log(arr)

// arr.sort()  : 배열 정렬
arr.sort()
console.log(arr)

// arr.includes(값)  : 배열 데이터 확인
console.log(arr.includes('나'))
console.log(arr.includes('마'))

// arr.concat(arr2)  : 배열 2개 연결
let arr2 = ['a', 'b', 'c']
arr2 = arr2.concat(arr)
console.log(arr2)

// arr.join()  : 배열 문자열로 만들기
console.log(arr.join(", "))

// arr.slice()  : 배열 분리
console.log(arr.slice(1, 3))

// arr.filter()  : 배열에서 원하는 요소 뽑기


// arr.map()  : 배열의 모든 요소 변경