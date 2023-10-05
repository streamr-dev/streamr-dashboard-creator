import { PrismaClient } from '@prisma/client';
import StreamrClient from 'streamr-client';

declare global {
  var prisma: PrismaClient;
  var streamr: StreamrClient;
}
