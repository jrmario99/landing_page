<template>
<div>
<!-- NAVBAR -->
<nav class="navbar">
    <div class="navbar-inner">
        <a href="#" class="navbar-brand">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                <defs><linearGradient id="nav-g" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse"><stop stop-color="#6366f1"/><stop offset="1" stop-color="#06b6d4"/></linearGradient></defs>
                <rect width="34" height="34" rx="9" fill="url(#nav-g)"/>
                <path d="M5 5L5 11M5 5L11 5" stroke="rgba(255,255,255,0.32)" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M29 5L29 11M29 5L23 5" stroke="rgba(255,255,255,0.32)" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M5 29L5 23M5 29L11 29" stroke="rgba(255,255,255,0.32)" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M29 29L29 23M29 29L23 29" stroke="rgba(255,255,255,0.32)" stroke-width="1.5" stroke-linecap="round"/>
                <text x="17" y="22.5" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="13" fill="white" letter-spacing="-0.5">MB</text>
            </svg>
            <div>
                <div class="brand-title">MB Sistemas</div>
                <div class="brand-sub">Dev</div>
            </div>
        </a>
        <div class="navbar-links">
            <a href="#sistemas" class="nav-link">Sistemas</a>
            <a href="#templates" class="nav-link">Templates</a>
            <a href="#contato" class="nav-link">Contato</a>
            <a href="#contato" class="nav-cta">Fale Comigo</a>
        </div>
    </div>
</nav>

<!-- HERO -->
<section class="hero">
    <div class="bg-grid"></div>
    <div class="hero-glow-top"></div>
    <div class="hero-glow-br"></div>
    <div class="hero-content">
        <div class="hero-logo fade-up">
            <div class="hero-logo-glow"></div>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" class="hero-logo-svg">
                <defs><linearGradient id="hero-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse"><stop stop-color="#6366f1"/><stop offset="1" stop-color="#06b6d4"/></linearGradient></defs>
                <rect width="80" height="80" rx="20" fill="url(#hero-g)"/>
                <path d="M12 12L12 24M12 12L24 12" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M68 12L68 24M68 12L56 12" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M12 68L12 56M12 68L24 68" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M68 68L68 56M68 68L56 68" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="40" cy="14" r="2" fill="rgba(255,255,255,0.2)"/>
                <circle cx="40" cy="66" r="2" fill="rgba(255,255,255,0.2)"/>
                <text x="40" y="54" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="30" fill="white" letter-spacing="-1">MB</text>
            </svg>
        </div>
        <div class="hero-badge fade-up">
            <span class="pulse-dot"></span>
            6 sistemas em produção &nbsp;·&nbsp; 20 templates premium
        </div>
        <h1 class="hero-title fade-up">
            <span class="text-white-fade">Sistemas web</span><br>
            <span class="text-gradient">que funcionam.</span>
        </h1>
        <p class="hero-sub fade-up">
            Desenvolvimento profissional com <strong class="text-white">Laravel</strong> e <strong class="text-white">Vue.js</strong>.<br>
            Do conceito ao deploy — com design moderno e qualidade de produção.
        </p>
        <div class="hero-stats fade-up">
            <div class="stat-card"><div class="stat-num">6</div><div class="stat-label">Sistemas</div></div>
            <div class="stat-card"><div class="stat-num">20</div><div class="stat-label">Templates</div></div>
            <div class="stat-card"><div class="stat-num stat-gradient">100%</div><div class="stat-label">Responsivo</div></div>
        </div>
        <div class="hero-ctas fade-up">
            <a href="#sistemas" class="btn-primary"><span>Ver Sistemas</span></a>
            <a href="#contato" class="btn-ghost"><span>Fale Comigo</span></a>
        </div>
        <div class="hero-scroll fade-up">
            <a href="#sistemas" class="scroll-link">
                <span>scroll</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="bounce"><polyline points="7 13 12 18 17 13"/><polyline points="7 6 12 11 17 6"/></svg>
            </a>
        </div>
    </div>
</section>

