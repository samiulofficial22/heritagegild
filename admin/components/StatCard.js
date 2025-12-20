/* ============================================
   STAT CARD COMPONENT
   ============================================ */

const StatCardComponent = {
    render(data = {}) {
        const {
            title = '',
            value = '',
            subtitle = '',
            change = null,
            changeType = 'positive',
            icon = null
        } = data;

        return `
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3 class="stat-title">${title}</h3>
                </div>
                <div class="stat-card-body">
                    <div class="stat-value">${value}</div>
                    <div class="stat-subtitle">
                        ${change ? `
                            <span class="stat-change ${changeType}">
                                <i class="fas fa-arrow-${changeType === 'positive' ? 'up' : 'down'}"></i> ${change}
                            </span>
                        ` : subtitle}
                    </div>
                </div>
            </div>
        `;
    },

    renderMultiple(cards) {
        return cards.map(card => this.render(card)).join('');
    }
};

// Register component
if (window.Components) {
    window.Components.StatCard = StatCardComponent;
}

