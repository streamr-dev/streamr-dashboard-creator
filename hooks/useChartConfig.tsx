import { fetcher } from '@/helper/api-helper';
import { ResponseError } from '@/types/interfaces';
import { ChartConfig } from '@prisma/client';
import useSWR from 'swr';

export const useChartConfig = (id: string) => {
  const {
    data: chartConfig,
    error,
    isLoading,
  } = useSWR<ChartConfig, ResponseError>(`/api/charts/${id}`, fetcher);

  return { chartConfig, error, isLoading };
};
