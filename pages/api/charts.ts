import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'POST': {
        const {
          type,
          chartjsConfig,
          streamId,
          title,
          desc,
          labelPath,
          dataPath,
        } = req.body;

        if (
          !type ||
          !chartjsConfig ||
          !streamId ||
          !title ||
          !desc ||
          !dataPath
        ) {
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
            labelPath,
            dataPath,
          },
        });

        return res.json(chartConfig);
      }
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
