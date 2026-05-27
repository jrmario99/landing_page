<template>
    <div class="dark admin-root">
        <Toast position="bottom-right" />
        <ConfirmDialog />

        <!-- ── Sidebar ─────────────────────────────────── -->
        <aside :class="['sidebar', { 'sidebar--collapsed': collapsed }]">

            <!-- Brand -->
            <div class="sidebar-brand">
                <svg width="32" height="32" viewBox="0 0 34 34" fill="none" class="brand-icon">
                    <defs>
                        <linearGradient id="sb-g" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6366f1"/><stop offset="1" stop-color="#06b6d4"/>
                        </linearGradient>
                    </defs>
                    <rect width="34" height="34" rx="9" fill="url(#sb-g)"/>
                    <text x="17" y="22.5" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="13" fill="white" letter-spacing="-0.5">MB</text>
                </svg>
                <Transition name="fade-text">
                    <div v-if="!collapsed" class="brand-text">
                        <span class="brand-name">MB Sistemas</span>
                        <span class="brand-role">Admin Panel</span>
                    </div>
                </Transition>
                <button class="collapse-btn" @click="collapsed = !collapsed" :title="collapsed ? 'Expandir' : 'Recolher'">
                    <i :class="['pi', collapsed ? 'pi-chevron-right' : 'pi-chevron-left']"></i>
                </button>
            </div>

            <!-- Nav -->
            <nav class="sidebar-nav">
                <div class="nav-section-label" v-if="!collapsed">Geral</div>
                <RouterLink to="/admin/dashboard" class="nav-item" active-class="nav-item--active" :title="collapsed ? 'Dashboard' : ''">
                    <i class="pi pi-home nav-icon"></i>
                    <span v-if="!collapsed" class="nav-label">Dashboard</span>
                </RouterLink>
                <RouterLink to="/admin/messages" class="nav-item" active-class="nav-item--active" :title="collapsed ? 'Mensagens' : ''">
                    <i class="pi pi-envelope nav-icon"></i>
                    <span v-if="!collapsed" class="nav-label">Mensagens</span>
                    <span v-if="unreadCount > 0 && !collapsed" class="nav-badge">{{ unreadCount }}</span>
                    <span v-if="unreadCount > 0 && collapsed" class="nav-badge-dot"></span>
                </RouterLink>

                <div class="nav-section-label" v-if="!collapsed">Sistemas</div>
                <a v-for="sys in externalSystems" :key="sys.name"
                   :href="sys.url" target="_blank" rel="noopener"
                   class="nav-item nav-item--external"
                   :title="collapsed ? sys.name : ''">
                    <span class="nav-status-dot" :class="`dot-${sys.color}`"></span>
                    <span v-if="!collapsed" class="nav-label">{{ sys.name }}</span>
                    <i v-if="!collapsed" class="pi pi-external-link nav-ext-icon"></i>
                </a>
            </nav>

            <!-- Footer -->
            <div class="sidebar-footer">
                <div class="user-row">
                    <div class="user-avatar">{{ initials }}</div>
                    <Transition name="fade-text">
                        <div v-if="!collapsed" class="user-info">
                            <span class="user-name">{{ auth.user?.name }}</span>
                            <span class="user-email">{{ auth.user?.email }}</span>
                        </div>
                    </Transition>
                    <button v-if="!collapsed" class="logout-btn" @click="handleLogout" title="Sair">
                        <i class="pi pi-sign-out"></i>
                    </button>
                </div>
                <button v-if="collapsed" class="logout-btn logout-btn--center" @click="handleLogout" title="Sair">
                    <i class="pi pi-sign-out"></i>
                </button>
            </div>
        </aside>

        <!-- ── Main ───────────────────────────────────── -->
        <div class="main-wrapper">
            <!-- Topbar -->
            <header class="topbar">
                <div class="topbar-left">
                    <div class="breadcrumb-trail">
                        <span class="breadcrumb-root">Admin</span>
                        <i class="pi pi-chevron-right breadcrumb-sep"></i>
                        <span class="breadcrumb-current">{{ pageTitle }}</span>
                    </div>
                </div>
                <div class="topbar-right">
                    <a href="/" target="_blank" class="topbar-btn" title="Ver site">
                        <i class="pi pi-globe"></i>
                        <span>Ver site</span>
                    </a>
                    <div class="topbar-divider"></div>
                    <div class="topbar-user">
                        <div class="user-avatar user-avatar--sm">{{ initials }}</div>
                        <span class="topbar-user-name">{{ auth.user?.name }}</span>
                    </div>
                </div>
            </header>

            <!-- Page content -->
            <main class="page-content">
                <RouterView @unread-changed="fetchUnread" />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import axios from 'axios'

const auth      = useRouter()
const router    = useRouter()
const route     = useRoute()
const authStore = useAuthStore()

const collapsed   = ref(false)
const unreadCount = ref(0)

const externalSystems = [
    { name: 'CrieCurrículo', url: 'https://criecurriculo.com.br', color: 'indigo' },
    { name: 'Calculadora', url: 'https://calculadoraimposto.com', color: 'green'  },
    { name: 'QuantoSubiu', url: 'https://quantosubiu.com.br',     color: 'orange' },
    { name: 'TrataPlan',   url: 'https://trataplan.com.br',       color: 'cyan'   },
]

const pageTitles = {
    'dashboard':       'Dashboard',
    'messages':        'Mensagens',
    'message-detail':  'Mensagem',
}

