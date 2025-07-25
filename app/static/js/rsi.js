const socket = io();
const charts = {};

function addRSIChart(pair = 'ETH/USDT') {
    const grid = document.querySelector('.rsi-grid');
    const chartId = `rsi-chart-${Date.now()}`;
    const chartContainer = document.createElement('div');
    chartContainer.className = 'rsi-chart-container';
    chartContainer.innerHTML = `
        <canvas id="${chartId}" aria-label="RSI chart for ${pair}"></canvas>
        <button onclick="this.parentElement.remove(); delete charts['${chartId}']">Remove</button>
    `;
    grid.appendChild(chartContainer);

    const ctx = document.getElementById(chartId).getContext('2d');
    charts[chartId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: `RSI ${pair}`,
                data: [],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: 100, title: { display: true, text: 'RSI' } },
                x: { title: { display: true, text: 'Time' } }
            }
        }
    });

    socket.emit('subscribe', pair);
}

socket.on('rsi_update', (data) => {
    const chartId = `rsi-chart-${data.pair.replace('/', '-')}`;
    const chart = charts[chartId];
    if (chart) {
        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.rsi;
        chart.update();
    }
});

// Tự động thêm một biểu đồ khi trang tải
document.addEventListener('DOMContentLoaded', () => {
    addRSIChart();
});