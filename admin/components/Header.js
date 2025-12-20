/* ============================================
   HEADER COMPONENT
   ============================================ */

const HeaderComponent = {
    render(data = {}) {
        const marketInfo = data.marketInfo || {
            label: 'Gold',
            price: '$120/GM',
            change: '+0.35%',
            changeType: 'positive',
            details: 'Market Info 24K 99.9% Purity'
        };

        const referralInfo = data.referralInfo || {
            count: 32,
            avatarCount: 3
        };

        const userInfo = data.userInfo || {
            initial: 'A'
        };

        return `
            <header class="top-header">
                <div class="header-left">
                    <button class="sidebar-toggle" id="sidebarToggle">
                        <i class="fas fa-bars"></i>
                    </button>
                    <h1 class="page-title">${data.pageTitle || 'Dashboard'}</h1>
                </div>
                
                <div class="header-right">
                    <!-- Market Info Section -->
                    <div class="market-info">
                        <div class="market-price">
                            <span class="price-label">${marketInfo.label}</span>
                            <span class="price-value">${marketInfo.price}</span>
                            <span class="price-change ${marketInfo.changeType}">${marketInfo.change}</span>
                        </div>
                        <div class="market-details">
                            <span class="market-text">${marketInfo.details}</span>
                            <button class="btn btn-sm btn-buy-sell">Buy & Sell</button>
                        </div>
                    </div>
                    
                    <!-- Referral Section -->
                    <div class="referral-info">
                        <span class="referral-count">${referralInfo.count} referral</span>
                        <div class="referral-avatars">
                            ${Array(referralInfo.avatarCount).fill(0).map(() => `
                                <div class="avatar-circle"></div>
                            `).join('')}
                        </div>
                        <button class="btn btn-sm btn-invite">
                            <i class="fas fa-plus"></i> Invite
                        </button>
                    </div>
                    
                    <!-- Notifications -->
                    <div class="notification-icon-wrapper">
                        <button class="notification-btn" id="notificationBtn">
                            <i class="fas fa-bell"></i>
                            <span class="notification-badge">${data.notificationCount || 0}</span>
                        </button>
                    </div>
                    
                    <!-- User Avatar Dropdown -->
                    <div class="user-dropdown-wrapper">
                        <button class="user-avatar-btn" id="userAvatarBtn">
                            <div class="avatar-circle avatar-large">${userInfo.initial}</div>
                        </button>
                        <div class="user-dropdown" id="userDropdown">
                            <a href="#" class="dropdown-item">
                                <i class="fas fa-user"></i> Profile
                            </a>
                            <a href="#" class="dropdown-item">
                                <i class="fas fa-cog"></i> Settings
                            </a>
                            <hr class="dropdown-divider">
                            <a href="#" class="dropdown-item">
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        `;
    },

    init(container, data) {
        // Initialize header functionality
        if (window.DashboardUI && window.DashboardUI.initializeUserDropdown) {
            window.DashboardUI.initializeUserDropdown();
        }
    }
};

// Register component
if (window.Components) {
    window.Components.Header = HeaderComponent;
}

