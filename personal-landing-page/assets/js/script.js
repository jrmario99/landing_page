(() => {
  const themeToggle = document.getElementById('themeToggle');
  const newsletterForm = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('emailInput');
  const formMessage = document.getElementById('formMessage');

  // --- Theme Toggle ---

  function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Listen for OS-level theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // --- Newsletter Form Validation ---

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
  }

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      showMessage('Please enter your email address.', 'error');
      emailInput.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address.', 'error');
      emailInput.focus();
      return;
    }

    // Placeholder success — replace this with a real form submission
    showMessage('Thanks for subscribing! (This is a demo)', 'success');
    emailInput.value = '';
  });
})();
