// 객체 실습

const friend = {
    name: "철수",
    age: 13,
    camp: "codecamp",
}
// undefined

friend
// {name: '철수', age: 13, camp: 'codecamp'}

friend.name
// '철수'

friend['age']
// 13

friend.address
// undefined

// Object.keys(객체명)
// 객체의 key를 배열로 반환

Object.keys(friend)
// ['name', 'age', 'camp']



// Object.values(객체명)
// 객체의 value를 배열로 반환

Object.values(friend)
// ['철수', 13, 'codecamp']