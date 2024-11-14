// public, private, protected, readonly

class Monster_Protected {
    // power          => 매개변수에 접근 지정자 / readonly가 붙으면 선언하면 안됨

    // protected 로 매개변수 받기
    constructor(protected power: any) {
        // this.power = power;      => 접근 지정자 / readonly 가 붙으면 생략 가능
    }

    attack1() {
        console.log("공격하자!");
        console.log("내 공격력은 " + this.power + " 야!!");
    }

    powerUp() {
        this.power += 10; // 클래스 내에서 수정 가능
    }
}

class AirMonster_Protected extends Monster_Protected {
    attack2() {
        console.log("공격하자!");
        console.log("내 공격력은 " + this.power + " 야!!"); // 자식이 접근 가능
    }

    powerUp2() {
        this.power += 10; // 자식이 수정 가능
    }
}

const myMonster_Protected = new AirMonster_Protected(20);

myMonster_Protected.attack1();

myMonster_Protected.attack2();

// console.log(myMonster_Protected.power)  // 밖에서 접근 불가

// myMonster_Protected.power = 10  // 밖에서 수정 불가
