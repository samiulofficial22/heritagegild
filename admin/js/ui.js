/* ============================================
   ADMIN DASHBOARD UI INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeDropdowns();
    initializeUserDropdown();
    initializeTransactionFilters();
    initializeNavLinks();
    initializeCurrencyDropdown();
    initializeTableModal();
});

/**
 * Initialize Sidebar Functionality
 */
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
    const mainWrapper = document.querySelector('.main-wrapper');
    const dropdownNavLinks = document.querySelectorAll('.nav-link[data-toggle="dropdown"]');

    // Load saved sidebar state from localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
        sidebar.classList.add('collapsed');
        if (mainWrapper) {
            mainWrapper.classList.add('sidebar-collapsed');
        }
        updateCollapseIcon(true);
    }

    // Auto-generate tooltips for nav links without data-tooltip
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        if (!link.hasAttribute('data-tooltip')) {
            const span = link.querySelector('span');
            if (span) {
                link.setAttribute('data-tooltip', span.textContent.trim());
            }
        }
    });

    // Sidebar collapse/expand toggle (desktop)
    if (sidebarCollapseBtn) {
        sidebarCollapseBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebarCollapse();
        });
    }

    // Sidebar toggle for mobile (show/hide)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 1200) {
            if (!sidebar.contains(event.target) && 
                !sidebarToggle.contains(event.target) && 
                sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Handle dropdown toggles
    dropdownNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const navItem = this.closest('.nav-item');
            const isActive = navItem.classList.contains('active');

            // Close all other dropdowns
            document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
                if (item !== navItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle current dropdown
            navItem.classList.toggle('active');
        });
    });

    // Set active nav link based on current page
    setActiveNavLink();
}

/**
 * Set active navigation link
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link[data-page]');

    navLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        if (currentPage.includes(page) || (page === 'dashboard' && currentPage === 'index.html')) {
            link.classList.add('active');
            // Remove active from other links
            navLinks.forEach(otherLink => {
                if (otherLink !== link) {
                    otherLink.classList.remove('active');
                }
            });
        }
    });
}

/**
 * Initialize Dropdown Menus
 */
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            otherMenu.classList.remove('show');
                        }
                    }
                });

                // Toggle current dropdown
                menu.classList.toggle('show');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.classList.remove('show');
                }
            }
        });
    });
}

/**
 * Initialize User Avatar Dropdown
 */
function initializeUserDropdown() {
    const userAvatarBtn = document.getElementById('userAvatarBtn');
    const userDropdown = document.getElementById('userDropdown');
    const dropdownWrapper = document.querySelector('.user-dropdown-wrapper');

    if (userAvatarBtn && userDropdown) {
        userAvatarBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownWrapper.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!dropdownWrapper.contains(event.target)) {
                dropdownWrapper.classList.remove('active');
            }
        });

        // Close dropdown when clicking on dropdown items
        const dropdownItems = userDropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                dropdownWrapper.classList.remove('active');
            });
        });
    }
}

/**
 * Initialize Transaction Filters
 */
function initializeTransactionFilters() {
    const filterButtons = document.querySelectorAll('.transaction-filters .filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterTransactions(filter);
        });
    });
}

/**
 * Filter transactions based on selected filter
 */
function filterTransactions(filter) {
    const transactionItems = document.querySelectorAll('.transaction-item');
    
    // Mock filtering logic - in real app, this would filter from API/data
    transactionItems.forEach(item => {
        // For demo purposes, show all items
        item.style.display = 'flex';
    });

    // You can add actual filtering logic here based on the filter value
    console.log('Filtering transactions by:', filter);
}

/**
 * Initialize Navigation Links
 */
function initializeNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link[data-page]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });

            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

/**
 * Toggle sidebar collapse state
 */
function toggleSidebarCollapse() {
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.querySelector('.main-wrapper');
    
    if (!sidebar || !mainWrapper) return;

    const isCollapsed = sidebar.classList.contains('collapsed');
    
    if (isCollapsed) {
        sidebar.classList.remove('collapsed');
        mainWrapper.classList.remove('sidebar-collapsed');
        localStorage.setItem('sidebarCollapsed', 'false');
        updateCollapseIcon(false);
    } else {
        sidebar.classList.add('collapsed');
        mainWrapper.classList.add('sidebar-collapsed');
        localStorage.setItem('sidebarCollapsed', 'true');
        updateCollapseIcon(true);
    }
}

