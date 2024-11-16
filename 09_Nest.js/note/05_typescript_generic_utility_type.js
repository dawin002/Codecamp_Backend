// TypeScript Generic Type


// TypeScript의 타입들

//      기본 타입

//          string, number, boolean

//        * 매개변수

//          함수의 매개변수는 타입 추론이 안됨
//          -> 매개변수의 타입을 명시해줘야 함
//          -> 명시 안하면 any 타입으로 받는데 지양해야함

//          이유는 함수를 여러 곳에서 호출할 수 있기 때문에
//           타입을 정확히 명시하지 않으면 잘못 사용될 수 있어서

//          그래서 이렇게 쓰면 안됨!
`           const getPrimitive = (arg1, arg2, arg3) => {
            };

            getPrimitive("aaa", 12, true);
`
//          이렇게 써야 함
`           const getPrimitive = (arg1: string, arg2: number, arg3: boolean) => {
            };

            getPrimitive("aaa", 12, true);
`
//        * 반환 타입

//          함수의 반환 타입은 매개변수 다음에 명시해줘야 함
//          마우스를 반환값(result 변수)에 올리면 타입을 쉽게 알 수 있음

`           const getPrimitive = (...): [boolean, number, string] => {
                return [arg3, arg2, arg1];
            };

            const result = getPrimitive("aaa", 12, true);
`

//      any Type

//          어떤 타입의 데이터도 저장할 수 있음
//          JavaScript를 사용하는 것과 다를 게 없음

//          어떤 타입의 데이터도 매개변수로 받을 수 있고
//          어떤 타입의 데이터도 반환할 수 있음

`           const getAny = (arg1: any, arg2: any): [any, any] => {
                console.log(arg1 + 100);
                return [arg2, arg1];
            };
            
            const resultAny = getAny("aaa", 12);
`
//          따라서 반환 타입을 예측할 수 없고
//          함수 내부에서 예기치 못한 에러가 발생할 수 있음
//           arg1 + 100 의 arg1 이 boolean인 경우 에러 발생


//      unknown 타입

//          어떤 타입의 데이터도 저장할 수 있음
//          다만, 확실하지 않으면 계산할 수 없음
//          -> any 보다 조금 더 안전한 타입

//          타입이 확실하지 않은데 계산하는 코드가 있으면 에러 발생
//          특정 타입인 경우 계산하라는 코드는 실행 가능
`
            const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
                
                // 뭔지 모르기 때문에 계산할 수 없음
                console.log(arg1 + 100); 
            
                // 타입이 숫자라면 이라는 조건이 붙으면 계산할 수 있음
                if (typeof arg1 === "number")
                    console.log(arg1 + 100);
            
                return [arg3, arg2, arg1];
            };
            
            const resultUnknown = getAny("aaa", 12, true);
`
//          따라서 any 타입보다 조금 더 안전함


// Generic 타입

//      Generic 이란?

//          나만의 타입을 만들어 사용하는 것

//          어떤 타입이던 매개변수로 전달할 수 있음
//           대신 한번 데이터가 전달되면 제네릭 타입은 그 데이터의 타입으로 고정됨

//      사용 이유

//          라이브러리를 만들어 배포할 때 사용자가 어떤 타입을 넣을지 모르기 때문에
//           제네릭 타입으로 만들면 사용자가 타입을 직접 지정해서 사용할 수 있음

//      사용 방법

//          1) 함수 이름 바로 뒤에 <MyType> 처럼 사용할 타입의 이름을 꺽쇠에 넣어 적어줌
//          2) 함수의 인자와 반환 값에 모두 MyType 이라는 타입을 명시함
//          3) 함수를 호출할 때 인자를 전달하거나 타입을 직접 적어줌
//          4) 전달받은 데이터의 타입이나 작성해준 타입에 대해 타입스크립트가 추정할 수 있음
//          5) 함수의 입력 값에 대한 타입과 출력 값에 대한 타입이 동일한지 검증할 수 있음

//          함수 선언 - 일반 함수
`               function getGeneric<MyType> (arg: MyType): MyType {
                    return arg;
                }
`
//          함수 선언 - 화살표 함수
`               const getGeneric = <MyType> (arg: MyType): MyType => {
                    return arg;
                }
`
//          함수 호출 - 타입 생략
`               const result = getGeneric("aaa");
`
//          함수 호출 - 타입 명시
`               const result = getGeneric<string>("aaa");
`
//          매개변수 많을 때 줄이기

