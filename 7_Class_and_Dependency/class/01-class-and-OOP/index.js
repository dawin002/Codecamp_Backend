// 내장 객체 Date 테스트

// const date = new Date();
// console.log(date.getFullYear());
// console.log(date.getMonth() + 1);
// console.log(date.getDate());


// Date 클래스 재정의 가능

class Date {
    qqq = 3

    getFullYear() {
        return 2024
    }

    getMonth() {
        return 1
    }
}

// const myDate = new Date();
// console.log(myDate.getFullYear());
// console.log(myDate.getMonth() + 1);


// 클래스 선언

class Monster {

    power = 10

    hp

    constructor(power) {
        this.power = power;
    }

    attack() {
        console.log("공격하자! 내 공격력은 " + this.power + " 야!!");
    }

    run = () => {
        console.log("도망가자! 내 체력은 " + this.hp + " 야!!");
    }
}

// 객체 생성 및 사용

const myMonster1 = new Monster(20)  // 공격력 20으로 초기화한 객체
myMonster1.attack()
myMonster1.run()

const myMonster2 = new Monster(50)  // 공격력 50으로 초기화한 객체
myMonster2.attack()
myMonster2.run()

const myMonster3 = new Monster()    // 공격력 초기화하지 않은 객체
myMonster3.attack()
myMonster3.run()