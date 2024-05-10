const fetchData = async () => {
    // API 보내기 요청

    // 이걸 axios 라고 가정
    const result = await new Promise((성공시함수, 실패시함수) => {
        setTimeout(() => {
            try {
                console.log("이미지 받아옴"); // 5초 뒤에 이미지를 받아왔다고 가정
                성공시함수("이미지.jpg"); // 인자로 전달한 값이 Promise 객체의 결과값으로 반환
            } catch (error) {
                실패시함수("실패했습니다!");
            }
        }, 3000);
    });
    // Promise 객체로 만들고 await 를 걸어두면 Promise 값이 결정될 때까지
    // (== 성공시함수 또는 실패시함수가 실행될 때까지) 아래줄 실행 안하고 기다림

    console.log(result); // => 성공시 "이미지.jpg" 출력, 실패시 "실패했습니다!" 출력

    console.log("받아온 이미지를 브라우저에 반환");
};

fetchData();
