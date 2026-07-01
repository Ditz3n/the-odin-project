console.log("Hello World!");

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

    console.log(`A ${gridColumnCount}x${gridRowCount} grid container has been created!`);
};

function selectBrushColor() {

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
        switch(arr.classList.value) {
            case("btn-one"):
                console.log("Button 1 Clicked!");
                selectGridSize();
                break;
            case("btn-two"):
                console.log("Button 2 Clicked!");
                break;
            case("btn-three"):
                console.log("Button 3 Clicked!");
                break;
            case("btn-four"):
                console.log("Button 4 Clicked!");
                break;
            case("btn-five"):
                console.log("Button 5 Clicked!");
                break;
            case("btn-six"):
                console.log("Button 6 Clicked!");
                break;
        };  
    });
});