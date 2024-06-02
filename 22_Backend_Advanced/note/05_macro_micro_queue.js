// 매크로큐 & 마이크로큐

//      태스크 큐 -> 매크로 큐와 마이크로 큐로 나눠짐

//      개념 설명은 강의자료 참고

//      매크로 큐 vs 마이크로 큐

//          마이크로 큐가 더 급한 애들이 들어감
//          마이크로 큐가 비었을 때 매크로 큐가 실행됨

//          매크로 큐에 들어가는 애들
//              setTimeout
//              setInterval

//          매이크로 큐에 들어가는 애들
//              new Promise

// 매크로 큐 마이크로 큐 실습

//      강의자료 참고

//      실행 순서 요약 

//          index.html 코드 보고 실행 순서 예측
//          (강의자료에 자세한 설명)

//          1. onClickLoop -> 콜스택
//          2. "시작!!!" 출력
//          3. setTimeout -> 매크로큐
//          4. Promise(1) -> 마이크로큐
//          5. setInterval -> 매크로큐
//          6. for문 실행 (시간 오래걸림)
//          7. Promise(2) -> 마이크로큐
//          8. "끝!!!" 출력
//          9. 콜스택 -> onClickLoop
//          10. 콜스택 빔 -> 마이크로큐 확인
//          11. 마이크로큐 -> Promise(1) -> 콜스택
//          12. "Promise(1)" 출력
//          13. 콜스택 -> Promise(1)
//          14. 콜스택 빔 -> 마이크로큐 확인
//          15. 마이크로큐 -> Promise(2) -> 콜스택
//          16. "Promise(2)" 출력
//          17. 콜스택 -> Promise(2)
//          18. 콜스택 빔 -> 마이크로큐 확인
//          19. 마이크로큐 빔 -> 매크로큐 확인
//          20. 매크로큐 -> setTimeout -> 콜스택
//          21. Promise(setTimeout) -> 마이크로큐
//          22. "setTimeout" 출력
//          23. 콜스택 -> setTimeout
//          24. 콜스택 빔 -> 마이크로큐 확인
//          25. 마이크로큐 -> Promise(setTimeout) -> 콜스택
//          26. "Promise(setTimeout)" 출력
//          27. 콜스택 -> Promise(setTimeout)
//          28. 콜스택 빔 -> 마이크로큐 확인
//          29. 마이크로큐 빔 -> 매크로큐 확인
//          30. 매크로큐 -> setInterval -> 콜스택
//          31. "setInterval" 출력
//          ... "setInterval" 출력 반복

//      출력 결과 예상

//          시작!!!
//          끝!!!
//          Promise(1)
//          Promise(2)
//          setTimeout
//          Promise(setTimeout)
//          setInterval
//          setInterval
//          setInterval
//          ...
//          setInterval 출력 반복