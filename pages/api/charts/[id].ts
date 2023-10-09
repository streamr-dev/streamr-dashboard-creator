import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const { id } = req.query;

        if (typeof id !== 'string') {
          return res.status(400).json({ error: 'Invalid Id' });
        }

        const chartConfig = await prisma.chartConfig.findUnique({
          where: { id: id },
        });

        if (!chartConfig) {
          return res.status(404).json({ error: 'Chart config not found' });
        }

        return res.json(chartConfig);
      }

      case 'PATCH': {
        const { id } = req.query;

        const session = await getServerSession(req, res, options);
        if (!session) {
          return res.status(401).json({ error: 'Not authenticated' });
        }

        if (typeof id !== 'string') {
          return res.status(400).json({ error: 'Invalid Id' });
        }
        const existingChartConfig = await prisma.chartConfig.findUnique({
          where: { id: id },
        });

        if (!existingChartConfig) {
          return res.status(404).json({ error: 'Chart config not found' });
        }

        const updates = req.body;

        const updatedChartConfig = await prisma.chartConfig.update({
          where: { id: id },
          data: updates,
        });

        return res.json(updatedChartConfig);
      }

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Internal server error', details: error });
  }
}
