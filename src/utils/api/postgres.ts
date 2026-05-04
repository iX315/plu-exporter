import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from '@/generated/prisma/client'

import type { FindManyArgs, PrismaModels } from "./types"
import type { ModelName } from "@/generated/prisma/internal/prismaNamespace"

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const db = new PrismaClient({ adapter })

export const postgresQuery = async <M extends ModelName>(
  modelName: M,
  args?: FindManyArgs<M>
): Promise<PrismaModels[M][]> => {
  const delegate = db[modelName.toLowerCase() as Uncapitalize<M>] as unknown as {
    findMany: (args?: FindManyArgs<M>) => Promise<PrismaModels[M][]>
  }
  return delegate.findMany(args)
}