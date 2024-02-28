// 클래스 선언

class Monster {

    power = 10

    constructor(power) {
        this.power = power;
    }

    attack() {
        console.log("공격하자!");
        console.log("내 공격력은 " + this.power + " 야!!");
    }

    run = () => {
        console.log("도망가자!");
    }
}

// Monster 를 상속받은 클래스 선언

class 공중몬스터 extends Monster {

    // 생성자 오버라이딩
    constructor(airPower) {
        super(airPower * 2) // 인자를 변형해 부모 생성자로 전달 가능
    }

    // run 함수 오버라이딩 (부모의 run을 덮어쓰기)
    run = () => {
        console.log("날아서 도망가자!!")
    }
}

class 지상몬스터 extends Monster {

    // 생성자 오버라이딩 (받은 인자를 그대로 전달) => 생략 가능
    // constructor(groundPower) {
    //     super(groundPower)
    // }

    run = () => {
        console.log("뛰어서 도망가자!!")
    }
}

const myMonster1 = new 공중몬스터(20)
myMonster1.attack()
myMonster1.run()

const myMonster2 = new 지상몬스터(50)
myMonster2.attack()
myMonster2.run()
