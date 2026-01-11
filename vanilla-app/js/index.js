// index.js (MODULE FILE)

import {
  getAnimalData,
  getFunFactsDataFromAnimal,
  getKidsTipsData,
} from "./fetch.js";

// CSS variable setup
const header = document.getElementById("header");
const mobileNav = document.getElementById("mobileNav");

if (header) {
  document.documentElement.style.setProperty(
    "--header-height",
    `${header.offsetHeight}px`
  );
}

if (mobileNav) {
  document.documentElement.style.setProperty(
    "--mobile-nav-height",
    `${mobileNav.offsetHeight}px`
  );
}

/** Favorites management */
const FAVORITES_KEY = "favoriteAnimals";
let animalMap;
let animalMarkers = [];

/**
 * Get favorite animals from localStorage
 * @returns {Array} Array of favorite animal IDs
 */

const getFavorites = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) return JSON.parse(stored);
    return [];
  } catch (error) {
    console.error("Error getting favorites from localStorage:", error);
    return [];
  }
};
/**
 * Save favorite animals to localStorage
 * param {string} id - Animal ID to toggle
 */
const toggleFavorite = (id) => {
  const favorites = getFavorites();
  // if that animal is already a favorite, remove it
  if (favorites.includes(id)) {
    favorites.splice(favorites.indexOf(id), 1);
  } else {
    favorites.push(id);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

/**
 * Check if an animal is a favourite
 * @param {string} animalId - The animal ID to check
 * @returns {boolean}
 */
function isFavorite(animalId) {
  return getFavorites().includes(animalId);
}

function clearFavorites() {
  localStorage.removeItem(FAVORITES_KEY);
}

function attachFavouriteHandlers() {
  document.querySelectorAll(".animal-card__favourite").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      toggleFavorite(id);
      const favourite = isFavorite(id);
      button.classList.toggle("animal-card__favourite--active", favourite);

      window.dispatchEvent(new CustomEvent("favoriteUpdated"));
    });
  });
}

/**
 * clear all favorites
 */

// Fetch animals
const animals = await getAnimalData();
console.log("Loaded animal data:", animals);

// Fetch kids tips data
const kidsTips = await getKidsTipsData();
console.log("Loaded kids tips data:", kidsTips);

// Animal card rendering
function createAnimalCard(animal) {
  const favourite = isFavorite(animal.id);

  // Check if animal has art-directed images, otherwise use single image
  const hasPictureSupport = animal.imgMobile && animal.imgTablet;

  // create a picture element if art-directed images are available or use img otherwise
  const imageHTML = hasPictureSupport
    ? `
  <picture>
  <source media="(min-width: 900px)" srcset="${animal.img}" type="image/webp">
  <source media="(max-width: 800px)" srcset="${animal.imgTablet}" type="image/webp">
  <img src="${animal.imgMobile}" alt="${animal.name}" loading="lazy" class="animal-card__image" width="400"
        height="300">
  </picture>`
    : ` <img 
      src="${animal.img}" 
      alt="${animal.name}" 
      loading="lazy" 
      class="animal-card__image">`;
  return `
    <article class="animal-card">

      ${imageHTML}
  <div class="animal-card__content"><h3 class="animal-card__name">${animal.name
    }</h3>
<button
  class="animal-card__favourite ${favourite ? "animal-card__favourite--active" : ""
    }"
  data-id="${animal.id}"
  aria-label="${favourite ? "Remove from favourites" : "Add to favourites"}"
       title="${favourite ? "Remove from favourites" : "Add to favourites"}"
      >
     <svg width="24px" height="24px" class="favorite_animal__icon" viewBox="0 0 24 24" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </g>
            </svg>
      </button></div>
      
      <p class="animal-card__scientific"><em>${animal.scientificName}</em></p>
      <p class="animal-card__description">${animal.description}</p>
      <div class="animal-card__info">
      <span class="animal-card__zone">Zone: ${animal.location.zone}</span>
      <a href="animal.html?id=${animal.id}" class="animal-card__link">
        View Details →
      </a>
      </div>
    </article>
  `;
}

// Page initialization
function initHomePage() {
  const featuredContainer = document.getElementById("featuredAnimals");
  if (!featuredContainer) return;

  const featuredAnimals = animals.slice(0, 3);
  featuredContainer.innerHTML = featuredAnimals.map(createAnimalCard).join("");

  attachFavouriteHandlers();
}

