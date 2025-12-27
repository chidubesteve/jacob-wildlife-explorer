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
  {
    "id": "hedgehog",
    "name": "European Hedgehog",
    "sci": "Erinaceus europaeus",
    "desc": "Spiky night-time insect eaters that hibernate in winter.",
    "img": "assets/hedgehog.jpg",
    "lat": 53.3600,
    "lng": -2.8800,
    "tips": ["Make a hedgehog highway (small gaps in fences)", "Leave piles of leaves for hibernation", "Avoid slug pellets"]
  },
  {
    "id": "otter",
    "name": "Eurasian Otter",
    "sci": "Lutra lutra",
    "desc": "Playful swimmers that have made a comeback on UK rivers.",
    "img": "assets/otter.jpg",
    "lat": 53.3400,
    "lng": -2.9200,
    "tips": ["Keep rivers clean – don't litter near water", "Report oil spills if you see them"]
  },
  {
    "id": "fox",
    "name": "Red Fox",
    "sci": "Vulpes vulpes",
    "desc": "Clever urban adapters famous for their bushy tails.",
    "img": "assets/fox.jpg",
    "lat": 53.3700,
    "lng": -2.9100,
    "tips": ["Secure your bins so foxes don't scatter rubbish", "Enjoy watching them from a distance"]
  },
  {
    "id": "deer",
    "name": "Red Deer",
    "sci": "Cervus elaphus",
    "desc": "The UK's largest land mammal, often seen in woodlands.",
    "img": "assets/deer.jpg",
    "lat": 53.3300,
    "lng": -2.8900,
    "tips": ["Drive carefully on rural roads at dawn/dusk", "Plant native trees to provide food"]
  },
  {
    "id": "squirrel",
    "name": "Grey Squirrel",
    "sci": "Sciurus carolinensis",
    "desc": "Acrobatic tree-dwellers that bury nuts for winter.",
    "img": "assets/squirrel.jpg",
    "lat": 53.3550,
    "lng": -2.9050,
    "tips": ["Put up bird feeders that squirrels can't reach", "Plant bulb flowers they don't dig up"]
  }
]```

downloaded images from wikipedia, heartofengland.org and wildlifetrusts.org

converted european_otter.png to webp (631kb to 90.42kb), european_hedgehog.png to webp (5.6mb to 783.07kb) and european_badger.png to webp (257.17 KB to 35.91 KB) using freeconvert.com // specify why you did it and what are the benefits

downloaded badger silhouette from vecteezy and removed background using removebg.com and added a green color background
converted it to favicon and added it to assets folder using realfavicongenerator.net


choice of color, since we are building something forest-y and green is the color of nature. i thought of zoo, animal rescue, reserve, and the national geographic scene came to mind, so i did a lil search online on color  for an animal rescue zoo and colors aside the brands'color were colors that invoke  trust, calmness, health, and warmth. with h blue and green being the most common. and using websites like https://produkto.io/color-palettes/ and https://colorhunt.co/ where you can search for various color themes and palette based on maybe your prompt or designed branding. it also uses ai to suggest colors. #2D6A4F, #40916C, #264E35, #D9F2E9, #D69E2E, #F4C259, #8B6F3F, #FEF7E0

I contemplated whether or not to use icons as to not go against the guidelines of the application and i discovered the use of svg pasted in the code is fine. as that is reliant on the browser and its html only but downloading font awesome icons aor any other icon package through npm is not, getting cdn links and adding to the header may also be seen as a violation of the guidelines.

my icons are gotten from svgrepo.com. when trying to style the svg icons i had trouble changing their color and stroke through css and it was quite a hassle to debug, copying the same svg over and over too , made my html cluttered and did not following the DRY principle, thus why an icon package/library would be better to use.i later achieved or got my desired result by passing the currentColor variable to the stroke attribute.

I initially used fixed padding but refactored to a dynamic solution based on the actual header height. because hardcoded values broke on tablet screen sizes 

Initial header wrapped on tablets; thought of the best way to make it responsive around the 768-960px breakpoints so I tried reducing logo, this distorted branding, i decided to remove logo subtitle as this message was already being conveyed at the hero section and footer,I also reduced gap size between nav items, thus giving the header more breathable room and improving the ui