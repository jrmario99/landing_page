/* ============================================
   ESTATELUX — Luxury Real Estate Template
   Vanilla JS — Theme, Header, Menu, Search,
   Price Range, Lightbox, Counters, Favorites
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
        const stored = localStorage.getItem('estatelux-theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        html.classList.toggle('dark', theme === 'dark');
        if (themeIconLight && themeIconDark) {
            themeIconLight.classList.toggle('hidden', theme === 'dark');
            themeIconDark.classList.toggle('hidden', theme !== 'dark');
        }
        localStorage.setItem('estatelux-theme', theme);
    }

    applyTheme(getTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.classList.contains('dark') ? 'dark' : 'light';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('estatelux-theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    /* ============================================
       2. STICKY HEADER (Transparent → Solid)
    ============================================ */
    const header = document.getElementById('header');

    if (header) {
        function updateHeader() {
            header.classList.toggle('scrolled', window.scrollY > 80);
        }
        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader();
    }

    /* ============================================
       3. MOBILE MENU
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
       4. SEARCH TABS (Buy / Rent)
    ============================================ */
    document.querySelectorAll('.search-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.search-tab').forEach(t => {
                t.classList.remove('active');
                t.style.background = 'rgba(255,255,255,0.1)';
                t.style.color = 'rgba(255,255,255,0.6)';
                t.style.borderColor = 'rgba(255,255,255,0.1)';
            });
            tab.classList.add('active');
            tab.style.background = 'rgba(255,255,255,0.2)';
            tab.style.color = '#ffffff';
            tab.style.borderColor = 'rgba(255,255,255,0.25)';
        });
    });

    /* ============================================
       5. PRICE RANGE SLIDER
    ============================================ */
    const priceRange = document.getElementById('priceRange');
    const priceLabel = document.getElementById('priceLabel');

    if (priceRange && priceLabel) {
        function formatPrice(value) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 0
            }).format(value);
        }

        function updatePriceLabel() {
            priceLabel.textContent = `Até ${formatPrice(priceRange.value)}`;
        }

        priceRange.addEventListener('input', updatePriceLabel);
        updatePriceLabel();
    }

    /* ============================================
       6. FAVORITE BUTTONS
    ============================================ */
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            btn.classList.toggle('active');

            const svg = btn.querySelector('svg');
            if (btn.classList.contains('active')) {
                svg.setAttribute('fill', 'white');
            } else {
                svg.setAttribute('fill', 'none');
            }
        });
    });

    /* ============================================
       7. STATS COUNTERS (Animated)
    ============================================ */
    const counters = document.querySelectorAll('.counter');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2000;
        const startTime = performance.now();

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const current = Math.floor(easedProgress * target);

            el.textContent = current.toLocaleString('pt-BR');

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString('pt-BR');
            }
        }

        requestAnimationFrame(update);
    }

    if ('IntersectionObserver' in window && counters.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    /* ============================================
       8. LIGHTBOX (Gallery)
    ============================================ */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox && lightboxImg && galleryItems.length) {
        const images = [];
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) images.push(img.src.replace(/w=\d+&h=\d+/, 'w=1200&h=800'));
        });

        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            lightboxImg.src = images[currentIndex];
            lightboxImg.alt = galleryItems[currentIndex]?.querySelector('img')?.alt || '';
            if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('active');
            document.body.classList.add('no-scroll');
        }

        function closeLightboxFn() {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = images[currentIndex];
                lightboxImg.style.opacity = '1';
                if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
            }, 150);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = images[currentIndex];
                lightboxImg.style.opacity = '1';
                if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
            }, 150);
        }

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightboxFn);
        if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
        if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

        // Close on backdrop click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightboxFn();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightboxFn();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });

        // Touch swipe for lightbox
        let lbTouchStart = 0;
        lightbox.addEventListener('touchstart', (e) => {
            lbTouchStart = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            const diff = lbTouchStart - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextImage() : prevImage();
            }
        }, { passive: true });
    }

    /* ============================================
       9. NEWSLETTER FORM
    ============================================ */
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = newsletterForm.querySelector('button[type="submit"]');
            const input = newsletterForm.querySelector('input[type="email"]');

            if (!input || !input.value.trim()) return;

            btn.disabled = true;
            btn.textContent = 'Enviando...';

            setTimeout(() => {
                btn.style.display = 'none';
                input.style.display = 'none';
                if (newsletterSuccess) {
                    newsletterSuccess.classList.remove('hidden');
                    newsletterSuccess.style.animation = 'slideUp 0.4s ease';
                }
            }, 1200);
        });
    }

    /* ============================================
       10. SCROLL REVEAL (Intersection Observer)
    ============================================ */
    const revealElements = document.querySelectorAll('.property-card, .reveal-up');

    if ('IntersectionObserver' in window && revealElements.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            revealObserver.observe(el);
        });
    }

    /* ============================================
       11. SMOOTH ANCHOR SCROLL
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
