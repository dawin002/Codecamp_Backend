// 실습 예제, 인기검색어

const fruits = [
    { number: 1, title: "레드향" }, 
    { number: 2, title: "샤인머스켓" }, 
    { number: 3, title: "산청딸기" }, 
    { number: 4, title: "한라봉" }, 
    { number: 5, title: "사과" }, 
    { number: 6, title: "애플망고" }, 
    { number: 7, title: "딸기" },
    { number: 8, title: "천혜향" }, 
    { number: 9, title: "과일선물세트" },
    { number: 10, title: "2" }, 
]
// undefined

let newFruits = []
// undefined

for(let i=0; i<10; i++) {
    newFruits.push(fruits[i].number + ' ' + fruits[i].title)
}
// 20

newFruits
// ['1 레드향', '2 샤인머스켓', '3 undefined', '4 한라봉', '5 사과', '6 애플망고', '7 딸기', '8 천혜향', '9 과일선물세트', '10 2']