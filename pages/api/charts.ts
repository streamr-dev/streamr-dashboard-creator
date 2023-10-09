import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const allChartConfigs = await prisma.chartConfig.findMany();
        return res.json(allChartConfigs);
      }
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Internal server error', details: error });
  }
}