/**
 * Update collapse button icon
 */
function updateCollapseIcon(isCollapsed) {
    const collapseBtn = document.getElementById('sidebarCollapseBtn');
    if (collapseBtn) {
        const icon = collapseBtn.querySelector('i');
        if (icon) {
            if (isCollapsed) {
                icon.className = 'fas fa-chevron-right';
                collapseBtn.title = 'Expand sidebar';
            } else {
                icon.className = 'fas fa-chevron-left';
                collapseBtn.title = 'Collapse sidebar';
            }
        }
    }
}

/**
 * Handle window resize for responsive sidebar
 */
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    
    if (window.innerWidth > 1200) {
        sidebar.classList.remove('active');
    } else {
        // On mobile, remove collapsed class if present
        sidebar.classList.remove('collapsed');
        const mainWrapper = document.querySelector('.main-wrapper');
        if (mainWrapper) {
            mainWrapper.classList.remove('sidebar-collapsed');
        }
    }
});

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/**
 * Add loading state to buttons
 */
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    } else {
        button.disabled = false;
        if (button.dataset.originalText) {
            button.textContent = button.dataset.originalText;
        }
    }
}

/**
 * Show notification toast (optional enhancement)
 */
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-tertiary);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Initialize Currency Dropdown
 */
function initializeCurrencyDropdown() {
    const currencyBtn = document.getElementById('currencyDropdownBtn');
    const currencyItems = document.querySelectorAll('.currency-item');
    const currencySearchInput = document.querySelector('.currency-search-input');
    const dropdownMenu = document.querySelector('.currency-dropdown-menu');

    if (!currencyBtn) return;

    // Ensure dropdown menu has highest z-index when shown
    if (currencyBtn && dropdownMenu) {
        currencyBtn.addEventListener('shown.bs.dropdown', function() {
            dropdownMenu.style.zIndex = '999999';
            dropdownMenu.style.position = 'absolute';
        });
        
        currencyBtn.addEventListener('show.bs.dropdown', function() {
            dropdownMenu.style.zIndex = '999999';
            dropdownMenu.style.position = 'absolute';
        });
    }

    // Handle currency selection
    currencyItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const currency = this.getAttribute('data-currency');
            
            // Update button text
            const currencyCode = currencyBtn.querySelector('.currency-code');
            if (currencyCode) {
                currencyCode.textContent = currency;
            }
            
            // Remove active class from all items
            currencyItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to selected item
            this.classList.add('active');
            
            // Update stat value (you can customize this based on currency)
            updateCurrencyValue(currency);
            
            // Close dropdown
            const dropdown = bootstrap.Dropdown.getInstance(currencyBtn);
            if (dropdown) {
                dropdown.hide();
            }
        });
    });

    // Handle search functionality
    if (currencySearchInput) {
        currencySearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            currencyItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const listItem = item.closest('li');
                if (text.includes(searchTerm)) {
                    listItem.style.display = '';
                } else {
                    listItem.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Update currency value (placeholder - implement based on your needs)
 */
function updateCurrencyValue(currency) {
    // This is a placeholder - implement currency conversion logic here
    console.log('Currency changed to:', currency);
    // You can update the stat-value here based on currency conversion
}

/**
 * Initialize Table Selection Dropdown
 */
function initializeTableModal() {
    const menuBtn = document.getElementById('rankTableMenuBtn');
    const tableOptions = document.querySelectorAll('.table-option-item');

    if (!menuBtn) return;

    // Handle table option selection
    tableOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all options
            tableOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            const tableType = this.getAttribute('data-table');
            console.log('Selected table:', tableType);
            
            // Close dropdown after selection
            const dropdown = bootstrap.Dropdown.getInstance(menuBtn);
            if (dropdown) {
                dropdown.hide();
            }
        });
    });
}

// Export functions for external use
window.DashboardUI = {
    showToast: showToast,
    setButtonLoading: setButtonLoading,
    filterTransactions: filterTransactions,
    initializeCurrencyDropdown: initializeCurrencyDropdown,
    initializeTableModal: initializeTableModal
};

