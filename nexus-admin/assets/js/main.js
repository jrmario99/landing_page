/* ============================================
   NEXUSADMIN — Admin Dashboard Template
   Chart initialization & dark mode sync
============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') lucide.createIcons();

    /* ============================================
       1. DARK MODE OBSERVER FOR CHARTS
    ============================================ */
    const htmlEl = document.documentElement;
    const isDark = () => htmlEl.classList.contains('dark');

    let revenueChart = null;
    let trafficChart = null;

    const observer = new MutationObserver(() => {
        updateChartsTheme();
    });
    observer.observe(htmlEl, { attributes: true, attributeFilter: ['class'] });

    /* ============================================
       2. CHART THEME HELPERS
    ============================================ */
    function getChartColors() {
        return {
            text: isDark() ? '#94a3b8' : '#64748b',
            grid: isDark() ? '#334155' : '#e2e8f0',
            bg: isDark() ? '#1e293b' : '#ffffff',
        };
    }

    /* ============================================
       3. REVENUE OVERVIEW — Area Chart
    ============================================ */
    const revenueEl = document.querySelector('#revenueChart');

    if (revenueEl) {
        const colors = getChartColors();
        const revenueOptions = {
            series: [
                {
                    name: 'Revenue',
                    data: [4200, 5100, 4800, 6200, 5800, 7100, 6900, 8200, 7800, 9100, 8600, 10200]
                },
                {
                    name: 'Expenses',
                    data: [2800, 3200, 3100, 3500, 3400, 3800, 3700, 4100, 3900, 4300, 4100, 4500]
                }
            ],
            chart: {
                type: 'area',
                height: 320,
                fontFamily: 'Inter, sans-serif',
                toolbar: { show: false },
                background: 'transparent',
            },
            colors: ['#6366f1', '#06b6d4'],
            stroke: { curve: 'smooth', width: 2.5 },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.05,
                    stops: [0, 100]
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: { style: { colors: colors.text, fontSize: '12px' } },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: {
                labels: {
                    style: { colors: colors.text, fontSize: '12px' },
                    formatter: function (val) {
                        return '$' + (val / 1000).toFixed(1) + 'k';
                    }
                }
            },
            grid: {
                borderColor: colors.grid,
                strokeDashArray: 4,
                padding: { left: 8, right: 8 }
            },
            dataLabels: { enabled: false },
            tooltip: {
                theme: isDark() ? 'dark' : 'light',
                y: {
                    formatter: function (val) {
                        return '$' + val.toLocaleString();
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                labels: { colors: colors.text },
                markers: { radius: 3 }
            },
        };

        revenueChart = new ApexCharts(revenueEl, revenueOptions);
        revenueChart.render();
    }

    /* ============================================
       4. TRAFFIC SOURCES — Donut Chart
    ============================================ */
    const trafficEl = document.querySelector('#trafficChart');

    if (trafficEl) {
        const colors = getChartColors();
        const trafficOptions = {
            series: [44, 28, 18, 10],
            chart: {
                type: 'donut',
                height: 320,
                fontFamily: 'Inter, sans-serif',
            },
            labels: ['Direct', 'Organic', 'Referral', 'Social'],
            colors: ['#6366f1', '#06b6d4', '#f59e0b', '#10b981'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '72%',
                        labels: {
                            show: true,
                            name: {
                                fontSize: '14px',
                                color: colors.text,
                            },
                            value: {
                                fontSize: '24px',
                                fontWeight: 700,
                                color: isDark() ? '#e2e8f0' : '#0f172a',
                                formatter: function (val) {
                                    return val + '%';
                                }
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: colors.text,
                                formatter: function () {
                                    return '100%';
                                }
                            }
                        }
                    }
                }
            },
            stroke: { width: 0 },
            dataLabels: { enabled: false },
            legend: {
                position: 'bottom',
                labels: { colors: colors.text },
                markers: { radius: 3 }
            },
        };

        trafficChart = new ApexCharts(trafficEl, trafficOptions);
        trafficChart.render();
    }

    /* ============================================
       5. UPDATE CHARTS ON THEME CHANGE
    ============================================ */
    function updateChartsTheme() {
        const colors = getChartColors();
        const tooltipTheme = isDark() ? 'dark' : 'light';

        if (revenueChart) {
            revenueChart.updateOptions({
                xaxis: { labels: { style: { colors: colors.text } } },
                yaxis: { labels: { style: { colors: colors.text } } },
                grid: { borderColor: colors.grid },
                tooltip: { theme: tooltipTheme },
                legend: { labels: { colors: colors.text } },
            }, false, false);
        }

        if (trafficChart) {
            trafficChart.updateOptions({
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                name: { color: colors.text },
                                value: { color: isDark() ? '#e2e8f0' : '#0f172a' },
                                total: { color: colors.text }
                            }
                        }
                    }
                },
                legend: { labels: { colors: colors.text } },
            }, false, false);
        }
    }
});
