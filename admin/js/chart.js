/* ============================================
   GOLD PRICE CHART - Chart.js Implementation
   ============================================ */

// Chart instance variable
let goldPriceChart = null;

// Mock data for different time periods
const chartData = {
    '1D': {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        prices: [77.5, 77.8, 78.2, 78.5, 78.8, 79.0, 79.2],
        currentPrice: 79.2,
        change: 2.3
    },
    '7D': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        prices: [75.0, 75.5, 76.2, 76.8, 77.5, 78.0, 79.2],
        currentPrice: 79.2,
        change: 5.6
    },
    '1M': {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        prices: [72.0, 74.5, 76.8, 79.2],
        currentPrice: 79.2,
        change: 10.0
    },
    '6M': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        prices: [65.0, 68.0, 70.0, 72.0, 75.0, 79.0],
        currentPrice: 79.0,
        change: 21.5
    },
    '1Y': {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        prices: [60.0, 65.0, 70.0, 79.0],
        currentPrice: 79.0,
        change: 31.7
    }
};

// Initialize chart when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeGoldPriceChart();
    setupChartFilters();
});

/**
 * Initialize the Gold Price Chart with Chart.js
 */
function initializeGoldPriceChart() {
    const ctx = document.getElementById('goldPriceChart');
    
    if (!ctx) {
        console.error('Chart canvas not found');
        return;
    }

    // Get initial data (6M default)
    const initialData = chartData['6M'];

    // Chart.js configuration
    const config = {
        type: 'line',
        data: {
            labels: initialData.labels,
            datasets: [{
                label: 'Gold Price ($/g)',
                data: initialData.prices,
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#22c55e',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 2,
                pointBackgroundColor: '#22c55e',
                pointBorderColor: '#22c55e',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(26, 31, 46, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#B8BDC7',
                    borderColor: 'rgba(34, 197, 94, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 13
                    },
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            return `Price: $${context.parsed.y.toFixed(2)}/g`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        padding: 10
                    }
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false,
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        padding: 10,
                        callback: function(value) {
                            return value + 'g';
                        }
                    }
                }
            },
            elements: {
                line: {
                    borderCapStyle: 'round',
                    borderJoinStyle: 'round'
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    };

    // Create chart instance
    goldPriceChart = new Chart(ctx, config);

    // Update chart stats
    updateChartStats('6M');
}

/**
 * Setup chart filter buttons
 */
function setupChartFilters() {
    const filterButtons = document.querySelectorAll('.chart-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update chart data
            updateChartData(period);
        });
    });
}

/**
 * Update chart data based on selected period
 */
function updateChartData(period) {
    if (!goldPriceChart || !chartData[period]) {
        return;
    }

    const data = chartData[period];

    // Update chart data
    goldPriceChart.data.labels = data.labels;
    goldPriceChart.data.datasets[0].data = data.prices;

    // Update Y-axis scale based on data range
    const minPrice = Math.min(...data.prices);
    const maxPrice = Math.max(...data.prices);
    const padding = (maxPrice - minPrice) * 0.2;

    goldPriceChart.options.scales.y.min = Math.max(0, minPrice - padding);
    goldPriceChart.options.scales.y.max = maxPrice + padding;

    // Animate chart update
    goldPriceChart.update('active');

    // Update chart stats
    updateChartStats(period);
}

/**
 * Update chart statistics display
 */
function updateChartStats(period) {
    const data = chartData[period];
    if (!data) return;

    // Update current price
    const currentPriceElement = document.querySelector('.chart-stat-item .stat-value');
    if (currentPriceElement && currentPriceElement.textContent.includes('$')) {
        currentPriceElement.textContent = `$${data.currentPrice.toFixed(1)}/g`;
    }

    // Update 24H change (or period change)
    const changeElements = document.querySelectorAll('.chart-stat-item .stat-value.positive');
    if (changeElements.length > 0) {
        const changeElement = Array.from(changeElements).find(el => el.textContent.includes('%'));
        if (changeElement) {
            const changeText = data.change > 0 ? '+' : '';
            changeElement.innerHTML = `<i class="fas fa-arrow-up"></i> ${changeText}${data.change.toFixed(1)}%`;
        }
    }

    // Update subtitle percentage if exists
    const subtitleElement = document.querySelector('.card-subtitle .price-increase');
    if (subtitleElement) {
        const periodText = period === '1D' ? 'today' : 
                          period === '7D' ? 'this week' :
                          period === '1M' ? 'this month' :
                          period === '6M' ? 'this month' : 'this year';
        subtitleElement.innerHTML = `<i class="fas fa-arrow-up"></i> ${data.change.toFixed(2)}% Increase ${periodText}`;
    }
}

/**
 * Add gradient fill to chart area
 */
function addGradientFill(chart) {
    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
    gradient.addColorStop(1, 'rgba(34, 197, 94, 0.01)');
    
    return gradient;
}

/**
 * Highlight specific point on chart (e.g., April point showing $72/g)
 */
function highlightChartPoint(chart, index) {
    if (!chart || !chart.data.datasets[0].data[index]) {
        return;
    }

    // Add point at specific index
    const originalPointRadius = chart.data.datasets[0].pointRadius;
    chart.data.datasets[0].pointRadius = new Array(chart.data.labels.length).fill(0);
    chart.data.datasets[0].pointRadius[index] = 6;
    
    chart.update();
}

// Export functions for external use
window.GoldPriceChart = {
    updatePeriod: updateChartData,
    highlightPoint: highlightChartPoint,
    getChart: function() {
        return goldPriceChart;
    }
};

