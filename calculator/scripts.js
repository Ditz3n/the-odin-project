/* SETUP DISPLAY */
const displayContainer = document.querySelector(".display-container");

const previousEntryElmt = document.createElement("p");
const currentEntryElmt = document.createElement("p");
previousEntryElmt.classList.add("previous-entry-element");
currentEntryElmt.classList.add("current-entry-element");
previousEntryElmt.textContent = "0";
currentEntryElmt.textContent = "0";
displayContainer.appendChild(previousEntryElmt);
displayContainer.appendChild(currentEntryElmt);

/* SETUP BUTTONS */
const topButtonsContainer = document.querySelector(".top-buttons-container");
const bottomButtonsContainer = document.querySelector(".bottom-buttons-container");

const buttons = [
    { label: "CE", position: "top"}, { label: "C", position: "top"},
    { label: "7", position: "bottom"}, { label: "8", position: "bottom"}, { label: "9", position: "bottom"}, { label: "+", position: "bottom"},
    { label: "4", position: "bottom"}, { label: "5", position: "bottom"}, { label: "6", position: "bottom"}, { label: "-", position: "bottom"},
    { label: "1", position: "bottom"}, { label: "2", position: "bottom"}, { label: "3", position: "bottom"}, { label: "x", position: "bottom"},
    { label: ",", position: "bottom"}, { label: "0", position: "bottom"}, { label: "=", position: "bottom"}, { label: "/", position: "bottom"},
];

buttons.forEach((button, index) => {
    console.log(button);
    console.log(index);
    const buttonElmt = document.createElement("button");
    buttonElmt.classList.add(`button-${button.label}`);
    buttonElmt.textContent = button.label;

    if (button.position === "top") topButtonsContainer.appendChild(buttonElmt);
    else bottomButtonsContainer.appendChild(buttonElmt);
});

