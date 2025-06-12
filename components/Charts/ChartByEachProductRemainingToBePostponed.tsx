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

export const ChartByEachProductRemainingToBePostponed = () => {
  const { goods } = useContext(DashboardContext);

  const { chartData, total } = useMemo(() => {
    let total = 0;
    const labels = goods.map(g => g.title) ?? [];
    const data =
      goods.map(g => {
        total += g.remainingToBePostponed;
        return g.remainingToBePostponed;
      }) ?? [];
    const backgroundColor = goods.map(() => getRandomColor());

    return {
      chartData: {
        labels,
        datasets: [
          {
            label: 'Remains to be postponed by product',
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
        text: `Remains to be postponed (Total: ${total})`,
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
