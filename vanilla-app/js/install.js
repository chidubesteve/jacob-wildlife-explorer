let deferredPrompt = null;

const installBtn = document.getElementById("installButton");
const installContainer = document.getElementById("installContainer");
const kidsInstallButton = document.getElementById("kidsInstallButton");
const kidsInstallPromo = document.getElementById("kidsInstallPromo");

// BEFORE INSTALL PROMPT
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (installContainer) {
    installContainer.style.display = "block";
  }

  console.log("Install prompt available");
});

// SHARED INSTALL HANDLER
async function handleInstallClick(isKids = false) {
  if (!deferredPrompt) {
    if (isKids) {
      alert(
        "This app may already be installed or your browser doesn’t support installation 🦔"
      );
    }
    return;
  }

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;

  console.log("Install outcome:", outcome);

  deferredPrompt = null;

  if (outcome === "accepted") {
    if (installContainer) installContainer.style.display = "none";

    if (isKids && kidsInstallPromo) {
      kidsInstallPromo.innerHTML = `
        <div class="kids-install-promo__content">
          <div class="kids-install-promo__icon">🎉</div>
          <h2>You're a Wildlife Explorer!</h2>
          <p>Find the app on your home screen 🦊</p>
        </div>
      `;
      setTimeout(() => (kidsInstallPromo.style.display = "none"), 5000);
    }
  }
}

// MAIN BUTTON
installBtn?.addEventListener("click", () => handleInstallClick(false));

// KIDS BUTTON
kidsInstallButton?.addEventListener("click", () => handleInstallClick(true));

// FINAL INSTALL CONFIRMATION
window.addEventListener("appinstalled", () => {
  console.log("PWA installed");

  deferredPrompt = null;
  if (installContainer) installContainer.style.display = "none";
  if (kidsInstallPromo) kidsInstallPromo.style.display = "none";
});

// ALREADY INSTALLED CHECK
if (
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true
) {
  if (installContainer) installContainer.style.display = "none";
  if (kidsInstallPromo) kidsInstallPromo.style.display = "none";
}
