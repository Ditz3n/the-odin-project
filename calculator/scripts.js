let firstVal = 0;
let secondVal = 0;
let operator = "";
let replayMemory = "0";
let displayVal = "0";

const displayContainer = document.querySelector(".display-container");
const replayMemoryElement = document.createElement("p");
replayMemoryElement.classList.add("replay-memory");
replayMemoryElement.textContent = replayMemory;
const displayValElement = document.createElement("p");
displayValElement.classList.add("display-val");
displayValElement.textContent = displayVal;
const buttonsContainer = document.querySelector(".buttons-container");

displayContainer.appendChild(replayMemoryElement);
displayContainer.appendChild(displayValElement);

const calcButtons = [
    "7", "8", "9", "+",
    "4", "5", "6", "-",
    "1", "2", "3", "x", 
    "0", ",", "=", "/"]

calcButtons.map((button) => {
    const buttonElement = document.createElement("button");
    buttonElement.classList.add(`button-${button}`);
    buttonElement.textContent = button;
    buttonsContainer.appendChild(buttonElement);
});