import Chart from "chart.js/auto";

const renderChart = (albumTracks, chartData, attribute) => {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: albumTracks.map(row => row.name),
            datasets: [
                { label: `${attribute}`, data: chartData.map(row => row.attribute) }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            backgroundColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.2)`,
            borderColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`,
        }
    });
};

export default renderChart