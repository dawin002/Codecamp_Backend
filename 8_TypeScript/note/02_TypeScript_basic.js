// TypeScript 예제 실습

// TypeScript 사용 준비하기

//      1. 실습 파일 생성
//          1) index.ts 파일 생성
//              TypeScript 이기 때문에 js 확장자가 아닌 ts 확장자 사용

//      2. TypeScript 설치

//          ** package.json 생성 생략 가능
//              typescript 를 설치하면 자동 생성됨

//          1) TypeScript 설치
`               yarn add typescript --dev
`
//      3. 설정 파일 생성 및 설정

//          1) tsconfig.json 파일 생성

//          2) 설정 파일 코드 작성
//              TypeScript Docs에서 Recommended 설정파일 코드 복붙
//              8_TypeScript\note\01_typescript.js 파일에 코드 있음


// TypeScript 실습하기

//      1. 변수 타입 지정

//          변수에 지정할 수 있는 기본 타입의 종류는
//          number, string, boolean 3가지

//          1) 타입 명시
`               let aaa: string = "안녕하세요"
                aaa = 10  // 타입 에러
`//             변수를 선언할 때 타입을 명시적으로 지정해주는 방식

//          2) 타입 추론
`               let bbb = "반갑습니다"
                bbb = 100  // 타입 에러
`//             변수를 선언할 때 타입을 명시적으로 지정해주지 않아도
//               처음 초기화된 데이터의 타입에 따라 자동으로 지정됨

//          3) 타입 명시가 필요한 상황
`               let ccc = 1000
                ccc = "1000원"  // 타입 에러
`//             변수에 저장될 데이터의 타입이 유동적으로 변해야 하는 상황
//              변수에 두 가지 이상의 타입을 명시적으로 지정할 수 있음

//          => 여러 개의 타입 지정
`               let ccc: number | string = 1000
                ccc = "1000원"
`//             | 연산자를 사용해 두개 이상의 타입 명시 가능

`               let ccc: (number | string) = 1000
`//             두 가지 이상의 타입을 지정할 때 괄호로 묶기도 함

//          4) boolean 변수의 타입 명시 중요성
`               let eee = true
                eee = false     // 가능
                eee = "false"   // 에러
`//             JavaScript 에서는 "" 와 같은 빈 문자열을 거짓으로 인식
//               "false" 와 같은 비어있지 않은 문자열은 참으로 인식
//              따라서 TypeScirpt의 boolean 변수의 타입 명시가 중요한 것

//      2. 배열 타입

//          1) 하나의 타입으로 이루어진 배열
`               let arr1: number[] = [1, 2, 3]
                let arr2: string[] = ["a", "b", "c"]
`//             배열 이름 뒤에 '타입명[]' 붙여서 명시

`               let arr3 = [1, 2, 3]
`//             배열 또한 타입 추론 가능

//          2) 두개 이상의 타입으로 이루어진 배열
`               let arr4 = [1, 2, 3, "a", "b"]
`//             타입 추론으로 배열 선언 가능
//              배열 이름에 마우스 커서 올리면 추론된 타입 확인 가능
//              -> arr4: (string | number)[]

`               let arr5: (boolean | number)[] = [true, 1, false, 2, 3]
`//             괄호 안에 두 가지 이상의 타입 작성해 배열의 타입 명시 가능

//      3. 객체 타입

//          1) 타입 추론
    `           const profile = {
                    name: "철수",
                    age: 8
                }
                profile.age = "8살"     // 에러
                profile.hobby = "수영"  // 에러
`//             타입 명시 없이 객체 생성시 객체의 타입 추론
//              객체 생성후 프로퍼티의 타입 변경 불가 (프로퍼티 타입 추론 끝나서)
//              객체 생성후 새로운 프로퍼티 추가 불가 (객체 타입 추론 끝나서) 


//          2) 타입 명시 (에러)
`               interface IProfile {
                    name: string
                    age: number | string
                    hobby: string
                }
                const profile: IProfile = {  // profile 에 에러 발생
                    name: "철수",
                    age: 8
                }
                profile.age = "8살"  // 가능 : age 타입을 (number | string)으로 명시해서
`//             interface 로 타입 정의
//              객체 생성시 객체명 뒤에 :인터페이스명 붙여 타입 명시
//              단, interface로 정의한 타입과 다르거나 프로퍼티가 다르면 객체 생성 불가
//               (IProfile 에는 hobby 있는데 prifle 에는 hobby 없음)

//          3) 타입 명시 (선택적 프로퍼티)
`               interface IProfile {
                    name: string
                    age: number | string
                    hobby?: string      // ? : 선택적 프로퍼티
                }
                const profile: IProfile = {
                    name: "철수",
                    age: 8
                    // hobby 가 없지만 선택적 프로퍼티여서 객체 생성 가능
                }
                profile.hobby = "수영"  // 가능
`//             프로퍼티 뒤에 ? 를 붙여서 선택적 프로퍼티로 정의 가능
//              선택석 프로퍼티는 객체를 생성할 때 반드시 포함시키지 않아도 됨
//              객체 생성 후 나중에 다시 추가 가능


//      4. 함수 타입

//          1) 함수 매개변수 타입 추론 (안됨)
`               function add (num1, num2, unit) {  // 에러
                
                }
`//             함수의 매개변수는 타입 추론이 되지 않음
//              어디서 몇번이든 호출 가능해서 어떤 데이터가 들어올지 모르기 때문
//              => 함수의 매개변수는 반드시 타입을 명시해줘야 함

//          2) 함수 매개변수 타입 명시
`               function add (num1: number, num2: number, unit: string) {
                
                }
`//             이처럼 매개변수의 타입을 무조건 명시해줘야 함

//          3) 함수 반환 타입 명시
`               function add (num1: number, num2: number, unit: string): string {
                    return num1 + num2 + unit;
                }

                const result = add(100, 200, "원")
`//             함수의 반환 타입 명시는 매개변수 다음에 ) 와 { 사이에 작성

//              * 반환 타입 명시는 생략 가능하지만 안하는게 좋음
//                반환값을 담는 변수의 타입도 예측 가능하기 때문에

//          4) 화살표 함수에서 타입 명시
`               const add = (num1: number, num2: number, unit: string): string => {
                    return num1 + num2 + unit;
                }

                const result = add(100, 200, "원")
`//             반환 타입 명시는 '=>' 앞에 작성


//      5. any 타입

//              타입을 정해두지 않고 변수를 사용하는 것
//              가급적 사용하지 않는 것이 좋음

`               let qqq: any = "철수"
                qqq = 123
                qqq = true
`//             타입 관계 없이 데이터 할당 가능
//              JavaScript와 동일