// on the server side
import { PrismaClient } from '@prisma/client';
import { betterAuth, BetterAuthOptions } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { openAPI } from 'better-auth/plugins';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [openAPI()], // api/auth/reference to api docs
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