const pageTitle = computed(() => pageTitles[route.name] || 'Admin')

const initials = computed(() =>
    (authStore.user?.name || 'A').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
)

async function fetchUnread() {
    try {
        const { data } = await axios.get('/api/admin/messages/unread-count')
        unreadCount.value = data.count
    } catch {}
}

async function handleLogout() {
    await authStore.logout()
    router.push('/admin/login')
}

onMounted(fetchUnread)
watch(() => route.name, fetchUnread)
</script>

<style>
/* ── Root ── */
.admin-root {
    display: flex;
    min-height: 100vh;
    background: #080a10;
    font-family: 'Inter', system-ui, sans-serif;
}

/* ── Sidebar ── */
.sidebar {
    width: 240px;
    flex-shrink: 0;
    background: #0c0e18;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    transition: width 0.25s ease;
    overflow: hidden;
    position: sticky;
    top: 0;
    height: 100vh;
}
.sidebar--collapsed { width: 64px; }

/* Brand */
.sidebar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    min-height: 72px;
    position: relative;
}
.brand-icon { flex-shrink: 0; }
.brand-text { flex: 1; min-width: 0; overflow: hidden; }
.brand-name { display: block; font-size: 13px; font-weight: 700; color: #f1f5f9; white-space: nowrap; }
.brand-role { display: block; font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 1px; }

.collapse-btn {
    margin-left: auto;
    flex-shrink: 0;
    width: 24px; height: 24px;
    border-radius: 6px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    color: #475569;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px;
    transition: all 0.2s;
}
.collapse-btn:hover { background: rgba(255,255,255,0.1); color: #94a3b8; }
.sidebar--collapsed .collapse-btn { margin-left: 0; }

/* Nav */
.sidebar-nav { flex: 1; padding: 12px 8px; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; }

.nav-section-label {
    font-size: 10px;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    padding: 12px 8px 4px;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border-radius: 8px;
    text-decoration: none;
    color: #64748b;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.18s;
    white-space: nowrap;
    position: relative;
}
.nav-item:hover { background: rgba(255,255,255,0.05); color: #cbd5e1; }
.nav-item--active { background: rgba(99,102,241,0.12) !important; color: #818cf8 !important; }
.nav-item--active .nav-icon { color: #818cf8; }
.nav-item--external { color: #4b5563; }
.nav-item--external:hover { color: #9ca3af; }

.nav-icon { font-size: 14px; flex-shrink: 0; width: 16px; text-align: center; }
.nav-label { flex: 1; }
.nav-ext-icon { font-size: 10px; color: #374151; }

.nav-badge {
    background: #6366f1;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 999px;
    min-width: 18px;
    text-align: center;
}
.nav-badge-dot {
    position: absolute;
    top: 8px; right: 8px;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #6366f1;
}

.nav-status-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
}
.dot-indigo { background: #6366f1; box-shadow: 0 0 6px rgba(99,102,241,0.6); }
.dot-green  { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.6); }
.dot-orange { background: #f97316; box-shadow: 0 0 6px rgba(249,115,22,0.6); }
.dot-cyan   { background: #06b6d4; box-shadow: 0 0 6px rgba(6,182,212,0.6); }

/* Sidebar footer */
.sidebar-footer {
    padding: 12px 8px;
    border-top: 1px solid rgba(255,255,255,0.05);
}
.user-row { display: flex; align-items: center; gap: 8px; }

.user-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #06b6d4);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff;
    flex-shrink: 0;
}
.user-avatar--sm { width: 28px; height: 28px; font-size: 11px; }

.user-info { flex: 1; min-width: 0; overflow: hidden; }
.user-name  { display: block; font-size: 12px; font-weight: 600; color: #e2e8f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-email { display: block; font-size: 11px; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.logout-btn {
    background: none; border: none;
    color: #475569; cursor: pointer;
    padding: 6px; border-radius: 7px;
    transition: all 0.2s; flex-shrink: 0; font-size: 13px;
    display: flex; align-items: center; justify-content: center;
}
.logout-btn:hover { background: rgba(239,68,68,0.1); color: #f87171; }
.logout-btn--center { width: 100%; margin-top: 4px; }

/* Transition */
.fade-text-enter-active, .fade-text-leave-active { transition: opacity 0.15s, width 0.25s; overflow: hidden; }
.fade-text-enter-from, .fade-text-leave-to { opacity: 0; }

/* ── Main wrapper ── */
.main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

/* ── Topbar ── */
.topbar {
    height: 56px;
    background: #0c0e18;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    position: sticky;
    top: 0;
    z-index: 10;
}

.topbar-left {}
.breadcrumb-trail { display: flex; align-items: center; gap: 8px; }
.breadcrumb-root    { font-size: 13px; color: #475569; }
.breadcrumb-sep     { font-size: 10px; color: #1e293b; }
.breadcrumb-current { font-size: 13px; font-weight: 600; color: #e2e8f0; }

.topbar-right { display: flex; align-items: center; gap: 12px; }
.topbar-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 12px; border-radius: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    color: #64748b; font-size: 12px; text-decoration: none;
    transition: all 0.2s;
}
.topbar-btn:hover { background: rgba(255,255,255,0.08); color: #cbd5e1; }
.topbar-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.07); }
.topbar-user { display: flex; align-items: center; gap: 8px; }
.topbar-user-name { font-size: 13px; color: #94a3b8; font-weight: 500; }

/* ── Page content ── */
.page-content { flex: 1; padding: 28px; overflow-x: hidden; }
</style>
