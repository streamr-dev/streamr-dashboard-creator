/* const { PrismaClient, ChartType } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.chartConfig.create({
    data: {
      type: ChartType.LINE,
      config: JSON.stringify({
        labels: [],
        datasets: [
          {
            label: 'Sample Dataset',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      }),
      streamId: '0x7277c78c02a4192ef8c48f5f4c529278d0e447fc/kyve/kyve-1/0',
      title: 'Kyve Block Height',
      desc: 'Shows block height of transactions in Kyve network over time. This is a cool description to give the data more context',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
 */
