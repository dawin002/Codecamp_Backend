// Node.js에서 파일 불러오기


// 기존 방식 (HTML)

//      예시 : game.html
        <script scr="game.js"></script>


// Node.js 방식


// import 와 export

//      import, export 키워드 사용
//      원하는 값만 골라서 가져올 수 있음

//      export 예시 : game.js
        export let apple = 10;
        export const banana = 3;

//      import 예시 : index.js
        import { apple, banana } from 'game.js';


// 전체 한번에 import 하기

//      파일의 모든 함수나 클래스를 한번에 import 하기
//      바로 사용은 못하고 as 키워드 사용해야 함

        import * as fruit from 'game.js';

        console.log(fruit.apple);
        console.log(fruit.banana);


// import 후 이름 바꾸기

//      import 한 뒤 as 키워드 사용해 이름 바꿀 수 있음

        import { apple as fruit1, banana as fruit2 } from 'game.js';

        
// export default

//      export default로 기본 export 함수를 만들 수 있음
//      default 키워드는 한 파일에서 한번만 사용 가능
//      중괄호 없이 import 할 경우 무조건 default로 선언된 함수나 클래스를 가져옴
//      default로 export된 함수를 가져오기 때문에 import 문에서 이름을 바꿔도 바뀐 이름으로 사용 가능

//      export default 예시 : game.js
        export default graph = 15;

//      export default 예시 : index.js
        import favoriteFruit from 'game.js';    // => graph을 favoriteFruit로 이름이 바꾸어 import함

//      export default 예시 2 : index.js
        import defFruit, { apple, banana } from 'func.js';  
        // graph을 defFruit로 이름 바꾸고, apple 와 banana 를 골라서 import


// import 문 인식 작업
//      import 문이 뭔지 이해시켜야 함

//      1. package.json 파일 생성
//          1) 현재 디렉토리 통합 터미널 열기
//          2) 터미널에 yarn init 입력
//             (yarn 에러 발생 : 메모에 작성)
//          3) 터미널에 입력하라고 뜨는 것들 다 엔터 치고 넘어가기
//          4) 현재 디렉토리에 package.json 파일이 생성됨

//      2. package.json 에 "type": "module" 속성 추가하기
//          1) 파일의 중괄호 안 마지막 줄에 "type": "module" 코드 추가

//      => import 가 뭔지 이해하고 인식해 정상 실행됨