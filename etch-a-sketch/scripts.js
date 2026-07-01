console.log("Hello World!");

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
                console.log("Button 1 Clicked!")
                break;
            case("btn-two"):
                console.log("Button 2 Clicked!")
                break;
            case("btn-three"):
                console.log("Button 3 Clicked!")
                break;
            case("btn-four"):
                console.log("Button 4 Clicked!")
                break;
            case("btn-five"):
                console.log("Button 5 Clicked!")
                break;
            case("btn-six"):
                console.log("Button 6 Clicked!")
                break;
        }  
    })
})