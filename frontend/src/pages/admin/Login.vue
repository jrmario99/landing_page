<template>
    <div class="dark login-page">
        <div class="login-card">
            <div class="login-header">
                <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
                    <defs>
                        <linearGradient id="login-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6366f1"/><stop offset="1" stop-color="#06b6d4"/>
                        </linearGradient>
                    </defs>
                    <rect width="80" height="80" rx="20" fill="url(#login-g)"/>
                    <text x="40" y="54" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="30" fill="white" letter-spacing="-1">MB</text>
                </svg>
                <h1>MB Sistemas</h1>
                <p>Acesso restrito</p>
            </div>

            <form class="login-form" @submit.prevent="submit">
                <div class="field">
                    <label>Email</label>
                    <InputText v-model="email" type="email" placeholder="admin@email.com" required class="w-full" />
                </div>
                <div class="field">
                    <label>Senha</label>
                    <Password v-model="password" :feedback="false" placeholder="••••••••" required class="w-full" inputClass="w-full" />
                </div>
                <Message v-if="error" severity="error" class="mb-2">{{ error }}</Message>
                <Button type="submit" :loading="loading" label="Entrar" class="w-full" />
            </form>

            <a href="/" class="back-link">
                <i class="pi pi-arrow-left"></i>
                Voltar ao portfólio
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const router = useRouter()
const auth = useAuthStore()

const email    = ref('')
const password = ref('')
const loading  = ref(false)
const error    = ref('')

async function submit() {
    loading.value = true
    error.value   = ''
    try {
        await auth.login(email.value, password.value)
        router.push('/admin/messages')
    } catch (e) {
        error.value = e?.response?.data?.message || 'Erro ao fazer login'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #08090d;
    background-image:
        linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
    background-size: 48px 48px;
}

.login-card {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    backdrop-filter: blur(12px);
}

.login-header {
    text-align: center;
    margin-bottom: 32px;
}
.login-header h1 { font-size: 22px; font-weight: 700; margin: 12px 0 4px; }
.login-header p  { font-size: 14px; color: #64748b; }

.login-form { display: flex; flex-direction: column; gap: 16px; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 13px; color: #94a3b8; }

.back-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 20px;
    font-size: 13px;
    color: #64748b;
    text-decoration: none;
    transition: color 0.2s;
}
.back-link:hover { color: #818cf8; }
</style>
