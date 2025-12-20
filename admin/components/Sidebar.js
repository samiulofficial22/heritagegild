/* ============================================
   SIDEBAR COMPONENT
   ============================================ */

const SidebarComponent = {
    template: 'components/templates/sidebar.html',
    templateContent: null,

    menuItems: [
        { icon: 'fa-home', label: 'Dashboard', page: 'dashboard', active: true },
        {
            icon: 'fa-chart-line',
            label: 'Trading Terminal',
            dropdown: [
                { label: 'Live Trades', href: '#' },
                { label: 'Buy History', href: '#' },
                { label: 'Sell History', href: '#' }
            ]
        },
        {
            icon: 'fa-wallet',
            label: 'Fundings',
            dropdown: [
                { label: 'Deposit Funds', href: '#' },
                { label: 'Withdraw Funds', href: '#' },
                { label: 'Transfer Funds', href: '#' },
                { label: 'Charity Funds', href: '#' }
            ]
        },
        { icon: 'fa-piggy-bank', label: 'Provident History', page: 'provident' },
        { icon: 'fa-exchange-alt', label: 'Transactions History', page: 'transactions' },
        { icon: 'fa-briefcase', label: 'Investment', page: 'investment' },
        { icon: 'fa-coins', label: 'HTG Coin Staking', page: 'staking' },
        { icon: 'fa-gift', label: 'Promotion', page: 'promotion' },
        { icon: 'fa-users', label: 'Generation', page: 'generation' },
        { icon: 'fa-user-plus', label: 'Direct Referral', page: 'referral' },
        { icon: 'fa-chart-bar', label: 'Total Sales', page: 'sales' },
        { icon: 'fa-users-cog', label: 'All Active Member', page: 'members' }
    ],

    render(data = {}) {
        const items = data.menuItems || this.menuItems;
        
        return `
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <a href="index.html" class="sidebar-logo">
                        <img src="assets/logo.svg" alt="HeritageGild Logo" class="logo-img">
                        <span class="logo-text">HeritageGild</span>
                    </a>
                    <button class="sidebar-collapse-btn" id="sidebarCollapseBtn" title="Collapse sidebar">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                </div>
                
                <nav class="sidebar-nav">
                    <ul class="nav-menu">
                        ${items.map(item => this.renderMenuItem(item)).join('')}
                    </ul>
                </nav>
            </aside>
        `;
    },

    renderMenuItem(item) {
        if (item.dropdown) {
            return `
                <li class="nav-item has-dropdown">
                    <a href="#" class="nav-link ${item.active ? 'active' : ''}" 
                       data-toggle="dropdown" 
                       data-tooltip="${item.label}">
                        <i class="fas ${item.icon}"></i>
                        <span>${item.label}</span>
                        <i class="fas fa-chevron-down dropdown-arrow"></i>
                    </a>
                    <ul class="nav-dropdown">
                        ${item.dropdown.map(subItem => `
                            <li><a href="${subItem.href}" class="dropdown-link">${subItem.label}</a></li>
                        `).join('')}
                    </ul>
                </li>
            `;
        }

        return `
            <li class="nav-item">
                <a href="#" class="nav-link ${item.active ? 'active' : ''}" 
                   data-page="${item.page || ''}" 
                   data-tooltip="${item.label}">
                    <i class="fas ${item.icon}"></i>
                    <span>${item.label}</span>
                </a>
            </li>
        `;
    },

    init(container, data) {
        // Initialize sidebar functionality
        if (window.DashboardUI && window.DashboardUI.initializeSidebar) {
            window.DashboardUI.initializeSidebar();
        }
    }
};

// Register component
if (window.Components) {
    window.Components.Sidebar = SidebarComponent;
}

