import { PrismaClient } from "@prisma/client";

// This prevents multiple instances of Prisma Client from being
// made during development due to hot-reloading.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({});

// log: ["query"], // Optional: logs queries to console for debugging

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
