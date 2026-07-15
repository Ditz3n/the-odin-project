// Need to import the images as bundler does not know about paths after bundling
import alternaGathering from "./images/initial/alterna-gathering.png";
import heroImg from "./images/initial/hero.jpg";
import inkadiaAndTheSplatlands from "./images/initial/inkadia-and-the-splatlands.png";

// Exporting function to be used inside index.js
export default function DrawHome() {
    console.log("Hello initial.js!");

    const homeBtn = document.querySelector("#home-btn");
    homeBtn.classList.add("active");

    const heroSection = document.createElement("section");
    heroSection.id = "hero-section";

    heroSection.innerHTML = `<div id="hero-text">
                                <h1>Crust Bucket</h1>
                                <p>Fresh seafood, vibrant flavors, and a splash of
                                    Splatsville charm. Stop by for the catch of the
                                    day and fuel up before your next Turf War.</p>
                            </div>
                            <a id="hero-image" href="https://www.reddit.com/r/splatoon/comments/oxkgx7/i_made_a_reallife_shwaffle_ingredients_in_comments/" target="_blank">
                            <img src=${heroImg}>
                            </a>`;

    const content = document.querySelector("#content");

    content.appendChild(heroSection);

    const infoSection = document.createElement("section");
    infoSection.id = "information-section";

    content.appendChild(infoSection);

    const infoContainerOne = document.createElement("div");
    infoContainerOne.id = "information-container-one";
    const infoContainerTwo = document.createElement("div");
    infoContainerTwo.id = "information-container-two";
    const infoContainerThree = document.createElement("div");
    infoContainerThree.id = "information-container-three";

    infoContainerOne.innerHTML = `<a id="information-image-one" href="https://splatoonwiki.org/wiki/Location" target="_blank">
                                    <img src=${inkadiaAndTheSplatlands}>
                                </a>
                                <div id="information-text-one">
                                    <h2>Inkadia & The Splatlands</h2>
                                    <p>Explore the vibrant regions where Inklings and
                                        Octolings call home. From the bustling streets
                                        of Inkadia to the sun-soaked deserts of the Splatlands,
                                        every destination is bursting with culture, style,
                                        and unforgettable adventures.</p>
                                </div>`;

    infoContainerTwo.innerHTML = `<div id="information-text-two">
                                    <h2>A Family at Heart</h2>
                                    <p>Every meal is served with the warmth of friends, 
                                        family, and the community that brings Splatsville together.</p>
                                </div>
                                <a id="information-image-two" href="https://splatoonwiki.org/wiki/Main_Page" target="_blank">
                                    <img src=${alternaGathering}>
                                </a>`;

    infoContainerThree.innerHTML = `<p>More information about opening will be presented in the near future...</p>`;

    infoSection.appendChild(infoContainerOne);
    infoSection.appendChild(infoContainerTwo);
    infoSection.appendChild(infoContainerThree);
};