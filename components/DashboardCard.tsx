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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartConfig } from '@prisma/client';
import { extractDataFromMessage } from '@/helper/dashboard-helper';
import { WidgetModal } from './WidgetModal';

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export const DashboardCard = ({
  config,
  showShareBtn = true,
}: {
  config: ChartConfig;
  showShareBtn?: boolean;
}) => {
  const { chartjsConfig, streamId, title, desc, labelPath, dataPath, id } =
    config;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [chartData, setChartData] = useState<ChartData<'line'>>(
    JSON.parse(chartjsConfig)
  );

  useEffect(() => {
    streamr.subscribe(streamId, (msg: any) => {
      const { label, data } = extractDataFromMessage(msg, labelPath, dataPath);
      if (label && data) {
        updateChart(label, data);
      }
    });
  }, []);

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

  return (
    <div className="w-full bg-secondary p-6 rounded">
      <div className="mb-2 flex justify-between">
        <h3 className="font-medium text-lg">{title}</h3>
        {showShareBtn ? (
          <button onClick={() => setIsModalOpen(true)}>
            <img src="/icons/share.svg" alt="show widget code" />
          </button>
        ) : null}
      </div>

      <p className="text-sm mb-4">{desc}</p>
      <Line data={chartData} />
      <WidgetModal
        chartId={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
