import { callCreateChart, fetcher } from '@/helper/api-helper';
import { ResponseError } from '@/types/interfaces';
import { ChartConfig } from '@prisma/client';
import { useState } from 'react';
import useSWR from 'swr';

export const useChartConfigs = () => {
  const [isCreating, setIsCreating] = useState(false);
  const {
    data: chartConfigs,
    mutate,
    error,
    isLoading,
  } = useSWR<ChartConfig[], ResponseError>('/api/charts', fetcher);

  const createChart = async (
    title: string,
    desc: string,
    streamId: string,
    labelPath: string,
    dataPath: string
  ) => {
    setIsCreating(true);
    const chart = await callCreateChart(
      title,
      desc,
      streamId,
      labelPath,
      dataPath
    );
    if (chart) {
      mutate((data: ChartConfig[] | undefined) => {
        if (!data) {
          return [chart];
        }
        const newData = [...data];
        newData.push(chart);
        return newData;
      }, false);
    }
    setIsCreating(false);
  };

  return {
    chartConfigs,
    createChart,
    error,
    isLoading,
    isCreating,
  };
};
