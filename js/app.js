/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = getSections();
const sectionsNum = sections.length;
const navBar = document.querySelector(".navbar_list");
let lastActiveSection = 0;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * @description Get All the sections in the page
 * @returns {HTMLCollection} All the sections
 * @note Hoisting is needed here so that i be able to call it before like in line 10
 */
function getSections() {
  return document.getElementsByTagName("section");
}

/**
 * @param {HTMLElement} section - The section that will be set to be active
 * @description Make the section and its link in navBar Active
 */
function addActivity(section) {
  section.classList.add("your-active-class");
  section.navLink.classList.add("active-link");
}

/**
 * @param {HTMLElement} section - The section that will be non active
 * @description Make the section and its link in navBar Non Active
 */
function removeActivity(section) {
  section.classList.remove("your-active-class");
  section.navLink.classList.remove("active-link");
}

/**
 * @param {HTMLElement} section
 * @description Calculate the height shown from a section if it is shown or how far it is from the top
 * @returns {Number} The height shown as +ve number or how far it is from the top as -ve number
 */
function clacShownHeight(section) {
  let sectionTop = section.getBoundingClientRect().top;
  let sectionBottom = section.getBoundingClientRect().bottom;
  shownHeight =
    sectionTop > 0 ? window.innerHeight - sectionTop : sectionBottom;
  return shownHeight;
}

/**
 * @description A function to get the section with the largest shown part (Takes the largest space of the current screen)
 * @returns {Number} The section number indexed from 0
 * @note shownHeight -> The amount of pixles shown from a section , N -> Next Section, L -> Last Section
 */
const getCurrSection = () => {
  let shownHeight, shownHeightN, shownHeightL;

  if (lastActiveSection <= 0) shownHeightL = Infinity * -1;
  else shownHeightL = clacShownHeight(sections[lastActiveSection - 1]);

  if (lastActiveSection >= sectionsNum - 1) shownHeightN = Infinity * -1;
  else shownHeightN = clacShownHeight(sections[lastActiveSection + 1]);

  shownHeight = clacShownHeight(sections[lastActiveSection]);

  switch (Math.max(shownHeight, shownHeightN, shownHeightL)) {
    case shownHeight:
      return lastActiveSection;
    case shownHeightN:
      return (lastActiveSection += 1);
    case shownHeightL:
      return (lastActiveSection -= 1);
  }
};

/**
 * @description A funtion that updates the section activity depending on the current shown(displayed) section;
 */
const updateActivity = () => {
  const currSectionNumber = getCurrSection();
  const currSection = sections[currSectionNumber],
    lastSection = sections[currSectionNumber - 1],
    nextSection = sections[currSectionNumber + 1];

  addActivity(currSection);
  if (lastSection != undefined) removeActivity(lastSection);
  if (nextSection != undefined) removeActivity(nextSection);
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
/**
 * @description A function that creates new nav link and connects between the section and its link in the nav bar from the 2 ends
 * @param {section} section - The section that will be attached to link in th nav bar
 * @returns {HTMLElement} a list item
 */
const newNavLink = (section) => {
  const listItem = document.createElement("li");
  listItem.classList.add("menu__link");
  listItem.textContent = section.getAttribute("data-nav");
  listItem.section = section;
  section.navLink = listItem;
  return listItem;
};

let navBarLinks = new DocumentFragment();

for (let i = 0; i < sectionsNum; i++) {
  const section = sections[i];
  navBarLinks.appendChild(newNavLink(section));
}
navBar.appendChild(navBarLinks);

/**
 * End Main Functions
 * Begin Events
 *
 */

// Scroll to section on link click
navBarList = document.querySelectorAll(".menu__link");
for (let i = 0; i < navBarList.length; i++) {
  let listItem = navBarList[i];
  listItem.addEventListener("click", () => {
    listItem.section.scrollIntoView({ behavior: "smooth" });
  });
}

// Set sections as active
document.addEventListener("scroll", () => updateActivity());
