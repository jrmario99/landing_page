/* ============================================
   LEXCORP — Law Firm Template
   Vanilla JS — No dependencies
============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       1. STICKY HEADER — Scroll shadow
    ============================================ */
    const header = document.getElementById('header');

    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('header--scrolled', window.scrollY > 10);
        }, { passive: true });
    }

    /* ============================================
       2. MOBILE MENU
    ============================================ */
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            menuToggle.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ============================================
       3. ACTIVE NAV LINK on scroll
    ============================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 160;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.header__link[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    /* ============================================
       4. PRACTICE AREAS — Vertical Tabs
    ============================================ */
    const tabs = document.querySelectorAll('.practice__tab');
    const panels = document.querySelectorAll('.practice__panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            // Update tabs
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Update panels
            panels.forEach(p => p.classList.remove('active'));
            const panel = document.getElementById(`panel-${target}`);
            if (panel) panel.classList.add('active');
        });
    });

    /* ============================================
       5. FAQ ACCORDION
    ============================================ */
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const trigger = accordion.querySelector('.accordion__trigger');
        const content = accordion.querySelector('.accordion__content');

        if (!trigger || !content) return;

        trigger.addEventListener('click', () => {
            const isOpen = accordion.classList.contains('open');

            // Close all others
            accordions.forEach(other => {
                if (other !== accordion) {
                    other.classList.remove('open');
                    const otherContent = other.querySelector('.accordion__content');
                    const otherTrigger = other.querySelector('.accordion__trigger');
                    if (otherContent) otherContent.style.maxHeight = '0';
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            if (isOpen) {
                accordion.classList.remove('open');
                content.style.maxHeight = '0';
                trigger.setAttribute('aria-expanded', 'false');
            } else {
                accordion.classList.add('open');
                content.style.maxHeight = content.scrollHeight + 24 + 'px';
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ============================================
       6. FORM SUBMISSIONS
    ============================================ */
    function handleFormSubmit(formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log(`Form [${formId}] submitted:`, data);

            // Show success
            form.innerHTML = `
                <div class="form-success">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <h3>Mensagem Enviada!</h3>
                    <p>Recebemos sua solicitação. Nossa equipe retornará em até 24 horas úteis.</p>
                </div>
            `;
        });
    }

    handleFormSubmit('quickForm');
    handleFormSubmit('contactForm');

    /* ============================================
       7. PHONE MASK (Brazilian format)
    ============================================ */
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 7) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }

            e.target.value = value;
        });
    });

    /* ============================================
       8. SCROLL REVEAL (Intersection Observer)
    ============================================ */
    const revealElements = document.querySelectorAll(
        '.attorney-card, .result-card, .accordion, .practice__panel, .contact__info-item, .trust__item'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        revealElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.08}s, transform 0.5s ease ${(i % 4) * 0.08}s`;
            observer.observe(el);
        });
    }

});
