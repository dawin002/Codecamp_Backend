// 이메일 마스킹하기 실습

const email = 'codecamp@gamil.com'
// undefined
email.includes('@')
// true
let userMail = email.split('@')[0]
// undefined
let companyMail = email.split('@')[1]
// undefined
userMail
// 'codecamp'
companyMail
// 'gamil.com'
let maskingMail = []
// undefined
maskingMail.push(userMail[0])
// 1
maskingMail.push(userMail[1])
// 2
maskingMail.push(userMail[2])
// 3
maskingMail.push(userMail[3])
// 4
maskingMail.push('*')
// 5
maskingMail.push('*')
// 6
maskingMail.push('*')
// 7
maskingMail.push('*')
// 8
let result = maskingMail.join("") + '@' + companyMail
// undefined
result
// 'code****@gamil.com'