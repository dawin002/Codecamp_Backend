// 상속

//          어떤 클래스의 기능을 새로운 클래스가 물려받는 것

// 상속 실습

//      1. 클래스 상속

//          어떤 클래스의 필드와 메서드를 물려받은 클래스를 생성하는 것

`               class Parent {

                }

                class Child extends Parent {
                    
                }
`//             Child : 상속을 받는 클래스
//              Parent : 상속을 해주는 클래스


//      2. 함수 오버라이딩

//          부모 클래스의 메서드를 자식 클래스에서 재정의하는 것
//          오버라이딩한 메서드는 부모 클래스의 메서드를 덮어씀

`               class Parent {
                    run = () => {
                        console.log("10의 속도로 달린다.")
                    }
                }

                class Child extends Parent {
                    run = () => {
                        console.log("20의 속도로 달린다.")
                    }
                }
`//             run() 메서드를 오버라이딩
//              Child 객체의 run()을 호출하면 "20의 속도로 달린다."가 출력됨


//      3. 생성자 오버라이딩

//          부모 클래스의 생성자를 자식 클래스에서 재정의하는 것
//          자식 클래스의 생성자에서 super() 함수를 이용해 부모 클래스의 생성자를 호출

//          자식 클래스의 생성자 생략시 비어있는 constructor()가 자동 생성됨
//          비어있는 constructor()는 자식 생성자가 받은 인자를 부모 생성자에게 그대로 전달

`               class Parent {
                    constructor(speed) {
                        this.speed = speed
                    }
                }

                class Child1 extends Parent {

                    // 생성자 오버라이딩
                    constructor(childSpeed) {
                        super(childSpeed + 10)
                    }
                }

                class Child2 extends Parent {
                    
                    // 비어있는 constructor
                    // constructor(...args) {
                    //     super(...args)
                    // }
                }
`//             super() 함수를 이용해 Parent 클래스의 constructor를 호출
//              Child1 클래스의 constructor가 받은 인자를 조작해서 전달

//              Child2 에서 constructor 생략 -> 비어있는 constructor 자동 생성
//              비어있는 constructor는 코드에 작성되진 않음
//              Child2 객체 생성시 전달받은 인자를 그대로 부모 생성자로 전달