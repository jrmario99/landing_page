/* ============================================
   FINTAX — Accountant Landing Page
   Vanilla JS
============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       1. NAVBAR — Scroll + Mobile Menu
    ============================================ */
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    // Scroll shadow
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('navbar--scrolled', window.scrollY > 10);
        }, { passive: true });
    }

    // Mobile menu
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.navbar__link[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }, { passive: true });

    /* ============================================
       2. TAX CALCULATOR
    ============================================ */
    const calcBtn = document.getElementById('calcBtn');
    const calcResult = document.getElementById('calcResult');
    const calcResultData = document.getElementById('calcResultData');

    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            const revenueRaw = document.getElementById('calc-revenue').value.replace(/\D/g, '');
            const profitRaw = document.getElementById('calc-profit').value.replace(/\D/g, '');
            const regime = document.getElementById('calc-regime').value;

            const revenue = parseFloat(revenueRaw);
            const profitMargin = parseFloat(profitRaw);

            if (!revenue || revenue <= 0 || !profitMargin || profitMargin <= 0 || profitMargin > 100) {
                alert('Por favor, preencha todos os campos com valores válidos.');
                return;
            }

            const profit = revenue * (profitMargin / 100);

            // =============================================
            // EDITABLE: Tax calculation logic
            // These are SIMPLIFIED estimates for demonstration.
            // Replace with your actual formulas.
            // =============================================
            let currentRate;
            switch (regime) {
                case 'simples':   currentRate = 0.12; break;
                case 'presumido': currentRate = 0.16; break;
                case 'real':      currentRate = 0.25; break;
                default:          currentRate = 0.15; break;
            }

            const currentTax = revenue * currentRate;

            // Simulated optimized rate (lower)
            const optimizedRate = currentRate * 0.65; // ~35% savings
            const optimizedTax = revenue * optimizedRate;

            const savingsMonth = currentTax - optimizedTax;
            const savingsYear = savingsMonth * 12;
            // END EDITABLE

            // Format currency
            const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });

            // Update UI
            document.getElementById('resultCurrentTax').textContent = fmt(currentTax);
            document.getElementById('resultOptimizedTax').textContent = fmt(optimizedTax);
            document.getElementById('resultSavings').textContent = fmt(savingsMonth);
            document.getElementById('resultSavingsYear').textContent = fmt(savingsYear);

            // Show result panel
            const emptyState = calcResult.querySelector('.calculator__empty');
            if (emptyState) emptyState.style.display = 'none';
            calcResultData.style.display = 'block';

            // Animate comparison bars
            const maxTax = currentTax;
            const barCurrent = document.getElementById('barCurrent');
            const barOptimized = document.getElementById('barOptimized');

            requestAnimationFrame(() => {
                barCurrent.style.width = '100%';
                barOptimized.style.width = ((optimizedTax / maxTax) * 100) + '%';
            });
        });
    }

    // Currency input mask
    const revenueInput = document.getElementById('calc-revenue');
    if (revenueInput) {
        revenueInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val) {
                val = parseInt(val).toLocaleString('pt-BR');
            }
            e.target.value = val;
        });
    }

    /* ============================================
       3. TIMELINE — Draw-on-scroll + Markers
    ============================================ */
    const timeline = document.querySelector('.timeline');

    if (timeline) {
        // Create the fill line
        const fillLine = document.createElement('div');
        fillLine.className = 'timeline__line-fill';
        timeline.appendChild(fillLine);

        const timelineItems = timeline.querySelectorAll('.timeline__item');
        const markers = timeline.querySelectorAll('.timeline__marker');

        function updateTimeline() {
            const timelineRect = timeline.getBoundingClientRect();
            const timelineTop = timeline.offsetTop;
            const timelineHeight = timeline.offsetHeight;
            const scrollPos = window.scrollY + window.innerHeight * 0.6;

            // Calculate fill height
            const progress = Math.min(Math.max((scrollPos - timelineTop) / timelineHeight, 0), 1);
            fillLine.style.height = (progress * 100) + '%';

            // Activate items
            timelineItems.forEach(item => {
                const itemTop = item.offsetTop + timelineTop;
                if (scrollPos >= itemTop) {
                    item.classList.add('reached');
                }
            });
        }

        window.addEventListener('scroll', updateTimeline, { passive: true });
        updateTimeline(); // init
    }

    /* ============================================
       4. SCROLL REVEAL (Intersection Observer)
    ============================================ */
    const revealElements = document.querySelectorAll('.reveal-up');

    if ('IntersectionObserver' in window && revealElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Stagger delay based on position in grid
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.08}s`;
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        revealElements.forEach(el => observer.observe(el));
    }

    /* ============================================
       5. PHONE MASK
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

});
