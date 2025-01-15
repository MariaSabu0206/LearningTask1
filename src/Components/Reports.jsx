import React, { useState } from 'react';
import '../CSS/Reports.css'; 
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import mockData from './Data';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement, 
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement 
);

const Reports = () => {

    const [startDate, setStartDate] = useState(new Date()); 
    const [endDate, setEndDate] = useState(new Date());
    const handleStartDateChange = (date) => setStartDate(date);
    const handleEndDateChange = (date) => setEndDate(date);
  
  
  const barChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'User Growth',
        data: mockData.userGrowth,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

 
  const pieChartData = {
    labels: mockData.categories,
    datasets: [
      {
        label: 'Category Distribution',
        data: mockData.categoryDistribution,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  
  const lineChartData = {
    labels: mockData.revenueLabels,
    datasets: [
      {
        label: 'Monthly Revenue ($)',
        data: mockData.revenueData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  
  const doughnutChartData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        label: 'User Activity',
        data: [mockData.activeUsers, mockData.inactiveUsers],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="reports-container">
      <h2 className="reports-title">Reports</h2>

     
      <div className="filters-section">
        <h5 className="filters-title">Filters</h5>
        <div className="d-flex">
        <div className="date-picker">
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd-MM-yyyy"
          />
        </div>
        <div className="date-picker">
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="dd-MM-yyyy"
          />
        </div>
        </div>
      </div>

      <div className="metrics-section">
        <div className="metric">
          <h3>Total Users</h3>
          <p>{mockData.totalUsers}</p>
        </div>
        <div className="metric">
          <h3>Active Users</h3>
          <p>{mockData.activeUsers}</p>
        </div>
        <div className="metric">
          <h3>Inactive Users</h3>
          <p>{mockData.inactiveUsers}</p>
        </div>
      </div>

    
      <div className="d-flex">
      <div className="chart-section">
        <h3 className="chart-title">User Growth Over Time</h3>
        <div className="chart-wrapper">
          <Bar className='bargraph'
            data={barChartData}
            options={{ responsive: true }}
          />
        </div>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">Monthly Revenue</h3>
        <div className="chart-wrapper">
          <Line className='linegraph' data={lineChartData} options={{ responsive: true }} />
        </div>
      </div>
      </div>
      <div className='d-flex'>
      <div className="chart-section">
        <h3 className="chart-title">User Activity Distribution</h3>
        <div className="chart-wrapper">
          <Doughnut className='doughnutgraph' data={doughnutChartData} options={{ responsive: true }} />
        </div>
      </div>

      
      <div className="chart-section">
        <h3 className="chart-title">Category Distribution</h3>
        <div className="chart-wrapper">
          <Pie className='piechart' data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>
      </div>

      <div className="table-section">
        <h3 className="table-title">Category Details</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{width:"50%",textAlign:"center"}}>Category</th>
              <th style={{textAlign:"center"}}>Percentage (%)</th>
            </tr>
          </thead>
          <tbody>
            {mockData.categories.map((category, index) => (
              <tr key={index}>
                <td style={{textAlign:"center"}}>{category}</td>
                <td style={{textAlign:"center"}}>{mockData.categoryDistribution[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
