const startWord = () => {
    let myword = document.getElementById("myword").value;
    let word = document.getElementById("word").innerText;
    
    let lastWord = word[word.length-1];
    let firstWord = myword[0];

    if (firstWord === lastWord) {
        document.getElementById("result").innerText = "정답입니다!";
        document.getElementById("word").innerText = myword;
        document.getElementById("myword").value = "";
    } else {
        document.getElementById("result").innerText = "땡!";
        document.getElementById("myword").value = "";
    }
}


function lottoNumMaker(){
    let numbers = [];
    let newNum = 0;
    for(let i=0; i<6; i++) {
        while(true) {
            newNum = Math.floor( Math.random() * 100 );
            if(newNum === 0 || newNum > 45) {
                continue;
            } else if(numbers.includes(newNum)) {
                continue;
            } else {
                break;
            }
        }
        numbers[i] = newNum;
    }
    
    // 숫자 배열 정렬하는법
    // numbers.sort(function(a, b) {
    //     if(a > b) return 1;
    //     if(a === b) return 0;
    //     if(a < b) return -1;
    // });

    // 정렬 방법 2
    numbers.sort(function(a, b) {
        return a - b;
    });

    let lottoID;
    for(let j=0; j<6; j++) {
        lottoID = 'lottoNum' + String(j+1);
        document.getElementById(lottoID).innerText = String(numbers[j]);
    }
}