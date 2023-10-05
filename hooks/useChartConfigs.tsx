import { fetcher } from '@/helper/api-helper';
import { ResponseError } from '@/types/interfaces';
import { ChartConfig } from '@prisma/client';
import useSWR from 'swr';

export const useChartConfigs = () => {
  const {
    data: chartConfigs,
    error,
    isLoading,
  } = useSWR<ChartConfig[], ResponseError>('/api/charts', fetcher);

  return { chartConfigs, error, isLoading };
};
