import type { PrismaClient } from '@/generated/prisma/client'
import type { ModelName } from '@/generated/prisma/internal/prismaNamespace'

export type PrismaModels = {
  [M in ModelName]: Exclude<
    Awaited<ReturnType<PrismaClient[Uncapitalize<M>]['findUnique']>>,
    null
  >
}

export type ModelDelegate = {
  [M in ModelName as Uncapitalize<M>]: PrismaClient[Uncapitalize<M>]
}

export type FindManyArgs<M extends ModelName> =
  Parameters<ModelDelegate[Uncapitalize<M>]['findMany']>[0]