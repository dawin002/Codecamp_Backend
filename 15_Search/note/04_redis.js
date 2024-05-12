// Redis 와 Redis CLI

//      강의자료 보고 실습 진행
//      강의자료에 없는 내용만 필기

// Redis

//      Redis 특징

//          메모리 기반 데이터베이스
//          변수에 데이터를 저장함
//          껐다 켜면 데이터가 휘발되지만 휘발되지 않게 하는 옵션이 있음

//          key-value store
//              key, value, ttl 로 데이터가 저장됨
//              ttl : time to live
//                    데이터가 살아있을 수 있는 시간
//                    만료 시간이 지나면 데이터가 자동으로 삭제됨(휘발)
//                    원본이 바뀔 수 있기 때문에 임시로 저장하는 것

//      Redis 저장 용량

//          기본 설정으로 컴퓨터의 메모리 크기 만큼 사용 가능

//          Redis 사용 가능 메모리 용량 확인하기
//              redis-cli 에서 명령어 입력
`               config get maxmemory
`
//              결과값
`               1) "maxmemory"
                2) "0"
`//             => "0" : 기본값, 내 컴퓨터의 메모리를 모두 사용하겠다

//          메모리를 모두 사용하는건 좋은 것인가?
//              Redis가 메모리를 모두 할당하면 다른 프로그램을 실행할 수 없음
//              => 일반적으로 70% 정도를 maxmemory로 할당

//      maxmemory-policy

//          maxmemory를 모두 사용하면 어떻게 될까?
//          => maxmemory-policy 정책에 따라 다름

//          maxmemory-policy 확인하기
//              redis-cli 에서 명령어 입력
`               config get maxmemory-policy
`
//              결과값
`               1) "maxmemory-policy"
                2) "noeviction"
`//             => "noeviction" : 기본값, 기존 데이터 제거하지 않음

//          noeviction
//              No Eviction : 기존 데이터 제거하지 않는 정책
//              maxmemory를 모두 사용하면 더 이상 저장할 메모리 공간이 없는 상태로
//              기존 메모리도 제거하지 않기 때문에 프로그램이 종료됨

//          allkeys-lru
//              All Keys - Least Recently Used
//              모든 키중 가장 오랫동안 참조되지 않은 키를 교체하는 정책
//              Redis는 임시저장용으로 사용되기 때문에 가장 사용되지 않는 데이터를 삭제함

//              * Redis를 완전히 캐시용으로 사용해 옛날 데이터를 삭제해도 무관할 때 사용함

//              * 로그인 정보처럼 지우면 안되는 데이터가 있는 경우
//                여러대의 Redis를 연결해 묶음으로 사용하는 Redis-Cluster 사용


//      redis docker 종료하기 명령어

`           docker ps
            docker stop ${"컨테이너 아이디"}
            docker rm ${"컨테이너 아이디"}

            docker images
            docker rmi ${"이미지 아이디"}

            docker system prune -a // 종료된 컨테이너, 사용하지 않은 이미지 전체 삭제
`

//      NestJS 에 Redis 적용하기

//          Node.js 버전 확인 후 cache-manager-redis-store 라이브러리 설치해야함
`               node -v
`//             node 16.18.0 버전 이상인 경우 그냥 설치
//              node 16.18.0 버전 미만인 경우 cache-manager-redis-store@2.0.0 버전 지정 설치

//          AppModule 에 CacheModule 추가할 때 CacheModule을 찾을 수 없는 에러
//              최신 nestjs 버전이 올라가면서 모듈이 변경되어 발생한 에러
//              package.json 파일에서 "@nestjs/common": "^9.0.0" 로 nestjs 다운그레이드 할 것

//          CacheModule 에 store 설정할 때 redisStore 로 설정할 수 없는 에러
//              cache-manager-redis-store 최신 버전을 사용해 생기는 에러
//              cache-manager-redis-store@2.0.0 버전 지정 설치 후 다시 store: redisStore

//          CacheModule 전역으로 사용 설정하기
`               CacheModule.register<RedisClientOptions>({
                  ~~~,
                  isGlobal: true,
                }),
`//             register 함수는 모듈을 설정하고 현재 위치에서만 적용하는 함수인데
//              전역으로 설정하려면 isGlobal: true 옵션을 달아주면 됨
//              => 어디서든 Redis 접근 가능하게 설정


//      Redis 사용하기

//          Redis 에 데이터 저장하기
`               this.cacheManager.set('qqq', createBoardInput, 0);
`//             'qqq' : key
//              createBoardInput : value
//              0 : ttl (0: 영구저장, 100: 100초 or 100ms)
//              ** ttl 시간 단위는 라이브러리, 버전에 따라 다를 수 있음 docs 참고할 것

//      Docker 서버 실행해 GraphQL api로 Redis에 저장하기

//          Docker 서버 실행할 때 로컬의 MySQL 서비스 종료해야함
`               net stop mysql
`
//          Docker 서버에서 실습 끝나면 로컬의 MySQL 서비스 다시 시작하기
`               net start mysql
`

//          난 괜찮은데 버전 문제 때문에 GraphQL 요청에서 에러 발생하는 경우
//              main.ts 에서 다음 코드에서 사용되는 ValidatioinPipe 라이브러리 버전 낮추기
`               app.useGlobalPipes(new ValidationPipe());
`
//              package.json 의 "dependencies" 의 "class-validator" 라이브러리 버전 낮추기
`               "class-validator": "^0.13.2",
`
//              도커 컴퓨터 다시 빌드 및 실행하기
`               docker-compose build
                docker-compose up
`

//          Redis 컴퓨터의 redis-cli 에서 저장한 데이터 확인하기
`               get qqq
                ttl qqq
`//             get qqq => 등록한 게시글 객체 출력됨
//              ttl qqq => 등록한 게시글의 ttl 출력됨 (5000, 1초에 1씩 감소)

//              ttl 은 기본값으로 5000 으로 들어가있는데
//              BoradsResolver 에서 cacheManager.set('qqq', ~~~, 0) 으로 설정한 경우
//              ttl이 기본값 5000 초로 저장되는 것을 알 수 있음

//            * 근데 ttl 어떻게 바꾸는지 잘 모르겠음
//              cacheManager.set() 의 인자 ttl 값 변경해도 변경 안됨 ㅎㅎ;