/* ============================================
   APEX — Corporate Template
   Vanilla JS — No dependencies (except Lucide CDN)
============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ============================================
       1. NAVBAR — Scroll behavior & transparency
    ============================================ */
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    function updateNavbar() {
        if (!navbar) return;
        const scrollY = window.scrollY;

        if (scrollY > 20) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('at-top');
        } else {
            navbar.classList.remove('scrolled');
            // Only transparent at top if hero exists
            if (heroSection) {
                navbar.classList.add('at-top');
            }
        }
    }

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });

    /* ============================================
       2. MEGA MENU
    ============================================ */
    const megaTrigger = document.getElementById('megaMenuTrigger');
    const megaMenu = document.getElementById('megaMenu');

    if (megaTrigger && megaMenu) {
        const chevron = megaTrigger.querySelector('.mega-chevron');
        let megaTimeout;

        function openMega() {
            clearTimeout(megaTimeout);
            megaMenu.classList.add('open');
            if (chevron) chevron.classList.add('open');
        }

        function closeMega() {
            megaTimeout = setTimeout(() => {
                megaMenu.classList.remove('open');
                if (chevron) chevron.classList.remove('open');
            }, 150);
        }

        megaTrigger.addEventListener('mouseenter', openMega);
        megaTrigger.addEventListener('mouseleave', closeMega);
        megaMenu.addEventListener('mouseenter', openMega);
        megaMenu.addEventListener('mouseleave', closeMega);

        // Close on link click
        megaMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                megaMenu.classList.remove('open');
                if (chevron) chevron.classList.remove('open');
            });
        });
    }

    /* ============================================
       3. MOBILE MENU
    ============================================ */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ============================================
       4. HERO SLIDER
    ============================================ */
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        if (slides.length === 0) return;

        // Wrap around
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => {
            d.classList.remove('active');
            d.classList.add('bg-white/30');
            d.classList.remove('bg-white/80');
        });

        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active', 'bg-white/80');
            dots[index].classList.remove('bg-white/30');
        }

        currentSlide = index;
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // Init first slide
    if (slides.length > 0) {
        goToSlide(0);
        startAutoSlide();
    }

    // Dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.slide));
            resetAutoSlide();
        });
    });

    // Arrow clicks
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            resetAutoSlide();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            resetAutoSlide();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { goToSlide(currentSlide - 1); resetAutoSlide(); }
        if (e.key === 'ArrowRight') { goToSlide(currentSlide + 1); resetAutoSlide(); }
    });

    /* ============================================
       5. FUN FACTS — Counter Animation
    ============================================ */
    const counters = document.querySelectorAll('.counter');
    let countersDone = false;

    function animateCounters() {
        if (countersDone) return;
        countersDone = true;

        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // ms
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(eased * target);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(update);
        });
    }

    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const factsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    factsObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });

        const factsSection = document.getElementById('facts');
        if (factsSection) factsObserver.observe(factsSection);
    }

    /* ============================================
       6. PORTFOLIO FILTER
    ============================================ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            portfolioItems.forEach(item => {
                const category = item.dataset.category;
                const shouldShow = filter === 'all' || category === filter;

                if (shouldShow) {
                    item.classList.remove('hidden-item');
                    item.classList.add('visible-item');
                } else {
                    item.classList.add('hidden-item');
                    item.classList.remove('visible-item');
                }
            });
        });
    });

    // Initialize all as visible
    portfolioItems.forEach(item => item.classList.add('visible-item'));

    /* ============================================
       7. PARALLAX CTA
    ============================================ */
    const parallaxBg = document.getElementById('parallaxBg');

    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const ctaSection = document.getElementById('cta');
            if (!ctaSection) return;

            const rect = ctaSection.getBoundingClientRect();
            const windowH = window.innerHeight;

            // Only apply when section is in viewport
            if (rect.top < windowH && rect.bottom > 0) {
                const progress = (windowH - rect.top) / (windowH + rect.height);
                const offset = (progress - 0.5) * 60; // max 30px movement
                parallaxBg.style.transform = `translateY(${offset}px)`;
            }
        }, { passive: true });
    }

    /* ============================================
       8. SCROLL REVEAL (Intersection Observer)
    ============================================ */
    const revealElements = document.querySelectorAll(
        '.service-card, .portfolio-item, [class*="section-header"], .about__feature'
    );

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${(i % 3) * 0.1}s`;
            revealObserver.observe(el);
        });
    }

    /* ============================================
       9. BACK TO TOP
    ============================================ */
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============================================
       10. NEWSLETTER FORM
    ============================================ */
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            console.log('Newsletter subscription:', email);

            // Replace form with success message
            newsletterForm.innerHTML = '<p class="newsletter-success">Thank you for subscribing!</p>';
        });
    }

});
