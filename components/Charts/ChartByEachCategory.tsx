'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';
import DashboardContext from '@/shared/DashboardContext';
import { useContext, useMemo } from 'react';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;

export const ChartByEachCategory = () => {
  const { goods } = useContext(DashboardContext);

  const { chartData, total } = useMemo(() => {
    const categoryMap = new Map<string, number>();
    let total = 0;

    goods.forEach(({ category, price }) => {
      total += price;
      categoryMap.set(category, (categoryMap.get(category) || 0) + price);
    });

    const labels = Array.from(categoryMap.keys());
    const data = Array.from(categoryMap.values());
    const backgroundColor = labels.map(() => getRandomColor());

    return {
      chartData: {
        labels,
        datasets: [
          {
            label: 'Spends by Category',
            data,
            backgroundColor,
            hoverOffset: 4,
          },
        ],
      },
      total,
    };
  }, [goods]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: `Spending by category (Total: ${total})`,
        color: 'black',
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="chart-wrapper">
      <Doughnut height={400} width={400} data={chartData} options={options} />
    </div>
  );
};
