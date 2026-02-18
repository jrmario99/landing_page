/* ============================================
   CHRONICLE — Tech Blog & Magazine
   Vanilla JS — Theme, Search, Menu, Progress,
   Share, Copy Code, Newsletter, Scroll Reveal
============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       1. DARK MODE
    ============================================ */
    const themeToggle = document.getElementById('themeToggle');
    const themeIconLight = document.getElementById('themeIconLight');
    const themeIconDark = document.getElementById('themeIconDark');
    const html = document.documentElement;

    function getTheme() {
        const stored = localStorage.getItem('chronicle-theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        html.classList.toggle('dark', theme === 'dark');
        if (themeIconLight && themeIconDark) {
            themeIconLight.classList.toggle('hidden', theme === 'dark');
            themeIconDark.classList.toggle('hidden', theme !== 'dark');
        }
        localStorage.setItem('chronicle-theme', theme);
    }

    applyTheme(getTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.classList.contains('dark') ? 'dark' : 'light';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('chronicle-theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    /* ============================================
       2. EXPANDABLE SEARCH BAR
    ============================================ */
    const searchToggle = document.getElementById('searchToggle');
    const searchIconOpen = document.getElementById('searchIconOpen');
    const searchIconClose = document.getElementById('searchIconClose');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');

    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => {
            const isOpen = !searchBar.classList.contains('hidden');
            searchBar.classList.toggle('hidden', isOpen);
            if (searchIconOpen) searchIconOpen.classList.toggle('hidden', !isOpen);
            if (searchIconClose) searchIconClose.classList.toggle('hidden', isOpen);
            if (!isOpen && searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        });

        // ESC to close search
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !searchBar.classList.contains('hidden')) {
                searchBar.classList.add('hidden');
                if (searchIconOpen) searchIconOpen.classList.remove('hidden');
                if (searchIconClose) searchIconClose.classList.add('hidden');
            }
        });

        // Ctrl+K to open search
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchToggle.click();
            }
        });
    }

    /* ============================================
       3. MOBILE MENU (Off-Canvas Right)
    ============================================ */
    const menuToggle = document.getElementById('menuToggle');
    const menuIconOpen = document.getElementById('menuIconOpen');
    const menuIconClose = document.getElementById('menuIconClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');

    function openMobileMenu() {
        if (!mobileMenu || !mobileOverlay) return;
        mobileMenu.style.transform = 'translateX(0)';
        mobileOverlay.style.opacity = '1';
        mobileOverlay.style.visibility = 'visible';
        document.body.classList.add('no-scroll');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
        if (menuIconOpen) menuIconOpen.classList.add('hidden');
        if (menuIconClose) menuIconClose.classList.remove('hidden');
    }

    function closeMobileMenu() {
        if (!mobileMenu || !mobileOverlay) return;
        mobileMenu.style.transform = 'translateX(100%)';
        mobileOverlay.style.opacity = '0';
        mobileOverlay.style.visibility = 'hidden';
        document.body.classList.remove('no-scroll');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        if (menuIconOpen) menuIconOpen.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu && mobileMenu.style.transform === 'translateX(0px)';
            isOpen ? closeMobileMenu() : openMobileMenu();
        });
    }

    if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    /* ============================================
       4. READING PROGRESS BAR
    ============================================ */
    const progressBar = document.getElementById('readingProgress');
    const articleContent = document.getElementById('articleContent');

    if (progressBar && articleContent) {
        function updateProgress() {
            const articleRect = articleContent.getBoundingClientRect();
            const articleTop = articleContent.offsetTop;
            const articleHeight = articleContent.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrolled = window.scrollY;

            const start = articleTop - windowHeight;
            const end = articleTop + articleHeight;
            const progress = Math.max(0, Math.min(1, (scrolled - start) / (end - start)));

            progressBar.style.width = `${progress * 100}%`;
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    /* ============================================
       5. ARTICLE HEADER INFO (Show on scroll)
    ============================================ */
    const articleHeaderInfo = document.getElementById('articleHeaderInfo');

    if (articleHeaderInfo) {
        window.addEventListener('scroll', () => {
            const show = window.scrollY > 400;
            articleHeaderInfo.style.opacity = show ? '1' : '0';
            articleHeaderInfo.style.transform = show ? 'translateY(0)' : 'translateY(8px)';
        }, { passive: true });
    }

    /* ============================================
       6. FLOATING SHARE BUTTONS (Show on scroll)
    ============================================ */
    const shareFloat = document.getElementById('shareFloat');

    if (shareFloat) {
        window.addEventListener('scroll', () => {
            shareFloat.style.opacity = window.scrollY > 600 ? '1' : '0';
        }, { passive: true });
    }

    /* ============================================
       7. MOBILE SHARE (Web Share API)
    ============================================ */
    const shareBtn = document.getElementById('shareBtn');

    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: document.title,
                        url: window.location.href
                    });
                } catch (err) {
                    // User cancelled or error
                }
            } else {
                navigator.clipboard.writeText(window.location.href);
                showToast('Link copiado!');
            }
        });
    }

    /* ============================================
       8. COPY CODE BUTTONS
    ============================================ */
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-copy');
            const codeEl = document.getElementById(targetId);
            if (!codeEl) return;

            const text = codeEl.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const span = btn.querySelector('span');
                const originalText = span.textContent;
                span.textContent = 'Copiado!';
                btn.classList.add('copied');

                setTimeout(() => {
                    span.textContent = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });

    /* ============================================
       9. TOAST NOTIFICATION
    ============================================ */
    function showToast(message) {
        // Remove existing toast
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    }

    // Make showToast globally available
    window.showToast = showToast;

    /* ============================================
       10. NEWSLETTER FORM
    ============================================ */
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');

            if (!emailInput || !emailInput.value.trim()) return;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            // Simulate API call
            setTimeout(() => {
                newsletterForm.innerHTML = `
                    <div class="newsletter-success text-center py-2">
                        <svg class="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <p class="font-sans font-semibold text-sm text-ink-900 dark:text-white">Inscrito com sucesso!</p>
                        <p class="font-sans text-xs text-ink-400 mt-1">Confira seu e-mail de boas-vindas.</p>
                    </div>
                `;
            }, 1200);
        });
    }

    /* ============================================
       11. SCROLL REVEAL (Intersection Observer)
    ============================================ */
    const revealElements = document.querySelectorAll('.article-card, .reveal');

    if ('IntersectionObserver' in window && revealElements.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 80);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(el);
        });
    }

    /* ============================================
       12. SMOOTH ANCHOR SCROLL
    ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
