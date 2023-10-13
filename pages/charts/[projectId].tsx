import { ChartCard } from '@/components/ChartCard';
import { Layout } from '@/components/Layout';
import { useChartConfigs } from '@/hooks/useChartConfigs';
import { ChartConfig } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RouterProtocol() {
  const { chartConfigs, isLoading, error } = useChartConfigs();
  const [filteredConfigs, setFilteredConfigs] = useState<ChartConfig[]>([]);
  const router = useRouter();
  const { projectId } = router.query;

  useEffect(() => {
    if (projectId && Array.isArray(chartConfigs)) {
      const configs = chartConfigs.filter(
        (config) => config.projectId === projectId
      );
      setFilteredConfigs(configs);
    }
  }, [chartConfigs, projectId]);

  return (
    <main>
      <Layout headerTitle={'Charts: ' + (projectId as string).toUpperCase()}>
        <div className="w-full grid lg:grid-cols-1 gap-6">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : filteredConfigs.length === 0 ? (
            <h1>No configs found</h1>
          ) : (
            filteredConfigs.map((config) => (
              <ChartCard key={config.id} config={config} />
            ))
          )}
        </div>
      </Layout>
    </main>
  );
}
