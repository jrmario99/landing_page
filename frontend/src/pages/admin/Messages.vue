<template>
    <div class="messages-page">

        <!-- Header -->
        <div class="page-header">
            <div>
                <h1 class="page-title">Mensagens</h1>
                <p class="page-sub">
                    <span :class="unreadCount > 0 ? 'sub-unread' : 'sub-ok'">
                        {{ unreadCount > 0 ? `${unreadCount} não lida${unreadCount > 1 ? 's' : ''}` : 'Tudo lido' }}
                    </span>
                    &nbsp;· {{ total }} total
                </p>
            </div>
            <div class="header-actions">
                <SelectButton v-model="filter" :options="filterOptions" optionLabel="label" optionValue="value" />
            </div>
        </div>

        <!-- Table -->
        <div class="table-card">
            <DataTable
                :value="messages"
                :loading="loading"
                :rows="20"
                :totalRecords="total"
                :lazy="true"
                :paginator="total > 20"
                @page="onPage"
                rowHover
                @rowClick="e => openMessage(e.data)"
                :rowClass="rowClass"
                emptyMessage=" "
                size="small"
            >
                <template #empty>
                    <div class="empty-state">
                        <i class="pi pi-inbox empty-icon"></i>
                        <p>Nenhuma mensagem encontrada</p>
                    </div>
                </template>

                <Column style="width:4px; padding-right:0">
                    <template #body="{ data }">
                        <div class="unread-indicator" :class="!data.is_read ? 'unread-indicator--on' : ''"></div>
                    </template>
                </Column>

                <Column field="name" header="Nome" style="min-width:130px">
                    <template #body="{ data }">
                        <div class="sender-cell">
                            <div class="sender-avatar">{{ data.name[0].toUpperCase() }}</div>
                            <span class="sender-name" :class="!data.is_read ? 'fw-bold' : ''">{{ data.name }}</span>
                        </div>
                    </template>
                </Column>

                <Column field="email" header="Email" style="min-width:180px">
                    <template #body="{ data }">
                        <span class="email-text">{{ data.email }}</span>
                    </template>
                </Column>

                <Column field="message" header="Mensagem" style="min-width:220px">
                    <template #body="{ data }">
                        <span class="msg-preview">{{ data.message }}</span>
                    </template>
                </Column>

                <Column field="created_at" header="Recebida" style="width:130px">
                    <template #body="{ data }">
                        <span class="date-text">{{ formatDate(data.created_at) }}</span>
                    </template>
                </Column>

                <Column style="width:90px; text-align:right">
                    <template #body="{ data }">
                        <div class="row-actions" @click.stop>
                            <Button icon="pi pi-eye"   text rounded size="small" @click="openMessage(data)"   v-tooltip.top="'Ver'" />
                            <Button icon="pi pi-trash" text rounded size="small" severity="danger" @click="confirmDelete(data)" v-tooltip.top="'Excluir'" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import axios from 'axios'

const router  = useRouter()
const confirm = useConfirm()
const toast   = useToast()

const messages    = ref([])
const loading     = ref(false)
const total       = ref(0)
const page        = ref(1)
const unreadCount = ref(0)
const filter      = ref('all')

const filterOptions = [
    { label: 'Todas', value: 'all' },
    { label: 'Não lidas', value: 'unread' },
]

async function load() {
    loading.value = true
    try {
        const params = { page: page.value }
        if (filter.value === 'unread') params.filter = 'unread'
        const { data } = await axios.get('/api/admin/messages', { params })
        messages.value = data.data
        total.value    = data.total
    } finally {
        loading.value = false
    }
}

async function fetchUnread() {
    const { data } = await axios.get('/api/admin/messages/unread-count')
    unreadCount.value = data.count
}

function onPage(e) { page.value = e.page + 1; load() }
function rowClass(data) { return !data.is_read ? 'row-unread' : '' }
function openMessage(msg) { router.push(`/admin/messages/${msg.id}`) }

function confirmDelete(msg) {
    confirm.require({
        message: `Excluir mensagem de ${msg.name}?`,
        header: 'Confirmar exclusão',
        icon: 'pi pi-trash',
        acceptSeverity: 'danger',
        accept: () => deleteMsg(msg),
    })
}

