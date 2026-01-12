let deferredPrompt;
const installBtn = document.getElementById('installButton');
const installContainer = document.getElementById('installContainer');

// Kids page install elements
const kidsInstallButton = document.getElementById('kidsInstallButton');
const kidsInstallPromo = document.getElementById('kidsInstallPromo');

window.addEventListener('beforeinstallprompt', (e) => {
// Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    
    deferredPrompt = e;

    // Show the install button
    if (installContainer) {
        installContainer.style.display = 'block';
    }

    console.log('PWA install prompt saved.');
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) {
            console.log('No install prompt available.');
            return;
        }
        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        console.log("Users choice:", outcome);

        // Hide the install button
        if (installContainer) {
            installContainer.style.display = 'none';
        }
        // Clear the deferredPrompt variable
        deferredPrompt = null;
    });
}

// Handle install button click (kids page)
if (kidsInstallButton) {
    kidsInstallButton.addEventListener('click', async () => {
        if (!deferredPrompt) {
            console.log('Install prompt not available');
            // Optional: Show a kid-friendly message
            alert('Oops! Your device might already have the app installed, or it needs to be opened in a compatible browser! 🦔');
            return;
        }
    
        // Show the install prompt
        deferredPrompt.prompt();
    
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
    
        console.log(`User response to install prompt: ${outcome}`);

        if (outcome === 'accepted') {
            // Show success message for kids
            kidsInstallPromo.innerHTML = `
        <div class="kids-install-promo__content">
          <div class="kids-install-promo__icon">🎉</div>
          <h2 class="kids-install-promo__title">Awesome! You're a Wildlife Explorer now!</h2>
          <p class="kids-install-promo__text">
            Look for the app icon on your home screen to start exploring! 🦁
          </p>
        </div>
      `;
                
            // Hide after 5 seconds
            setTimeout(() => {
                if (kidsInstallPromo) {
                    kidsInstallPromo.style.display = 'none';
                }
            }, 5000);
        } else {
            // Hide the promo if they declined
            if (kidsInstallPromo) {
                kidsInstallPromo.style.display = 'none';
            }
        }
    
        // Clear the deferredPrompt
        deferredPrompt = null;
      
    });
}
// listen for the appinstalled event
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
});

  // Hide install button after successful install
  if (installContainer) {
    installContainer.style.display = 'none';
}
  
  // Show success message on kids page
  if (kidsInstallPromo) {
    kidsInstallPromo.innerHTML = `
      <div class="kids-install-promo__content">
        <div class="kids-install-promo__icon">🎉</div>
        <h2 class="kids-install-promo__title">You're officially a Wildlife Explorer!</h2>
        <p class="kids-install-promo__text">
          Find the app on your home screen and start your adventure! 🦊🦔🦡
        </p>
      </div>
    `;
    
    setTimeout(() => {
      kidsInstallPromo.style.display = 'none';
    }, 5000);
  }
// ALREADY INSTALLED CHECK
if (
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true
) {
  if (installContainer) installContainer.style.display = 'none';
  if (kidsInstallPromo) kidsInstallPromo.style.display = 'none';
}

