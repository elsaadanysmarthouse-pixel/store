// تسجيل Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log("Service Worker Registered"))
      .catch(err => console.log("SW Error:", err));
  });
}

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

if (installBtn) {

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    installBtn.style.display = 'none';
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);

    deferredPrompt = null;
  });

}
