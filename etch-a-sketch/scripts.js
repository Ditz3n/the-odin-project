let currentMousedownHandler = null;
let currentMouseoverHandler = null;
let drawColor = "#000000";

function selectGridSize() {
    let userSelectedGridSize = 0;
    let gridColumnCount = userSelectedGridSize;
    let gridRowCount = userSelectedGridSize;

    // Prompt user for grid size
    do {
        userSelectedGridSize = prompt("Which size grid do you want (1-100)?:");
        if (userSelectedGridSize === null) break;
        userSelectedGridSize = parseInt(userSelectedGridSize);
        gridColumnCount = userSelectedGridSize;
        gridRowCount = userSelectedGridSize;
        console.log(`Selected grid size: ${gridColumnCount}x${gridRowCount}.`);
    }
    while (
        isNaN(userSelectedGridSize)
        || userSelectedGridSize < 1
        || userSelectedGridSize > 100
    );

    // Add column and row count to grid container
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.style.setProperty("--grid-columns", gridColumnCount);
    gridContainer.style.setProperty("--grid-rows", gridColumnCount);

    // Remove previous grid elements
    document.querySelectorAll(".grid-container div").forEach((arr) => {
        arr.remove();
    });

    // Iterate new grid elements into grid container
    for (let i = 0; i < gridColumnCount * gridRowCount; i++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add(`grid-element-${i}`);
        gridContainer.appendChild(gridElement);
    };

    if (currentMousedownHandler !== null && currentMouseoverHandler !== null) {
        addAndSetEventListeners(currentMousedownHandler, currentMouseoverHandler);
    };

    console.log(`A ${gridColumnCount}x${gridRowCount} grid container has been created!`);
};

/* 
Calculate a single brightness color value based on color hex RGB.
Source: https://stackoverflow.com/a/11868398 .
Used to determine whether to have color hex preview color black/white.
*/
function getContrastYIQ(hexColor) {
    const R = parseInt(hexColor.substring(1, 3), 16);
    const G = parseInt(hexColor.substring(3, 5), 16);
    const B = parseInt(hexColor.substring(5, 7), 16);

    const yiq = ((R * 299) + (G * 587) + (B * 114)) / 1000;

    return (yiq >= 128) ? 'black' : 'white';
};

// Draw Color Selector - Takes event object .value and stores it
function selectDrawColor(e) {
    drawColor = e.target.value;

    let colorPickerDisplay = document.querySelector(".color-picker-container p");

    // Clear first and showcase current selected draw color hex
    colorPickerDisplay.textContent = "";
    colorPickerDisplay.textContent = `${drawColor}`;

    // Set color according to contrast
    colorPickerDisplay.style.color = getContrastYIQ(drawColor);
};

function addAndSetEventListeners(handleMousedown, handleMouseOver) {
    document.querySelectorAll(".grid-container div").forEach((arr) => {
        arr.addEventListener("mousedown", handleMousedown);
        arr.addEventListener("mouseover", handleMouseOver);
    });
    currentMousedownHandler = handleMousedown;
    currentMouseoverHandler = handleMouseOver;
};

function removeAndNullifyEventListeners() {
    document.querySelectorAll(".grid-container div").forEach((arr) => {
        if (currentMousedownHandler !== null) arr.removeEventListener("mousedown", currentMousedownHandler);
        if (currentMouseoverHandler !== null) arr.removeEventListener("mouseover", currentMouseoverHandler);
    });

    currentMousedownHandler = null;
    currentMouseoverHandler = null;
};

function penDrawMode() {
    // Local functions to declare how to paint the grid
    // It'll differ between the modes.
    function handleMousedown(e) {
        e.preventDefault();
        // .target to select the element the event-object points at
        e.target.setAttribute("style", `background-color: ${drawColor}`);
    };

    function handleMouseOver(e) {
        if (e.buttons === 1) {
            e.preventDefault();
            e.target.setAttribute("style", `background-color: ${drawColor}`);
        };
    };

    // Set global handler values and add handlers to div elements
    // function references > calls - to later be called by the handlers
    addAndSetEventListeners(handleMousedown, handleMouseOver);
};

function rainbowPenDrawMode() {
    function randomColorGen() {
        // Source: https://stackoverflow.com/a/5092872
        return "#000000".replace(/0/g, () => (Math.floor((Math.random()*16))).toString(16)
    )};

    function handleMousedown(e) {
        e.preventDefault();
        e.target.setAttribute("style", `background-color: ${randomColorGen()}`);
    };

    function handleMouseOver(e) {
        if (e.buttons === 1) {
            e.preventDefault();
            e.target.setAttribute("style", `background-color: ${randomColorGen()}`);
        };
    };

    addAndSetEventListeners(handleMousedown, handleMouseOver);
};

function eraserDrawMode() {
    // background-color: transparent to "erase" current color of grid element
    function handleMousedown(e) {
        e.preventDefault();
        e.target.setAttribute("style", `background-color: transparent`);
    };

    function handleMouseOver(e) {
        if (e.buttons === 1) {
            e.preventDefault();
            e.target.setAttribute("style", `background-color: transparent`);
        };
    };

    addAndSetEventListeners(handleMousedown, handleMouseOver);
};

function selectDrawMode(btnVal) {
    // Remove any existing handlers before setting new ones
    removeAndNullifyEventListeners();

    allBtnElements.forEach((arr) => {
        arr.classList.remove("active");
    });
    
    if (btnVal === "Pen") penDrawMode();
    if (btnVal === "Rainbow Pen") rainbowPenDrawMode();
    if (btnVal === "Eraser") eraserDrawMode();
};

function deselectDrawMode() {
    removeAndNullifyEventListeners();

    allBtnElements.forEach((arr) => {
        arr.classList.remove("active");
    });
};

// Get all button elements from the DOM as a NodeList element
const allBtnElements = document.querySelectorAll("button");

/* 
Loop over each individual element of the NodeList and apply event listeners.
Print a log to the console whenever one of the 6 buttons are clicked.
Later, different function calls will be added for each of the buttons.   
*/
allBtnElements.forEach((arr) => {
    arr.addEventListener("click", () => {
        switch(arr.textContent) {
            case("Grid Size"):
                selectGridSize();
                break;
            case("Pen"):
                if (arr.classList.contains("active")) {
                    deselectDrawMode();
                } else {
                    selectDrawMode(arr.textContent);
                    arr.classList.add("active");
                };
                break;
            case("Rainbow Pen"):
                if (arr.classList.contains("active")) {
                    deselectDrawMode();
                } else {
                    selectDrawMode(arr.textContent);
                    arr.classList.add("active");
                };
                break;
            case("Brush"):
                if (arr.classList.contains("active")) {
                    deselectDrawMode();
                } else {
                    selectDrawMode(arr.textContent);
                    arr.classList.add("active");
                };
                break;
            case("Eraser"):
               if (arr.classList.contains("active")) {
                    deselectDrawMode();
                } else {
                    selectDrawMode(arr.textContent);
                    arr.classList.add("active");
                };
                break;
        };  
    });
});

const drawColorInput = document.querySelector("input");

drawColorInput.addEventListener("input", (e) => {
    selectDrawColor(e);
});