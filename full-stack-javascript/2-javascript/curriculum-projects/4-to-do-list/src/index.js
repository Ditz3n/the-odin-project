import "./styles.css";
import layout from "./layout.js";
import storage from "./storage.js";
import todo from "./todos.js";
import project from "./project.js";

console.log("Hello index.js!");

window.storage = storage;
window.project = project;

console.log(storage.getAllProjects())