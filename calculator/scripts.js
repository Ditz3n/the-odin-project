let firstNum = 0;
let secondNum = 0;
let operator = "";
let currentInput = "0";
let hasOperatorBeenClicked = false;
let resultShowcase = document.querySelector(".result-container p");
resultShowcase.textContent = currentInput;

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

const gridOptions = [
    "%", "CE", "C", "DEL",
    "1/x", "x²", "2√x", "÷",
    "7", "8", "9", "x",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "±", "0", ",", "="];

const realOperatorsArr = ["+", "-", "x", "÷"];

const numbersArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const functionalGrid = document.querySelector(".functional-grid-container");

gridElementNum = 0;

gridOptions.map((gridOption) => {
    const gridElement = document.createElement("button");
    gridElement.classList.add(`grid-element-num-${gridElementNum}`);
    gridElement.textContent = gridOption;

    if (numbersArr.includes(gridOption)) {
        gridElement.addEventListener("click", () => {

            if (currentInput.slice(0) === "0") currentInput = "";
            if (hasOperatorBeenClicked === true) {
                resultShowcase.textContent = "";
                currentInput = "";
                hasOperatorBeenClicked = false;
            };

            currentInput += gridOption;
            resultShowcase.textContent = currentInput;
        });
    } else if (realOperatorsArr.includes(gridOption)) { 
        gridElement.addEventListener("click", () => {
            
            if (operator === "") {
                firstNum = parseInt(currentInput);
            }
            else {
                secondNum = parseInt(currentInput);
                firstNum = operate(operator, firstNum, secondNum);
            }
            
            operator = gridOption;
            hasOperatorBeenClicked = true;
        });
    } else {
         gridElement.addEventListener("click", () => {
            switch (gridOption) {
                case "=":
                    secondNum = parseInt(currentInput);
                    resultShowcase.textContent = operate(operator, firstNum, secondNum);
                    break;
                case "C":
                    firstNum = 0;
                    secondNum = 0;
                    operator = "";
                    currentInput = "0";
                    resultShowcase.textContent = currentInput;
                    hasOperatorBeenClicked = false;
                    break;
            };
        });
    };

    functionalGrid.appendChild(gridElement);
    gridElementNum++
});