/* ============================================
   Novus - Modern SaaS & App Tech Template
   Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* --- DOM Ready --- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initThemeToggle();
    initNavbar();
    initMobileMenu();
    initAOS();
    initFeatureTabs();
    initTimeline();
    initCounters();
    initPricingToggle();
    initSmoothScroll();
  }

  /* ===========================================
     1. Dark / Light Mode Toggle
     =========================================== */
  function initThemeToggle() {
    var toggle = document.getElementById('theme-toggle');
    var toggleMobile = document.getElementById('theme-toggle-mobile');
    var root = document.documentElement;

    // Load saved preference
    var savedTheme = localStorage.getItem('novus-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    }

    function flipTheme() {
      root.classList.toggle('dark');
      localStorage.setItem('novus-theme', root.classList.contains('dark') ? 'dark' : 'light');
    }

    if (toggle) toggle.addEventListener('click', flipTheme);
    if (toggleMobile) toggleMobile.addEventListener('click', flipTheme);
  }

  /* ===========================================
     2. Sticky Navbar
     =========================================== */
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ===========================================
     3. Mobile Menu
     =========================================== */
  function initMobileMenu() {
    var openBtn = document.getElementById('mobile-menu-open');
    var closeBtn = document.getElementById('mobile-menu-close');
    var menu = document.getElementById('mobile-menu');
    if (!openBtn || !closeBtn || !menu) return;

    openBtn.addEventListener('click', function () {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', closeMenu);

    // Close on link click
    menu.querySelectorAll('.mobile-menu-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    function closeMenu() {
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ===========================================
     4. AOS (Animate On Scroll) - Custom impl
     =========================================== */
  function initAOS() {
    var elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = entry.target.getAttribute('data-aos-delay');
            if (delay) {
              setTimeout(function () {
                entry.target.classList.add('aos-animate');
              }, parseInt(delay, 10));
            } else {
              entry.target.classList.add('aos-animate');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ===========================================
     5. Feature Tabs
     =========================================== */
  function initFeatureTabs() {
    var tabBtns = document.querySelectorAll('.tab-btn');
    var tabPanels = document.querySelectorAll('.tab-panel');
    if (!tabBtns.length) return;

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');

        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        tabPanels.forEach(function (p) { p.classList.remove('active'); });

        btn.classList.add('active');
        var panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* ===========================================
     6. Timeline Progress
     =========================================== */
  function initTimeline() {
    var container = document.getElementById('timeline');
    if (!container) return;

    var progressBar = container.querySelector('.timeline-line-progress');
    var dots = container.querySelectorAll('.timeline-dot');
    var items = container.querySelectorAll('.timeline-item');

    function updateTimeline() {
      var containerRect = container.getBoundingClientRect();
      var containerTop = containerRect.top;
      var containerHeight = containerRect.height;
      var viewportCenter = window.innerHeight * 0.6;

      // Calculate progress
      var progress = (viewportCenter - containerTop) / containerHeight;
      progress = Math.max(0, Math.min(1, progress));

      if (progressBar) {
        progressBar.style.height = (progress * 100) + '%';
      }

      items.forEach(function (item, index) {
        var itemRect = item.getBoundingClientRect();
        if (itemRect.top < viewportCenter) {
          dots[index].classList.add('active');
        } else {
          dots[index].classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', updateTimeline, { passive: true });
    updateTimeline();
  }

  /* ===========================================
     7. Stats Counter Animation
     =========================================== */
  function initCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-counter'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var duration = 2000;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(eased * target);

        el.textContent = prefix + current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }
  }

  /* ===========================================
     8. Pricing Toggle (Monthly / Yearly)
     =========================================== */
  function initPricingToggle() {
    var toggle = document.getElementById('pricing-toggle');
    if (!toggle) return;

    var monthlyLabel = toggle.querySelector('[data-label="monthly"]');
    var yearlyLabel = toggle.querySelector('[data-label="yearly"]');
    var monthlyPrices = document.querySelectorAll('[data-price-monthly]');
    var yearlyPrices = document.querySelectorAll('[data-price-yearly]');

    toggle.addEventListener('click', function () {
      var isYearly = toggle.classList.toggle('yearly');

      if (monthlyLabel) monthlyLabel.classList.toggle('active', !isYearly);
      if (yearlyLabel) yearlyLabel.classList.toggle('active', isYearly);

      monthlyPrices.forEach(function (el) {
        var monthly = el.getAttribute('data-price-monthly');
        var yearly = el.getAttribute('data-price-yearly');
        el.textContent = isYearly ? yearly : monthly;
      });
    });
  }

  /* ===========================================
     9. Smooth Scroll for Anchor Links
     =========================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

})();
