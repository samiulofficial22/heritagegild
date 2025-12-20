/* ============================================
   COMPONENTS INDEX
   Loads all components
   ============================================ */

// Load component loader first
importScripts('components/ComponentLoader.js');

// Load all components
importScripts('components/Sidebar.js');
importScripts('components/Header.js');
importScripts('components/StatCard.js');
importScripts('components/TransactionList.js');
importScripts('components/ChartCard.js');
importScripts('components/RankTable.js');

// Export for use
window.Components = {
    Sidebar: SidebarComponent,
    Header: HeaderComponent,
    StatCard: StatCardComponent,
    TransactionList: TransactionListComponent,
    ChartCard: ChartCardComponent,
    RankTable: RankTableComponent
};

