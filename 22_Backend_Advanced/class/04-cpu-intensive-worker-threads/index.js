// import 해도 되는데 node_modules 설치하는거 귀찮아서 require로 진행
const { Worker } = require('worker_threads');

const start = () => {
  let totalSum = 0;
  for (let i = 0; i < 9; i++) {
    const worker = new Worker('./worker.js');
    worker.postMessage(1000000000);
    worker.on('message', (result) => {
      totalSum += result;
      console.log(
        `나는 ${i}번째 워커 스레드이고, 현재까지의 총 합은 ${totalSum}이다.`,
      );
    });
  }
};

start();
