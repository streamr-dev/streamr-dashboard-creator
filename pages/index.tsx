import { DashboardCard } from '@/components/DashboardCard';
import { Layout } from '@/components/Layout';

export default function Home() {
  return (
    <main>
      <Layout>
        <div className="w-full grid lg:grid-cols-1 gap-6">
          <DashboardCard />
        </div>
      </Layout>
    </main>
  );
}
