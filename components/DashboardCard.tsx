import {
  ArcElement,
  CategoryScale,
  Chart,
  ChartData,
  LineElement,
  LinearScale,
  PointElement,
} from 'chart.js';
import streamr from '@/lib/streamr';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export const DashboardCard = () => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [
      {
        label: 'My First Dataset',
        data: [],
        fill: false,
        borderColor: '#FF5B02',
        tension: 0.1,
      },
    ],
  });

  const updateChart = (label: string, data: number) => {
    setChartData((prevChartData) => {
      const prevLabels = prevChartData.labels as string[];
      const prevDataset = prevChartData.datasets[0];
      const prevData = prevDataset.data as number[];

      return {
        labels: [...prevLabels, label],
        datasets: [
          {
            ...prevDataset,
            data: [...prevData, data],
          },
        ],
      };
    });
  };

  const x = streamr.subscribe(
    '0x7277c78c02a4192ef8c48f5f4c529278d0e447fc/kyve/kyve-1/0',
    (msg: any) => {
      const extractedData = {
        stake_security: msg.metadata.stake_security,
        block_height: msg.value.header.height,
        amount_of_transactions: msg.value.data.txs.length,
        timestamp: msg.metadata.finalized_at.timestamp,
      };
      if (extractedData.block_height && extractedData.timestamp) {
        updateChart(extractedData.timestamp, extractedData.block_height);
      }
    }
  );

  return (
    <div className="w-full bg-secondary p-6 rounded">
      <div className="mb-2 flex justify-between">
        <h3 className="font-medium text-lg">Kyve Block Height</h3>
        <button>
          <img src="icons/share.svg" alt="show widget code" />
        </button>
      </div>

      <p className="text-sm mb-4">
        Shows block height of transactions in Kyve network over time. This is a
        cool description to give the data more context
      </p>
      <Line data={chartData} />
    </div>
  );
};
