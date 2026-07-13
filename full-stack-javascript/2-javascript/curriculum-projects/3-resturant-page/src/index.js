import "./styles.css";
import DrawHome from "./initial.js";
import DrawMenu from "./menu.js";
import DrawContact from "./contact.js";

console.log("Hello index.js!");

// Draw home layout on initial load of page
DrawHome();

const nav = document.querySelector("nav");
const navBtns = nav.querySelectorAll("button");

navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        navBtns.forEach((btn) => {
            btn.classList.remove("active");
        });
        switch(btn.textContent) {
            case "Crust Bucket":
                document.querySelector("#content").textContent = "";
                DrawHome();
                break;
            case "Home":
                btn.classList.add("active");
                document.querySelector("#content").textContent = "";
                DrawHome();
                break;
            case "Menu":
                btn.classList.add("active");
                document.querySelector("#content").textContent = "";
                DrawMenu();
                break;
            case "Contact":
                btn.classList.add("active");
                document.querySelector("#content").textContent = "";
                DrawContact();
                break;
        };
    });
});