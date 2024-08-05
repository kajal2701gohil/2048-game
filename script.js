"use strict";

const game = document.querySelector("#game");
const fixNumbers = [2, 4];
let matrix = [];
let column = [];
let noSpace = 0;

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
    let fullBoxes = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
    if (box.textContent === "") {
        box.textContent = Number(fixNumbers[getRandom(fixNumbers.length)]);
    }
    else {
        if (fullBoxes.length !== matrix.length) {
            boxText();
        }
    }
};

function printNumbers() {
    for (let i = 0; i < fixNumbers.length; i++) {
        boxText();
    }
};

printNumbers();

function getContentBoxes() {
    return matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
};

function moveBoxes(targetBoxes, changeBox) {
    if (JSON.stringify(targetBoxes) !== JSON.stringify(changeBox)) {
        boxText();
    };
};

window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") {
        const targetBoxes = getContentBoxes();
        for (let x of targetBoxes) {
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
                };
            };
        };

        let changeBox = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
        moveBoxes(targetBoxes, changeBox);
    };

    if (e.code === "ArrowDown") {
        const targetBoxes = getContentBoxes();
        for (let x of targetBoxes.reverse()) {
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
                };
            };
        };

        let changeBox = matrix.filter((x => document.getElementById(`${x}`).textContent != "")).reverse();
        moveBoxes(targetBoxes, changeBox);
    };

    if (e.code === "ArrowLeft") {
        const targetBoxes = getContentBoxes();
        for (let x of targetBoxes) {
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
                };
            };
        };

        let changeBox = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
        moveBoxes(targetBoxes, changeBox);
    };

    if (e.code === "ArrowRight") {
        const targetBoxes = getContentBoxes();
        for (let x of targetBoxes.reverse()) {
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
                };
            };
        };

        let changeBox = matrix.filter((x => document.getElementById(`${x}`).textContent != "")).reverse();
        moveBoxes(targetBoxes, changeBox);
    };

    for (let x of column) {
        if (x.textContent === "2048") {
            document.querySelector("#info").textContent = "You Win!";
        };
    };

    let fullBoxes = matrix.filter((x => document.getElementById(`${x}`).textContent != ""));
    if (fullBoxes.length === column.length) {
        for (let x of column) {
            let [a, b] = x.id.split(",");
            a = Number(a);
            b = Number(b);
            const siblings = [[a - 1, b], [a, b - 1], [a, b + 1], [a + 1, b]];
            let noMatch = siblings.filter(y => (document.getElementById(`${y.toString()}`)?.textContent) == x.textContent);
            if (noMatch.length === 0) {
                noSpace++;
            }
            else {
                noSpace = 0;
            };
        };
        if (noSpace >= column.length) {
            document.querySelector("#info").textContent = "Game Over!";
        };
    };
});