<!-- SISTEMAS -->
<section id="sistemas" class="section">
    <div class="container">
        <div class="section-header fade-up">
            <div class="section-label label-green">Em Produção</div>
            <h2 class="section-title">Sistemas</h2>
            <p class="section-sub">Aplicações web completas desenvolvidas com <span class="text-white70">Laravel</span> e <span class="text-white70">Vue.js</span> — em produção e prontas para uso.</p>
        </div>
        <div class="grid-3">
            <div v-for="sys in sistemas" :key="sys.id" class="card-glass" :class="{'cursor-pointer': sys.modal}" @click="sys.modal && openModal(sys.id)">
                <div class="card-img" :style="sys.img ? '' : `background: linear-gradient(135deg, ${sys.gradient})`">
                    <img v-if="sys.img" :src="sys.img" :alt="sys.name" class="card-screenshot">
                    <div v-else class="card-icon-wrap">
                        <svg v-if="sys.lucide === 'leaf'" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="card-icon emerald"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
                        <svg v-else-if="sys.lucide === 'clipboard-check'" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="card-icon slate"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
                        <svg v-else-if="sys.lucide === 'brain'" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="card-icon violet"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
                    </div>
                    <span class="card-badge" :class="sys.badge === 'Online' ? 'badge-green' : 'badge-orange'">{{ sys.badge }}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">{{ sys.name }}</h3>
                    <p class="card-desc">{{ sys.desc }}</p>
                    <a v-if="sys.url" :href="sys.url" target="_blank" rel="noopener" class="card-btn" :style="`background: linear-gradient(135deg, ${sys.btnGradient})`" @click.stop>
                        Acessar Sistema
                    </a>
                    <button v-else class="card-btn-ghost">Saiba Mais</button>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- TEMPLATES -->
<section id="templates" class="section">
    <div class="container">
        <div class="section-header fade-up">
            <div class="section-label label-indigo">Landing Pages Premium</div>
            <h2 class="section-title">Templates</h2>
            <p class="section-sub">20 landing pages prontas para uso, com documentação bilíngue, design 100% responsivo e código limpo.</p>
        </div>

        <div class="filters fade-up">
            <div class="search-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input v-model="search" type="text" placeholder="Buscar template..." class="search-input">
            </div>
            <div class="filter-pills">
                <button v-for="cat in categories" :key="cat.key" @click="activeFilter = cat.key"
                    class="filter-pill" :class="activeFilter === cat.key ? 'filter-pill--active' : ''">
                    {{ cat.label }} <span class="filter-count">({{ cat.count }})</span>
                </button>
            </div>
        </div>

        <div class="grid-3">
            <div v-for="t in filteredTemplates" :key="t.folder" class="card-glass">
                <div class="card-img">
                    <img :src="`/img/${t.imgFile}`" :alt="t.name" class="card-screenshot">
                    <span class="card-badge badge-dark">{{ categories.find(c=>c.key===t.category)?.label || t.category }}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">{{ t.name }}</h3>
                    <p class="card-desc">{{ t.desc }}</p>
                    <div class="card-actions">
                        <a :href="`/templates/${t.folder}/index.html`" class="card-btn-sm">Preview</a>
                        <a :href="`/templates/${t.folder}/documentation.html`" class="card-btn-sm">Docs</a>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="filteredTemplates.length === 0" class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v4"/><path d="M11 16h.01"/></svg>
            <h3>Nenhum template encontrado</h3>
            <p>Tente outro termo de busca ou filtro.</p>
        </div>
    </div>
</section>

<!-- CONTATO -->
<section id="contato" class="section">
    <div class="container-sm">
        <div class="section-header fade-up">
            <div class="section-label label-cyan">Contato</div>
            <h2 class="section-title">Fale Comigo</h2>
            <p class="section-sub">Tem um projeto em mente ou quer saber mais sobre os sistemas?<br>Me manda uma mensagem.</p>
        </div>
        <div class="card-glass p-8 fade-up">
            <form @submit.prevent="submitContact" class="contact-form">
                <div style="position:absolute;left:-9999px;opacity:0;pointer-events:none" aria-hidden="true">
                    <input type="text" v-model="honeypot" autocomplete="off" tabindex="-1">
                </div>
                <div class="form-field">
                    <label>Nome</label>
                    <input v-model="form.name" type="text" required placeholder="Seu nome" class="form-input">
                </div>
                <div class="form-field">
                    <label>Email</label>
                    <input v-model="form.email" type="email" required placeholder="seu@email.com" class="form-input">
                </div>
                <div class="form-field">
                    <label>Mensagem</label>
                    <textarea v-model="form.message" required rows="4" placeholder="Conta seu projeto..." class="form-input"></textarea>
                </div>
                <button type="submit" :disabled="contactLoading" class="btn-primary w-full">
                    {{ contactLoading ? 'Enviando...' : 'Enviar Mensagem' }}
                </button>
                <div v-if="contactFeedback" class="contact-feedback" :class="contactFeedback.type === 'ok' ? 'feedback-ok' : 'feedback-err'">
                    {{ contactFeedback.msg }}
                </div>
            </form>
        </div>
    </div>
