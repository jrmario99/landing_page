<template>
    <div class="detail-page">

        <div class="detail-topbar">
            <Button icon="pi pi-arrow-left" label="Mensagens" text size="small" @click="router.push('/admin/messages')" />
            <div class="detail-actions" v-if="message">
                <a :href="`mailto:${message.email}?subject=Re: Contato MB Sistemas`" class="p-button p-button-sm p-button-outlined">
                    <i class="pi pi-reply"></i>
                    <span>Responder</span>
                </a>
                <Button icon="pi pi-trash" label="Excluir" severity="danger" outlined size="small" @click="confirmDelete" />
            </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="detail-loading">
            <div class="detail-card skeleton-card">
                <Skeleton height="80px" borderRadius="12px" class="mb-4" />
                <Skeleton height="200px" borderRadius="12px" />
            </div>
        </div>

        <!-- Message -->
        <div v-else-if="message" class="detail-card">

            <!-- Sender row -->
            <div class="msg-sender">
                <div class="sender-avatar-lg">{{ initials }}</div>
                <div class="sender-info">
                    <h2 class="sender-name">{{ message.name }}</h2>
                    <a :href="`mailto:${message.email}`" class="sender-email">{{ message.email }}</a>
                </div>
                <div class="msg-meta">
                    <Tag :value="message.is_read ? 'Lida' : 'Nova'" :severity="message.is_read ? 'secondary' : 'info'" />
                    <span class="msg-date">{{ formatDate(message.created_at) }}</span>
                </div>
            </div>

            <!-- Divider -->
            <div class="msg-divider"></div>

            <!-- Body -->
            <div class="msg-body">
                <p class="msg-text">{{ message.message }}</p>
            </div>

            <!-- Footer info -->
            <div class="msg-footer">
                <div class="msg-footer-item" v-if="message.ip_address">
                    <i class="pi pi-map-marker"></i>
                    <span>{{ message.ip_address }}</span>
                </div>
                <div class="msg-footer-item">
                    <i class="pi pi-clock"></i>
                    <span>Recebida em {{ formatDateFull(message.created_at) }}</span>
                </div>
            </div>

        </div>

        <!-- Not found -->
        <div v-else class="not-found">
            <i class="pi pi-inbox not-found-icon"></i>
            <p>Mensagem não encontrada</p>
            <Button label="Voltar" outlined @click="router.push('/admin/messages')" />
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Skeleton from 'primevue/skeleton'
import axios from 'axios'

const router  = useRouter()
const route   = useRoute()
const confirm = useConfirm()
const toast   = useToast()

const message = ref(null)
const loading = ref(true)

const initials = computed(() =>
    (message.value?.name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
)

async function load() {
    try {
        const { data } = await axios.get(`/api/admin/messages/${route.params.id}`)
        message.value = data
    } catch { message.value = null }
    finally { loading.value = false }
}

function confirmDelete() {
    confirm.require({
        message: 'Excluir esta mensagem permanentemente?',
        header: 'Confirmar exclusão',
        icon: 'pi pi-trash',
        acceptSeverity: 'danger',
        accept: async () => {
            await axios.delete(`/api/admin/messages/${message.value.id}`)
            toast.add({ severity: 'success', summary: 'Mensagem excluída', life: 2500 })
            router.push('/admin/messages')
        },
    })
}

function formatDate(dt) {
    return new Date(dt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
function formatDateFull(dt) {
    return new Date(dt).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })
}

onMounted(load)
</script>

<style scoped>
.detail-page { max-width: 760px; }

.detail-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;
}
.detail-actions { display: flex; gap: 8px; align-items: center; }

.detail-loading { }
.skeleton-card  { padding: 28px; }
.mb-4 { margin-bottom: 16px; }

.detail-card {
    background: #0f1120;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    overflow: hidden;
}

.msg-sender {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 24px 28px;
    flex-wrap: wrap;
}

.sender-avatar-lg {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #06b6d4);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700; color: #fff;
    flex-shrink: 0;
}

.sender-info { flex: 1; min-width: 0; }
.sender-name  { font-size: 18px; font-weight: 700; color: #f1f5f9; margin-bottom: 4px; }
.sender-email { font-size: 14px; color: #4b7cf3; text-decoration: none; transition: color 0.2s; }
.sender-email:hover { color: #818cf8; }

.msg-meta  { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.msg-date  { font-size: 12px; color: #475569; }

.msg-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 0 28px; }

.msg-body { padding: 24px 28px; }
.msg-text {
    font-size: 15px;
    color: #cbd5e1;
    line-height: 1.8;
    white-space: pre-wrap;
}

.msg-footer {
    display: flex;
    gap: 24px;
    padding: 16px 28px;
    background: rgba(255,255,255,0.02);
    border-top: 1px solid rgba(255,255,255,0.05);
    flex-wrap: wrap;
}
.msg-footer-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #334155; }
.msg-footer-item .pi { font-size: 11px; }

.not-found { text-align: center; padding: 80px 24px; color: #475569; }
.not-found-icon { font-size: 48px; display: block; margin-bottom: 16px; color: #1e293b; }
.not-found p { font-size: 15px; margin-bottom: 20px; }
</style>
