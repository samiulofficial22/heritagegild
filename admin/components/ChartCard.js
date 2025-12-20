/* ============================================
   CHART CARD COMPONENT
   ============================================ */

const ChartCardComponent = {
    render(data = {}) {
        const title = data.title || 'Gold Price';
        const subtitle = data.subtitle || '<span class="price-increase positive"><i class="fas fa-arrow-up"></i> 9.72% Increase this month</span>';
        const periods = data.periods || ['1D', '7D', '1M', '6M', '1Y'];
        const defaultPeriod = data.defaultPeriod || '6M';
        const chartId = data.chartId || 'goldPriceChart';
        const stats = data.stats || [
            { label: 'Current Price', value: '$79/g' },
            { label: '24H Change', value: '<span class="stat-value positive"><i class="fas fa-arrow-up"></i> +2.3%</span>' },
            { label: 'Market Status', value: 'Active' }
        ];

        return `
            <div class="content-card">
                <div class="card-header">
                    <div class="card-header-content">
                        <h3 class="card-title">${title}</h3>
                        <p class="card-subtitle">${subtitle}</p>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-filters">
                        ${periods.map(period => `
                            <button class="chart-filter-btn ${period === defaultPeriod ? 'active' : ''}" 
                                    data-period="${period}">
                                ${period}
                            </button>
                        `).join('')}
                    </div>
                    
                    <div class="chart-container">
                        <canvas id="${chartId}"></canvas>
                    </div>
                    
                    <div class="chart-stats">
                        ${stats.map(stat => `
                            <div class="chart-stat-item">
                                <span class="stat-label">${stat.label}</span>
                                <span class="stat-value ${stat.positive ? 'positive' : ''}">${stat.value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    init(container, data) {
        // Initialize chart after a short delay to ensure canvas is rendered
        setTimeout(() => {
            if (window.GoldPriceChart && window.GoldPriceChart.initializeGoldPriceChart) {
                window.GoldPriceChart.initializeGoldPriceChart();
            } else if (typeof initializeGoldPriceChart === 'function') {
                initializeGoldPriceChart();
            }
        }, 100);
    }
};

// Register component
if (window.Components) {
    window.Components.ChartCard = ChartCardComponent;
}

