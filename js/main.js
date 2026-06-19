// ============================================================
//  MAIN — Navigation, CTAs, Scroll Reveal, Smooth Scroll
// ============================================================

// ── App URLs ─────────────────────────────────────────────────
// Change these to point to your deployed Next.js app.
var APP_URL = {
  signIn:  'http://localhost:3000/login',
  signUp:  'http://localhost:3000/signup',
};

// ── Supabase Configuration ────────────────────────────────────
let supabaseClient = null;
if (window.supabase) {
  const supabaseUrl = 'https://ganfmihjqgadexmlleio.supabase.co';
  const supabaseKey = 'sb_publishable_O3RFdjxDq5oIy18VCI5_Sw_IPgcdc-w';
  supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
}

// ── Mobile Menu ───────────────────────────────────────────────
function toggleMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var icon = document.getElementById('menu-icon-open');
  var iconClose = document.getElementById('menu-icon-close');
  if (!menu) return;
  var isOpen = menu.classList.toggle('open');
  if (icon)      icon.style.display      = isOpen ? 'none'  : 'block';
  if (iconClose) iconClose.style.display = isOpen ? 'block' : 'none';
}

// ── CTA Handlers ──────────────────────────────────────────────
function handleBookDemo()  { window.openModal && window.openModal(); }

async function handleEmailSubmit() {
  var input = document.getElementById('email-input');
  var confirmation = document.getElementById('submit-confirmation');
  if (!input) return;

  var email = input.value.trim();
  if (!email || !email.includes('@')) {
    window.showToast('Invalid Email', 'Please enter a valid work email address.');
    return;
  }

  if (supabaseClient) {
    const { error } = await supabaseClient
      .from('waitlist')
      .insert([{ email: email }]);
      
    if (error) {
      console.error('Supabase error (falling back to local storage):', error.message);
      var savedEmails = JSON.parse(localStorage.getItem('tenkir_waitlist') || '[]');
      if (!savedEmails.some(e => e.email === email)) {
        savedEmails.push({ email: email, date: new Date().toISOString() });
        localStorage.setItem('tenkir_waitlist', JSON.stringify(savedEmails));
      }
    }
  } else {
    var savedEmails = JSON.parse(localStorage.getItem('tenkir_waitlist') || '[]');
    if (!savedEmails.some(e => e.email === email)) {
      savedEmails.push({ email: email, date: new Date().toISOString() });
      localStorage.setItem('tenkir_waitlist', JSON.stringify(savedEmails));
    }
  }

  input.value = '';
  if (confirmation) {
    confirmation.classList.remove('hidden');
    setTimeout(function () { confirmation.classList.add('hidden'); }, 5000);
  }
  window.showToast("You're on the list!", 'We will be in touch shortly.');
}

// ── Smooth Scroll (offset for fixed nav) ─────────────────────
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
      // Close mobile menu if open
      var menu = document.getElementById('mobile-menu');
      if (menu) menu.classList.remove('open');
    });
  });

  // ── Scroll Reveal ─────────────────────────────────────────
  var cards = document.querySelectorAll('.bento-card, .pricing-card, .metric-card');
  cards.forEach(function (el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    cards.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback — just show all
    cards.forEach(function (el) {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  // ── Style native <select> elements ───────────────────────
  var chevron = "url(\"data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")";
  document.querySelectorAll('select.input-field').forEach(function (sel) {
    sel.style.backgroundImage    = chevron;
    sel.style.backgroundRepeat   = 'no-repeat';
    sel.style.backgroundPosition = 'right 12px center';
    sel.style.paddingRight       = '36px';
    sel.style.appearance         = 'none';
  });
});

// ── Expose globals ────────────────────────────────────────────
window.toggleMobileMenu  = toggleMobileMenu;
window.handleBookDemo    = handleBookDemo;
window.handleEmailSubmit = handleEmailSubmit;
