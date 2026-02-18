/* ==============================
   NebulaNFT — Interactions
   Scroll-triggered roadmap,
   FAQ accordion, wallet modal,
   and starfield background.
   ============================== */

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initScrollAnimations();
  initFAQ();
  initWalletModal();
  initMobileMenu();
  initSmoothScroll();
});

/* ----- Starfield Background ----- */
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 200;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.7 + 0.3,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      star.pulse += 0.01;
      const flicker = 0.5 + Math.sin(star.pulse) * 0.5;
      const alpha = star.opacity * flicker;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();

      star.y += star.speed;
      if (star.y > canvas.height + 5) {
        star.y = -5;
        star.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createStars();
  });
}

/* ----- Scroll-triggered Roadmap Animations ----- */
function initScrollAnimations() {
  const items = document.querySelectorAll('.roadmap-item');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15,
    }
  );

  items.forEach(item => observer.observe(item));
}

/* ----- FAQ Accordion ----- */
function initFAQ() {
  const toggles = document.querySelectorAll('.faq-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const item = toggle.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item.active').forEach(open => {
        open.classList.remove('active');
        open.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if it wasn't already open)
      if (!isActive) {
        item.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ----- Wallet Modal (UI Only) ----- */
function initWalletModal() {
  const modal = document.getElementById('wallet-modal');
  const overlay = document.getElementById('wallet-modal-overlay');
  const closeBtn = document.getElementById('wallet-modal-close');
  const triggers = document.querySelectorAll(
    '#btn-connect-nav, #btn-connect-hero, #btn-connect-cta'
  );

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => btn.addEventListener('click', openModal));
  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ----- Mobile Menu ----- */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ----- Smooth Scroll for Anchor Links ----- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
