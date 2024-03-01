
// 타입 명시
let aaa: string = "안녕하세요";
aaa = 10

// 타입 추론
let bbb = "반갑습니다";
bbb = 3;

// 타입 명시가 필요한 상황
let ccc: number | string = 1000
ccc = "1000원"

// 숫자 타입
let ddd: number = 10
ddd = "철수"

// 불린 타입
let eee: boolean = true
eee = false
eee = "false" // JS에서는 true로 작동함 (안좋은 케이스)


// 배열 타입
let fff: number[] = [1, 2, 3, 4, 5, "6"]    // number 타입 배열
let ggg: string[] = ["안", "녕", "하", 10]  // string 타입 배열

let hhh1 = [1, 2, 3, "4", "5", "6"]  // 두개 이상 타입 추론
let hhh2: (string | number)[] = [1, 2, 3, "4", "5", "6"] // 두개 이상 타입 명시


// 객체 타입 (타입 추론)
const profile = { // 객체 선언시 타입 추론 (객체명 커서 올리면 확인 가능)
    name: "철수",
    age: 8
}
profile.name = "훈이"   // 가능
profile.age = "8살"     // 에러 : profile.age의 타입 추론이 끝나서
profile.hobby = "수영"  // 에러 : prifile 객체 타입의 추론이 끝나서


// 객체 타입 (타입 명시)
interface IProfile {
    name: string
    age: number | string
    hobby: string
}
const profile2: IProfile = { 
    name: "철수",
    age: 8
    // 에러 : IProfile2 에서 명시한 hobby 필드가 빠져서
}
profile2.name = "훈이"   // 가능
profile2.age = "8살"     // 가능 : age 타입을 (number | string)으로 명시해서
profile2.hobby = "수영"  // 가능


// 객체 타입 (타입 명시)
interface IProfile3 {
    name: string
    age: number | string
    hobby?: string  // ? : hobby가 처음에 없을 수도 있지만 추가된다면 타입 명시
}
const profile3: IProfile3 = {
    name: "철수",
    age: 8
    // hobby 필드가 없지만 ? 처리 해둬서 객체 생성 가능
}
profile3.name = "훈이"   // 가능
profile3.age = "8살"     // 가능 : age 타입을 (number | string)으로 명시해서
profile3.hobby = "수영"  // 가능


// 함수 타입
function add_error (num1, num2, unit) {  // 매개변수 타입 추론 => 에러
    
}

add_error(100, 200, "원")

function add (num1: number, num2: number, unit: string): string {
    return num1 + num2 + unit
} // 함수의 매개변수 타입 명시

const result = add(100, 200, "원")

const add2 = (num1: number, num2: number, unit: string): string => {
    return num1 + num2 + unit
} // 함수의 매개변수 타입 명시

const result2 = add2(100, 200, "원")


// any 타입

let qqq: any = "철수"
qqq = 123
qqq = true