</section>

<!-- FOOTER -->
<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div>
                <div class="footer-brand">
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                        <defs><linearGradient id="ft-g" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse"><stop stop-color="#6366f1"/><stop offset="1" stop-color="#06b6d4"/></linearGradient></defs>
                        <rect width="38" height="38" rx="10" fill="url(#ft-g)"/>
                        <text x="19" y="25" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="14" fill="white" letter-spacing="-0.5">MB</text>
                    </svg>
                    <div>
                        <div class="footer-brand-name">MB Sistemas</div>
                        <div class="footer-brand-sub">Desenvolvimento Web</div>
                    </div>
                </div>
                <p class="footer-desc">Sistemas web profissionais com tecnologia moderna, design de alto padrão e entrega com qualidade de produção.</p>
            </div>
            <div>
                <h4 class="footer-heading">Navegação</h4>
                <ul class="footer-links">
                    <li><a href="#sistemas">Sistemas</a></li>
                    <li><a href="#templates">Templates</a></li>
                    <li><a href="#contato">Contato</a></li>
                </ul>
            </div>
            <div>
                <h4 class="footer-heading">Contato</h4>
                <ul class="footer-links">
                    <li>mario.braz.dev@gmail.com</li>
                    <li>mbsistemas.site</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <span>&copy; 2025 MB Sistemas. Todos os direitos reservados.</span>
            <span>Feito com <span class="text-indigo">Laravel</span> · <span class="text-cyan">Vue.js</span></span>
        </div>
    </div>
</footer>

<!-- MODAL SISTEMAS PROPRIETÁRIOS -->
<Teleport to="body">
    <div v-if="modal" class="modal-overlay" @click="modal = null">
        <div class="modal-box" @click.stop>
            <button class="modal-close" @click="modal = null">✕</button>
            <div class="modal-icon-wrap">
                <svg v-if="modal.lucide === 'clipboard-check'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
            </div>
            <div>
                <h3 class="modal-name">{{ modal.name }}</h3>
                <span class="modal-tag">Sistema Proprietário</span>
            </div>
            <p class="modal-desc">{{ modal.description }}</p>
            <div>
                <p class="modal-section-label">Funcionalidades</p>
                <ul class="modal-features">
                    <li v-for="f in modal.features" :key="f">✓ {{ f }}</li>
                </ul>
            </div>
            <div class="modal-meta">
                <div class="modal-meta-item"><p class="modal-meta-label">Perfis</p><p>{{ modal.roles }}</p></div>
                <div class="modal-meta-item"><p class="modal-meta-label">Stack</p><p>{{ modal.stack }}</p></div>
            </div>
            <div class="modal-lock">
                🔒 Sistema proprietário. Não está disponível para acesso público.
            </div>
        </div>
    </div>
</Teleport>

