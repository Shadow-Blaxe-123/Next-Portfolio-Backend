import { PrismaClient } from "@prisma/client";
import { env } from "./env";

const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
