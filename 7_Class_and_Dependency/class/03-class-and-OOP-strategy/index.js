// 전략 패턴 실습

// 도망가는 기능 자체를 전략으로 만들어두기
class 공중부품 {

    // 공중부품 전략에 해당하는 run 행위
    run = () => {
        console.log("날아서 도망가자!");
    }
}

class 지상부품 {
    run = () => {
        console.log("뛰어서 도망가자!");
    }
}

// 클래스 안에서 기능 
class Monster {

    power = 10
    부품;   // 초기화시키지 않고 필드 선언

    constructor(부품) { // 필드 초기화
        this.부품 = 부품;
    }
    
    // 전략에 따라 다른 행위를 수행
    run = () => {
        this.부품.run();
    }
}

// 전략을 선택해 Monster 객체 생성 (전략도 객체로 생성해 전달)
const myMonster1 = new Monster(new 공중부품()) 
myMonster1.run()

const myMonster2 = new Monster(new 지상부품())
myMonster2.run()
