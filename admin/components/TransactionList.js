/* ============================================
   TRANSACTION LIST COMPONENT
   ============================================ */

const TransactionListComponent = {
    defaultTransactions: [
        { type: 'Gold Buy', date: 'Oct 9, 2025', status: 'complete', amount: '$250.00', icon: 'fa-dollar-sign' },
        { type: 'Gold Buy', date: 'Oct 9, 2025', status: 'complete', amount: '$250.00', icon: 'fa-dollar-sign' },
        { type: 'Gold Buy', date: 'Oct 9, 2025', status: 'complete', amount: '$250.00', icon: 'fa-dollar-sign' }
    ],

    render(data = {}) {
        const transactions = data.transactions || this.defaultTransactions;
        const title = data.title || 'Recent Transactions';
        const subtitle = data.subtitle || 'Track your latest deposits, withdrawals & earnings.';
        const filters = data.filters || ['This Week', 'This Month', 'All'];

        return `
            <div class="content-card">
                <div class="card-header">
                    <div class="card-header-content">
                        <h3 class="card-title">${title}</h3>
                        <p class="card-subtitle">${subtitle}</p>
                    </div>
                </div>
                <div class="card-body">
                    <div class="transaction-filters">
                        ${filters.map((filter, index) => `
                            ${index === filters.length - 1 ? `
                                <div class="dropdown">
                                    <button class="filter-btn dropdown-toggle ${index === 0 ? 'active' : ''}" 
                                            data-bs-toggle="dropdown" 
                                            data-filter="${filter.toLowerCase().replace(' ', '-')}">
                                        ${filter}
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">All</a></li>
                                        <li><a class="dropdown-item" href="#">Deposits</a></li>
                                        <li><a class="dropdown-item" href="#">Withdrawals</a></li>
                                        <li><a class="dropdown-item" href="#">Earnings</a></li>
                                    </ul>
                                </div>
                            ` : `
                                <button class="filter-btn ${index === 0 ? 'active' : ''}" 
                                        data-filter="${filter.toLowerCase().replace(' ', '-')}">
                                    ${filter}
                                </button>
                            `}
                        `).join('')}
                    </div>
                    
                    <div class="transactions-list" id="transactionsList">
                        ${transactions.map(transaction => this.renderTransaction(transaction)).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    renderTransaction(transaction) {
        const statusClass = transaction.status === 'complete' ? 'status-complete' : 
                           transaction.status === 'pending' ? 'status-pending' : '';
        const statusText = transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1);

        return `
            <div class="transaction-item">
                <div class="transaction-icon">
                    <i class="fas ${transaction.icon || 'fa-dollar-sign'}"></i>
                </div>
                <div class="transaction-details">
                    <div class="transaction-type">${transaction.type}</div>
                    <div class="transaction-date">${transaction.date}</div>
                </div>
                <div class="transaction-status">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
                <div class="transaction-amount">${transaction.amount}</div>
            </div>
        `;
    },

    init(container, data) {
        // Initialize transaction filters
        if (window.DashboardUI && window.DashboardUI.initializeTransactionFilters) {
            window.DashboardUI.initializeTransactionFilters();
        }
    }
};

// Register component
if (window.Components) {
    window.Components.TransactionList = TransactionListComponent;
}