//              매개변수가 많을 때는 MyType1, MyType2, MyType3 대신
//              - T1, T2, T3
//              - T, U, V
//              등으로 단축해서 사용하기도 함
`               const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
                    return [arg3, arg2, arg1];
                }
`

// Utility 타입

//          기존에 있던 타입을 변형해 새로운 타입을 만드는 것

//      0. 일반적인 타입 선언

`           interface IProfile {
                name: string;
                age: number;
                school: string;
                hobby?: string;
            }
`//         ?: 있어도 되고 없어도 됨


//      1. Partial 타입

//          Partial : 부분
//          모든 프로퍼티를 있어도 되고 없어도 되게 만든 타입

`           type PaProfile = Partial<IProfile>;
`
//          IProfile의 모든 프로퍼티 뒤에 ?를 붙인 것과 같은 PaProfile 타입 생성
//          ? : 없어도 생성 가능


//      2. Required 타입

//          Required : 필수
//          모든 프로퍼티를 무조건 있어야 되게 만든 타입

`           type ReProfile = Required<IProfile>;
`
//          IProfile의 모든 프로퍼티 뒤에 ?를 뗀 것과 같은 ReProfile 타입 생성
//          모든 프로퍼티 있어야만 생성 가능


//      3. Pick 타입

//          Pick : 고르다
//          특정 프로퍼티만 포함시켜 새롭게 만든 타입
//          그 외 프로퍼티는 제거됨

`           type PiPrifile = Pick<IProfile, "name" | "age">;
`
//          IProfile의 일부 프로퍼티만 골라서 만든 PiProfile 타입 생성
//          name 과 age 만 프로퍼티로 가지는 타입


//      4. Omit 타입

//          Omit : 제외하다
//          특정 프로퍼티만 제외시켜 새롭게 만든 타입
//          그 외 프로퍼티는 포함됨

`           type OmPrifile = Omit<IProfile, "school">;
`
//          IProfile의 일부 프로퍼티만 제외시키고 만든 OmProfile 타입 생성
//          school 만 제외하고 그 외는 전부 프로퍼티로 가지는 타입


//      5. Union 타입

//          Union : 합친다
//          여러 값을 합쳐 해당 값만 가질 수 있게 만든 타입
//          얘는 다른 타입을 변형시켜 만드는 타입은 아님

`           type UType = "철수" | "유리" | "짱구";
`
//          값으로 "철수", "유리", "짱구" 세 문자열 중 하나만 가질 수 있는 타입
//          다른 문자열이나 값으로 선언하면 에러 발생


//      6. Record 타입

//          Record : 기록
//          Union 타입을 key, 다른 특정 타입을 value 로 하는 타입
//          Union 타입의 값마다 하나씩 특정 타입을 맵핑함

`           type RType = Record<UType, IProfile>;
`
//          UType의 철수, 유리, 짱구 세 값을 key로 가지고
//           각각의 key에 해당하는 IProfile 값을 value로 가짐

//          이렇게 정의한 것과 같음
`           type RType = {  
                철수: IProfile;
                유리: IProfile;
                짱구: IProfile;
            }
`
//          꼭 IProfile을 사용해야 하는 것은 아니고
//           number, string, boolean 모두 자유롭게 value로 사용할 수 있음


//      7. 객체의 key들로 Union 타입 만들기

//          'keyof 타입명' 을 사용하면 Union 타입을 쉽게 만들 수 있음
//          타입명의 키값이 이 Union 타입이 가질수 있는 값이 됨

`           type UType2 = keyof IProfile;
`
//          UType2로 선언한 변수는 IProfile 의 키값(문자열)으로만 초기화 가능

//          이렇게 정의한 것과 같음
`           type UType2 = "name" | "age" | "school" | "hobby";
`

//      Type vs. Interface 차이

//          [Interface]

//          같은 이름의 interface를 하나 더 만들면 두 interface가 합쳐짐
//          => 선언병합 가능

`           interface IProfile {
                candy: number;
            }
`//         candy 프로퍼티가 선언병합으로 추가됨
//          IProfile 타입의 객체를 생성할 때 candy 프로퍼티 빠지면 생성 불가

//          [Type]

//          type은 이미 정의되었기 때문에 선언병합 불가능


//      8. 배운 것 응용

//          선언병합한 IProfile의 candy 프로퍼티만 초기화해서 선언하기
//          지금은 hobby를 제외한 나머지 프로퍼티를 모두 초기화하라는 에러 발생

`           let profile: Partial<IProfile> = {
                candy: 10,
            };
`
//          Partial을 사용해 IProfile의 프로퍼티 뒤에 ? 붙임
//          candy 프로퍼티만 초기화해도 선언 가능
  