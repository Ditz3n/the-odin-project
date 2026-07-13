import deepCutMembersOne from "./images/contact/deep-cut-members-one.png";
import deepCutMembersTwo from "./images/contact/deep-cut-members-two.png";
import frye from "./images/contact/frye.png";
import shiver from "./images/contact/shiver.png";
import bigMan from "./images/contact/big-man.png";

export default function DrawContact() {
    console.log("Hello contact.js!");

    const content = document.querySelector("#content");

    const section = document.createElement("section");
    section.id = "contact-section";

    const contactHeroContainer = document.createElement("div");
    contactHeroContainer.id = "contact-hero-container";

    const hrElmt = document.createElement("hr");

    const contactInformationContainer = document.createElement("div");
    contactInformationContainer.id = "contact-information-container";

    contactHeroContainer.innerHTML = `<div id="hero-container-text">
                                        <h1>Contact</h1>
                                        <p>Need to book a table or ask about today's fresh catch?
                                           Send us a message or give us a call—we're always happy
                                           to help fellow Inklings and Octolings.</p>  
                                       </div>
                                       <img src=${deepCutMembersOne} alt="Resturant Staff">`;

    contactInformationContainer.innerHTML = `<div id="contact-information-first">
                                                <div id="frye-details">
                                                    <div>
                                                        <a href="https://splatoonwiki.org/wiki/Frye" target="blank">
                                                            <img src=${frye} alt="Frye">
                                                        </a>
                                                    </div>
                                                    <div class="contact-details">
                                                        <h2>Frye Onaga</h2>
                                                        <h3>Restaurant Owner</h3>
                                                        <p>Email: frye@crustbucket.jp</p>
                                                        <p>Phone: +81 90-4837-1625</p>
                                                    </div>
                                                </div>
                                                <div id="shiver-details">
                                                    <div>
                                                        <a href="https://splatoonwiki.org/wiki/Shiver" target="blank">
                                                            <img src=${shiver} alt="Shiver">
                                                        </a>
                                                    </div>
                                                    <div class="contact-details">
                                                        <h2>Shiver Hohojiro</h2>
                                                        <h3>Restaurant Co-Owner</h3>
                                                        <p>Email: shiver@crustbucket.jp</p>
                                                        <p>Phone: +81 80-7264-5193</p>
                                                    </div>
                                                </div>
                                                <div id="big-man-details">
                                                    <div>
                                                        <a href="https://splatoonwiki.org/wiki/Big_Man" target="blank">
                                                            <img src=${bigMan} alt="Big Man">
                                                        </a>
                                                    </div>
                                                    <div class="contact-details">
                                                        <h2>Big Man Mantaro</h2>
                                                        <h3>Head Taste Tester</h3>
                                                        <p>Email: bigman@crustbucket.jp</p>
                                                        <p>Phone: +81 70-9152-8476</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="contact-information-second">
                                                <a href="https://splatoonwiki.org/wiki/Deep_Cut" target="_blank">
                                                    <img src=${deepCutMembersTwo} alt="Resturant Staff"> 
                                                </a>
                                            </div>`;

    content.appendChild(section);
    section.appendChild(contactHeroContainer);
    section.appendChild(hrElmt);
    section.appendChild(contactInformationContainer);
};