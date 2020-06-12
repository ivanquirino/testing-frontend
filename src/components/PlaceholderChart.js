import React from 'react';
import { Line } from 'react-chartjs-2';

const PlaceholderChart = () => {
  const DATA = {
    labels: ['--:--', '--:--'],
    datasets: [
      {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        borderColor: '#a5a19e',
        pointRadius: 1,
        borderWidth: 2,
        order: 0,
        lineTension: 0.2,
        label: '...',
        data: [0, 3],
      },
      {
        borderColor: '#a5a19e',
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
        lineTension: 0.1,
        label: '...',
        data: [0, 6],
      },
      {
        borderColor: '#dbdbdb',
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
        lineTension: 0.1,
        label: '...',
        data: [0, 9],
      },
    ],
  };

  return (
    <div data-testid="placeholder-chart">
      <Line data={DATA} data-testid="orders-time-chart" />
    </div>
  )
};

export default PlaceholderChart;