/**
 * Initialize the animals page
 */
function initAnimalsPage() {
  const animalsContainer = document.getElementById("animalsGrid");
  const searchinput = document.getElementById("animalSearch");

  if (!animalsContainer) return;

  function renderAnimals(filter = "") {
    const searchedAnimals = filter.trim().toLowerCase();
    const filteredAnimals = animals.filter(
      (animal) =>
        animal.name.toLowerCase().includes(searchedAnimals) ||
        animal.scientificName.toLowerCase().includes(searchedAnimals)
    );

    if (filteredAnimals.length === 0) {
      animalsContainer.innerHTML = `<div class="empty-state">
       <h3 class="empty-state__title">No animals found</h3>
         <p class="empty-state__text">No animals found matching "${searchinput.value}". Try adjusting your search.</p></div>`;
      return;
    } else {
      animalsContainer.innerHTML = filteredAnimals
        .map((animal) => createAnimalCard(animal))
        .join("");
    }
  }

  renderAnimals();
  attachFavouriteHandlers();

  if (searchinput) {
    searchinput.addEventListener("input", () => {
      renderAnimals(searchinput.value);
    });
  }
}

/**
 * Initialize the Favorites page
 */

function initFavoritesPage() {
  const favoritesContainer = document.getElementById("favouritesGrid");
  const favoritesCount = document.getElementById("favouritesCount");
  const clearFavoritesButton = document.getElementById("clearAllBtn");
  console.log("Favorites container:", favoritesContainer);

  if (!favoritesContainer) return;

  function renderFavorites() {
    const favoriteIds = getFavorites();
    const favoriteAnimals = animals.filter((animal) =>
      favoriteIds.includes(animal.id)
    );
    console.log("Favorite animals:", favoriteAnimals);

    if (favoritesCount) {
      favoritesCount.textContent = `${favoriteAnimals.length} animal${favoriteAnimals.length !== 1 ? "s" : ""
        } saved`;
    }

    // no need to show clear button if there are no favorites
    if (clearFavoritesButton) {
      clearFavoritesButton.style.display =
        favoriteAnimals.length > 0 ? "flex" : "none";
    }

    if (favoriteAnimals.length === 0) {
      favoritesContainer.innerHTML = `
  <div class="empty-state">
    <h3 class="empty-state__title">No favorite animals yet</h3>
    <p class="empty-state__text">
      No favorite animals yet. Try adding some to your favorites.
    </p>
    <a href="animals.html" class="btn btn--primary">
      Browse Animals 
    </a>
  </div>
`;

      return;
    }
    favoritesContainer.innerHTML = favoriteAnimals
      .map((animal) => createAnimalCard(animal))
      .join("");
  }

  renderFavorites();
  attachFavouriteHandlers();
  window.addEventListener("favoriteUpdated", renderFavorites); // re-render when favorites are updated

  if (clearFavoritesButton) {
    clearFavoritesButton.addEventListener("click", () => {
      clearFavorites();
      renderFavorites();
    });
  }
}

/**
 * Initialize the maps page
 */

