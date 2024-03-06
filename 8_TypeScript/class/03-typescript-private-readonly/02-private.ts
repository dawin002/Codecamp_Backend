// public, private, protected, readonly

class Monster_Private { // Monster 클래스명은 이미 같은 프로젝트에 존재하기 때문에 에러
    
    // power          => 매개변수에 접근 지정자 / readonly가 붙으면 선언하면 안됨

    // private 로 매개변수 받기
    constructor(private power: any) {
        // this.power = power;      => 접근 지정자 / readonly 가 붙으면 생략 가능
    }

    attack1() {
        console.log("공격하자!");
        console.log("내 공격력은 " + this.power + " 야!!");
    }

    powerUp() {
        this.power += 10;   // 클래스 내에서 수정 가능
    }
}

class AirMonster_Private extends Monster_Private {
    attack2() {
        console.log("공격하자!");
        // console.log("내 공격력은 " + this.power + " 야!!"); // 자식이 접근 불가
    }

    powerUp2() {
        // this.power += 10;   // 자식이 수정 불가
    }
}

const myMonster_Private = new AirMonster_Private(20)

myMonster_Private.attack1()

myMonster_Private.attack2()

// console.log(myMonster_Private.power)    // 밖에서 접근 불가

// myMonster_Private.power = 10    // 밖에서 수정 불가