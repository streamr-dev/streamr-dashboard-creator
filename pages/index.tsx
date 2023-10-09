import { ChartCard } from '@/components/ChartCard';
import { Layout } from '@/components/Layout';
import { useChartConfigs } from '@/hooks/useChartConfigs';

export default function Home() {
  const { chartConfigs, isLoading, error } = useChartConfigs();

  return (
    <main>
      <Layout>
        <div className="w-full grid lg:grid-cols-1 gap-6">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : !Array.isArray(chartConfigs) ? (
            <h1>No configs found</h1>
          ) : (
            chartConfigs.map((config) => (
              <ChartCard key={config.id} config={config} />
            ))
          )}
        </div>
      </Layout>
    </main>
  );
}
