import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/PublicLayout.vue'),
        children: [
            { path: '', name: 'home', component: () => import('@/pages/public/Home.vue') },
        ],
    },
    {
        path: '/admin/login',
        name: 'login',
        component: () => import('@/pages/admin/Login.vue'),
        meta: { guest: true },
    },
    {
        path: '/admin',
        component: () => import('@/layouts/AdminLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            { path: '',         redirect: '/admin/dashboard' },
            { path: 'dashboard',      name: 'dashboard',      component: () => import('@/pages/admin/Dashboard.vue') },
            { path: 'messages',       name: 'messages',       component: () => import('@/pages/admin/Messages.vue') },
            { path: 'messages/:id',   name: 'message-detail', component: () => import('@/pages/admin/MessageDetail.vue') },
        ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) return { el: to.hash, behavior: 'smooth' }
        return { top: 0 }
    },
})

router.beforeEach(async (to) => {
    const auth = useAuthStore()
    if (to.meta.requiresAuth) {
        if (!auth.checked) await auth.fetchUser()
        if (!auth.user) return { name: 'login' }
    }
    if (to.meta.guest && auth.user) return { path: '/admin/dashboard' }
})

export default router