<!-- WHATSAPP -->
<a href="https://wa.me/5541987797650" target="_blank" rel="noopener" class="wa-btn">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30" height="30"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// ── SISTEMAS ───────────────────────────────────────────────────────────────────
const sistemas = [
    { id: 'buildercv', name: 'CrieCurrículo', desc: 'Gerador de currículos profissionais com templates modernos e exportação em PDF.', img: '/img/buildercv.png', badge: 'Online', url: 'https://criecurriculo.com.br', btnGradient: '#7c3aed, #4f46e5' },
    { id: 'calc', name: 'Calculadora Tributária', desc: 'Simulador de impostos e tributos para planejamento fiscal inteligente.', img: '/img/calculadoraimposto.png', badge: 'Online', url: 'https://calculadoraimposto.com', btnGradient: '#2563eb, #16a34a' },
    { id: 'quantosubiu', name: 'Quanto Subiu', desc: 'Comparador de preços e inflação para acompanhar a variação de produtos.', img: '/logos/quantosubiu.png', badge: 'Online', url: 'https://quantosubiu.com.br', btnGradient: '#d97706, #dc2626' },
    { id: 'trataplan', name: 'TrataPlan', desc: 'Site institucional bilíngue com blog, parceiros, formulário de contato e SEO completo.', lucide: 'leaf', gradient: '#064e3b, #134e4a', badge: 'Online', url: 'https://trataplan.com.br', btnGradient: '#059669, #0d9488' },
    { id: 'checkops', name: 'CheckOps', desc: 'Gestão de rotinas operacionais com controle fotográfico, auditoria e notificações push.', lucide: 'clipboard-check', gradient: '#334155, #0f172a', badge: 'Proprietário', modal: true,
      description: 'Sistema de gestão e execução de rotinas operacionais com controle fotográfico, auditoria e notificações push. Desenvolvido para operações que exigem rastreabilidade completa e conformidade de processos.',
      features: ['Gestão de rotinas por setor, turno e frequência', 'Registro fotográfico obrigatório via câmera nativa', 'Dashboard de auditoria com histórico completo', 'Notificações push para alertas e pendências', 'Relatórios de conformidade e desempenho por setor'],
      roles: 'Admin · Gestor · Colaborador', stack: 'Laravel 13 · Vue 3 · PrimeVue · Redis · S3' },
    { id: 'jornada', name: 'Jornada Consciente', desc: 'Plataforma B2B/B2C de mentoria com avaliações psicométricas e diário de consciência.', lucide: 'brain', gradient: '#4c1d95, #2e1065', badge: 'Proprietário', modal: true,
      description: 'Plataforma B2B e B2C de mentoria de alto nível que conecta Mentores, Gestores de RH e Colaboradores em ciclos estruturados, combinando ferramentas de autoconhecimento psicológico com acompanhamento contínuo.',
      features: ['Ciclos estruturados de mentoria corporativa', 'Testes psicométricos: Big Five, Roda da Vida, Mapa do Medo', 'Diário da Consciência com streak diário e auto-observação', 'Dashboard com índice de consciência e gamificação', 'Gestão de empresas, mentores, gestores e colaboradores'],
      roles: 'Admin · Mentor · Gestor · Colaborador', stack: 'Laravel 11 · Vue 3 · TypeScript · MySQL' },
]

// ── TEMPLATES ──────────────────────────────────────────────────────────────────
const templates = [
    { name: 'Apex', folder: 'apex', desc: 'Premium Corporate Template', category: 'saas', imgFile: 'apex.png' },
    { name: 'AppFlow', folder: 'appflow', desc: 'Mobile App Landing Page', category: 'saas', imgFile: 'appflow.png' },
    { name: 'Chronicle', folder: 'chronicle', desc: 'Tech Blog & Magazine', category: 'creative', imgFile: 'chronicle.png' },
    { name: 'MasterClass Elite', folder: 'curso-online', desc: 'Curso Online & Educação Digital', category: 'special', imgFile: 'curso_online.png' },
    { name: 'The Ultimate Guide', folder: 'ebook-bestseller', desc: 'E-book & Digital Product', category: 'ecommerce', imgFile: 'ebook_bestseller.png' },
    { name: 'EstateLux', folder: 'estatelux', desc: 'Luxury Real Estate', category: 'institutional', imgFile: 'estatelux.png' },
    { name: 'FinTax', folder: 'fintax', desc: 'Contabilidade & Consultoria', category: 'institutional', imgFile: 'fintax.png' },
    { name: 'LexCorp', folder: 'lexcorp', desc: 'Advocacia & Escritório Jurídico', category: 'institutional', imgFile: 'lexcorp.png' },
    { name: 'Lumina Academy', folder: 'lumina', desc: 'Escola Bilíngue & Educação', category: 'institutional', imgFile: 'lumina.png' },
    { name: 'NebulaNFT', folder: 'nebula-nft', desc: 'NFT & Metaverse Collection', category: 'creative', imgFile: 'nebula.png' },
    { name: 'NeonMind AI', folder: 'neonmind-ai', desc: 'AI Content Generation Platform', category: 'saas', imgFile: 'neonmind.png' },
    { name: 'NexusAdmin', folder: 'nexus-admin', desc: 'Admin Dashboard Template', category: 'saas', imgFile: 'nexusadmin.png' },
    { name: 'Novus', folder: 'novus', desc: 'Modern SaaS & App Template', category: 'saas', imgFile: 'novus.png' },
    { name: 'Personal Page', folder: 'personal-landing-page', desc: 'Links & Portfolio Pessoal', category: 'creative', imgFile: 'personal_page.png' },
    { name: 'PrevLaw', folder: 'prevlaw', desc: 'Advogado Previdenciário', category: 'institutional', imgFile: 'prevlaw.png' },
    { name: 'SaaS Bento', folder: 'saas-bento', desc: 'Bento-Grid SaaS Landing', category: 'saas', imgFile: 'saas_bento.png' },
    { name: 'ShopFlow', folder: 'shopflow', desc: 'E-commerce Moda & Tech', category: 'ecommerce', imgFile: 'shopflow.png' },
    { name: 'Swiss Design', folder: 'swiss-design', desc: 'Portfólio Criativo Minimalista', category: 'creative', imgFile: 'swiss_design.png' },
    { name: 'Viva Bem', folder: 'vivabem-clinic', desc: 'Clínica de Saúde & Bem-Estar', category: 'institutional', imgFile: 'vivabem_clinic.png' },
    { name: 'Waitlist Viral', folder: 'waitlist-viral', desc: 'Coming Soon & Waitlist Page', category: 'special', imgFile: 'waitlist.png' },
]

