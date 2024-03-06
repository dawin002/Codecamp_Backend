// TypeScript Private Readonly

//      Member Visibility?

//          Java의 '접근 지정자'와 같은 개념
//          멤버에 접근할 수 있는 범위를 지정함

//          public : 선언한 클래스, 자식 클래스, 클래스 외부 모두 접근 가능
//          private : 자식 클래스, 클래스 외부 접근 불가능
//          protected : 선언한 클래스, 자식 클래스 접근 가능, 클래스 외부 접근 불가능

//      readonly 속성

//          멤버를 읽기 전용으로 지정할 수 있는 속성

//      NestJS 에서의 private readonly

//          NestJS에서 private readonly 를 많이 사용
//          예상치 못한 데이터의 변경을 방지하기 위해 사용

// 실습

//      07_Class...\class\02-class...\index.js 의 코드 복사해
//       클래스 필드, 메서드, 생성자 매개변수의 접근지정자 실습

//      1. 생성자 매개변수의 접근지정자

//          생성자의 매개변수에 접근 지정자 또는 readonly를 붙이면 해당 매개변수는
//           자동으로 클래스의 필드로 선언 및 초기화됨

//          같은 이름의 필드를 클래스에서 선언하면 에러 발생
//          생성자에서 this.필드를 사용해 초기화하는 코드 생략 가능

`           constructor(public name: string){
                // this.name = name 생략 가능
            }`

//      2. public

//          멤버 선언 클래스 : 접근 O, 수정 O
//          상속 자식 클래스 : 접근 O, 수정 O
//          선언 클래스 외부 : 접근 O, 수정 O

//      3. private

//          멤버 선언 클래스 : 접근 O, 수정 O
//          상속 자식 클래스 : 접근 X, 수정 X
//          선언 클래스 외부 : 접근 X, 수정 X

//      4. protected

//          멤버 선언 클래스 : 접근 O, 수정 O
//          상속 자식 클래스 : 접근 X, 수정 X
//          선언 클래스 외부 : 접근 X, 수정 X

//      5. readonly

//          멤버 선언 클래스 : 접근 O, 수정 X
//          상속 자식 클래스 : 접근 O, 수정 X
//          선언 클래스 외부 : 접근 O, 수정 X

//      6. private readonly

//          멤버 선언 클래스 : 접근 O, 수정 X
//          상속 자식 클래스 : 접근 X, 수정 X
//          선언 클래스 외부 : 접근 X, 수정 X