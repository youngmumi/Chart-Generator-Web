let chartData = {
    labels: [],
    datasets: [{
        label: '# of Values',
        data: [],
        backgroundColor: [
            'rgba(255,179,186, 0.5)',
            'rgba(186,225,255, 0.5)',
            'rgba(255,255,186, 0.5)',
            'rgba(186,255,201, 0.5)',
            'rgba(241,203,255, 0.5)',
            'rgba(255,211,182, 0.5)',
            'rgba(255,252,236, 0.5)'
        ],
        borderColor: [
            'rgba(255,179,186, 1)',
            'rgba(186,225,255, 1)',
            'rgba(255,255,186, 1)',
            'rgba(186,255,201, 1)',
            'rgba(241,203,255, 1)',
            'rgba(255,211,182, 1)',
            'rgba(255,252,236, 1)'
        ],
        borderWidth: 1
    }]
};

function downloadChart() {
    const canvas = document.getElementById('myChart');
    const format = document.getElementById('imageFormat').value;
    const validFormats = ['png', 'jpeg'];

    if (!validFormats.includes(format)) {
        alert('Invalid format selected!');
        return;
    }

    if (canvas) {
        const now = new Date();
        const timestamp = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
        const extension = format === 'jpeg' ? 'jpg' : format;
        const link = document.createElement('a');
        link.download = `chart_${timestamp}.${extension}`;
        link.href = canvas.toDataURL(`image/${format}`, 1.0);
        link.click();
    } else {
        alert('No chart available to download.');
    }
}



function createChart(type, height = 400) {
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.innerHTML = `<canvas id="myChart"></canvas>`;
    canvasContainer.style.height = `${height}px`;

    const ctx = document.getElementById('myChart').getContext('2d');
    return new Chart(ctx, {
        type: type,
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: (event, activeElements) => {
                if (activeElements.length > 0) {
                    const { datasetIndex, index } = activeElements[0];
                    removeData(datasetIndex, index);
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            }
        }
    });

}

let myChart = createChart('bar'); // Create initial chart with default height = 400

function addData() {
    const labelInput = document.getElementById('labelInput');
    const dataInput = document.getElementById('dataInput');

    if (labelInput.value && dataInput.value) {
        chartData.labels.push(labelInput.value);
        chartData.datasets.forEach((dataset) => {
            dataset.data.push(dataInput.value);
        });
        myChart.update();
        labelInput.value = '';
        dataInput.value = '';
    }

}

function updateChartType() {
    const selectedType = document.getElementById('chartType').value;
    myChart.destroy(); // Destroy the old chart
    myChart = createChart(selectedType);
}

function removeData(datasetIndex, index) {
    if (chartData.labels.length > index) {
        chartData.labels.splice(index, 1);
        chartData.datasets[datasetIndex].data.splice(index, 1);
        myChart.update();
    }
}