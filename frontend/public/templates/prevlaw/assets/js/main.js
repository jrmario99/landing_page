/* ============================================
   PREVLAW — Accessible Legal Landing Page
   Vanilla JS
============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       1. ACCESSIBILITY WIDGET
       Font resize (A-, A, A+) + High Contrast
    ============================================ */
    const fontSteps = ['font-sm', 'font-md', 'font-lg', 'font-xl'];
    let currentFontStep = 1; // default = font-md (100%)

    // Load saved preferences
    const savedFont = localStorage.getItem('prevlaw-font-step');
    const savedContrast = localStorage.getItem('prevlaw-contrast');

    if (savedFont !== null) {
        currentFontStep = parseInt(savedFont, 10);
        applyFontStep();
    }
    if (savedContrast === 'true') {
        document.body.classList.add('high-contrast');
        const btn = document.getElementById('btnContrast');
        if (btn) btn.classList.add('active');
    }

    function applyFontStep() {
        fontSteps.forEach(cls => document.documentElement.classList.remove(cls));
        document.documentElement.classList.add(fontSteps[currentFontStep]);
        localStorage.setItem('prevlaw-font-step', currentFontStep);
    }

    const btnDecrease = document.getElementById('btnFontDecrease');
    const btnReset = document.getElementById('btnFontReset');
    const btnIncrease = document.getElementById('btnFontIncrease');
    const btnContrast = document.getElementById('btnContrast');

    if (btnDecrease) {
        btnDecrease.addEventListener('click', () => {
            if (currentFontStep > 0) {
                currentFontStep--;
                applyFontStep();
            }
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            currentFontStep = 1;
            applyFontStep();
        });
    }

    if (btnIncrease) {
        btnIncrease.addEventListener('click', () => {
            if (currentFontStep < fontSteps.length - 1) {
                currentFontStep++;
                applyFontStep();
            }
        });
    }

    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            const isHigh = document.body.classList.contains('high-contrast');
            btnContrast.classList.toggle('active', isHigh);
            btnContrast.setAttribute('aria-label', isHigh ? 'Desativar alto contraste' : 'Ativar alto contraste');
            localStorage.setItem('prevlaw-contrast', isHigh);
        });
    }

    /* ============================================
       2. NAVBAR — Scroll shadow + Mobile Menu
    ============================================ */
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
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
                    navLinks.forEach(l => l.classList.remove('text-warm-600', 'font-extrabold'));
                    link.classList.add('text-warm-600', 'font-extrabold');
                }
            }
        });
    }, { passive: true });

    /* ============================================
       3. QUIZ → WhatsApp Redirect
    ============================================ */
    const quizOptions = document.getElementById('quizOptions');

    if (quizOptions) {
        quizOptions.addEventListener('click', (e) => {
            const option = e.target.closest('.quiz-option');
            if (!option) return;

            const situation = option.getAttribute('data-situation');

            // =============================================
            // EDITABLE: WhatsApp number
            // =============================================
            const whatsappNumber = '5511980000000';
            const message = encodeURIComponent(
                `Olá Dr. José! Encontrei seu site e gostaria de uma análise gratuita do meu caso.\n\nMinha situação: ${situation}\n\nPodemos conversar?`
            );
            const url = `https://wa.me/${whatsappNumber}?text=${message}`;

            window.open(url, '_blank', 'noopener');
        });
    }

    /* ============================================
       4. TESTIMONIALS CAROUSEL
    ============================================ */
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        const slides = track.querySelectorAll('.carousel-slide');
        let currentSlide = 0;
        let autoplayTimer;

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }

        function prevSlide() {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        }

        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

        // Autoplay
        function startAutoplay() {
            autoplayTimer = setInterval(nextSlide, 6000);
        }

        function resetAutoplay() {
            clearInterval(autoplayTimer);
            startAutoplay();
        }

        startAutoplay();

        // Pause on hover/focus
        const carousel = document.getElementById('carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
            carousel.addEventListener('mouseleave', startAutoplay);
            carousel.addEventListener('focusin', () => clearInterval(autoplayTimer));
            carousel.addEventListener('focusout', startAutoplay);
        }

        // Keyboard navigation
        track.setAttribute('role', 'region');
        track.setAttribute('aria-label', 'Carrossel de depoimentos');

        document.addEventListener('keydown', (e) => {
            if (!carousel || !carousel.matches(':hover')) return;
            if (e.key === 'ArrowLeft') { prevSlide(); resetAutoplay(); }
            if (e.key === 'ArrowRight') { nextSlide(); resetAutoplay(); }
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) { nextSlide(); }
                else { prevSlide(); }
                resetAutoplay();
            }
        }, { passive: true });
    }

    /* ============================================
       5. FAQ ACCORDION
    ============================================ */
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(item => {
        const trigger = item.querySelector('.accordion__trigger');
        if (!trigger) return;

        trigger.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all others
            accordions.forEach(other => {
                if (other !== item) {
                    other.classList.remove('open');
                    const otherTrigger = other.querySelector('.accordion__trigger');
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            item.classList.toggle('open', !isOpen);
            trigger.setAttribute('aria-expanded', !isOpen);
        });
    });

    /* ============================================
       6. STICKY FOOTER (Mobile) — Show after scroll
    ============================================ */
    const stickyFooter = document.getElementById('stickyFooter');

    if (stickyFooter) {
        window.addEventListener('scroll', () => {
            stickyFooter.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
    }

    /* ============================================
       7. SCROLL REVEAL (Intersection Observer)
    ============================================ */
    const revealElements = document.querySelectorAll('.area-card');

    if ('IntersectionObserver' in window && revealElements.length) {
        // Add reveal class
        revealElements.forEach(el => el.classList.add('reveal-up'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(el => observer.observe(el));
    }

});
