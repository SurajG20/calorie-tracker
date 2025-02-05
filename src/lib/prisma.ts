// This file creates a singleton instance of PrismaClient to prevent multiple connections
// during development hot reloading

import { PrismaClient } from '@prisma/client';

const PrismaClientSingleton = () => {
  return new PrismaClient();
};
declare const globalThis: {
  prismaGlobal: ReturnType<typeof PrismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

export default prisma;