const categories = [
    { key: 'all', label: 'Todos', count: 20 },
    { key: 'institutional', label: 'Institucional', count: 6 },
    { key: 'saas', label: 'SaaS & Tech', count: 6 },
    { key: 'creative', label: 'Criativo', count: 4 },
    { key: 'ecommerce', label: 'E-commerce', count: 2 },
    { key: 'special', label: 'Especial', count: 2 },
]

const search       = ref('')
const activeFilter = ref('all')

const filteredTemplates = computed(() => templates.filter(t => {
    const matchCat    = activeFilter.value === 'all' || t.category === activeFilter.value
    const matchSearch = !search.value || t.name.toLowerCase().includes(search.value.toLowerCase()) || t.desc.toLowerCase().includes(search.value.toLowerCase())
    return matchCat && matchSearch
}))

// ── MODAL ──────────────────────────────────────────────────────────────────────
const modal = ref(null)
function openModal(id) {
    modal.value = sistemas.find(s => s.id === id) || null
}

// ── CONTATO ────────────────────────────────────────────────────────────────────
const honeypot     = ref('')
const contactLoading  = ref(false)
const contactFeedback = ref(null)
const form = ref({ name: '', email: '', message: '' })

async function submitContact() {
    contactLoading.value  = true
    contactFeedback.value = null
    try {
        await axios.post('/api/contact', { ...form.value, website: honeypot.value })
        contactFeedback.value = { type: 'ok', msg: 'Mensagem enviada! Retorno em breve.' }
        form.value = { name: '', email: '', message: '' }
    } catch {
        contactFeedback.value = { type: 'err', msg: 'Erro ao enviar. Tente novamente.' }
    } finally {
        contactLoading.value = false
    }
}

// ── TRACKER ────────────────────────────────────────────────────────────────────
const pageLoadTime  = Date.now()
const clickedLinks  = []

onMounted(() => {
    axios.post('/api/track', {
        action: 'visit',
        user_agent: navigator.userAgent,
        referrer: document.referrer || 'Direto',
        screen: screen.width + 'x' + screen.height,
        language: navigator.language,
    }).catch(() => {})

    document.addEventListener('click', e => {
        const link = e.target.closest('a[href]')
        if (!link || link.getAttribute('href') === '#') return
        clickedLinks.push({
            text: (link.textContent || '').trim().substring(0, 100),
            url: link.getAttribute('href'),
            time: new Date().toLocaleTimeString('pt-BR'),
        })
    })

    function sendClicks() {
        if (!clickedLinks.length) return
        const data = JSON.stringify({ action: 'clicks', links: clickedLinks, duration: Math.round((Date.now() - pageLoadTime) / 1000) })
        if (navigator.sendBeacon) {
            navigator.sendBeacon('/api/track', new Blob([data], { type: 'application/json' }))
        }
    }

    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') sendClicks() })
    window.addEventListener('pagehide', sendClicks)
})
</script>

