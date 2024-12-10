// components/SplineAreaChart.js

import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const SplineAreaChart = () => {
  const [filter, setFilter] = useState('months');

  const data = {
    days: [30, 40, 25, 50, 49, 21, 70, 51, 60, 70, 80, 90],
    months: [300, 400, 250, 500, 490, 210, 700, 510, 600],
    years: [3000, 4000, 2500, 5000, 4900, 2100, 7000, 5100, 6000],
  };

  const categories = {
    days: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    years: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
  };

  const series = [{
    name: 'Series 1',
    data: data[filter]
  }];

  const options = {
    chart: {
      type: 'area',
      height: 500,
      zoom: {
        enabled: false
      }
    },  
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: categories[filter],
      title: {
        text: `${filter.charAt(0).toUpperCase() + filter.slice(1)}`,
        style: {
          fontSize: '25px',
          fontWeight: 600,
          fontFamily: "Poppins, sans-serif",
          textTransfrom: 'uppercase',
        },
      }
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return `$${val}`;
        },
        style: {
          fontSize: '12px',
        },
      },
      title: {
        text: 'Revenue',
        style: {
          fontSize: '25px',
          fontWeight: 600,
          fontFamily: "Poppins, sans-serif",
          textTransfrom: 'uppercase',
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <div className='flex justify-between mb-10'>
        <h2 className='uppercase text-3xl text-[#333333] font-bold'>Users Per Months</h2>
        <select className='w-[150px] border-2 border-[#B7B7B7] rounded-md p-2 text-[#223575] font-md' value={filter} onChange={handleFilterChange}>
          <option value="days">Days</option>
          <option value="months">Months</option>
          <option value="years">Years</option>
        </select>
      </div>
      <Chart options={options} series={series} type="area" height={500} />
    </div>
  );
};

export default SplineAreaChart;
