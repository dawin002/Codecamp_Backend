// 얕은 복사, 깊은 복사

//      얕은 복사 : 주소값까지만 복사
//      깊은 복사 : 실제 데이터까지 복사


// 참조타입의 복사

const origin = {name: 'otter', age: 25};
const copy = origin;
//      -> 복사한 객체를 수정하면 원본 객체도 수정됨

// Heap 
//      JS 실행 환경의 임시 저장 메모리
//      유동적으로 크기가 변하는 데이터가 저장됨 (배열, 객체)
//      참조 타입의 실제 데이터가 존재하는 공간

//      객체는 실제 객체의 데이터가 저장된 Heap 공간의 주소값을 할당받음
//      -> const로 선언했음에도 프로퍼티 추가, 수정 가능한 이유
//      --> 객체를 복사했을 때 주소값만 복사되어 할당되기에 복사본과 원본이 데이터 공유

// 객체의 복사 기본

//      각각의 프로퍼티를 직접 할당
//      단점: 매번 해당하는 키와 값을 작성해줘야 해서 번거로움

const copy1 = {
    name: origin.name, 
    age: origin.age
};

// 객체의 spread 복사 (얕은 복사)

//      spread 연산자를 사용해 간단히 복사
//      단점: 프로퍼티 중 참조타입(객체/배열)이 존재할 때 주소값만 복사됨(얕은 복사)
//           -> 원본 객체와 연결됨

const origin2 = {
    name: 'otter',
    age: 25,
    hobby: {
        first: 'run',
        second: 'study'
    }
};

const copy2 = {...origin}; 
//      -> copy2의 hobby 수정시 origin2의 hobby도 수정됨


// 객체의 깊은 복사

//      JSON 데이터 포맷을 사용
//      JSON.stringify()로 객체를 문자열로 변환해 임시 변수에 할당
//      JSON.parse()로 임시 변수를 원본 타입으로 변환해 복사본 객체에 할당

const tempCopy = JSON.stringify(origin2);   // 문자열로 변환하고
const deepCopy = JSON.parse(tempCopy);      // 원본 형태로 변환해 할당