function initMapsPage() {
  const locationStatus = document.getElementById("locationStatus");
  const refreshButton = document.getElementById("refreshLocation");
  const zoneFilter = document.getElementById("zoneFilter");
  const animalsContainer = document.getElementById("mapAnimals");
  const showAnimalsToggle = document.getElementById("showAnimalsToggle"); // Add this toggle element

  let userLocation = null;
  let map = null;
  let animalMarkers = [];
  let userMarker = null;
  let showAnimals = false; // Toggle state

  // Initialize the Google Map
  async function initMap() {
    // Request the needed libraries
    const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
      google.maps.importLibrary("maps"),
      google.maps.importLibrary("marker"),
    ]);

    // Get the gmp-map element
    const mapElement = document.querySelector("gmp-map");
    if (!mapElement) return;

    // Get the inner map
    const innerMap = mapElement.innerMap;

    // Set map options
    innerMap.setOptions({
      mapTypeControl: false,
    });

    // Store reference for later use
    map = innerMap;
  }

  // Add markers for all animals
  async function addAnimalMarkers() {
    if (!map) return;

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Clear existing animal markers
    animalMarkers.forEach((marker) => (marker.map = null));
    animalMarkers = [];

    // Create a marker for each animal
    animals.forEach((animal) => {
      // FIX: Use 'lat' and 'lng' to match your JSON
      const marker = new AdvancedMarkerElement({
        map: map,
        position: {
          lat: animal.location.lat, // Changed from latitude
          lng: animal.location.lng, // Changed from longitude
        },
        title: animal.name,
      });

      animalMarkers.push(marker);
    });

    // Center map to show all animals and user
    fitMapToMarkers();
  }

  // Remove animal markers from map
  function removeAnimalMarkers() {
    animalMarkers.forEach((marker) => (marker.map = null));
  }

  // Fit map bounds to show all markers
  function fitMapToMarkers() {
    if (!map) return;

    const bounds = new google.maps.LatLngBounds();
    let hasMarkers = false;

    // Include animal markers if shown
    if (showAnimals && animals.length > 0) {
      animals.forEach((animal) => {
        bounds.extend({
          lat: animal.location.lat,
          lng: animal.location.lng,
        });
      });
      hasMarkers = true;
    }

    // Include user location if available
    if (userLocation) {
      bounds.extend(userLocation);
      hasMarkers = true;
    }

    // Only fit bounds if we have markers
    if (hasMarkers) {
      map.fitBounds(bounds);
    } else if (userLocation) {
      // If only user location, center on it
      map.setCenter(userLocation);
      map.setZoom(15);
    }
  }

  // Add or update user location marker (RED PIN)
  async function updateUserMarker() {
    if (!map || !userLocation) return;

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Remove existing user marker
    if (userMarker) {
      userMarker.map = null;
    }

    // Create new user marker - this will be the default RED pin
    userMarker = new AdvancedMarkerElement({
      map: map,
      position: {
        lat: userLocation.lat, // Make sure these are numbers
        lng: userLocation.lng,
      },
      title: "Your Location",
    });

    // Center map on user location by default
    if (!showAnimals) {
      map.setCenter(userLocation);
      map.setZoom(15);
    } else {
      fitMapToMarkers();
    }
  }

  // Request user location
  async function requestLocation() {
    if (!navigator.geolocation) {
      updateLocationStatus(
        "error",
        "Geolocation is not supported by your browser."
      );
      return;
    }
    updateLocationStatus("loading");

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // FIX: Make sure these are stored as NUMBERS
          userLocation = {
            lat: Number(position.coords.latitude),
            lng: Number(position.coords.longitude),
            accuracy: position.coords.accuracy,
          };
          updateLocationStatus("success", null, userLocation);

          // Update user marker on map
          await updateUserMarker();
        },
        (error) => {
          let errorMessage = "Unable to retrieve your location.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Permission denied. Please enable location access";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out.";
              break;
          }
          updateLocationStatus("error", errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    } catch (error) {
      updateLocationStatus("error", error.message);
    }
  }

  function updateLocationStatus(status, error = null, location = null) {
    if (!locationStatus) return;
    if (status === "loading") {
      locationStatus.innerHTML = "<p>Finding your location...</p>";
    } else if (status === "error") {
      locationStatus.innerHTML = `<p class="text-error">${error}</p>`;
    } else if (status === "success" && location) {
      locationStatus.innerHTML = `<p><strong>Your Location</strong></p>
        <p>Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)} 
        <span class="text-muted">(±${Math.round(
        location.accuracy
      )}m)</span></p>`;
    }
  }

  // Render animals on the map page based on zone filter
  function renderMapAnimals(selectedZone = "all") {
    if (!animalsContainer) return;
    const filteredAnimals =
      selectedZone === "all"
        ? animals
        : animals.filter((animal) => animal.location.zone === selectedZone);
    animalsContainer.innerHTML = filteredAnimals
      .map((animal) => createAnimalCard(animal))
      .join("");
  }

  // Toggle animal markers visibility
  function toggleAnimalMarkers() {
    showAnimals = !showAnimals;

    if (showAnimals) {
      addAnimalMarkers();
    } else {
      removeAnimalMarkers();
      // Re-center on user location if available
      if (userLocation && map) {
        map.setCenter(userLocation);
        map.setZoom(15);
      }
    }
  }

  // Initialize map first
  initMap();

  // Initial location request
  requestLocation();

  // Render animal cards
  renderMapAnimals();

  // Refresh location on button click
  if (refreshButton) {
    refreshButton.addEventListener("click", requestLocation);
  }

  // Toggle animal markers
  if (showAnimalsToggle) {
    showAnimalsToggle.addEventListener("change", toggleAnimalMarkers);
  }

  // Zone filter
  if (zoneFilter) {
    const zones = Array.from(
      new Set(animals.map((animal) => animal.location.zone))
    ).sort();

    zoneFilter.innerHTML = `
      <button class="btn btn--small btn--primary" data-zone="all">All Zones</button>
      ${zones
        .map(
          (zone) => `
        <button class="btn btn--small btn--outline-1" data-zone="${zone}">${zone}</button>
      `
        )
        .join("")}
    `;

    zoneFilter.addEventListener("click", (e) => {
      const button = e.target.closest("[data-zone]");
      if (!button) return;

      zoneFilter.querySelectorAll("button").forEach((btn) => {
        btn.classList.toggle("btn--primary", btn === button);
        btn.classList.toggle("btn--outline-1", btn !== button);
      });

      const selectedZone = button.dataset.zone;
      renderMapAnimals(selectedZone);
    });
  }
}

