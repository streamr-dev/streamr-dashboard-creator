import {
  ArcElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export const DashboardCard = () => {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  return (
    <div className="w-full bg-secondary p-6 rounded">
      <div className="mb-2 flex justify-between">
        <h3 className="font-medium text-lg">Metric xyz</h3>
        <button>
          <img src="icons/share.svg" alt="show widget code" />
        </button>
      </div>

      <p className="text-sm mb-4">
        Shows amount of nodes over time. This is a cool description to give the
        data more context
      </p>
      <Line data={data} />
    </div>
  );
};
