# Landing Page Project

## Table of Contents

- [Landing Page Project](#landing-page-project)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Implementation](#implementation)
    - [Navbar](#navbar)
    - [Active Section](#active-section)
    - [Scroll to Section](#scroll-to-section)

## About

**Author:** Mohamed Ahmed Mohamed Ibrahim + Udacity Team for the starter code \
**Purpose:** A training project about _DOM manipulation_ in fwd Udacity scholership \
**Target:** In this project a `landing page` is implemented with dynamic nav bar for the page sections

## Implementation

### Navbar

The Navbar is implemented in html in 3 lines just the html tag for the navbar and one for the unordered list like so

```html
<nav class="navbar__menu">
  <ul class="navbar_list"></ul>
</nav>
```

and the styling in css and the main code that builds the navbar is in js as following

```javascript
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
```

### Active Section

This is the most interesting part in the project the activity section and link activity in the navbar

- First: I connected the section with its link in the nav bar like so by adding a new property in the object of section (navLink) and a (section) property in listItem

```javascript
listItem.section = section;
section.navLink = listItem;
```

- Second: I created a function that determines which section takes the most part of the screen so that i be able to make it the active one and make its link in navbar active too

```javascript
const getCurrSection = () => {.....}
```

- Third: I created a function that updates the activity of sections by making the one we got from the last funtion as active and the othe sections non-active

```javascript
const updateActivity = () => {
  const currSectionNumber = getCurrSection();
  const currSection = sections[currSectionNumber],
    lastSection = sections[currSectionNumber - 1],
    nextSection = sections[currSectionNumber + 1];

  addActivity(currSection);
  if (lastSection != undefined) removeActivity(lastSection);
  if (nextSection != undefined) removeActivity(nextSection);
};
```

- Fourth: I added an event Listener that listens to the scrolling of the page and it calls the updateActivty fuction so we can make sure that the current active section is the one that appears in the viewport.

```javascript
document.addEventListener("scroll", () => updateActivity());
```

### Scroll to Section

Here i used `scrollIntoView` method to accomplish this functionality.
