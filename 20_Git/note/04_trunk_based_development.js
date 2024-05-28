// CI/CD 기반 협업 방식

//      CD/CD 에 적합한 깃 전략

//          트렁크 기반 개발
//          Trunk Based Development

//      Trunk Based Development

//          큰 통에 그냥 쏟아붇는 것과 같은 방식

//          feature 로 만든 것을 CI/CD의 Develop 서버에 다 Pull Request
//          올라온 PR을 2명 이상 승인하면 테스트코드 실행 후 병합

//          병합되는 즉시 테스트(CI), 레지스트리 PUSH(CD) 진행해서 배포됨

//          Gitflow와 가장 큰 차이점은 Release Branch가 없음

//          배포까지의 속도가 빠른 것이 장점

//          CI/CD의 Develop 서버, Staging 서버, Production 서버 다 동일하게 적용