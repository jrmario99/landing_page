/* ============================================
   LOCAL BUSINESS LANDING PAGE — JavaScript
   Template: Clínica Viva Bem
============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Menu Toggle ──
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close menu when clicking a link
        nav.querySelectorAll('.header__link').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // ── Header Scroll Effect ──
    const header = document.getElementById('header');

    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('header--scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    // ── Sticky CTA (mobile) ──
    const stickyCta = document.getElementById('stickyCta');

    if (stickyCta) {
        window.addEventListener('scroll', () => {
            stickyCta.classList.toggle('sticky-cta--visible', window.scrollY > 400);
        }, { passive: true });
    }

    // ── Active Nav Link on Scroll ──
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.header__link[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ── Business Hours: Open/Closed Status ──
    // =============================================
    // EDITABLE: Adjust the schedule below to match
    // your actual business hours.
    //
    // Days: 0=Sunday, 1=Monday ... 6=Saturday
    // Format: { open: "HH:MM", close: "HH:MM" }
    // Use null for closed days.
    // =============================================
    const schedule = {
        0: null,                              // Domingo — Fechado
        1: { open: "07:00", close: "20:00" }, // Segunda
        2: { open: "07:00", close: "20:00" }, // Terça
        3: { open: "07:00", close: "20:00" }, // Quarta
        4: { open: "07:00", close: "20:00" }, // Quinta
        5: { open: "07:00", close: "20:00" }, // Sexta
        6: { open: "08:00", close: "14:00" }, // Sábado
    };

    function checkOpenStatus() {
        const statusEl = document.getElementById('openStatus');
        if (!statusEl) return;

        const now = new Date();
        const day = now.getDay();
        const hours = schedule[day];

        if (!hours) {
            statusEl.textContent = 'Fechado hoje';
            statusEl.className = 'hours__status hours__status--closed';
            return;
        }

        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const [openH, openM] = hours.open.split(':').map(Number);
        const [closeH, closeM] = hours.close.split(':').map(Number);
        const openMinutes = openH * 60 + openM;
        const closeMinutes = closeH * 60 + closeM;

        if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
            statusEl.textContent = 'Aberto agora!';
            statusEl.className = 'hours__status hours__status--open';
        } else {
            statusEl.textContent = 'Fechado agora';
            statusEl.className = 'hours__status hours__status--closed';
        }
    }

    checkOpenStatus();
    setInterval(checkOpenStatus, 60000); // Update every minute

    // ── Contact Form Handling ──
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // You can replace this with a real API call (e.g., fetch to a backend, Formspree, etc.)
            console.log('Form submitted:', data);

            // Show success message
            form.innerHTML = `
                <div class="form-success active">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <h3>Solicitação Enviada!</h3>
                    <p>Recebemos sua mensagem e entraremos em contato em breve pelo WhatsApp ou telefone.</p>
                </div>
            `;
        });
    }

    // ── Smooth Reveal on Scroll (Intersection Observer) ──
    const revealElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .about__feature, .location__detail'
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
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ── Phone Input Mask (Brazilian format) ──
    const phoneInput = document.getElementById('phone');

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

});
