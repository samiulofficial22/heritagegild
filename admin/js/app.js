/* ============================================
   MAIN APPLICATION INITIALIZER
   ============================================ */

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for components to load
    setTimeout(() => {
        initializeDashboard();
    }, 100);
});

/**
 * Initialize the dashboard with components
 */
function initializeDashboard() {
    // Dashboard data
    const dashboardData = {
        // Header data
        header: {
            pageTitle: 'Dashboard',
            marketInfo: {
                label: 'Gold',
                price: '$120/GM',
                change: '+0.35%',
                changeType: 'positive',
                details: 'Market Info 24K 99.9% Purity'
            },
            referralInfo: {
                count: 32,
                avatarCount: 3
            },
            userInfo: {
                initial: 'A'
            },
            notificationCount: 0
        },

        // Stats cards data
        stats: [
            {
                title: 'Total Investment',
                value: '$25,000.00 USD',
                change: '$200.00 invest in last week',
                changeType: 'positive'
            },
            {
                title: 'Gold Balance',
                value: '150g',
                subtitle: 'Total gold holding'
            },
            {
                title: 'Monthly ROI',
                value: '12.5%',
                subtitle: 'Current month return'
            },
            {
                title: 'Referral Income',
                value: '$3,250',
                subtitle: 'Earnings from referrals'
            }
        ],

        // Transactions data
        transactions: {
            title: 'Recent Transactions',
            subtitle: 'Track your latest deposits, withdrawals & earnings.',
            transactions: [
                { type: 'Gold Buy', date: 'Oct 9, 2025', status: 'complete', amount: '$250.00', icon: 'fa-dollar-sign' },
                { type: 'Gold Buy', date: 'Oct 9, 2025', status: 'complete', amount: '$250.00', icon: 'fa-dollar-sign' },
                { type: 'Gold Buy', date: 'Oct 9, 2025', status: 'complete', amount: '$250.00', icon: 'fa-dollar-sign' }
            ]
        },

        // Chart data
        chart: {
            title: 'Gold Price',
            subtitle: '<span class="price-increase positive"><i class="fas fa-arrow-up"></i> 9.72% Increase this month</span>',
            chartId: 'goldPriceChart',
            defaultPeriod: '6M'
        },

        // Rank table data
        rankTable: {
            title: 'Your Rank Journey',
            ranks: [
                { stars: 1, name: '1 Star', requirement: '5gm Deposit + 5 Active', reward: '1.5g', salary: '1.5g', status: 'active' },
                { stars: 2, name: '2 Star', requirement: '10gm + 10 Active', reward: '2g', salary: '2g', status: 'locked' },
                { stars: 3, name: '3 Star', requirement: '20gm + 15 Active', reward: '3g', salary: '3g', status: 'locked' },
                { stars: 4, name: '4 Star', requirement: '30gm + 20 Active', reward: '4g', salary: '4g', status: 'locked' }
            ]
        }
    };

    // Render sidebar
    if (window.Components && window.Components.Sidebar) {
        const sidebarHtml = window.Components.Sidebar.render();
        const sidebarContainer = document.getElementById('sidebarContainer');
        if (sidebarContainer) {
            sidebarContainer.innerHTML = sidebarHtml;
            window.Components.Sidebar.init(sidebarContainer);
        }
    }

    // Render header
    if (window.Components && window.Components.Header) {
        const headerHtml = window.Components.Header.render(dashboardData.header);
        const headerContainer = document.getElementById('headerContainer');
        if (headerContainer) {
            headerContainer.innerHTML = headerHtml;
            window.Components.Header.init(headerContainer, dashboardData.header);
        }
    }

    // Render stat cards
    if (window.Components && window.Components.StatCard) {
        const statsContainer = document.getElementById('statsContainer');
        if (statsContainer) {
            const statsHtml = dashboardData.stats.map(stat => 
                window.Components.StatCard.render(stat)
            ).join('');
            statsContainer.innerHTML = statsHtml;
        }
    }

    // Render transaction list
    if (window.Components && window.Components.TransactionList) {
        const transactionsHtml = window.Components.TransactionList.render(dashboardData.transactions);
        const transactionsContainer = document.getElementById('transactionsContainer');
        if (transactionsContainer) {
            transactionsContainer.innerHTML = transactionsHtml;
            window.Components.TransactionList.init(transactionsContainer, dashboardData.transactions);
        }
    }

    // Render chart card
    if (window.Components && window.Components.ChartCard) {
        const chartHtml = window.Components.ChartCard.render(dashboardData.chart);
        const chartContainer = document.getElementById('chartContainer');
        if (chartContainer) {
            chartContainer.innerHTML = chartHtml;
            window.Components.ChartCard.init(chartContainer, dashboardData.chart);
        }
    }

    // Render rank table
    if (window.Components && window.Components.RankTable) {
        const rankTableHtml = window.Components.RankTable.render(dashboardData.rankTable);
        const rankTableContainer = document.getElementById('rankTableContainer');
        if (rankTableContainer) {
            rankTableContainer.innerHTML = rankTableHtml;
        }
    }

    // Initialize UI interactions
    if (window.DashboardUI) {
        window.DashboardUI.initializeSidebar();
        window.DashboardUI.initializeUserDropdown();
        window.DashboardUI.initializeTransactionFilters();
    }
}

