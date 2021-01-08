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
const navBar = document.querySelector("nav");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Hoisting is needed here so that i be able to call it before like in line 10
function getSections() {
  return document.getElementsByTagName("section");
}
const newNavLink = (section) => {
  const listItem = document.createElement("li");
  listItem.classList.add("menu__link");
  listItem.textContent = section.getAttribute("data-nav");
  listItem.section = section;
  section.navLink = listItem;
  return listItem;
};
const getCurrSection = () => {
  let sectionNum =
    (window.innerHeight + scrollY - navBar.getBoundingClientRect().height) /
    (1.15 * sections[0].offsetHeight);
  sectionNum = Math.floor(sectionNum) - 1;
  return sectionNum < 0 || sectionNum > sectionsNum - 1
    ? null
    : { sectionNumber: sectionNum, section: sections[sectionNum] };
};
const setActive = (currSection) => {
  const { section, sectionNumber } = currSection;
  console.log(sectionNumber);
  section.classList.add("your-active-class");
  section.navLink.classList.add("active-link");
  if (sectionNumber >= 1) {
    sections[sectionNumber - 1].classList.remove("your-active-class");
    sections[sectionNumber - 1].navLink.classList.remove("active-link");
  }
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
let navBarList = new DocumentFragment();
for (let i = 0; i < sectionsNum; i++) {
  const itemName = sections[i];
  navBarList.appendChild(newNavLink(itemName));
}
navBar.appendChild(navBarList);

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click
navBarList = document.querySelectorAll(".menu__link");
for (let i = 0; i < navBarList.length; i++) {
  let listItem = navBarList[i];
  listItem.addEventListener("click", () => {
    listItem.section.scrollIntoView({ behavior: "smooth" });
  });
}

// Set sections as active
document.addEventListener("scroll", (event) => {
  let currSection = getCurrSection();
  if (currSection != null) setActive(currSection);
});
