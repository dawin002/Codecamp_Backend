// public, private, protected, readonly

class Monster_Public { // Monster 클래스명은 이미 같은 프로젝트에 존재하기 때문에 에러
    
    // power          => 매개변수에 접근 지정자 / readonly가 붙으면 선언하면 안됨

    // public 으로 매개변수 받기
    constructor(public power: any) {
        // this.power = power;      => 접근 지정자 / readonly 가 붙으면 생략 가능
    }

    // 아래 모든 위치에서 필드 조회, 수정 가능

    attack1() {
        console.log("공격하자!");
        console.log("내 공격력은 " + this.power + " 야!!");
    }

    powerUp() {
        this.power += 10;
    }
}

class AirMonster_Public extends Monster_Public {
    attack2() {
        console.log("공격하자!");
        console.log("내 공격력은 " + this.power + " 야!!");
    }
    
    powerUp2() {
        this.power += 10;   // 클래스 내에서 수정 가능
    }
}

const myMonster_Public = new AirMonster_Public(20)

myMonster_Public.attack1()

myMonster_Public.attack2()

console.log(myMonster_Public.power)

myMonster_Public.power = 10