<template>
    <div class="dashboard">

        <!-- Header -->
        <div class="dash-header">
            <div>
                <h1 class="dash-title">Dashboard</h1>
                <p class="dash-sub">Visão geral — <span class="dash-date">{{ today }}</span></p>
            </div>
            <Button icon="pi pi-refresh" :loading="loading" label="Atualizar" outlined size="small" @click="load" />
        </div>

        <template v-if="loading && !data">
            <div class="dash-skeleton">
                <Skeleton v-for="i in 4" :key="i" height="100px" borderRadius="12px" />
            </div>
        </template>

        <template v-else-if="data">

            <!-- ── KPI Cards ── -->
            <div class="kpi-grid">
                <div class="kpi-card">
                    <div class="kpi-icon kpi-icon--indigo"><i class="pi pi-envelope"></i></div>
                    <div class="kpi-body">
                        <span class="kpi-label">Não lidas</span>
                        <span class="kpi-value">{{ data.kpis.unread_messages }}</span>
                        <span class="kpi-hint">de {{ data.kpis.total_messages }} total</span>
                    </div>
                    <RouterLink to="/admin/messages" class="kpi-link"><i class="pi pi-arrow-right"></i></RouterLink>
                </div>
                <div class="kpi-card">
                    <div class="kpi-icon kpi-icon--cyan"><i class="pi pi-eye"></i></div>
                    <div class="kpi-body">
                        <span class="kpi-label">Visitas hoje</span>
                        <span class="kpi-value">{{ data.kpis.visits_today }}</span>
                        <span class="kpi-hint">{{ data.kpis.visits_week }} nos últimos 7 dias</span>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-icon kpi-icon--green"><i class="pi pi-server"></i></div>
                    <div class="kpi-body">
                        <span class="kpi-label">Sistemas online</span>
                        <span class="kpi-value">{{ systemsOnline }} / {{ data.systems.length }}</span>
                        <span class="kpi-hint">{{ systemsDegraded > 0 ? systemsDegraded + ' com alerta' : 'todos saudáveis' }}</span>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-icon kpi-icon--orange"><i class="pi pi-microchip"></i></div>
                    <div class="kpi-body">
                        <span class="kpi-label">CPU Load</span>
                        <span class="kpi-value">{{ data.server.load.one }}</span>
                        <span class="kpi-hint">{{ data.server.load.five }} / {{ data.server.load.fifteen }} (5m/15m)</span>
                    </div>
                </div>
            </div>

            <!-- ── Sistemas ── -->
            <section class="dash-section">
                <h2 class="section-title"><i class="pi pi-globe"></i> Monitoramento de Sistemas</h2>
                <div class="systems-grid">
                    <div v-for="sys in data.systems" :key="sys.name" class="sys-card" :class="{ 'sys-card--maintenance': sys.maintenance }">
                        <div class="sys-status-bar" :class="sys.maintenance ? 'sys-bar--maintenance' : `sys-bar--${sys.status}`"></div>
                        <div class="sys-body">
                            <div class="sys-top">
                                <div class="sys-name-row">
                                    <span class="sys-dot" :class="sys.maintenance ? 'dot-status--maintenance' : `dot-status--${sys.status}`"></span>
                                    <span class="sys-name">{{ sys.name }}</span>
                                </div>
                                <Tag v-if="sys.maintenance" value="Manutenção" severity="secondary" />
                                <Tag v-else :value="statusLabel(sys.status)" :severity="statusSeverity(sys.status)" />
                            </div>
                            <div class="sys-metrics">
                                <div class="sys-metric">
                                    <span class="metric-label">Latência</span>
                                    <span class="metric-value" :class="latencyClass(sys.latency)">{{ sys.latency }}ms</span>
                                </div>
                                <div class="sys-metric">
                                    <span class="metric-label">HTTP</span>
                                    <span class="metric-value">{{ sys.code || '—' }}</span>
                                </div>
                            </div>
                            <a :href="sys.url" target="_blank" rel="noopener" class="sys-link">
                                {{ sys.url.replace('https://', '') }}
                                <i class="pi pi-external-link"></i>
                            </a>
                            <div class="sys-actions">
                                <button v-if="logsForSystem(sys)" class="btn-log" @click="openLog(sys)">
                                    <i class="pi pi-exclamation-circle"></i> LOG
                                </button>
                                <div v-if="sys.slug" class="sys-toggle-row">
                                    <span class="toggle-label">{{ sys.maintenance ? 'Em manutenção' : 'Online' }}</span>
                                    <ToggleSwitch
                                        :modelValue="!sys.maintenance"
                                        :loading="toggling[sys.slug]"
                                        @update:modelValue="toggleSystem(sys)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ── Visitantes por sistema ── -->
            <section class="dash-section">
                <h2 class="section-title"><i class="pi pi-chart-bar"></i> Visitantes por Sistema</h2>
                <div v-if="!data.visitors_system?.length" class="empty-state">Aguardando dados do log de acesso</div>
                <div v-else class="visitors-list">
                    <div v-for="v in data.visitors_system" :key="v.domain" class="visitor-row">
                        <div class="visitor-left">
                            <span class="visitor-country">{{ v.system }}</span>
                            <span class="visitor-domain">{{ v.domain }}</span>
                        </div>
                        <div class="visitor-right">
                            <div class="visitor-bar-wrap">
                                <div class="visitor-bar" :style="{ width: `${Math.round(v.total / data.visitors_system[0].total * 100)}%` }"></div>
                            </div>
                            <span class="visitor-count">{{ v.total }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ── Visitantes por país (portfolio) ── -->
            <section class="dash-section" v-if="data.visitors_country?.length">
                <h2 class="section-title"><i class="pi pi-map-marker"></i> Visitantes do Portfólio por País</h2>
                <div class="visitors-list">
                    <div v-for="v in data.visitors_country" :key="v.country_code" class="visitor-row">
                        <div class="visitor-left">
                            <img :src="`https://flagcdn.com/20x15/${v.country_code}.png`" :alt="v.country" class="visitor-flag" />
                            <span class="visitor-country">{{ v.country }}</span>
                        </div>
                        <div class="visitor-right">
                            <div class="visitor-bar-wrap">
                                <div class="visitor-bar" :style="{ width: `${Math.round(v.total / data.visitors_country[0].total * 100)}%` }"></div>
                            </div>
                            <span class="visitor-count">{{ v.total }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ── Modal de Logs ── -->
            <Dialog v-model:visible="logModal.visible" :header="`Logs — ${logModal.app}`"
                modal :style="{ width: '680px', maxWidth: '95vw' }" :draggable="false">
                <div v-if="!logModal.errors?.length" class="empty-state" style="padding:32px 0">
                    Nenhum erro recente registrado
                </div>
                <div v-else class="logs-list" style="max-height: 460px">
                    <div v-for="(err, i) in logModal.errors" :key="i" class="log-entry">
                        <div class="log-top">
                            <span class="log-level" :class="`log-level--${err.level.toLowerCase()}`">{{ err.level }}</span>
                            <span class="log-at">{{ err.at }}</span>
                        </div>
                        <p class="log-msg">{{ err.message }}</p>
                    </div>
                </div>
            </Dialog>

            <!-- ── Linha 2: Gráfico + Servidor ── -->
            <div class="dash-row2">

                <!-- Gráfico visitas -->
                <section class="dash-section dash-section--chart">
                    <h2 class="section-title"><i class="pi pi-chart-line"></i> Visitas — últimos 7 dias</h2>
                    <div class="chart-wrap">
                        <Chart type="line" :data="chartData" :options="chartOptions" class="visits-chart" />
                    </div>
                </section>

                <!-- Servidor -->
                <section class="dash-section dash-section--server">
                    <h2 class="section-title"><i class="pi pi-server"></i> Servidor</h2>
                    <div class="server-stats">

                        <div class="server-stat">
                            <div class="server-stat-head">
                                <span>RAM</span>
                                <span class="server-stat-val">{{ data.server.memory.used }} / {{ data.server.memory.total }} MB</span>
                            </div>
                            <ProgressBar :value="data.server.memory.percent" :showValue="false"
                                :class="progressClass(data.server.memory.percent)" />
                            <span class="server-stat-pct">{{ data.server.memory.percent }}%</span>
                        </div>

                        <div class="server-stat">
                            <div class="server-stat-head">
                                <span>Disco</span>
                                <span class="server-stat-val">{{ data.server.disk.used }} / {{ data.server.disk.total }} GB</span>
                            </div>
                            <ProgressBar :value="data.server.disk.percent" :showValue="false"
                                :class="progressClass(data.server.disk.percent)" />
                            <span class="server-stat-pct">{{ data.server.disk.percent }}%</span>
                        </div>

                        <div class="server-info-grid">
                            <div class="server-info-item">
                                <span class="info-label">PHP</span>
                                <span class="info-value">{{ data.server.php }}</span>
                            </div>
                            <div class="server-info-item">
                                <span class="info-label">Load 1m</span>
                                <span class="info-value">{{ data.server.load.one }}</span>
                            </div>
                            <div class="server-info-item">
                                <span class="info-label">Load 5m</span>
                                <span class="info-value">{{ data.server.load.five }}</span>
                            </div>
                            <div class="server-info-item">
                                <span class="info-label">Load 15m</span>
                                <span class="info-value">{{ data.server.load.fifteen }}</span>
                            </div>
                        </div>

                        <div class="server-footer">
                            <span class="server-updated">Atualizado há {{ secondsAgo }}s</span>
                            <Button icon="pi pi-refresh" text rounded size="small" @click="load" :loading="loading" />
                        </div>
                    </div>
                </section>

            </div>

        </template>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Skeleton from 'primevue/skeleton'
import ProgressBar from 'primevue/progressbar'
import Chart from 'primevue/chart'
import ToggleSwitch from 'primevue/toggleswitch'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'

const data     = ref(null)
const loading  = ref(false)
const loadedAt = ref(null)
const secondsAgo = ref(0)
const toggling = ref({})
const toast    = useToast()
const logs        = ref([])
const logsLoading = ref(false)
const logModal    = ref({ visible: false, app: '', errors: [] })

// Map system name (from monitoring) to log app name
const LOG_NAME_MAP = {
    'CrieCurrículo':    'CrieCurrículo',
    'Calc. Tributária': 'Calc. Tributária',
    'Quanto Subiu':     'Quanto Subiu',
    'TrataPlan':        'TrataPlan',
    'Jornada — API':    'Jornada API',
}

function logsForSystem(sys) {
    const appName = LOG_NAME_MAP[sys.name]
    return appName ? logs.value.find(a => a.app === appName) : null
}

function openLog(sys) {
    const appLog = logsForSystem(sys)
    if (!appLog) return
    logModal.value = { visible: true, app: sys.name, errors: appLog.errors }
}
let timer = null

const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })

