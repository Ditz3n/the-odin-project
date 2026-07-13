// index.js
import "./styles.css";
import { greeting } from "./greeting.js";
import fryeImage from "./frye.png";

console.log(greeting);

const image = document.createElement("img");
image.src = fryeImage;

document.body.appendChild(image);