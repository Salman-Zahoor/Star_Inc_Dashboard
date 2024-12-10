// components/LineChart.js
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const LineChart = () => {
  const [timeFrame, setTimeFrame] = useState('days');
  
  const data = {
    days: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    months: [320, 405, 376, 412, 433, 456, 478, 500, 520],
    years: [1000, 2000, 1500, 3000, 2500, 3500, 4000, 4500, 5000]
  };

  const options = {
    chart: {
      id: 'line-chart',
    },
    xaxis: {
      categories: timeFrame === 'days' 
        ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] 
        : timeFrame === 'months' 
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] 
        : ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    },
    yaxis: {
      
    },
    title: {
      text: 'Line Chart',
      align: 'left'
    },
  };

  const series = [
    {
      name: 'Series 1',
      data: data[timeFrame],
    },
  ];

  const handleFilterChange = (e) => {
    setTimeFrame(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h4 className='text-2xl font-bold uppercase'>Statistic</h4>
        <select 
          value={timeFrame} 
          onChange={handleFilterChange} 
          className="border border-gray-300 rounded p-2"
        >
          <option value="days">Day</option>
          <option value="months">This Month</option>
          <option value="years">This Year</option>
        </select>
      </div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChart;
