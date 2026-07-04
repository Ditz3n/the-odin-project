/* GLOBAL VARIABLES */
let currentEntryNum = "0";
let previousEntryNum = "0";
let secondOperand = "0"
let operatorChar = "";
let operationFlag = false;
let haveUsedComma = false;

/* SETUP DISPLAY */
const displayContainer = document.querySelector(".display-container");

const previousEntryElmt = document.createElement("p");
const currentEntryElmt = document.createElement("p");
previousEntryElmt.classList.add("previous-entry-element");
currentEntryElmt.classList.add("current-entry-element");
previousEntryElmt.textContent = "";
currentEntryElmt.textContent = currentEntryNum;
displayContainer.appendChild(previousEntryElmt);
displayContainer.appendChild(currentEntryElmt);

/* SETUP BUTTONS */
const topButtonsContainer = document.querySelector(".top-buttons-container");
const bottomButtonsContainer = document.querySelector(".bottom-buttons-container");

const buttons = [
    { label: "CE", position: "top", type: "operation"}, { label: "C", position: "top", type: "operation"},
    { label: "7", position: "bottom", type: "number"}, { label: "8", position: "bottom", type: "number"}, { label: "9", position: "bottom", type: "number"}, { label: "+", position: "bottom", type: "operation"},
    { label: "4", position: "bottom", type: "number"}, { label: "5", position: "bottom", type: "number"}, { label: "6", position: "bottom", type: "number"}, { label: "-", position: "bottom", type: "operation"},
    { label: "1", position: "bottom", type: "number"}, { label: "2", position: "bottom", type: "number"}, { label: "3", position: "bottom", type: "number"}, { label: "x", position: "bottom", type: "operation"},
    { label: ",", position: "bottom", type: "number"}, { label: "0", position: "bottom", type: "number"}, { label: "=", position: "bottom", type: "operation"}, { label: "/", position: "bottom", type: "operation"},
];

buttons.forEach((button, index) => {
    const buttonElmt = document.createElement("button");
    buttonElmt.classList.add(`button-${button.label}`);
    buttonElmt.textContent = button.label;

    if (button.position === "top") topButtonsContainer.appendChild(buttonElmt);
    else bottomButtonsContainer.appendChild(buttonElmt);

    if (button.type === "operation") {
        buttonElmt.addEventListener(("click"), () => {
            switch(button.label) {
                case "=":
                    if (operationFlag) findResult()
                    break;
                default:
                    operatorChar = button.label;
                    previousEntryElmt.textContent = currentEntryNum + operatorChar;
                    previousEntryNum = currentEntryNum;
                    operationFlag = true;
            }
        });
    } else if (button.type === "number") {
        buttonElmt.addEventListener(("click"), () => {
            updateCurrentEntry(button.label)
        });
    };
});

/* OPERATIONS */
function add(firstVal, secondVal) {
    return firstVal + secondVal;
};

function subtract(firstVal, secondVal) {
    return firstVal - secondVal;
};

function multiply(firstVal, secondVal) {
    return firstVal * secondVal;
};

function divide(firstVal, secondVal) {
    return firstVal / secondVal;
};

function operate(operatorVal, firstVal, secondVal) {
    switch(operatorVal) {
        case "+":
            console.log(`Result of ${firstVal} + ${secondVal}: ${add(firstVal, secondVal)}`);
            return add(firstVal, secondVal);
        case "-":
            console.log(`Result of ${firstVal} - ${secondVal}: ${subtract(firstVal, secondVal)}`);
            return subtract(firstVal, secondVal);
        case "x":
            console.log(`Result of ${firstVal} x ${secondVal}: ${multiply(firstVal, secondVal)}`);
            return multiply(firstVal, secondVal);
        case "/":
            console.log(`Result of ${firstVal} / ${secondVal}: ${divide(firstVal, secondVal)}`);
            return divide(firstVal, secondVal);
    };
};

function updateCurrentEntry(value) {
    if (currentEntryNum === "0" || operationFlag) {
        currentEntryNum = "";
        currentEntryElmt.textContent = currentEntryNum;
        if (operationFlag) operationFlag = false;
        if (value === ",") currentEntryNum = "0";
        haveUsedComma = false
    }

    commaAlreadyUsed = (value === "," && haveUsedComma)

    if (!commaAlreadyUsed) {
        currentEntryNum += value;
        currentEntryElmt.textContent = currentEntryNum;
        if (value === ",") haveUsedComma = true;
    }
};

function findResult() {
    console.log(previousEntryNum, currentEntryNum, operatorChar)
    
    previousEntryElmt.textContent = `${currentEntryNum} ${operatorChar} ${previousEntryNum} =`;

    // Turn comma and strings into float values for operate function
    previousEntryNum = previousEntryNum.replaceAll(",", ".");
    currentEntryNum = currentEntryNum.replaceAll(",", ".");
    previousEntryNum = parseFloat(previousEntryNum)
    currentEntryNum = parseFloat(currentEntryNum)
    
    // Operate on float values
    if (secondOperand !== "0") currentEntryNum = operate(operatorChar, currentEntryNum, previousEntryNum);
    else currentEntryNum = operate(operatorChar, previousEntryNum, currentEntryNum);
    secondOperand = currentEntryNum;

    // Turn float values back into displayable strings
    previousEntryNum = String(previousEntryNum)
    currentEntryNum = String(currentEntryNum)
    previousEntryNum = previousEntryNum.replaceAll(".", ",");
    currentEntryNum = currentEntryNum.replaceAll(".", ",");
    
    currentEntryElmt.textContent = currentEntryNum;
    operationFlag = true;
}