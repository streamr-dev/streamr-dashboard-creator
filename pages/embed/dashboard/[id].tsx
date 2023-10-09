import { DashboardCard } from '@/components/DashboardCard';
import { useChartConfig } from '@/hooks/useChartConfig';
import { NextPageContext } from 'next';

const EmbedDashboard = ({ id }: { id: string }) => {
  const { chartConfig } = useChartConfig(id);
  if (!chartConfig) {
    return null;
  }
  return <DashboardCard showShareBtn={false} config={chartConfig} />;
};

EmbedDashboard.getInitialProps = async (context: NextPageContext) => {
  const { id } = context.query;
  return { id };
};

export default EmbedDashboard;
