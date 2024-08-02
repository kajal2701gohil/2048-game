const game = document.querySelector("#game");
const fixNumbers = [2, 4];
let matrix = [];
let column = [];

for (let i = 1; i <= 4; i++) {
    game.innerHTML += `<div class="row row${i}"></div>`;
    for (let j = 1; j <= 4; j++) {
        const arr = [i, j];
        matrix = [...matrix, arr];
        game.querySelector(`.row${i}`).innerHTML += `<div class="col" id="${[i, j]}"></div>`;
    }
    column = document.querySelectorAll(".col");
};


function getRandom(range) {
    return Math.floor(Math.random() * range);
};


function boxText() {
    let res = getRandom(matrix.length);
    let box = document.getElementById(`${[matrix[res]]}`);
    let fullyBox = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
    if (box.textContent === "") {
        box.textContent = Number(fixNumbers[getRandom(fixNumbers.length)]);
    }
    else {
        if (fullyBox.length !== matrix.length) {
            boxText();
        }
    }
    // if (fullyBox.length === matrix.length - 1) {
    //     document.querySelector("#info").textContent = "Game Over";
    // }
};


function printNumbers() {
    for (let i = 0; i < fixNumbers.length; i++) {
        boxText();
    }
};

printNumbers();


window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") {
        console.log("up");
        const targetBox = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
        for (let x of targetBox) {
            for (let i = x[0] - 1; i > 0; i--) {
                let emptyBox = document.getElementById(`${[i, x[1]]}`);
                let currentBox = document.getElementById(`${[i + 1, x[1]]}`);
                if (emptyBox.textContent === "") {
                    emptyBox.textContent = currentBox.textContent;
                    currentBox.textContent = "";
                }
                else if (emptyBox.textContent === currentBox.textContent) {
                    emptyBox.textContent = Number(currentBox.textContent) + Number(emptyBox.textContent);
                    currentBox.textContent = "";
                    break;
                }
            }
        }
        let changeBox = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
        if (JSON.stringify(targetBox) !== JSON.stringify(changeBox)) {
            boxText();
        }
    }

    if (e.code === "ArrowDown") {
        console.log("down");
        let targetBox = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
        for (let x of targetBox.reverse()) {
            for (let i = x[0] + 1; i <= 4; i++) {
                let emptyBox = document.getElementById(`${[i, x[1]]}`);
                let currentBox = document.getElementById(`${[i - 1, x[1]]}`);
                if (emptyBox.textContent === "") {
                    emptyBox.textContent = currentBox.textContent;
                    currentBox.textContent = "";
                }
                else if (emptyBox.textContent === currentBox.textContent) {
                    emptyBox.textContent = Number(currentBox.textContent) + Number(emptyBox.textContent);
                    currentBox.textContent = "";
                    break;
                }
            }
        }
        let changeBox = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
        if (JSON.stringify(targetBox) !== JSON.stringify(changeBox.reverse())) {
            boxText();
        }
    }
    if (e.code === "ArrowLeft") {
        console.log("left");
        let targetBox = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
        for (let x of targetBox) {
            for (let i = x[1] - 1; i > 0; i--) {
                let emptyBox = document.getElementById(`${[x[0], i]}`);
                let currentBox = document.getElementById(`${[x[0], i + 1]}`);
                if (emptyBox.textContent === "") {
                    emptyBox.textContent = currentBox.textContent;
                    currentBox.textContent = "";
                }
                else if (emptyBox.textContent === currentBox.textContent) {
                    emptyBox.textContent = Number(currentBox.textContent) + Number(emptyBox.textContent);
                    currentBox.textContent = "";
                    break;
                }
            }
        }
        let changeBox = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
        if (JSON.stringify(targetBox) !== JSON.stringify(changeBox)) {
            boxText();
        }
    }
    if (e.code === "ArrowRight") {
        console.log("right");
        let targetBox = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
        for (let x of targetBox.reverse()) {
            for (let i = x[1] + 1; i <= 4; i++) {
                let emptyBox = document.getElementById(`${[x[0], i]}`);
                let currentBox = document.getElementById(`${[x[0], i - 1]}`);
                if (emptyBox.textContent === "") {
                    emptyBox.textContent = currentBox.textContent;
                    currentBox.textContent = "";
                }
                else if (emptyBox.textContent === currentBox.textContent) {
                    emptyBox.textContent = Number(currentBox.textContent) + Number(emptyBox.textContent);
                    currentBox.textContent = "";
                    break;
                }
            }
        }
        let changeBox = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
        if (JSON.stringify(targetBox) !== JSON.stringify(changeBox.reverse())) {
            boxText();
        }
    }
})

