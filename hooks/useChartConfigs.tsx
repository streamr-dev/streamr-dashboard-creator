import { ResponseError } from '@/types/interfaces';
import { ChartConfig } from '@prisma/client';
import useSWR from 'swr';

const fetcher = (url: string) => {
  return fetch(url).then((res) => {
    if (!res.ok) {
      const error: ResponseError = new Error(
        `Failed to fetch config. Reason: ${res.statusText}`
      );
      error.status = res.status;
      throw error;
    }
    return res.json();
  });
};

export const useChartConfigs = () => {
  const {
    data: chartConfigs,
    error,
    isLoading,
  } = useSWR<ChartConfig[], ResponseError>('/api/charts', fetcher);

  return { chartConfigs, error, isLoading };
};
