Staring my application up on the 18th of December, 2025, during CMWA class ( I said i would complete this project before the end of november🥲).
 created folder structure and created index.html and data/animals.json, css/style.css and js/index.js.

 used ai to generate demo json data and added it to data/animals.json   ```json[
  {
    "id": "badger",
    "name": "European Badger",
    "sci": "Meles meles",
    "desc": "Nocturnal diggers that live in family groups called clans. They help control pest populations.",
    "img": "assets/badger.jpg",
    "lat": 53.3500,
    "lng": -2.9000,
    "tips": ["Leave a shallow dish of water in your garden", "Don't disturb setts (their homes)", "Put out unsalted peanuts"]
  },
  // other json```. I updated it with more fields and improved the content of the description and tips.

downloaded images from wikipedia, heartofengland.org and wildlifetrusts.org

converted european_otter.png to webp (631kb to 90.42kb), european_hedgehog.png to webp (5.6mb to 783.07kb) and european_badger.png to webp (257.17 KB to 35.91 KB) using freeconvert.com // specify why you did it and what are the benefits

downloaded badger silhouette from vecteezy and removed background using removebg.com and added a green color background
converted it to favicon and added it to assets folder using realfavicongenerator.net


choice of color, since we are building something forest-y and green is the color of nature. i thought of zoo, animal rescue, reserve, and the national geographic scene came to mind, so i did a lil search online on color  for an animal rescue zoo and colors aside the brands'color were colors that invoke  trust, calmness, health, and warmth. with h blue and green being the most common. and using websites like https://produkto.io/color-palettes/ and https://colorhunt.co/ where you can search for various color themes and palette based on maybe your prompt or designed branding. it also uses ai to suggest colors. #2D6A4F, #40916C, #264E35, #D9F2E9, #D69E2E, #F4C259, #8B6F3F, #FEF7E0

I contemplated whether or not to use icons as to not go against the guidelines of the application and i discovered the use of svg pasted in the code is fine. as that is reliant on the browser and its html only but downloading font awesome icons aor any other icon package through npm is not, getting cdn links and adding to the header may also be seen as a violation of the guidelines.

my icons are gotten from svgrepo.com. when trying to style the svg icons i had trouble changing their color and stroke through css and it was quite a hassle to debug, copying the same svg over and over too , made my html cluttered and did not following the DRY principle, thus why an icon package/library would be better to use.i later achieved or got my desired result by passing the currentColor variable to the stroke attribute.

I initially used fixed padding but refactored to a dynamic solution based on the actual header height. because hardcoded values broke on tablet screen sizes. I noticed that this my approach `const header = document.getElementById("header");
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
console.log("Mobile nav height set to:", mobileNav.offsetHeight);` returned 0 in some cases when the screen resoultion was changed this defeating hte whole process and rendering inconsistently. so i have to add a default value incase if 0 or no value is returned
```

```
## Navigation visibility issue (Responsive Design)
Initial header wrapped on tablets; thought of the best way to make it responsive around the 768-960px breakpoints so I tried reducing logo, this distorted branding, i decided to remove logo subtitle as this message was already being conveyed at the hero section and footer,I also reduced gap size between nav items, thus giving the header more breathable room and improving the ui.

While working on the responsive navigation, I wanted the Kids Zone link to remain visible on smaller screens, while the rest of the navigation items would be hidden and later moved to the footer. On larger screens (768px and above), all navigation items should be visible again.

Initially, I hid the entire navigation container using display: none and attempted to make the Kids Zone item visible again using a media query. However, this approach did not work as expected. I realised that when a parent element is set to display: none, all of its child elements are removed from the layout and cannot be shown individually.

After reflecting on this, I changed my approach to keep the navigation container visible at all screen sizes and instead control the visibility of individual navigation items. By hiding all list items by default and then selectively displaying the Kids Zone link on smaller screens, I was able to achieve the desired behaviour. A media query was then used to display all navigation items again on larger screens.

## Dynamic layout values using JavaScript

To prevent the fixed header and mobile navigation from overlapping page content, I experimented with a dynamic approach using JavaScript to calculate their heights and store the values in CSS custom properties. This allowed me to apply padding and margins based on the actual rendered height of these elements rather than relying on hard-coded values.

While this approach worked on initial page load, I noticed several limitations. The JavaScript only runs once when the page loads, meaning it does not automatically recalculate values when the viewport size changes. As a result, when elements such as the mobile navigation are hidden at larger screen sizes, their offsetHeight returns 0. If the viewport is later resized without a full page refresh, the stored CSS values are no longer accurate, leading to missing spacing or visual misalignment.

I also observed that small layout shifts, such as font loading or breakpoint changes, could cause the header padding to feel inconsistent, as the JavaScript does not re-run to account for these changes.

This highlighted an important limitation of this approach in a vanilla JavaScript context and helped me understand why modern frameworks like React provide lifecycle hooks to react to layout changes more reliably. For this project, I chose to keep the solution simple and accept these trade-offs, as the dynamic calculation still improved maintainability compared to fully hard-coded spacing values.


### code repetition and lack of consistency with the DRY principle, i.e. Don't Repeat Yourself.

while building ou other pages of the app like the animals and maps and events pages, i realised i had to copy over a lot of boilerplate code and constant components like the header and footer, the mobile navigation and the svg icons, that is one downside of vanilla app development and one major problem that react solves ( and next that is on-top of react). if to say i was building with next,i realized i can easily create reusable components that can be used across multiple pages, thus saving a lot of boilerplate code and making the codebase more maintainable and consistent with the DRY principle.

### Navigation state, ARIA, and styling

I initially thought that I would need JavaScript to manage active navigation styling, assuming that aria-current="page" was only for accessibility and could not drive visual feedback. On further investigation, I realised that while aria-current does not update automatically, it can still be used as the source of truth for both accessibility and styling through CSS attribute selectors.

In a static multi-page site, navigation state is page-based rather than dynamic. Each HTML file declares which link represents the current page. This allows aria-current="page" to communicate the correct state to assistive technologies, while CSS handles the visual highlighting without additional JavaScript.

JavaScript-based class toggling is only necessary when navigation state needs to update dynamically without a page reload, such as in SPAs or shared layouts. For this project, a declarative, page-level approach is simpler, more maintainable, and aligns better with accessibility best practices.

when styling the navigation, the accent favorites button, I discovered that a scale transform applied to a navigation link was not taking effect even though the CSS selector was correct. The issue was that anchor elements are inline by default and do not reliably support transforms. Changing the link to display: inline-flex created a proper layout box, allowing the transform to apply as expected. This highlighted the importance of understanding how display types affect CSS rendering behaviour. Mozilla Developer Network (MDN) (n.d.) CSS display. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/display (Accessed: 27 December 2025).
Mozilla Developer Network (MDN) (n.d.) CSS transform. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/transform (Accessed: 27 December 2025). Mozilla Developer Network (MDN) (n.d.) Inline formatting context. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Inline_formatting_context
 (Accessed: 27 December 2025).