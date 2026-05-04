import { googleSheetsApiCall } from './api/googleapi'
import { postgresQuery } from './api/postgres'

import type { ModelName } from '@/generated/prisma/internal/prismaNamespace'
import type { FindManyArgs, PrismaModels } from './api/types'

export const db = async <M extends ModelName>(
  modelName: M,
  args?: FindManyArgs<M>
): Promise<PrismaModels[M][]> => {
  if (process.env.DB_TYPE === 'googlesheets') {
    return await googleSheetsApiCall(modelName, args)
  }
  if (process.env.DB_TYPE === 'postgres') {
    return await postgresQuery(modelName, args)
  }
  throw new Error('No database type specified or implemented')
}
