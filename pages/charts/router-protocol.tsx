import { ChartCard } from '@/components/ChartCard';
import { Layout } from '@/components/Layout';
import { useChartConfigs } from '@/hooks/useChartConfigs';

export default function RouterProtocol() {
  const { chartConfigs, isLoading, error } = useChartConfigs();

  const specificProjectId = 'ROUTER';

  const filteredConfigs = Array.isArray(chartConfigs)
    ? chartConfigs.filter((config) => config.projectId === specificProjectId)
    : [];

  return (
    <main>
      <Layout>
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
