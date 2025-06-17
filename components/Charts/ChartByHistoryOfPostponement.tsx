'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ChartOptions,
} from 'chart.js';
import DashboardContext from '@/shared/DashboardContext';
import { useContext, useMemo } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const ChartByHistoryOfPostponement = () => {
  const { history } = useContext(DashboardContext);

  const { chartData } = useMemo(() => {
    const year = new Date().getUTCFullYear();
    const today = new Date();
    const startDate = new Date(Date.UTC(year, 0, 1));
    const allDates: string[] = [];
    const d = new Date(startDate);
    // eslint-disable-next-line no-unmodified-loop-condition
    while (d <= today) {
      allDates.push(d.toISOString().split('T')[0]);
      d.setUTCDate(d.getUTCDate() + 1);
    }

    const historyMap = new Map(history.map(item => [item.date, item.amount]));

    const labels = allDates;
    const data = allDates.map(date => historyMap.get(date) ?? 0);

    return {
      chartData: {
        labels,
        datasets: [
          {
            label: 'History of postponements',
            data,
            fill: false,
            borderColor: '#3b82f6',
            tension: 0.1,
          },
        ],
      },
    };
  }, [history]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'History of postponements since the beginning of the year',
        color: 'black',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black',
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        ticks: { color: 'black' },
      },
    },
  };

  return (
    <div className="mx-auto h-96 w-full rounded-md bg-white p-4">
      <Line data={chartData} options={options} />
    </div>
  );
};
