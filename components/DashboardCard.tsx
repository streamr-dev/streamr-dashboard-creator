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
import { ChartConfig } from '@prisma/client';

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export const DashboardCard = ({ config }: { config: ChartConfig }) => {
  const { chartjsConfig, streamId, title, desc } = config;

  const [chartData, setChartData] = useState<ChartData<'line'>>(
    JSON.parse(chartjsConfig)
  );

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

  streamr.subscribe(streamId, (msg: any) => {
    const extractedData = {
      stake_security: msg.metadata.stake_security,
      block_height: msg.value.header.height,
      amount_of_transactions: msg.value.data.txs.length,
      timestamp: msg.metadata.finalized_at.timestamp,
    };
    if (extractedData.block_height && extractedData.timestamp) {
      updateChart(extractedData.timestamp, extractedData.block_height);
    }
  });

  return (
    <div className="w-full bg-secondary p-6 rounded">
      <div className="mb-2 flex justify-between">
        <h3 className="font-medium text-lg">{title}</h3>
        <button>
          <img src="icons/share.svg" alt="show widget code" />
        </button>
      </div>

      <p className="text-sm mb-4">{desc}</p>
      <Line data={chartData} />
    </div>
  );
};
