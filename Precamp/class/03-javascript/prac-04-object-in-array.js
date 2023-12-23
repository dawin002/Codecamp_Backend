// 객체 배열 다루기

let students = [
    {name: 'dawin', age: 27, camp: 'apple',},
    {name: 'hyein', age: 23, camp: 'ynu',},
    {name: 'jjun', age: 23, camp: 'aug',}
]
// undefined

students
// (3) [{…}, {…}, {…}]
// 0: {name: 'dawin', age: 27, camp: 'apple'}
// 1: {name: 'hyein', age: 23, camp: 'ynu'}
// 2: {name: 'jjun', age: 23, camp: 'aug'}
// length: 3
// [[Prototype]]: Array(0)

students.length
// 3

students[0].name
// 'dawin'

students[1]["age"]
// 23