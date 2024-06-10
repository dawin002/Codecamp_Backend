class MyCar {
    constructor({ name, type, horsePower, color }) {
        this.name = name;
        this.type = type;
        this.horsePower = horsePower;
        this.color = color;
        this.speed = 0;
    }

    start() {
        this.speed = this.horsePower;
        console.log(`${this.name} 차랑이 ${this.speed} 속도로 출발했습니다.`);
    }

    stop() {
        this.speed = 0;
        console.log(`${this.name} 차랑이 멈췄습니다.`);
    }

    changeColor({ color }) {
        let prevColor = this.color;
        this.color = color;
        console.log(
            `${this.name} 차랑의 색상이 ${prevColor}에서 ${this.color}로 변경되었습니다.`
        );
    }

    upgrageHorsePower({ power }) {
        let prevHorsePower = this.horsePower;
        this.horsePower += power;
        console.log(
            `${this.name} 차랑의 마력이 ${prevHorsePower}에서 ${this.horsePower}로 업그레이드 되었습니다.`
        );
    }
}