<style>
/* ── Layout ── */
.navbar { position:fixed;top:0;width:100%;z-index:50;border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(8,9,13,0.8);backdrop-filter:blur(20px); }
.navbar-inner { max-width:1280px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between; }
.navbar-brand { display:flex;align-items:center;gap:12px;text-decoration:none; }
.brand-title { font-weight:700;color:#fff;font-size:14px;letter-spacing:-0.02em; }
.brand-sub { font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em; }
.navbar-links { display:flex;align-items:center;gap:24px; }
.nav-link { font-size:14px;color:#94a3b8;text-decoration:none;transition:color 0.2s; }
.nav-link:hover { color:#fff; }
.nav-cta { font-size:14px;background:linear-gradient(135deg,#6366f1,#06b6d4);color:#fff;padding:8px 16px;border-radius:999px;font-weight:500;text-decoration:none;transition:opacity 0.2s; }
.nav-cta:hover { opacity:0.88; }

.hero { position:relative;min-height:100vh;display:flex;align-items:center;padding-top:64px;overflow:hidden; }
.bg-grid { position:absolute;inset:0;opacity:0.6;pointer-events:none;background-image:linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px);background-size:48px 48px; }
.hero-glow-top { position:absolute;top:0;left:50%;transform:translateX(-50%);width:900px;height:600px;pointer-events:none;background:radial-gradient(ellipse,rgba(99,102,241,0.18) 0%,transparent 68%); }
.hero-glow-br  { position:absolute;bottom:0;right:0;width:500px;height:400px;pointer-events:none;background:radial-gradient(ellipse at right bottom,rgba(6,182,212,0.1) 0%,transparent 65%); }
.hero-content  { max-width:800px;margin:0 auto;padding:80px 24px;text-align:center;position:relative;z-index:10; }

.hero-logo { display:flex;justify-content:center;margin-bottom:40px;position:relative; }
.hero-logo-glow { position:absolute;inset:0;background:linear-gradient(135deg,#6366f1,#06b6d4);border-radius:22px;filter:blur(24px);opacity:0.35;transform:scale(1.1); }
.hero-logo-svg { position:relative;filter:drop-shadow(0 0 16px rgba(99,102,241,0.45)); }

.hero-badge { display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);font-size:12px;color:#cbd5e1;margin-bottom:24px; }
.pulse-dot { width:8px;height:8px;border-radius:50%;background:#34d399;animation:pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }

.hero-title { font-size:clamp(40px,7vw,72px);font-weight:800;letter-spacing:-0.03em;line-height:1.05;margin-bottom:16px; }
.text-white-fade { background:linear-gradient(180deg,#fff 0%,rgba(255,255,255,0.5) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
.text-gradient   { background:linear-gradient(135deg,#6366f1,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }

.hero-sub { font-size:18px;color:#94a3b8;margin-bottom:48px;line-height:1.7; }
.text-white { color:#fff;font-weight:500; }

.hero-stats { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:320px;margin:0 auto 48px; }
.stat-card  { background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:22px 16px;text-align:center; }
.stat-num  { font-size:32px;font-weight:700;color:#fff;margin-bottom:4px; }
.stat-gradient { background:linear-gradient(135deg,#818cf8,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
.stat-label { font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em; }

.hero-ctas { display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;margin-bottom:64px; }
.btn-primary { background:linear-gradient(135deg,#6366f1,#06b6d4);color:#fff;font-weight:600;padding:12px 28px;border-radius:12px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all 0.2s; }
.btn-primary:hover { opacity:0.88;transform:translateY(-1px); }
.btn-ghost   { background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;font-weight:500;padding:12px 28px;border-radius:12px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all 0.2s; }
.btn-ghost:hover { background:rgba(255,255,255,0.09);border-color:rgba(255,255,255,0.2); }

.hero-scroll { display:flex;justify-content:center; }
.scroll-link { display:flex;flex-direction:column;align-items:center;gap:8px;color:#475569;text-decoration:none;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;transition:color 0.2s; }
.scroll-link:hover { color:#64748b; }
.bounce { animation:bounce 2s infinite; }
@keyframes bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(4px)} }

/* ── Section ── */
.section { padding-bottom:96px; }
.container    { max-width:1280px;margin:0 auto;padding:0 24px; }
.container-sm { max-width:700px;margin:0 auto;padding:0 24px; }
.section-header { text-align:center;margin-bottom:56px; }
.section-label  { display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:16px; }
.label-green  { border:1px solid rgba(52,211,153,0.2);background:rgba(52,211,153,0.05);color:#34d399; }
.label-indigo { border:1px solid rgba(99,102,241,0.2);background:rgba(99,102,241,0.05);color:#818cf8; }
.label-cyan   { border:1px solid rgba(6,182,212,0.2);background:rgba(6,182,212,0.05);color:#22d3ee; }
.section-title { font-size:clamp(32px,5vw,48px);font-weight:700;letter-spacing:-0.02em;margin-bottom:16px;background:linear-gradient(180deg,#fff 0%,rgba(255,255,255,0.5) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
.section-sub   { color:#64748b;max-width:480px;margin:0 auto;line-height:1.6; }
.text-white70  { color:rgba(255,255,255,0.7); }

/* ── Grid ── */
.grid-3 { display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px; }

/* ── Cards ── */
.card-glass { background:rgba(255,255,255,0.03);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden;transition:all 0.35s cubic-bezier(0.4,0,0.2,1); }
.card-glass:hover { border-color:rgba(255,255,255,0.15);transform:translateY(-6px);box-shadow:0 20px 40px -12px rgba(0,0,0,0.5); }
.cursor-pointer { cursor:pointer; }

.card-img { height:192px;position:relative;overflow:hidden; }
.card-screenshot { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;transition:transform 0.5s; }
.card-glass:hover .card-screenshot { transform:scale(1.05); }
.card-icon-wrap { position:absolute;inset:0;display:flex;align-items:center;justify-content:center; }
.card-icon      { opacity:0.8; }
.card-icon.emerald { color:#6ee7b7; }
.card-icon.slate   { color:#94a3b8; }
.card-icon.violet  { color:#c4b5fd; }

.card-badge  { position:absolute;top:12px;right:12px;padding:4px 10px;border-radius:999px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;backdrop-filter:blur(8px); }
.badge-green { background:rgba(52,211,153,0.2);color:#34d399;border:1px solid rgba(52,211,153,0.2); }
.badge-orange{ background:rgba(251,146,60,0.2);color:#fb923c;border:1px solid rgba(251,146,60,0.2); }
.badge-dark  { background:rgba(0,0,0,0.5);color:rgba(255,255,255,0.9);border:1px solid rgba(255,255,255,0.1); }

.card-body  { padding:20px; }
.card-title { font-size:17px;font-weight:700;color:#fff;margin-bottom:6px; }
.card-desc  { font-size:13px;color:#64748b;margin-bottom:20px;line-height:1.5; }
.card-btn   { display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 16px;border-radius:10px;font-size:14px;font-weight:500;color:#fff;text-decoration:none;transition:opacity 0.2s; }
.card-btn:hover { opacity:0.85; }
.card-btn-ghost { width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 16px;border-radius:10px;font-size:14px;font-weight:500;color:#94a3b8;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);cursor:pointer;transition:all 0.2s; }
.card-btn-ghost:hover { background:rgba(255,255,255,0.1);color:#fff; }
.card-actions   { display:flex;gap:8px; }
.card-btn-sm    { flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border-radius:10px;font-size:13px;font-weight:500;color:#94a3b8;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);text-decoration:none;transition:all 0.2s; }
.card-btn-sm:hover { background:rgba(255,255,255,0.1);color:#fff; }

/* ── Filters ── */
.filters     { margin-bottom:40px; }
.search-wrap { position:relative;max-width:400px;margin:0 auto 24px; }
.search-icon { position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#64748b; }
.search-input { width:100%;padding:12px 16px 12px 42px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;font-size:14px;color:#fff;outline:none;transition:all 0.2s; }
.search-input::placeholder { color:#475569; }
.search-input:focus { ring:2px solid #6366f1;border-color:transparent; }
.filter-pills { display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px; }
.filter-pill  { padding:8px 16px;border-radius:999px;border:1px solid rgba(255,255,255,0.1);font-size:14px;color:#94a3b8;background:none;cursor:pointer;transition:all 0.2s; }
.filter-pill:hover { color:#fff;border-color:rgba(255,255,255,0.2); }
.filter-pill--active { background:rgba(99,102,241,0.15);color:#818cf8;border-color:rgba(99,102,241,0.3); }
.filter-count { opacity:0.5;font-size:12px; }

/* ── Empty state ── */
.empty-state { text-align:center;padding:80px 24px;color:#475569; }
.empty-state h3 { font-size:18px;font-weight:600;color:#fff;margin:16px 0 8px; }
.empty-state p  { font-size:14px; }

/* ── Contact ── */
.contact-form  { display:flex;flex-direction:column;gap:20px; }
.form-field    { display:flex;flex-direction:column;gap:6px; }
.form-field label { font-size:14px;color:#94a3b8; }
.form-input { width:100%;padding:12px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;font-size:14px;color:#fff;outline:none;transition:all 0.2s;resize:none;font-family:inherit; }
.form-input::placeholder { color:#475569; }
.form-input:focus { border-color:#6366f1;box-shadow:0 0 0 2px rgba(99,102,241,0.2); }
.w-full { width:100%; }
.p-8 { padding:32px; }
.contact-feedback { text-align:center;font-size:14px;padding:10px 16px;border-radius:12px; }
.feedback-ok  { background:rgba(52,211,153,0.1);color:#34d399;border:1px solid rgba(52,211,153,0.2); }
.feedback-err { background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.2); }

/* ── Footer ── */
.footer        { border-top:1px solid rgba(255,255,255,0.05);padding:64px 0 32px; }
.footer-grid   { display:grid;grid-template-columns:1fr 1fr 1fr;gap:48px;margin-bottom:48px; }
.footer-brand  { display:flex;align-items:center;gap:12px;margin-bottom:20px; }
.footer-brand-name { font-weight:700;color:#fff;font-size:15px; }
.footer-brand-sub  { font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;margin-top:2px; }
.footer-desc   { font-size:14px;color:#64748b;line-height:1.6;max-width:280px; }
.footer-heading{ font-size:13px;font-weight:600;color:#fff;margin-bottom:20px;letter-spacing:0.03em; }
.footer-links  { list-style:none;display:flex;flex-direction:column;gap:12px;font-size:14px;color:#64748b; }
.footer-links a { color:#64748b;text-decoration:none;transition:color 0.2s; }
.footer-links a:hover { color:#fff; }
.footer-bottom { border-top:1px solid rgba(255,255,255,0.05);padding-top:24px;display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#475569;flex-wrap:wrap;gap:8px; }
.text-indigo { color:#6366f1; }
.text-cyan   { color:#06b6d4; }

/* ── Modal ── */
.modal-overlay { position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.7); }
.modal-box     { position:relative;background:#0d0f17;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;max-width:520px;width:100%;max-height:90vh;overflow-y:auto;display:flex;flex-direction:column;gap:20px; }
.modal-close   { position:absolute;top:16px;right:16px;background:none;border:none;color:#64748b;cursor:pointer;font-size:18px;transition:color 0.2s; }
.modal-close:hover { color:#fff; }
.modal-icon-wrap { width:48px;height:48px;border-radius:14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;color:#fff; }
.modal-name    { font-size:20px;font-weight:700;color:#fff; }
.modal-tag     { display:inline-block;font-size:11px;color:#fb923c;background:rgba(251,146,60,0.1);padding:2px 10px;border-radius:999px;border:1px solid rgba(251,146,60,0.2);margin-top:4px; }
.modal-desc    { font-size:14px;color:#94a3b8;line-height:1.7; }
.modal-section-label { font-size:11px;color:#475569;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;margin-bottom:12px; }
.modal-features { list-style:none;display:flex;flex-direction:column;gap:8px;font-size:14px;color:#94a3b8; }
.modal-features li::before { content:"✓ ";color:#818cf8; }
.modal-meta      { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
.modal-meta-item { background:rgba(255,255,255,0.04);border-radius:12px;padding:14px;border:1px solid rgba(255,255,255,0.05);font-size:13px;color:#cbd5e1; }
.modal-meta-label{ font-size:11px;color:#64748b;margin-bottom:4px; }
.modal-lock      { font-size:13px;color:#fb923c;background:rgba(251,146,60,0.05);border:1px solid rgba(251,146,60,0.15);border-radius:12px;padding:16px; }

/* ── WhatsApp ── */
.wa-btn { position:fixed;bottom:28px;right:28px;z-index:9999;width:56px;height:56px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,0.45);transition:transform 0.2s,box-shadow 0.2s;text-decoration:none; }
.wa-btn:hover { transform:scale(1.1);box-shadow:0 6px 28px rgba(37,211,102,0.6); }

/* ── Responsive ── */
@media(max-width:768px) {
    .navbar-links .nav-link { display:none; }
    .footer-grid { grid-template-columns:1fr; gap:32px; }
    .hero-title { font-size:36px; }
}
</style>
