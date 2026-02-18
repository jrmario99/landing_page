/* ========================================
   MAIN.JS — Portfolio Filter, Nav & Form
   ======================================== */

(function () {
  'use strict';

  // ---- Mobile Nav Toggle ----
  const toggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  const navLinks = document.querySelectorAll('.nav__link');

  toggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---- Header Scroll Effect ----
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ---- Portfolio Filter ----
  const filterContainer = document.querySelector('.work__filters');
  const cards = document.querySelectorAll('.work__card');

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.work__filter');
    if (!btn) return;

    // Update active button
    filterContainer.querySelector('.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });

  // ---- Contact Form Validation ----
  const form = document.getElementById('contact-form');

  const validators = {
    name: (value) => value.trim().length >= 2 ? '' : 'Digite seu nome (mín. 2 caracteres).',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Digite um e-mail válido.',
    message: (value) => value.trim().length >= 10 ? '' : 'Mensagem muito curta (mín. 10 caracteres).'
  };

  function showError(field, message) {
    const errorEl = field.closest('.contact__field').querySelector('.contact__error');
    errorEl.textContent = message;
  }

  function clearError(field) {
    showError(field, '');
  }

  // Live validation on blur
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      const validate = validators[field.name];
      if (validate) {
        const error = validate(field.value);
        if (error) showError(field, error);
      }
    });

    field.addEventListener('input', () => clearError(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    form.querySelectorAll('input, textarea').forEach(field => {
      const validate = validators[field.name];
      if (validate) {
        const error = validate(field.value);
        if (error) {
          showError(field, error);
          isValid = false;
        }
      }
    });

    if (isValid) {
      const btn = form.querySelector('.contact__submit');
      btn.textContent = 'Enviado!';
      btn.disabled = true;
      form.reset();

      setTimeout(() => {
        btn.textContent = 'Enviar Mensagem';
        btn.disabled = false;
      }, 3000);
    }
  });
})();
