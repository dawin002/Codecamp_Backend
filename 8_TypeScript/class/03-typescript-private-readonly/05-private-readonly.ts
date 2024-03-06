// public, private, protected, readonly

class Monster_PrivateReadonly {
    
    // power          => 매개변수에 접근 지정자 / readonly가 붙으면 선언하면 안됨

    // private readonly 으로 매개변수 받기
    constructor(private readonly power: any) {
        // this.power = power;      => 접근 지정자 / readonly 가 붙으면 생략 가능
    }

    attack1() {
        console.log("공격하자!");
        console.log("내 공격력은 " + this.power + " 야!!");
    }

    powerUp() {
        // this.power += 10;   // 클래스 내에서 수정 불가
    }
}

class AirMonster_PrivateReadonly extends Monster_PrivateReadonly {
    attack2() {
        console.log("공격하자!");
        // console.log("내 공격력은 " + this.power + " 야!!");  // 자식이 접근 불가
    }
    
    powerUp2() {
        // this.power += 10;   // 자식이 수정 불가능
    }
}

const myMonster_PrivateReadonly = new AirMonster_PrivateReadonly(20)

myMonster_PrivateReadonly.attack1()

myMonster_PrivateReadonly.attack2()

// console.log(myMonster_PrivateReadonly.power)    // 밖에서 접근 불가

// myMonster_PrivateReadonly.power = 10    // 밖에서 수정 불가