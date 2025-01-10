import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../CSS/EarningsChart.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const EarningsAndExpensesChart = () => {
    // Data for the bar chart (earnings and expenses for each month)
    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ], // Months as labels
        datasets: [
            {
                label: 'Earnings', // Label for Earnings
                data: [12000, 15000, 13000, 16000, 14000, 17000, 16000, 18000, 15000, 14000, 17000, 16000], // Earnings data for each month
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for Earnings
                borderColor: 'rgba(75, 192, 192, 1)', // Border color for Earnings
                borderWidth: 1,
            },
            {
                label: 'Expenses', // Label for Expenses
                data: [8000, 10000, 9000, 11000, 9500, 12000, 11500, 12500, 11000, 10500, 11500, 12000], // Expenses data for each month
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color for Expenses
                borderColor: 'rgba(255, 99, 132, 1)', // Border color for Expenses
                borderWidth: 1,
            },
        ],
    };

    // Options for the chart
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "This Year's Earnings and Expenses by Month", // Title of the chart
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month', // X-axis label
                },
                stacked: true, // Stack bars for each month (Earnings and Expenses)
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount ($)', // Y-axis label
                },
                beginAtZero: true, // Start the y-axis at zero
            },
        },
    };

    return (
        <div className="earnings-container">
            <div className='earningdiv'>
               <h3>Earnings & Expenses</h3>
             </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default EarningsAndExpensesChart;
