import { ResponseError } from '@/types/interfaces';
import { ChartConfig } from '@prisma/client';

export const fetcher = (url: string) => {
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

export const callCreateChart = async (
  title: string,
  desc: string,
  streamId: string,
  labelPath: string,
  dataPath: string
) => {
  try {
    const response = await fetch('/api/charts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        desc,
        type: 'LINE',
        chartjsConfig:
          '{"labels":[],"datasets":[{"label":"Sample Dataset","data":[],"fill":false,"borderColor":"#FF5B02","tension":0.1}]}',
        streamId,
        labelPath,
        dataPath,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to generate entity. Reason: ${response.statusText}`
      );
    }
    const result: ChartConfig = await response.json();
    return result;
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
};
