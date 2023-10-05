const useDashboardConfig = () => {
  const { data, error, isLoading } = useSWR<T, ResponseError>(apiPath, fetcher);
};
