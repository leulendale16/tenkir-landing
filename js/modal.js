// ============================================================
//  DEMO MODAL
//  openModal()  — show the Book a Demo modal
//  closeModal() — hide it
// ============================================================

(function () {
  function openModal() {
    const modal = document.getElementById('demo-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('demo-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function handleDemoSubmit() {
    closeModal();
    window.showToast('Demo Booked!', "We'll send a calendar invite within 24 hours.");
  }

  // Close on backdrop click
  document.addEventListener('DOMContentLoaded', function () {
    const backdrop = document.getElementById('modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeModal);
  });

  window.openModal        = openModal;
  window.closeModal       = closeModal;
  window.handleDemoSubmit = handleDemoSubmit;
})();
