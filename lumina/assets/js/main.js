/* ============================================
   LUMINA ACADEMY — School Landing Page
   Vanilla JS — Menu, Counters, Carousel, Form
============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       1. AOS INIT
    ============================================ */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }

    /* ============================================
       2. NAVBAR — Scroll shadow
    ============================================ */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 140;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }, { passive: true });

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
        mobileMenu.style.transform = 'translateX(0)';
        mobileOverlay.style.opacity = '1';
        mobileOverlay.style.visibility = 'visible';
        document.body.classList.add('no-scroll');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
    }

    function closeMobileMenu() {
        mobileMenu.style.transform = 'translateX(100%)';
        mobileOverlay.style.opacity = '0';
        mobileOverlay.style.visibility = 'hidden';
        document.body.classList.remove('no-scroll');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
    }

    if (menuToggle) menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.style.transform === 'translateX(0px)';
        isOpen ? closeMobileMenu() : openMobileMenu();
    });

    if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

    // Close on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    /* ============================================
       4. STATS COUNTER (Animated)
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

    // Intersection Observer for counters
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
       5. PHOTO GALLERY CAROUSEL
    ============================================ */
    const galleryTrack = document.getElementById('galleryTrack');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const galleryDots = document.getElementById('galleryDots');
    const galleryCounter = document.getElementById('galleryCounter');

    if (galleryTrack && galleryPrev && galleryNext && galleryDots) {
        const gallerySlides = galleryTrack.querySelectorAll('.gallery-slide');
        let galleryIndex = 0;
        let galleryTimer;

        // Create dots
        gallerySlides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Foto ${i + 1}`);
            dot.addEventListener('click', () => { goToGallery(i); resetGalleryTimer(); });
            galleryDots.appendChild(dot);
        });

        const gDots = galleryDots.querySelectorAll('.gallery-dot');

        function goToGallery(index) {
            galleryIndex = index;
            galleryTrack.style.transform = `translateX(-${galleryIndex * 100}%)`;
            gDots.forEach((d, i) => d.classList.toggle('active', i === galleryIndex));
            if (galleryCounter) galleryCounter.textContent = `${galleryIndex + 1} / ${gallerySlides.length}`;
        }

        galleryNext.addEventListener('click', () => {
            goToGallery((galleryIndex + 1) % gallerySlides.length);
            resetGalleryTimer();
        });

        galleryPrev.addEventListener('click', () => {
            goToGallery((galleryIndex - 1 + gallerySlides.length) % gallerySlides.length);
            resetGalleryTimer();
        });

        // Autoplay
        function startGalleryTimer() {
            galleryTimer = setInterval(() => {
                goToGallery((galleryIndex + 1) % gallerySlides.length);
            }, 4500);
        }

        function resetGalleryTimer() {
            clearInterval(galleryTimer);
            startGalleryTimer();
        }

        startGalleryTimer();

        // Pause on hover
        const galleryWrapper = document.getElementById('galleryWrapper');
        if (galleryWrapper) {
            galleryWrapper.addEventListener('mouseenter', () => clearInterval(galleryTimer));
            galleryWrapper.addEventListener('mouseleave', startGalleryTimer);
        }

        // Touch swipe
        let gTouchStart = 0;
        galleryTrack.addEventListener('touchstart', (e) => {
            gTouchStart = e.changedTouches[0].screenX;
        }, { passive: true });

        galleryTrack.addEventListener('touchend', (e) => {
            const diff = gTouchStart - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goToGallery((galleryIndex + 1) % gallerySlides.length);
                else goToGallery((galleryIndex - 1 + gallerySlides.length) % gallerySlides.length);
                resetGalleryTimer();
            }
        }, { passive: true });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (!galleryWrapper || !galleryWrapper.matches(':hover')) return;
            if (e.key === 'ArrowLeft') { galleryPrev.click(); }
            if (e.key === 'ArrowRight') { galleryNext.click(); }
        });
    }

    /* ============================================
       6. NEWS CAROUSEL
    ============================================ */
    const newsTrack = document.getElementById('newsTrack');
    const newsPrev = document.getElementById('newsPrev');
    const newsNext = document.getElementById('newsNext');

    if (newsTrack && newsPrev && newsNext) {
        let newsPos = 0;

        function getCardWidth() {
            const card = newsTrack.querySelector('.news-card');
            if (!card) return 350;
            return card.offsetWidth + 24; // card width + gap
        }

        function getMaxScroll() {
            return Math.max(0, newsTrack.scrollWidth - newsTrack.parentElement.offsetWidth);
        }

        function updateNewsPosition() {
            newsTrack.style.transform = `translateX(-${newsPos}px)`;
        }

        newsNext.addEventListener('click', () => {
            const cardW = getCardWidth();
            const maxScroll = getMaxScroll();
            newsPos = Math.min(newsPos + cardW, maxScroll);
            updateNewsPosition();
        });

        newsPrev.addEventListener('click', () => {
            const cardW = getCardWidth();
            newsPos = Math.max(newsPos - cardW, 0);
            updateNewsPosition();
        });

        // Touch swipe
        let touchStartX = 0;
        newsTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        newsTrack.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                const cardW = getCardWidth();
                const maxScroll = getMaxScroll();
                if (diff > 0) {
                    newsPos = Math.min(newsPos + cardW, maxScroll);
                } else {
                    newsPos = Math.max(newsPos - cardW, 0);
                }
                updateNewsPosition();
            }
        }, { passive: true });

        // Reset on resize
        window.addEventListener('resize', () => {
            newsPos = 0;
            updateNewsPosition();
        });
    }

    /* ============================================
       6. FORM VALIDATION & PHONE MASK
    ============================================ */
    const visitForm = document.getElementById('visitForm');
    const phoneInput = document.getElementById('visitPhone');

    // Phone mask
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            if (value.length > 7) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }
            e.target.value = value;
        });
    }

    // Form submit
    if (visitForm) {
        visitForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('visitName');
            const email = document.getElementById('visitEmail');
            const phone = document.getElementById('visitPhone');
            const segment = document.getElementById('visitSegment');

            let isValid = true;

            // Clear previous errors
            [name, email, phone, segment].forEach(field => {
                field.classList.remove('form-error');
            });

            // Validate
            if (!name.value.trim() || name.value.trim().length < 3) {
                name.classList.add('form-error');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('form-error');
                isValid = false;
            }

            const phoneDigits = phone.value.replace(/\D/g, '');
            if (phoneDigits.length < 10) {
                phone.classList.add('form-error');
                isValid = false;
            }

            if (!segment.value) {
                segment.classList.add('form-error');
                isValid = false;
            }

            if (!isValid) return;

            // Success
            const submitBtn = document.getElementById('visitSubmit');
            const successMsg = document.getElementById('formSuccess');

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg> Enviando...';

            // Simulate API call
            setTimeout(() => {
                submitBtn.style.display = 'none';
                successMsg.classList.remove('hidden');
                successMsg.classList.add('form-success-msg');

                // Reset form
                visitForm.reset();
            }, 1500);
        });
    }

});
