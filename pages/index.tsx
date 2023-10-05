import { DashboardCard } from '@/components/DashboardCard';
import { Layout } from '@/components/Layout';
import { useChartConfigs } from '@/hooks/useChartConfigs';

export default function Home() {
  const { chartConfigs, isLoading, error } = useChartConfigs();

  if (!Array.isArray(chartConfigs)) {
    return <div>No configs found</div>;
  }

  console.log(chartConfigs, error);

  return (
    <main>
      <Layout>
        <div className="w-full grid lg:grid-cols-1 gap-6">
          {chartConfigs.map((config) => {
            return <DashboardCard key={config.id} config={config} />;
          })}
        </div>
      </Layout>
    </main>
  );
}
