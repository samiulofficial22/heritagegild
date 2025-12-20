# Component-Based Architecture

This admin dashboard has been refactored into reusable components for better maintainability and reusability.

## Component Structure

```
admin/
├── components/
│   ├── Sidebar.js          # Sidebar navigation component
│   ├── Header.js           # Top header bar component
│   ├── StatCard.js         # Statistics card component
│   ├── TransactionList.js  # Transaction list component
│   ├── ChartCard.js        # Chart card component
│   ├── RankTable.js        # Rank table component
│   └── ComponentLoader.js  # Component loader system
├── js/
│   ├── components.js       # Component registry
│   ├── app.js             # Main app initializer
│   ├── ui.js              # UI interactions
│   └── chart.js           # Chart logic
└── index-component-based.html  # Component-based version
```

## Usage

### Basic Component Usage

Each component follows this pattern:

```javascript
const ComponentName = {
    render(data = {}) {
        // Returns HTML string
        return `<div>...</div>`;
    },
    
    init(container, data) {
        // Initialize component after rendering
    }
};
```

### Rendering a Component

```javascript
// Render sidebar
const sidebarHtml = Components.Sidebar.render();
document.getElementById('sidebarContainer').innerHTML = sidebarHtml;
Components.Sidebar.init(document.getElementById('sidebarContainer'));

// Render stat card
const statCardHtml = Components.StatCard.render({
    title: 'Total Investment',
    value: '$25,000.00 USD',
    change: '+$200.00',
    changeType: 'positive'
});
```

## Available Components

### 1. Sidebar Component
- **File**: `components/Sidebar.js`
- **Usage**: Navigation sidebar with menu items
- **Props**: `menuItems` (array of menu items)

### 2. Header Component
- **File**: `components/Header.js`
- **Usage**: Top header bar with market info, referrals, notifications
- **Props**: `pageTitle`, `marketInfo`, `referralInfo`, `userInfo`, `notificationCount`

### 3. StatCard Component
- **File**: `components/StatCard.js`
- **Usage**: Statistics display card
- **Props**: `title`, `value`, `subtitle`, `change`, `changeType`

### 4. TransactionList Component
- **File**: `components/TransactionList.js`
- **Usage**: List of transactions with filters
- **Props**: `title`, `subtitle`, `transactions`, `filters`

### 5. ChartCard Component
- **File**: `components/ChartCard.js`
- **Usage**: Chart card with filters and stats
- **Props**: `title`, `subtitle`, `chartId`, `periods`, `defaultPeriod`, `stats`

### 6. RankTable Component
- **File**: `components/RankTable.js`
- **Usage**: Rank journey table
- **Props**: `title`, `ranks`

## Example: Creating a New Page

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="sidebarContainer"></div>
    <div class="main-wrapper">
        <div id="headerContainer"></div>
        <main class="main-content">
            <div id="statsContainer"></div>
        </main>
    </div>

    <script src="js/components.js"></script>
    <script src="components/Sidebar.js"></script>
    <script src="components/Header.js"></script>
    <script src="components/StatCard.js"></script>
    
    <script>
        // Render components
        document.getElementById('sidebarContainer').innerHTML = 
            Components.Sidebar.render();
        
        document.getElementById('headerContainer').innerHTML = 
            Components.Header.render({ pageTitle: 'My Page' });
        
        const stats = [
            { title: 'Stat 1', value: '100' },
            { title: 'Stat 2', value: '200' }
        ];
        
        document.getElementById('statsContainer').innerHTML = 
            stats.map(stat => Components.StatCard.render(stat)).join('');
    </script>
</body>
</html>
```

## Benefits

1. **Reusability**: Components can be used across multiple pages
2. **Maintainability**: Changes to a component affect all instances
3. **Modularity**: Each component is self-contained
4. **Testability**: Components can be tested independently
5. **Scalability**: Easy to add new components

## Migration from Original

The original `index.html` remains unchanged. The component-based version is available as `index-component-based.html`.

To migrate:
1. Use `index-component-based.html` as a template
2. Replace static HTML with component containers
3. Initialize components in `app.js` or inline scripts

