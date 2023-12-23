let randNumMaker = () => {
    randNum = String( Math.floor( Math.random() * 1000000 ) ).padEnd(6, "0");
    document.getElementById("num").innerText = randNum;
    document.getElementById("num").style.color = "#" + randNum;
}