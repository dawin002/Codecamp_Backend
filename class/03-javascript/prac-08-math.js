// 수학 객체

// 자주 사용되는 메소드

// max() : 최대값
Math.max(2, 1, 6)

// min() : 최소값
Math.min(2, 1, 6)

// random() 0~1 랜덤 수 생성
Math.random()

// round() : 반올림
Math.round(2.16)

// ceil() : 올림
Math.ceil(2.16)

// floor() : 버림
Math.floor(2.16)



// 6자리 인증번호 만들기 실습 1

Math.floor( Math.random() * 1000000)
// 674885

String( Math.floor( Math.random() * 1000000 ) )
// '674885'  : 문자열로 만들어진 인증번호

String( Math.floor( Math.random() * 1000000 ) )
// '70061'  -> 이것 처럼 6자리가 안될 수도 있음 소수점 아래가 0으로 시작해서

String( Math.floor( Math.random() * 1000000 ) ).padStart(6,"0")
// '070061' -> 첫번째 자리를 0으로 채움

// padStart()
'...'.padStart(6, "0")  // 6글자가 안되면 앞을 "0"으로 채워라
// '000...'

let result = String( Math.floor( Math.random() * 1000000 ) ).padStart(6,"0")

result
// '586951'
result
// '586951'
result
// '586951'

// 지금은 result를 불러왔을 때 같은 수만 나오지만 매번 새로운 수가 나오게 할 수도 있음