// Helper function to update the location status UI - that is the `checking your location` part

/* initialise kids zone page */
function initKidsZonePage() {
  const tipsContainer = document.getElementById("kidsTips");
  const factsContainer = document.getElementById("funFacts");

  if (!tipsContainer || !factsContainer) return;
  if (tipsContainer) {
    tipsContainer.innerHTML = kidsTips
      .map(
        (tip, index) => `
      <article class="kids-tip-card" style="animation-delay: ${index * 0.1}s">
        <span class="kids-tip-card__icon">${tip.icon}</span>
        <h3 class="kids-tip-card__title">${tip.title}</h3>
        <p class="kids-tip-card__text">${tip.description}</p>
      </article>
    `
      )
      .join("");
  }

  const funFacts = animals.map((animal) => {
    return { fact: animal.funFact };
  });

  if (factsContainer) {
    factsContainer.innerHTML = funFacts
      .map(
        (item, index) => `
      <div class="fun-fact" style="animation-delay: ${index * 0.05}s">
        <p class="fun-fact__text">${item.fact}</p>
      </div>
    `
      )
      .join("");
  }
}

// Page routing

// determine which page we are on and initialize accordingly
const path = window.location.pathname;
const page = path.split("/").pop().replace(".html", "") || "index";
console.log("Current page:", page);

switch (page) {
  case "index":
    initHomePage();
    break;
  case "animals":
    initAnimalsPage();
    break;
  case "favorites":
    initFavoritesPage();
    break;
  case "map":
    initMapsPage();
    break;
  case "kids":
    initKidsZonePage();
    break;
}

// Register service worker for PWA functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/js/sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// Network Information API to monitor connectivity changes - Implementing Network connectivity information based on spec

function updateNetworkStatus() {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection; // cross-browser support
  const networkStatus = document.getElementById("networkStatus");
  if (connection && networkStatus) {
    const type = connection.effectiveType; //eg '4g', '3g', '2g', 'slow-2g'
    const downlink = connection.downlink; // in Mb/s which is download speed
    const rtt = connection.rtt; // round-trip time in ms - round trip time for data to be sent to server and back ( acknowledged by the server )

    networkStatus.innerHTML = `
      <p>Connection Type: <strong>${type.toUpperCase()}</strong></p>
      <p>Downlink Speed: <strong>${downlink} Mb/s</strong></p>
      <p>latency: <strong>${rtt} ms</strong></p>
    `;
    console.log(
      `Connection type: ${type}, downlink: ${downlink}Mb/s, rtt: ${rtt}ms`
    );

    // Listen for changes in network status
    connection.addEventListener("change", () => {
      updateNetworkStatus();
    });

    if (type === "slow-2g" || type === "2g") {
      networkStatus.innerHTML +=
        '<p class="text-error">⚠️ Slow connection detected</p>';
    }
  } else {
    // use navigator.onLine as a fallback
    if (networkStatus) {
      const online = navigator.onLine;
      networkStatus.innerHTML = online
        ? "<p>This browser doesn't support the Network Information API, using navigator.onLine instead. <em>You are online</em></p>"
        : '<p class="text-error">This browser doesn\'t support the Network Information API, using navigator.onLine instead. You are offline</p>';
    }
    console.log("Network Information API not supported in this browser.");
  }
}

// Initialize network status on page load
updateNetworkStatus();
