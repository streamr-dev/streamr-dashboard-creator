import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'POST': {
        const { type, chartjsConfig, streamId, title, desc } = req.body;

        if (!type || !chartjsConfig || !streamId || !title || !desc) {
          return res.status(400).json({
            error: 'Type, config, title, description and streamId are required',
          });
        }

        const chartConfig = await prisma.chartConfig.create({
          data: {
            type,
            chartjsConfig,
            streamId,
            title,
            desc,
          },
        });

        return res.json(chartConfig);
      }
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
