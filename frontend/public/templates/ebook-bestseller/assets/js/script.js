/* ============================================
   E-BOOK LAUNCH — JavaScript
   Countdown Timer + FAQ Accordion
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     COUNTDOWN TIMER

     Set your deadline date below.
     Format: 'YYYY-MM-DDTHH:MM:SS'
     ------------------------------------------ */

  // EDIT THIS: Set your countdown deadline (ISO 8601 format)
  const COUNTDOWN_DEADLINE = '2026-03-20T23:59:59';

  /**
   * Calculates the remaining time until the deadline.
   * @returns {{ days: number, hours: number, minutes: number, seconds: number, expired: boolean }}
   */
  function getTimeRemaining() {
    const now = new Date().getTime();
    const deadline = new Date(COUNTDOWN_DEADLINE).getTime();
    const diff = deadline - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    };
  }

  /**
   * Pads a number with a leading zero if needed.
   * @param {number} num
   * @returns {string}
   */
  function pad(num) {
    return String(num).padStart(2, '0');
  }

  /**
   * Updates all countdown display elements on the page.
   */
  function updateCountdown() {
    const time = getTimeRemaining();
    const display = time.expired
      ? 'EXPIRED'
      : pad(time.days) + ':' + pad(time.hours) + ':' + pad(time.minutes) + ':' + pad(time.seconds);

    var inlineEl = document.getElementById('countdown-inline');
    var cardEl = document.getElementById('countdown-card');

    if (inlineEl) inlineEl.textContent = display;
    if (cardEl) cardEl.textContent = display;

    if (time.expired) {
      clearInterval(countdownInterval);
    }
  }

  // Start the countdown — updates every second
  var countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); // run immediately on load

  /* ------------------------------------------
     FAQ ACCORDION
     ------------------------------------------ */

  var faqContainer = document.getElementById('faq-container');

  if (faqContainer) {
    faqContainer.addEventListener('click', function (e) {
      var toggle = e.target.closest('.faq-toggle');
      if (!toggle) return;

      var item = toggle.closest('.faq-item');
      var content = item.querySelector('.faq-content');
      var isActive = item.classList.contains('active');

      // Close all open FAQ items
      var allItems = faqContainer.querySelectorAll('.faq-item');
      allItems.forEach(function (el) {
        el.classList.remove('active');
        var c = el.querySelector('.faq-content');
        c.classList.add('hidden');
        c.style.maxHeight = '0';
        el.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
      });

      // Toggle the clicked item (if it wasn't already open)
      if (!isActive) {
        item.classList.add('active');
        content.classList.remove('hidden');
        content.style.maxHeight = content.scrollHeight + 'px';
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  }

  /* ------------------------------------------
     FOOTER YEAR
     ------------------------------------------ */

  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
