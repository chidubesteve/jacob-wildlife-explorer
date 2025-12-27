console.log("Hello, World!");
// This is a JavaScript file for the Jacob Wildlife Explorer vanilla app.

// Set CSS variable for header height
const header = document.getElementById("header");
document.documentElement.style.setProperty(
  "--header-height",
  `${header.offsetHeight}px`
);
console.log("Header height set to:", header.offsetHeight);
const mobileNav = document.getElementById("mobileNav");
document.documentElement.style.setProperty(
  "--mobile-nav-height",
  `${mobileNav.offsetHeight}px`
);
console.log("Mobile nav height set to:", mobileNav.offsetHeight);
