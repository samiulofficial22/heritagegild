/* ============================================
   GOLD PRICE CHART - Chart.js Implementation
   ============================================ */

// Chart instance variable
let goldPriceChart = null;
let currentPeriod = '6M';

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
        prices: [25.0, 100.0, 95.0, 130.0, 160.0, 170.0],
        currentPrice: 79.0,
        change: 21.5,
        highlightIndex: 3, // April index
        highlightPrice: 72.0
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
                borderColor: '#ffffff',
                backgroundColor: 'transparent',
                borderWidth: 2,
                fill: false,
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
                    beginAtZero: true,
                    min: 0,
                    max: 200,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false,
                        lineWidth: 1
                    },
                    ticks: {
                        stepSize: 50,
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

    // Add plugin for vertical line at April
    const verticalLinePlugin = {
        id: 'verticalLine',
        afterDraw: (chart) => {
            if (currentPeriod !== '6M') return;
            
            const data = chartData['6M'];
            if (data.highlightIndex !== undefined) {
                const ctx = chart.ctx;
                const xAxis = chart.scales.x;
                const yAxis = chart.scales.y;
                
                // Calculate x position for April (index 3)
                const xPos = xAxis.getPixelForValue(data.highlightIndex);
                
                // Draw vertical dashed line
                ctx.save();
                ctx.strokeStyle = '#22c55e';
                ctx.lineWidth = 1;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.moveTo(xPos, yAxis.top);
                ctx.lineTo(xPos, yAxis.bottom);
                ctx.stroke();
                ctx.restore();
                
                // Draw green dot at intersection
                const yPos = yAxis.getPixelForValue(data.highlightPrice || data.prices[data.highlightIndex]);
                ctx.save();
                ctx.fillStyle = '#22c55e';
                ctx.beginPath();
                ctx.arc(xPos, yPos, 4, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
                
                // Draw tooltip box
                const tooltipX = xPos + 10;
                const tooltipY = yPos - 30;
                const tooltipText = `$${data.highlightPrice || data.prices[data.highlightIndex]}/g`;
                
                ctx.save();
                ctx.font = '500 12px Poppins, sans-serif';
                const tooltipWidth = ctx.measureText(tooltipText).width + 40;
                const tooltipHeight = 28;
                const tooltipPadding = 8;
                
                // Draw rounded rectangle manually
                const radius = 4;
                ctx.fillStyle = 'rgba(30, 29, 28, 0.95)';
                ctx.strokeStyle = '#22c55e';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(tooltipX + radius, tooltipY - tooltipHeight);
                ctx.lineTo(tooltipX + tooltipWidth - radius, tooltipY - tooltipHeight);
                ctx.quadraticCurveTo(tooltipX + tooltipWidth, tooltipY - tooltipHeight, tooltipX + tooltipWidth, tooltipY - tooltipHeight + radius);
                ctx.lineTo(tooltipX + tooltipWidth, tooltipY - radius);
                ctx.quadraticCurveTo(tooltipX + tooltipWidth, tooltipY, tooltipX + tooltipWidth - radius, tooltipY);
                ctx.lineTo(tooltipX + radius, tooltipY);
                ctx.quadraticCurveTo(tooltipX, tooltipY, tooltipX, tooltipY - radius);
                ctx.lineTo(tooltipX, tooltipY - tooltipHeight + radius);
                ctx.quadraticCurveTo(tooltipX, tooltipY - tooltipHeight, tooltipX + radius, tooltipY - tooltipHeight);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                
                // Draw arrow icon (using Unicode arrow)
                ctx.fillStyle = '#22c55e';
                ctx.font = 'bold 12px Arial';
                ctx.fillText('↑', tooltipX + tooltipPadding, tooltipY - 12);
                
                // Draw text
                ctx.fillStyle = '#ffffff';
                ctx.font = '500 12px Poppins, sans-serif';
                ctx.fillText(tooltipText, tooltipX + tooltipPadding + 15, tooltipY - 10);
                ctx.restore();
            }
        }
    };

    // Register plugin
    Chart.register(verticalLinePlugin);

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

    currentPeriod = period;
    const data = chartData[period];

    // Update chart data
    goldPriceChart.data.labels = data.labels;
    goldPriceChart.data.datasets[0].data = data.prices;

    // For 6M period, use fixed Y-axis scale (0-200)
    if (period === '6M') {
        goldPriceChart.options.scales.y.min = 0;
        goldPriceChart.options.scales.y.max = 200;
        goldPriceChart.options.scales.y.ticks.stepSize = 50;
    } else {
        // Update Y-axis scale based on data range for other periods
        const minPrice = Math.min(...data.prices);
        const maxPrice = Math.max(...data.prices);
        const padding = (maxPrice - minPrice) * 0.2;

        goldPriceChart.options.scales.y.min = Math.max(0, minPrice - padding);
        goldPriceChart.options.scales.y.max = maxPrice + padding;
        goldPriceChart.options.scales.y.ticks.stepSize = undefined;
    }

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