async function load() {
    loading.value = true
    try {
        const [dash] = await Promise.all([
            axios.get('/api/admin/dashboard'),
            loadLogs(),
        ])
        data.value = dash.data
        loadedAt.value = Date.now()
        secondsAgo.value = 0
    } finally {
        loading.value = false
    }
}

async function loadLogs() {
    logsLoading.value = true
    try {
        const { data: d } = await axios.get('/api/admin/logs')
        logs.value = d
    } finally {
        logsLoading.value = false
    }
}

async function toggleSystem(sys) {
    toggling.value[sys.slug] = true
    try {
        const { data: res } = await axios.post(`/api/admin/systems/${sys.slug}/toggle`)
        sys.maintenance = res.maintenance
        toast.add({
            severity: res.maintenance ? 'warn' : 'success',
            summary: res.maintenance ? 'Manutenção ativada' : 'Sistema online',
            detail: `${sys.name} está ${res.maintenance ? 'em manutenção' : 'online novamente'}.`,
            life: 4000,
        })
    } catch {
        toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao alternar o estado do sistema.', life: 4000 })
    } finally {
        toggling.value[sys.slug] = false
    }
}

// KPI helpers
const systemsOnline   = computed(() => data.value?.systems.filter(s => !s.maintenance && s.status === 'online').length ?? 0)
const systemsDegraded = computed(() => data.value?.systems.filter(s => !s.maintenance && s.status !== 'online').length ?? 0)

