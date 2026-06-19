// ============================================================
//  TOAST NOTIFICATION
//  Call: showToast('Title', 'Message')
//  Call: showToast('Title', 'Message', 5000)  ← custom ms
// ============================================================

(function () {
  let hideTimer = null;

  function showToast(title, message, duration) {
    duration = duration || 3500;

    const toast   = document.getElementById('toast');
    const toastT  = document.getElementById('toast-title');
    const toastM  = document.getElementById('toast-message');

    if (!toast || !toastT || !toastM) return;

    toastT.textContent = title;
    toastM.textContent = message;

    toast.classList.remove('hidden');
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(8px)';

    // Trigger reflow so transition fires
    void toast.offsetWidth;

    toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    toast.style.opacity    = '1';
    toast.style.transform  = 'translateY(0)';

    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(function () { toast.classList.add('hidden'); }, 260);
    }, duration);
  }

  // Expose globally so index.html onclick attributes can call it
  window.showToast = showToast;
})();
