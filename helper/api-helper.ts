import { ResponseError } from '@/types/interfaces';

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
