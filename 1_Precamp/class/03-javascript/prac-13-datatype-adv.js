

// 배열과 객체의 비교

let arr = [1, 2, 3];
arr === [1, 2, 3];
// false
// 이유는?

/*

JS의 Data Type은 두 가지로 분류 : 원시타입 / 참조타입

원시 타입 ( Primitive type )

    String, Number, Boolean, Bigint, undefined, Symbol, Null

    특징
        불변성 : 사실 JS의 변수에 값를 저장하면, 값의 데이터를 직접 저장하는게 아니라 
                값이 저장된 메모리의 주소 데이터가 변수에 저장됨
                => 변수를 재할당(값을 바꾸는거)해주면 재할당해준 값이 새로운 메모리
                   공간에 저장되고 변수가 참조하는 주소값이 새로운 주소값으로 바뀜

        하나의 변수가 하나의 주소에 연결됨

참조 타입 ( Reference type )

    원시 타입 외 모든 타입 ( Object, ... )

    특징
        메모리에 저장된 객체 데이터를 가리키는 주소값을 가리키는 주소가 변수에 저장됨


따라서 arr === [1,2,3] 연산은 엄격한 동치 연산으로 arr에 저장된 객체의 주소값과 새롭게 생성된 [1,2,3]이라는 배열 고유의 주소값을 비교해 항상 false 반환



값의 복사

원시 타입의 값의 복사

    let origin = "hi";
    let copy = origin;
    origin = "bye";

    console.log(origin);  // "hi"
    console.log(copy);    // "bye"


참조 타입의 값의 복사

    let origin = [1, 2, 3];
    let copy = origin;
    origin.pop(); 

    console.log(origin);  // [1, 2]
    console.log(copy);    // [1, 2]

*/

