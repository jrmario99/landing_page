/* ============================================
   SHOPFLOW — E-commerce Store Logic
   Vanilla JS — No dependencies
============================================ */

const ShopFlow = (() => {

    /* ============================================
       PRODUCT DATA (EDITABLE)
       Replace with your real product data or API.
    ============================================ */
    const PRODUCTS = {
        new: [
            { id: 'n1', name: 'Camiseta Oversized Premium', price: 129, oldPrice: null, badge: 'New', reviews: 24, desc: 'Camiseta oversized em algodão egípcio 100%. Caimento solto e confortável para o dia a dia.', installments: '3x de R$ 43' },
            { id: 'n2', name: 'Calça Jogger Tech', price: 189, oldPrice: null, badge: 'New', reviews: 18, desc: 'Calça jogger com tecido tech stretch. Perfeita para treino ou casual.', installments: '3x de R$ 63' },
            { id: 'n3', name: 'Tênis Urban Runner', price: 349, oldPrice: null, badge: 'New', reviews: 42, desc: 'Tênis com amortecimento em gel e solado antiderrapante. Estilo e performance.', installments: '6x de R$ 58' },
            { id: 'n4', name: 'Jaqueta Corta-Vento', price: 259, oldPrice: null, badge: 'New', reviews: 15, desc: 'Jaqueta impermeável ultraleve. Ideal para dias chuvosos e atividades ao ar livre.', installments: '4x de R$ 65' },
            { id: 'n5', name: 'Smartwatch Pulse X', price: 499, oldPrice: null, badge: 'New', reviews: 56, desc: 'Smartwatch com GPS, monitor cardíaco e 7 dias de bateria. Tela AMOLED.', installments: '10x de R$ 50' },
            { id: 'n6', name: 'Mochila Everyday Pro', price: 199, oldPrice: null, badge: 'New', reviews: 31, desc: 'Mochila 25L com compartimento para notebook 15". Tecido impermeável.', installments: '3x de R$ 66' },
            { id: 'n7', name: 'Óculos Polarizado UV400', price: 159, oldPrice: null, badge: 'New', reviews: 22, desc: 'Lentes polarizadas com proteção UV400. Armação em acetato italiano.', installments: '3x de R$ 53' },
            { id: 'n8', name: 'Boné Structured Fit', price: 89, oldPrice: null, badge: 'New', reviews: 38, desc: 'Boné com aba curva e ajuste estruturado. Tecido dry-fit.', installments: '2x de R$ 45' },
        ],
        best: [
            { id: 'b1', name: 'Camiseta Basic Pima', price: 79, oldPrice: null, badge: null, reviews: 128, desc: 'Camiseta em algodão pima. A básica perfeita — macia, durável e versátil.', installments: '2x de R$ 40' },
            { id: 'b2', name: 'Bermuda Chino Flex', price: 149, oldPrice: null, badge: null, reviews: 95, desc: 'Bermuda chino com elastano. Conforto e elegância para qualquer ocasião.', installments: '3x de R$ 50' },
            { id: 'b3', name: 'Fone TWS AirBeat', price: 199, oldPrice: null, badge: null, reviews: 214, desc: 'Fone true wireless com cancelamento de ruído e 8h de bateria.', installments: '3x de R$ 66' },
            { id: 'b4', name: 'Moletom Comfort Plus', price: 169, oldPrice: null, badge: null, reviews: 76, desc: 'Moletom felpado com capuz. Algodão premium com toque ultra-macio.', installments: '3x de R$ 56' },
            { id: 'b5', name: 'Relógio Minimal Steel', price: 299, oldPrice: null, badge: null, reviews: 63, desc: 'Relógio minimalista com pulseira em aço inox e vidro safira.', installments: '6x de R$ 50' },
            { id: 'b6', name: 'Sling Bag Compact', price: 119, oldPrice: null, badge: null, reviews: 87, desc: 'Bolsa transversal compacta para o essencial. Design urbano.', installments: '2x de R$ 60' },
            { id: 'b7', name: 'Calça Skinny Dark', price: 179, oldPrice: null, badge: null, reviews: 109, desc: 'Calça skinny em jeans escuro com elastano. Caimento perfeito.', installments: '3x de R$ 60' },
            { id: 'b8', name: 'Polo Clássica Piquet', price: 99, oldPrice: null, badge: null, reviews: 152, desc: 'Polo em piquet de algodão. O clássico que nunca sai de moda.', installments: '2x de R$ 50' },
        ],
        sale: [
            { id: 's1', name: 'Jaqueta Bomber Classic', price: 179, oldPrice: 299, badge: '-40%', reviews: 47, desc: 'Jaqueta bomber em nylon com forro acetinado. Look urbano atemporal.', installments: '3x de R$ 60' },
            { id: 's2', name: 'Tênis Retro Canvas', price: 129, oldPrice: 199, badge: '-35%', reviews: 83, desc: 'Tênis casual em canvas com solado vulcanizado. Estilo retrô.', installments: '2x de R$ 65' },
            { id: 's3', name: 'Headphone Studio HD', price: 249, oldPrice: 449, badge: '-44%', reviews: 56, desc: 'Headphone over-ear com driver de 50mm e cancelamento ativo de ruído.', installments: '5x de R$ 50' },
            { id: 's4', name: 'Camisa Linho Premium', price: 119, oldPrice: 189, badge: '-37%', reviews: 34, desc: 'Camisa em linho puro. Frescor e elegância para dias quentes.', installments: '2x de R$ 60' },
            { id: 's5', name: 'Kit Meias Tech (5 pares)', price: 49, oldPrice: 89, badge: '-45%', reviews: 201, desc: 'Kit com 5 pares de meias em fio tech com tecnologia antimicrobiana.', installments: '1x de R$ 49' },
            { id: 's6', name: 'Carteira Slim RFID', price: 69, oldPrice: 119, badge: '-42%', reviews: 92, desc: 'Carteira slim em couro legítimo com bloqueio RFID integrado.', installments: '1x de R$ 69' },
            { id: 's7', name: 'Cinto Couro Reversível', price: 89, oldPrice: 149, badge: '-40%', reviews: 58, desc: 'Cinto em couro legítimo reversível (preto/marrom). Dois em um.', installments: '2x de R$ 45' },
            { id: 's8', name: 'Power Bank 20000mAh', price: 99, oldPrice: 179, badge: '-45%', reviews: 134, desc: 'Power bank de alta capacidade com 2 saídas USB e carregamento rápido.', installments: '2x de R$ 50' },
        ]
    };

    /* ============================================
       STATE
    ============================================ */
    let cart = [];
    let currentTab = 'new';
    let heroSlide = 0;
    let heroTimer;
    let quickViewQty = 1;
    let quickViewProduct = null;

    /* ============================================
       INIT
    ============================================ */
    function init() {
        loadCart();
        renderProducts(currentTab);
        initHeroCarousel();
        initCountdown();
        bindEvents();
        updateCartUI();
    }

    /* ============================================
       PRODUCT RENDERING
    ============================================ */
    function renderProducts(tab) {
        const grid = document.getElementById('productGrid');
        if (!grid) return;

        const products = PRODUCTS[tab] || [];
        grid.innerHTML = products.map(p => createProductCard(p)).join('');

        // Staggered reveal
        const cards = grid.querySelectorAll('.product-card');
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 60);
        });
    }

    function createProductCard(product) {
        const hasSale = product.oldPrice && product.oldPrice > product.price;
        const badgeHTML = product.badge ? `
            <div class="product-badge">
                <span class="product-badge__item ${hasSale ? 'product-badge__sale' : 'product-badge__new'}">${product.badge}</span>
            </div>` : '';

        const oldPriceHTML = hasSale
            ? `<span class="product-card__old-price">R$ ${product.oldPrice}</span>`
            : '';

        return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-card__image">
                ${badgeHTML}
                <!-- Primary image placeholder -->
                <div class="product-card__img-primary">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-gray-300"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <!-- Hover image placeholder -->
                <div class="product-card__img-hover bg-gray-100">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-gray-400"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <!-- Action buttons on hover -->
                <div class="product-card__actions">
                    <button class="product-action-btn quick-view-btn" onclick="ShopFlow.openQuickView('${product.id}','${currentTab}')" aria-label="Visualização rápida">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <button class="product-action-btn" aria-label="Adicionar aos favoritos">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                </div>
            </div>
            <div class="product-card__info">
                <h3 class="product-card__name">${product.name}</h3>
                <div class="product-card__price">
                    <span class="product-card__current-price">R$ ${product.price}</span>
                    ${oldPriceHTML}
                </div>
                <p class="product-card__installments">${product.installments}</p>
                <button class="product-card__add-btn" onclick="ShopFlow.addToCart('${product.id}','${currentTab}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    Adicionar
                </button>
            </div>
        </div>`;
    }

    /* ============================================
       PRODUCT TABS
    ============================================ */
    function switchTab(tab) {
        currentTab = tab;
        document.querySelectorAll('.product-tab').forEach(t => {
            const isActive = t.dataset.tab === tab;
            t.classList.toggle('active', isActive);
            t.setAttribute('aria-selected', isActive);
        });
        renderProducts(tab);
    }

    /* ============================================
       CART — Off-Canvas Sidebar
    ============================================ */
    function loadCart() {
        try {
            const saved = localStorage.getItem('shopflow-cart');
            if (saved) cart = JSON.parse(saved);
        } catch (e) { cart = []; }
    }

    function saveCart() {
        localStorage.setItem('shopflow-cart', JSON.stringify(cart));
    }

    function findProduct(id, tab) {
        for (const key of Object.keys(PRODUCTS)) {
            const found = PRODUCTS[key].find(p => p.id === id);
            if (found) return found;
        }
        return null;
    }

    function addToCart(id, tab) {
        const product = findProduct(id, tab);
        if (!product) return;

        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
        }

        saveCart();
        updateCartUI();
        renderCartItems();
        openCart();
        showToast(`${product.name} adicionado ao carrinho!`);

        // Animate button
        const btn = document.querySelector(`.product-card[data-product-id="${id}"] .product-card__add-btn`);
        if (btn) {
            btn.classList.add('added');
            btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Adicionado!';
            setTimeout(() => {
                btn.classList.remove('added');
                btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> Adicionar';
            }, 1500);
        }
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        updateCartUI();
        renderCartItems();
    }

    function updateQty(id, delta) {
        const item = cart.find(i => i.id === id);
        if (!item) return;
        item.qty = Math.max(1, item.qty + delta);
        saveCart();
        updateCartUI();
        renderCartItems();
    }

    function getCartTotal() {
        return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    }

    function getCartCount() {
        return cart.reduce((sum, item) => sum + item.qty, 0);
    }

    function updateCartUI() {
        const count = getCartCount();
        const total = getCartTotal();

        // Badges
        const badges = [
            document.getElementById('cartBadge'),
            document.getElementById('mobileCartBadge')
        ];
        badges.forEach(badge => {
            if (badge) {
                badge.textContent = count;
                badge.classList.toggle('hidden', count === 0);
            }
        });

        // Cart count text
        const cartCountEl = document.getElementById('cartCount');
        if (cartCountEl) cartCountEl.textContent = `(${count})`;

        // Subtotal
        const subtotalEl = document.getElementById('cartSubtotal');
        if (subtotalEl) subtotalEl.textContent = `R$ ${total.toLocaleString('pt-BR')}`;

        // Toggle empty state vs footer
        const cartEmpty = document.getElementById('cartEmpty');
        const cartFooter = document.getElementById('cartFooter');
        if (cartEmpty) cartEmpty.style.display = count === 0 ? 'flex' : 'none';
        if (cartFooter) cartFooter.classList.toggle('hidden', count === 0);
    }

    function renderCartItems() {
        const container = document.getElementById('cartItems');
        if (!container) return;

        const emptyDiv = document.getElementById('cartEmpty');
        // Remove old items (keep empty state div)
        container.querySelectorAll('.cart-item').forEach(el => el.remove());

        cart.forEach(item => {
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <div class="cart-item__image">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-gray-300"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <div class="cart-item__info">
                    <p class="cart-item__name">${item.name}</p>
                    <p class="cart-item__price">R$ ${(item.price * item.qty).toLocaleString('pt-BR')}</p>
                    <div class="cart-item__qty">
                        <button onclick="ShopFlow.updateQty('${item.id}',-1)" aria-label="Diminuir quantidade">−</button>
                        <span>${item.qty}</span>
                        <button onclick="ShopFlow.updateQty('${item.id}',1)" aria-label="Aumentar quantidade">+</button>
                    </div>
                </div>
                <button class="cart-item__remove" onclick="ShopFlow.removeFromCart('${item.id}')" aria-label="Remover item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            `;
            container.insertBefore(el, emptyDiv);
        });
    }

    function openCart() {
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');
        if (sidebar) sidebar.style.transform = 'translateX(0)';
        if (overlay) { overlay.style.opacity = '1'; overlay.style.visibility = 'visible'; }
        document.body.classList.add('no-scroll');
        renderCartItems();
    }

    function closeCart() {
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');
        if (sidebar) sidebar.style.transform = 'translateX(100%)';
        if (overlay) { overlay.style.opacity = '0'; overlay.style.visibility = 'hidden'; }
        document.body.classList.remove('no-scroll');
    }

    /* ============================================
       QUICK VIEW MODAL
    ============================================ */
    function openQuickView(id, tab) {
        const product = findProduct(id, tab);
        if (!product) return;

        quickViewProduct = product;
        quickViewQty = 1;

        document.getElementById('qvName').textContent = product.name;
        document.getElementById('qvPrice').textContent = `R$ ${product.price}`;
        document.getElementById('qvDesc').textContent = product.desc;
        document.getElementById('qvReviews').textContent = `(${product.reviews} avaliações)`;
        document.getElementById('qvQty').textContent = '1';

        const badgeEl = document.getElementById('qvBadge');
        if (product.badge) {
            badgeEl.textContent = product.badge;
            badgeEl.classList.remove('hidden');
            const isSale = product.oldPrice && product.oldPrice > product.price;
            badgeEl.className = `inline-flex self-start text-xs font-bold px-3 py-1 rounded-full mb-3 ${isSale ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`;
        } else {
            badgeEl.classList.add('hidden');
        }

        const oldPriceEl = document.getElementById('qvOldPrice');
        if (product.oldPrice) {
            oldPriceEl.textContent = `R$ ${product.oldPrice}`;
            oldPriceEl.classList.remove('hidden');
        } else {
            oldPriceEl.classList.add('hidden');
        }

        const overlay = document.getElementById('quickViewOverlay');
        overlay.classList.add('active');
        document.body.classList.add('no-scroll');

        // Bind add to cart
        const addBtn = document.getElementById('qvAddToCart');
        addBtn.onclick = () => {
            for (let i = 0; i < quickViewQty; i++) {
                addToCart(product.id, tab);
            }
            closeQuickView();
        };
    }

    function closeQuickView() {
        const overlay = document.getElementById('quickViewOverlay');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        quickViewProduct = null;
    }

    function qvQty(delta) {
        quickViewQty = Math.max(1, quickViewQty + delta);
        const el = document.getElementById('qvQty');
        if (el) el.textContent = quickViewQty;
    }

    /* ============================================
       HERO CAROUSEL
    ============================================ */
    function initHeroCarousel() {
        const track = document.getElementById('heroTrack');
        const dotsContainer = document.getElementById('heroDots');
        const prevBtn = document.getElementById('heroPrev');
        const nextBtn = document.getElementById('heroNext');
        if (!track || !dotsContainer) return;

        const slides = track.querySelectorAll('.hero-slide');
        const count = slides.length;

        // Create dots
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('button');
            dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => goToHeroSlide(i));
            dotsContainer.appendChild(dot);
        }

        function goToHeroSlide(index) {
            heroSlide = index;
            track.style.transform = `translateX(-${heroSlide * 100}%)`;
            dotsContainer.querySelectorAll('.hero-dot').forEach((d, i) => {
                d.classList.toggle('active', i === heroSlide);
            });
        }

        if (prevBtn) prevBtn.addEventListener('click', () => {
            goToHeroSlide((heroSlide - 1 + count) % count);
            resetHeroTimer();
        });

        if (nextBtn) nextBtn.addEventListener('click', () => {
            goToHeroSlide((heroSlide + 1) % count);
            resetHeroTimer();
        });

        // Autoplay
        heroTimer = setInterval(() => {
            goToHeroSlide((heroSlide + 1) % count);
        }, 5000);

        // Swipe
        let sx = 0;
        track.addEventListener('touchstart', e => { sx = e.changedTouches[0].screenX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = sx - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                goToHeroSlide(diff > 0 ? (heroSlide + 1) % count : (heroSlide - 1 + count) % count);
                resetHeroTimer();
            }
        }, { passive: true });
    }

    function resetHeroTimer() {
        clearInterval(heroTimer);
        const track = document.getElementById('heroTrack');
        if (!track) return;
        const count = track.querySelectorAll('.hero-slide').length;
        heroTimer = setInterval(() => {
            heroSlide = (heroSlide + 1) % count;
            track.style.transform = `translateX(-${heroSlide * 100}%)`;
            document.querySelectorAll('.hero-dot').forEach((d, i) => {
                d.classList.toggle('active', i === heroSlide);
            });
        }, 5000);
    }

    /* ============================================
       COUNTDOWN TIMER
    ============================================ */
    function initCountdown() {
        // EDITABLE: Set deal end time (hours from now)
        const dealHours = 12;
        const endTime = new Date().getTime() + dealHours * 60 * 60 * 1000;

        function tick() {
            const now = new Date().getTime();
            const diff = Math.max(0, endTime - now);

            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            const hEl = document.getElementById('countHours');
            const mEl = document.getElementById('countMinutes');
            const sEl = document.getElementById('countSeconds');

            if (hEl) hEl.textContent = String(h).padStart(2, '0');
            if (mEl) mEl.textContent = String(m).padStart(2, '0');
            if (sEl) sEl.textContent = String(s).padStart(2, '0');
        }

        tick();
        setInterval(tick, 1000);
    }

    /* ============================================
       TOAST NOTIFICATION
    ============================================ */
    function showToast(message) {
        // Reuse or create toast element
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    /* ============================================
       EVENT BINDINGS
    ============================================ */
    function bindEvents() {
        // Cart toggle
        const cartToggle = document.getElementById('cartToggle');
        const cartClose = document.getElementById('cartClose');
        const cartOverlay = document.getElementById('cartOverlay');
        const mobileCartBtn = document.getElementById('mobileCartBtn');

        if (cartToggle) cartToggle.addEventListener('click', openCart);
        if (mobileCartBtn) mobileCartBtn.addEventListener('click', openCart);
        if (cartClose) cartClose.addEventListener('click', closeCart);
        if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

        // Quick View overlay close
        const qvOverlay = document.getElementById('quickViewOverlay');
        if (qvOverlay) {
            qvOverlay.addEventListener('click', (e) => {
                if (e.target === qvOverlay) closeQuickView();
            });
        }

        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenu = document.getElementById('mobileMenu');

        function openMobileMenu() {
            if (mobileMenu) mobileMenu.style.transform = 'translateX(0)';
            if (mobileMenuOverlay) { mobileMenuOverlay.style.opacity = '1'; mobileMenuOverlay.style.visibility = 'visible'; }
            document.body.classList.add('no-scroll');
        }

        function closeMobileMenu() {
            if (mobileMenu) mobileMenu.style.transform = 'translateX(-100%)';
            if (mobileMenuOverlay) { mobileMenuOverlay.style.opacity = '0'; mobileMenuOverlay.style.visibility = 'hidden'; }
            document.body.classList.remove('no-scroll');
        }

        if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
        if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
        if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

        // Mobile menu links close menu
        if (mobileMenu) {
            mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
        }

        // Mobile search
        const mobileSearchBtn = document.getElementById('mobileSearchBtn');
        const mobileSearch = document.getElementById('mobileSearch');
        if (mobileSearchBtn && mobileSearch) {
            mobileSearchBtn.addEventListener('click', () => {
                mobileSearch.classList.toggle('hidden');
                if (!mobileSearch.classList.contains('hidden')) {
                    mobileSearch.querySelector('input').focus();
                }
            });
        }

        // Desktop search suggestions
        const searchInput = document.getElementById('searchInput');
        const searchSuggestions = document.getElementById('searchSuggestions');
        if (searchInput && searchSuggestions) {
            searchInput.addEventListener('focus', () => {
                if (searchInput.value.length > 0 || true) { // Always show suggestions on focus for demo
                    searchSuggestions.classList.remove('hidden');
                }
            });
            searchInput.addEventListener('blur', () => {
                setTimeout(() => searchSuggestions.classList.add('hidden'), 200);
            });
        }

        // Product tabs
        document.querySelectorAll('.product-tab').forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });

        // Promo bar close
        const closePromo = document.getElementById('closePromo');
        const promoBar = document.getElementById('promoBar');
        if (closePromo && promoBar) {
            closePromo.addEventListener('click', () => {
                promoBar.style.display = 'none';
            });
        }

        // Header scroll
        const header = document.getElementById('header');
        if (header) {
            window.addEventListener('scroll', () => {
                header.classList.toggle('scrolled', window.scrollY > 10);
            }, { passive: true });
        }

        // Deal add to cart button
        document.querySelectorAll('.deal-add-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const name = btn.dataset.name;
                const price = parseFloat(btn.dataset.price);
                const existing = cart.find(item => item.id === id);
                if (existing) {
                    existing.qty++;
                } else {
                    cart.push({ id, name, price, qty: 1 });
                }
                saveCart();
                updateCartUI();
                renderCartItems();
                openCart();
                showToast(`${name} adicionado ao carrinho!`);
            });
        });

        // ESC key closes overlays
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeCart();
                closeQuickView();
                closeMobileMenu();
            }
        });
    }

    /* ============================================
       PUBLIC API
    ============================================ */
    document.addEventListener('DOMContentLoaded', init);

    return {
        addToCart,
        removeFromCart,
        updateQty,
        openCart,
        closeCart,
        openQuickView,
        closeQuickView,
        qvQty,
    };

})();