async function deleteMsg(msg) {
    await axios.delete(`/api/admin/messages/${msg.id}`)
    toast.add({ severity: 'success', summary: 'Excluída com sucesso', life: 2500 })
    load(); fetchUnread()
}

function formatDate(dt) {
    const d = new Date(dt)
    const now = new Date()
    const diffH = (now - d) / 3600000
    if (diffH < 24) return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

watch(filter, () => { page.value = 1; load() })
onMounted(() => { load(); fetchUnread() })
</script>

<style>
.messages-page { max-width: 1100px; }

.page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
.page-title  { font-size: 22px; font-weight: 700; color: #f1f5f9; }
.page-sub    { font-size: 13px; color: #475569; margin-top: 4px; }
.sub-unread  { color: #818cf8; font-weight: 600; }
.sub-ok      { color: #4ade80; font-weight: 600; }

.table-card {
    background: #0d0f1f;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    overflow: hidden;
}

/* ── DataTable: força tema escuro em todos os elementos ────────────── */
:deep(.p-datatable),
:deep(.p-datatable-table-container),
:deep(.p-datatable .p-datatable-table) {
    background: transparent !important;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
    background: rgba(255,255,255,0.025) !important;
    border-bottom: 1px solid rgba(255,255,255,0.07) !important;
    border-top: none !important;
    color: #475569 !important;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 10px 12px;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
    background: transparent !important;
    cursor: pointer;
    transition: background 0.15s;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
    background: transparent !important;
    border-bottom: 1px solid rgba(255,255,255,0.04) !important;
    border-top: none !important;
    color: #cbd5e1 !important;
    padding: 10px 12px;
}

:deep(.p-datatable .p-datatable-tbody > tr:last-child > td) {
    border-bottom: none !important;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover > td) {
    background: rgba(99,102,241,0.07) !important;
}

:deep(.p-datatable .p-datatable-tbody > tr.row-unread > td) {
    background: rgba(99,102,241,0.04) !important;
}

:deep(.p-datatable .p-datatable-tbody > tr.row-unread:hover > td) {
    background: rgba(99,102,241,0.1) !important;
}

:deep(.p-datatable-loading-overlay) {
    background: rgba(8,9,20,0.7) !important;
}

:deep(.p-paginator) {
    background: rgba(255,255,255,0.015) !important;
    border-top: 1px solid rgba(255,255,255,0.06) !important;
    padding: 8px 12px;
}

:deep(.p-paginator .p-paginator-page),
:deep(.p-paginator .p-paginator-prev),
:deep(.p-paginator .p-paginator-next) {
    color: #64748b !important;
    background: transparent !important;
    border: none !important;
}

:deep(.p-paginator .p-paginator-page.p-highlight) {
    background: rgba(99,102,241,0.2) !important;
    color: #818cf8 !important;
}

/* ── Cells ─────────────────────────────────────────────────────────── */
.unread-indicator     { width: 3px; height: 36px; border-radius: 2px; background: transparent; }
.unread-indicator--on { background: #6366f1; box-shadow: 0 0 6px rgba(99,102,241,0.5); }

.sender-cell   { display: flex; align-items: center; gap: 10px; }
.sender-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(99,102,241,0.25), rgba(6,182,212,0.25));
    border: 1px solid rgba(99,102,241,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #818cf8;
    flex-shrink: 0;
}
.sender-name { font-size: 13px; color: #94a3b8; }
.fw-bold     { font-weight: 700; color: #e2e8f0 !important; }
.email-text  { font-size: 13px; color: #4b7cf3; }
.msg-preview { font-size: 13px; color: #475569; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
.date-text   { font-size: 12px; color: #334155; }
.row-actions { display: flex; gap: 2px; justify-content: flex-end; }

.empty-state { text-align: center; padding: 64px 24px; color: #1e293b; }
.empty-icon  { font-size: 40px; display: block; margin-bottom: 12px; }
.empty-state p { font-size: 14px; color: #334155; }
</style>
