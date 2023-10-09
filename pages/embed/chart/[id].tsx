import { ChartCard } from '@/components/ChartCard';
import { useChartConfig } from '@/hooks/useChartConfig';
import { NextPageContext } from 'next';

const EmbedChart = ({ id }: { id: string }) => {
  const { chartConfig } = useChartConfig(id);
  if (!chartConfig) {
    return null;
  }
  return <ChartCard showShareBtn={false} config={chartConfig} />;
};

EmbedChart.getInitialProps = async (context: NextPageContext) => {
  const { id } = context.query;
  return { id };
};

export default EmbedChart;
