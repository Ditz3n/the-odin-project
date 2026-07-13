import fullMenuImg from "./images/menu/full-menu.jpg";
import menuItemOne from "./images/menu/menu-item-one.jpg";
import menuItemTwo from "./images/menu/menu-item-two.jpg";

export default function DrawMenu() {
    console.log("Hello menu.js!");

    const content = document.querySelector("#content");

    const menuSection = document.createElement("section");
    menuSection.id = "menu-section";

    const menuContainer = document.createElement("div");
    menuContainer.id = "full-menu-container";

    const imgContainer = document.createElement("div");
    imgContainer.id = "menu-images";

    const menuTextContainer = document.createElement("div");
    menuTextContainer.id = "full-menu-text";

    imgContainer.innerHTML = `<div id="main-image">
                                  <img src=${fullMenuImg} alt="Splatlands Duo">
                              </div>
                              <div id="sub-images">
                                  <img src=${menuItemOne} alt="Takoyaki">
                                  <img src=${menuItemTwo} alt="Octo Soufflé Pancake">
                              </div>`;

    menuTextContainer.innerHTML = `<div id="menu-introduction">
                                      <h1>Menu</h1>
                                      <p>Fresh catches, colorful flavors, and signature dishes
                                          straight from the Splatlands. Every meal is made to
                                          satisfy even the toughest Turf War champions.</p>
                                   </div>
                                   <div id="full-course">
                                       <h2>Splatlands Duo ~ 50DKK</h2>
                                       <p>Can't decide? Enjoy both our savory Takoyaki and our
                                           fluffy Octo Soufflé Pancake in one satisfying meal—the
                                           perfect balance of sweet and savory.</p>
                                   </div>
                                   <div id="menu-item-one">
                                       <h2>Takoyaki ~ 30DKK</h2>
                                       <p>Golden octopus balls drizzled with savory sauce, creamy
                                          mayo, and a sprinkle of bonito flakes for an authentic
                                          street-food favorite.</p>
                                   </div>
                                   <div id="menu-item-two">
                                       <h2>Octo Soufflé Pancake ~ 30DKK</h2>
                                       <p>A light and fluffy octopus-shaped soufflé pancake topped
                                          with whipped cream, fresh berries, and sweet syrup for the
                                          perfect dessert.</p>
                                   </div>`;

    content.appendChild(menuSection);
    menuSection.appendChild(imgContainer);
    menuSection.appendChild(menuTextContainer);
};



