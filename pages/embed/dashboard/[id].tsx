import { DashboardCard } from '@/components/DashboardCard';
import { NextPageContext } from 'next';

const EmbedDashboard = ({ id }: { id: string }) => {
  return <DashboardCard />;
};

EmbedDashboard.getInitialProps = async (context: NextPageContext) => {
  const { id } = context.query;
  return { id };
};

export default EmbedDashboard;