function statusLabel(s)    { return { online: 'Online', degraded: 'Alerta', offline: 'Offline' }[s] ?? s }
function statusSeverity(s) { return { online: 'success', degraded: 'warn', offline: 'danger' }[s] ?? 'secondary' }
function latencyClass(ms)  { return ms < 300 ? 'latency--ok' : ms < 800 ? 'latency--warn' : 'latency--bad' }
function progressClass(p)  { return p < 70 ? 'bar--ok' : p < 85 ? 'bar--warn' : 'bar--bad' }

// Chart
const chartData = computed(() => {
    if (!data.value) return {}
    const visits = data.value.visits
    return {
        labels: visits.map(v => v.label),
        datasets: [{
            label: 'Visitas',
            data: visits.map(v => v.total),
            fill: true,
            tension: 0.4,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99,102,241,0.12)',
            pointBackgroundColor: '#6366f1',
            pointRadius: 4,
            pointHoverRadius: 6,
        }],
    }
})

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#1e2130',
            titleColor: '#94a3b8',
            bodyColor: '#e2e8f0',
            borderColor: 'rgba(255,255,255,0.08)',
            borderWidth: 1,
        },
    },
    scales: {
        x: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#475569', font: { size: 11 } },
        },
        y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#475569', font: { size: 11 }, stepSize: 1 },
            beginAtZero: true,
        },
    },
}

