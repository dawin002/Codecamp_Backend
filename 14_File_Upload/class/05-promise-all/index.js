// 비효율적인 방식, 개별 Promise (안티 패턴)
const fetchData1 = async () => {
    console.time("=== 개별 Promise 각각 === ");

    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("성공!!");
        }, 2000);
    });

    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("성공!!");
        }, 3000);
    });

    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("성공!!");
        }, 1000);
    });

    console.timeEnd("=== 개별 Promise 각각 === ");
};

fetchData1();

// 효율적인 방식, 개별 Promise (안티 패턴)
const fetchData2 = async () => {
    console.time("=== 한방 Promise.all === ");

    // Promise.all() 앞에 await 붙이기, 전체를 동시에 기다릴 거여서
    const results = await Promise.all([
        // new Promise 앞에는 await 안붙음
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("성공!!");
            }, 2000);
        }),

        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("성공!!");
            }, 3000);
        }),

        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("성공!!");
            }, 1000);
        }),
    ]);

    console.log(results);
    console.timeEnd("=== 한방 Promise.all === ");
};

fetchData2();
