let firstNum = 0;
let secondNum = 0;
let operator = "";

function add(firstNum, secondNum) {
    return firstNum += secondNum;
};

function subtract(firstNum, secondNum) {
    return firstNum -= secondNum;
};

function multiply(firstNum, secondNum) {
    return firstNum *= secondNum;
};

function divide(firstNum, secondNum) {
    return firstNum /= secondNum;
};

function operate(operation, firstNum, secondNum) {
    switch (operation) {
        case "+":
            return add(firstNum, secondNum);
            break;
        case "-":
            return subtract(firstNum, secondNum);
            break;
        case "x":
            return multiply(firstNum, secondNum);
            break;
        case "÷":
            return divide(firstNum, secondNum);
            break;
    };
};

firstNum = 5;
secondNum = 5;
operator = "+";

console.log(operate(operator, firstNum, secondNum));

operator = "-";

console.log(operate(operator, firstNum, secondNum));

operator = "x";

console.log(operate(operator, firstNum, secondNum));

operator = "÷";

console.log(operate(operator, firstNum, secondNum));

const gridOptions = [
    "%", "CE", "C", "DEL",
    "1/x", "x²", "2√x", "÷",
    "7", "8", "9", "x",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "±", "0", ",", "="];

const numbersArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

const operationsArr = [
    "%", "CE", "C", "DEL",
    "1/x", "x²", "2√x", "÷",
    "x", "-", "+", "±", ",", 
    "="];

const functionalGrid = document.querySelector(".functional-grid-container");

console.log(functionalGrid);

gridElementNum = 0;

gridOptions.map((gridOption) => {
    const gridElement = document.createElement("button");
    gridElement.classList.add(`${gridElementNum}`);
    gridElement.textContent = gridOption;

    if (numbersArr.includes(gridOption)) {
        gridElement.addEventListener("click", () => {
            console.log(`This is a grid number!: ${gridOption}`)
        })
    } else {
        gridElement.addEventListener("click", () => {
            console.log(`This is a grid operation!: ${gridOption}`)
        })
    }

    functionalGrid.appendChild(gridElement);
    gridElementNum++
})