onMounted(() => {
    load()
    timer = setInterval(() => {
        if (loadedAt.value) secondsAgo.value = Math.round((Date.now() - loadedAt.value) / 1000)
    }, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.dashboard { max-width: 1280px; }

.dash-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; }
.dash-title  { font-size: 22px; font-weight: 700; color: #f1f5f9; }
.dash-sub    { font-size: 13px; color: #475569; margin-top: 4px; }
.dash-date   { color: #64748b; }

.dash-skeleton { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }

/* ── KPI Grid ── */
.kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;
}

.kpi-card {
    background: #0f1120;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    transition: border-color 0.2s;
}
.kpi-card:hover { border-color: rgba(255,255,255,0.12); }

.kpi-icon {
    width: 42px; height: 42px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    flex-shrink: 0;
}
.kpi-icon--indigo { background: rgba(99,102,241,0.15);  color: #818cf8; }
.kpi-icon--cyan   { background: rgba(6,182,212,0.15);   color: #22d3ee; }
.kpi-icon--green  { background: rgba(34,197,94,0.15);   color: #4ade80; }
.kpi-icon--orange { background: rgba(249,115,22,0.15);  color: #fb923c; }

.kpi-body  { flex: 1; min-width: 0; }
.kpi-label { display: block; font-size: 11px; color: #475569; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
.kpi-value { display: block; font-size: 28px; font-weight: 700; color: #f1f5f9; line-height: 1; margin-bottom: 4px; }
.kpi-hint  { display: block; font-size: 11px; color: #475569; }

.kpi-link {
    color: #334155;
    text-decoration: none;
    font-size: 13px;
    transition: color 0.2s;
    padding-top: 2px;
}
.kpi-link:hover { color: #818cf8; }

/* ── Section ── */
.dash-section {
    background: #0f1120;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 22px;
    margin-bottom: 20px;
}
.section-title {
    font-size: 14px;
    font-weight: 600;
    color: #94a3b8;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.section-title .pi { font-size: 13px; color: #475569; }

/* ── Sistemas ── */
.systems-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
}

.sys-card {
    background: #0c0e18;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
}
.sys-card:hover { border-color: rgba(255,255,255,0.14); transform: translateY(-2px); }

.sys-status-bar { height: 3px; }
.sys-bar--online   { background: linear-gradient(90deg, #22c55e, #4ade80); }
.sys-bar--degraded { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
.sys-bar--offline  { background: linear-gradient(90deg, #ef4444, #f87171); }

.sys-body { padding: 16px; }
.sys-top  { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.sys-name-row { display: flex; align-items: center; gap: 8px; }
.sys-dot { width: 7px; height: 7px; border-radius: 50%; animation: pulse-dot 2s infinite; }
.dot-status--online   { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.5); }
.dot-status--degraded { background: #f59e0b; box-shadow: 0 0 6px rgba(245,158,11,0.5); animation: none; }
.dot-status--offline  { background: #ef4444; box-shadow: 0 0 6px rgba(239,68,68,0.5);  animation: none; }
@keyframes pulse-dot { 0%,100%{opacity:1}50%{opacity:0.4} }

.sys-name { font-size: 14px; font-weight: 600; color: #e2e8f0; }

.sys-metrics { display: flex; gap: 16px; margin-bottom: 12px; }
.sys-metric  { display: flex; flex-direction: column; gap: 2px; }
.metric-label { font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 0.06em; }
.metric-value { font-size: 15px; font-weight: 600; color: #cbd5e1; }
.latency--ok   { color: #4ade80; }
.latency--warn { color: #fbbf24; }
.latency--bad  { color: #f87171; }

.sys-link { font-size: 11px; color: #334155; text-decoration: none; display: flex; align-items: center; gap: 4px; transition: color 0.2s; margin-bottom: 12px; }
.sys-link:hover { color: #64748b; }
.sys-link .pi { font-size: 9px; }

.sys-toggle-row { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); }
.toggle-label { font-size: 11px; color: #475569; }

.sys-card--maintenance { opacity: 0.75; }
.sys-bar--maintenance { background: linear-gradient(90deg, #64748b, #94a3b8); }
.dot-status--maintenance { background: #64748b; box-shadow: none; animation: none; }

/* ── Row 2 ── */
.dash-row2 {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 20px;
    align-items: start;
}
.dash-section--chart { margin-bottom: 0; }
.dash-section--server { margin-bottom: 0; }

/* Chart */
.chart-wrap { height: 220px; }
.visits-chart { width: 100%; height: 100%; }

/* Server */
.server-stats { display: flex; flex-direction: column; gap: 18px; }

.server-stat {}
.server-stat-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 13px; color: #94a3b8; }
.server-stat-val { font-size: 12px; color: #64748b; }
.server-stat-pct { font-size: 11px; color: #475569; margin-top: 4px; display: block; text-align: right; }

/* ProgressBar color overrides */
.bar--ok  :deep(.p-progressbar-value)   { background: #22c55e !important; }
.bar--warn :deep(.p-progressbar-value)  { background: #f59e0b !important; }
.bar--bad  :deep(.p-progressbar-value)  { background: #ef4444 !important; }
:deep(.p-progressbar) { background: rgba(255,255,255,0.06) !important; height: 6px !important; border-radius: 99px !important; }

/* Server info grid */
.server-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}
.server-info-item {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 8px;
    padding: 10px 12px;
}
.info-label { display: block; font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px; }
.info-value { display: block; font-size: 13px; font-weight: 600; color: #94a3b8; }

.server-footer { display: flex; align-items: center; justify-content: space-between; }
.server-updated { font-size: 11px; color: #334155; }

/* ── Visitors ── */
.visitors-list { display: flex; flex-direction: column; gap: 10px; }
.visitor-row   { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.visitor-left  { display: flex; flex-direction: column; gap: 2px; min-width: 160px; }
.visitor-flag  { border-radius: 2px; flex-shrink: 0; }
.visitor-country { font-size: 13px; color: #cbd5e1; }
.visitor-domain  { font-size: 10px; color: #334155; }
.visitor-right { display: flex; align-items: center; gap: 10px; flex: 1; }
.visitor-bar-wrap { flex: 1; height: 6px; background: rgba(255,255,255,0.06); border-radius: 99px; overflow: hidden; }
.visitor-bar   { height: 100%; background: linear-gradient(90deg, #6366f1, #818cf8); border-radius: 99px; transition: width 0.4s; }
.visitor-count { font-size: 12px; color: #64748b; min-width: 28px; text-align: right; }

/* ── Log button on sys card ── */
.sys-actions { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); }
.btn-log {
    background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.3);
    color: #f87171;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: pointer;
    display: flex; align-items: center; gap: 4px;
    transition: background 0.2s;
}
.btn-log:hover { background: rgba(239,68,68,0.2); }
.btn-log .pi  { font-size: 10px; }

/* ── Logs (modal) ── */
.logs-list   { display: flex; flex-direction: column; gap: 8px; overflow-y: auto; }
.log-entry   { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 12px; }
.log-top     { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.log-level   { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; padding: 2px 7px; border-radius: 4px; }
.log-level--error     { background: rgba(239,68,68,0.15);  color: #f87171; }
.log-level--critical  { background: rgba(239,68,68,0.25);  color: #fca5a5; }
.log-level--alert     { background: rgba(245,158,11,0.15); color: #fbbf24; }
.log-level--emergency { background: rgba(239,68,68,0.35);  color: #ff6b6b; }
.log-at  { font-size: 10px; color: #475569; }
.log-msg { font-size: 12px; color: #94a3b8; line-height: 1.5; word-break: break-word; margin: 0; }

.empty-state { font-size: 13px; color: #334155; text-align: center; padding: 24px 0; }

/* ── Dialog dark ── */
:deep(.p-dialog) { background: #0f1120 !important; border: 1px solid rgba(255,255,255,0.08) !important; border-radius: 14px !important; }
:deep(.p-dialog-header) { background: #0f1120 !important; color: #f1f5f9 !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
:deep(.p-dialog-content) { background: #0f1120 !important; padding: 20px !important; }
:deep(.p-dialog-header-close) { color: #475569 !important; }

/* ── Responsive ── */
@media (max-width: 1200px) {
    .kpi-grid     { grid-template-columns: repeat(2, 1fr); }
    .systems-grid { grid-template-columns: repeat(2, 1fr); }
    .dash-row2    { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
    .kpi-grid { grid-template-columns: 1fr; }
}
</style>
