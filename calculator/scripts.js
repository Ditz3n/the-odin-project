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
        case ("*"):
            return multiply(firstNum, secondNum);
            break;
        case ("/"):
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

operator = "*";

console.log(operate(operator, firstNum, secondNum));

operator = "/";

console.log(operate(operator, firstNum, secondNum));