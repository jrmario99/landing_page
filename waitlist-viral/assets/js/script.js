/* ============================================
   COMING SOON — JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Config ---
  const CONFIG = {
    currentSubscribers: 847,
    goalSubscribers: 1000,
    siteUrl: 'https://seusite.com',
    shareText: 'Algo incrível está chegando! Cadastre-se para acesso antecipado 🚀',
    simulateSubmit: true, // Set false when using a real backend
  };

  // --- DOM Elements ---
  const form = document.getElementById('emailForm');
  const emailInput = document.getElementById('emailInput');
  const submitBtn = document.getElementById('submitBtn');
  const emailError = document.getElementById('emailError');
  const successMessage = document.getElementById('successMessage');
  const confirmedEmail = document.getElementById('confirmedEmail');
  const progressFill = document.getElementById('progressFill');
  const currentCountEl = document.getElementById('currentCount');
  const remainingEl = document.getElementById('remaining');
  const copyLinkBtn = document.getElementById('copyLink');
  const copyText = document.getElementById('copyText');

  // --- Email Validation (Pure JS) ---
  function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    email = email.trim();
    if (email.length > 254) return false;

    // Standard RFC-ish regex
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!re.test(email)) return false;

    // Must have at least one dot in domain
    var parts = email.split('@');
    if (parts.length !== 2) return false;
    var domain = parts[1];
    if (domain.indexOf('.') === -1) return false;

    // TLD must be at least 2 chars
    var tld = domain.split('.').pop();
    if (tld.length < 2) return false;

    return true;
  }

  // --- Progress Bar ---
  function initProgressBar() {
    var percent = Math.min((CONFIG.currentSubscribers / CONFIG.goalSubscribers) * 100, 100);
    // Animate after a short delay
    setTimeout(function () {
      progressFill.style.width = percent + '%';
      setTimeout(function () {
        progressFill.classList.add('animated');
      }, 800);
    }, 300);
  }

  function updateProgress(newCount) {
    CONFIG.currentSubscribers = newCount;
    var percent = Math.min((newCount / CONFIG.goalSubscribers) * 100, 100);
    progressFill.style.width = percent + '%';
    currentCountEl.textContent = newCount.toLocaleString('pt-BR');
    remainingEl.textContent = Math.max(CONFIG.goalSubscribers - newCount, 0).toLocaleString('pt-BR');
  }

  // --- Form Handling ---
  function showError(message) {
    emailError.textContent = message;
    document.querySelector('.input-wrapper').classList.add('error');
  }

  function clearError() {
    emailError.textContent = '';
    document.querySelector('.input-wrapper').classList.remove('error');
  }

  function setLoading(loading) {
    if (loading) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
    } else {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  function showSuccess(email) {
    form.style.display = 'none';
    confirmedEmail.textContent = email;
    successMessage.classList.add('visible');
    updateProgress(CONFIG.currentSubscribers + 1);
    setupShareLinks(email);
  }

  // --- Simulated Submit (replace with real API call) ---
  function submitEmail(email) {
    setLoading(true);
    clearError();

    if (CONFIG.simulateSubmit) {
      // Simulate network delay
      setTimeout(function () {
        setLoading(false);
        showSuccess(email);
      }, 1200);
      return;
    }

    // ====================================================
    // REAL INTEGRATION — Uncomment and adapt one of these:
    // ====================================================

    // --- Mailchimp (via their API or embedded form endpoint) ---
    // See INTEGRATION.md for full instructions.

    // --- GetResponse ---
    // See INTEGRATION.md for full instructions.

    // --- Generic fetch example ---
    /*
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Erro no servidor');
        return res.json();
      })
      .then(function () {
        setLoading(false);
        showSuccess(email);
      })
      .catch(function (err) {
        setLoading(false);
        showError(err.message || 'Algo deu errado. Tente novamente.');
      });
    */
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearError();

    var email = emailInput.value.trim();

    if (!email) {
      showError('Por favor, insira seu e-mail.');
      emailInput.focus();
      return;
    }

    if (!validateEmail(email)) {
      showError('Por favor, insira um e-mail válido.');
      emailInput.focus();
      return;
    }

    submitEmail(email);
  });

  // Clear error on typing
  emailInput.addEventListener('input', function () {
    if (emailError.textContent) clearError();
  });

  // --- Social Sharing ---
  function setupShareLinks() {
    var url = encodeURIComponent(CONFIG.siteUrl);
    var text = encodeURIComponent(CONFIG.shareText);

    document.getElementById('shareWhatsApp').href =
      'https://wa.me/?text=' + text + '%20' + url;

    document.getElementById('shareTwitter').href =
      'https://twitter.com/intent/tweet?text=' + text + '&url=' + url;

    document.getElementById('shareTelegram').href =
      'https://t.me/share/url?url=' + url + '&text=' + text;
  }

  // --- Copy Link ---
  copyLinkBtn.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(CONFIG.siteUrl).then(function () {
        showCopied();
      });
    } else {
      // Fallback
      var textarea = document.createElement('textarea');
      textarea.value = CONFIG.siteUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showCopied();
    }
  });

  function showCopied() {
    copyText.textContent = 'Copiado!';
    copyLinkBtn.classList.add('copied');
    setTimeout(function () {
      copyText.textContent = 'Copiar link';
      copyLinkBtn.classList.remove('copied');
    }, 2000);
  }

  // --- Init ---
  initProgressBar();
  setupShareLinks();
})();
