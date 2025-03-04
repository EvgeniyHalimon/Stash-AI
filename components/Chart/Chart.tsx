'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const data = {
  labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь'],
  datasets: [
    {
      label: 'Продажи',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Статистика продаж' },
  },
  scales: {
    y: { beginAtZero: true },
  },
};

export const Chart = () => {
  return (
    <div className="w-full h-[400px] max-w-[600px] mx-auto bg-white p-4 rounded-xl shadow-md">
      <Line data={data} options={options} height={'300px'} />;
    </div>
  );
};
