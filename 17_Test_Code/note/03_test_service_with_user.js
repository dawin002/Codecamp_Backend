// 회원가입 테스트와 DB 모킹 실습

//      강의자료에 없는 내용만 필기

// 실습

//      findOneByEmail 테스트

`           describe('findOneByEmail', () => {
              const result = usersService.findOneByEmail({ email: 'a@a.com' });
              expect(result).toStrictEqual({
                email: 'a@a.com',
                name: '짱구',
              });
            });
`//         객체끼리는 주소값으로 비교되기 때문에 toStrictEqual 로 객체를 문자열로 만들어서 비교

//          근데 findOneByEmail 테스트는 실제 DB 접속이 필요하기 때문에 문제가 있음
//          실제 DB를 조작하다가 데이터가 변형될 수도 있기 때문

//          => 테스트 코드에서 주석 처리
