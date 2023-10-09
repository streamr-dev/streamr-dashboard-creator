import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

console.log('Inititalizing prisma client in', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
