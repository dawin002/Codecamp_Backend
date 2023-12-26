// early-exit 패턴

//      에러 상황을 먼저 검사해 일찍 종료시키는 패턴
//      코드의 가독성을 높일 수 있음

//      예시
const func1 = function(number) {
    if (number < 0) {   // 예외 조건을 먼저 검사해
        console.log("[ERROR] number is less then 0.");  // 예외 처리를 하고
        return; // 동작을 종료시킴
    } 

    // 예외 조건에 해당하지 않는 경우 함수 기능 동작
    result = number * 3 + 2;
    return result;
}