// This file creates a singleton instance of PrismaClient to prevent multiple connections
// during development hot reloading

import { PrismaClient } from '@prisma/client';

// Function that creates a new PrismaClient instance
const PrismaClientSingleton = () => {
  return new PrismaClient();
};

// Type declaration to add prismaGlobal to globalThis
declare const globalThis: {
  prismaGlobal: ReturnType<typeof PrismaClientSingleton>;
} & typeof global;

// Use existing prisma instance if available, otherwise create new one
const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton();

// Save prisma instance on global object in development to prevent multiple instances
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

export default prisma;
