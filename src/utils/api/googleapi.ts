import { google } from 'googleapis'
import { defaultComposer } from 'default-composer'
import { GOOGLE_SHEETS_API } from '@/constants'

import type { ModelName } from '@/generated/prisma/internal/prismaNamespace'
import type { FindManyArgs, PrismaModels } from './types'

const getCredentials = () =>
  JSON.parse(Buffer.from(process.env.CREDENTIALS ?? '', 'base64').toString())

export const mapSheetName = {
  Homepage: 'Homepage',
  Group: 'Groups',
  Product: 'Products',
  Allergen: 'Allergens',
  Order: 'Orders'
} as const satisfies Record<ModelName, string>

type SheetRow<M extends ModelName> = Partial<PrismaModels[M]>

interface GoogleSheetsApiCallProps<M extends ModelName> {
  startRange?: string
  endRange?: string
  defaultData?: SheetRow<M>
}

// Applies where/orderBy/skip/take in-memory — relations and select are no-ops
const applyFindManyArgs = <M extends ModelName>(
  rows: PrismaModels[M][],
  args?: FindManyArgs<M>
): PrismaModels[M][] => {
  if (!args) return rows

  let result = [...rows]

  if (args.where) {
    const where = args.where as Record<string, unknown>
    result = result.filter((row) =>
      Object.entries(where).every(([key, value]) => {
        const field = (row as Record<string, unknown>)[key]
        // Prisma scalar filters e.g. { name: { contains: 'foo' } }
        if (value !== null && typeof value === 'object') {
          const filter = value as Record<string, unknown>
          if ('equals' in filter) return field === filter.equals
          if ('contains' in filter) return String(field).includes(String(filter.contains))
          if ('startsWith' in filter) return String(field).startsWith(String(filter.startsWith))
          if ('endsWith' in filter) return String(field).endsWith(String(filter.endsWith))
          if ('gt' in filter) return Number(field) > Number(filter.gt)
          if ('gte' in filter) return Number(field) >= Number(filter.gte)
          if ('lt' in filter) return Number(field) < Number(filter.lt)
          if ('lte' in filter) return Number(field) <= Number(filter.lte)
          if ('in' in filter) return (filter.in as unknown[]).includes(field)
          if ('notIn' in filter) return !(filter.notIn as unknown[]).includes(field)
          return true // unsupported filter shape — skip silently
        }
        return field === value
      })
    )
  }

  if (args.orderBy) {
    const orderBy = (
      Array.isArray(args.orderBy) ? args.orderBy : [args.orderBy]
    ) as Record<string, 'asc' | 'desc'>[]

    result.sort((a, b) => {
      for (const clause of orderBy) {
        const [key, dir] = Object.entries(clause)[0]
        const av = (a as Record<string, unknown>)[key]
        const bv = (b as Record<string, unknown>)[key]
        const cmp = av === bv ? 0 : av! > bv! ? 1 : -1
        if (cmp !== 0) return dir === 'desc' ? -cmp : cmp
      }
      return 0
    })
  }

  if (args.skip) result = result.slice(args.skip)
  if (args.take) result = result.slice(0, args.take)

  return result
}

export const googleSheetsApiCall = async <M extends ModelName>(
  modelName: M,
  args?: FindManyArgs<M>,
  props: GoogleSheetsApiCallProps<M> = {}
): Promise<PrismaModels[M][]> => {
  const {
    startRange = GOOGLE_SHEETS_API.DEFAULT_START_RANGE,
    endRange = GOOGLE_SHEETS_API.DEFAULT_END_RANGE,
    defaultData = {} as SheetRow<M>
  } = props

  const auth = await google.auth.getClient({
    scopes: GOOGLE_SHEETS_API.SCOPES,
    credentials: getCredentials()
  })

  const sheets = google.sheets({ version: GOOGLE_SHEETS_API.API_VERSION, auth })
  const range = `${mapSheetName[modelName]}!${startRange}:${endRange}`

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
    majorDimension: GOOGLE_SHEETS_API.MAJOR_DIMENSION
  })

  const [header = [], ...rows] = response.data.values ?? []

  const data = rows.map((row) =>
    defaultComposer<PrismaModels[M]>(
      defaultData as PrismaModels[M],
      ...row.map((value, index) => ({
        [`${header[index] ?? ''}`.toLowerCase()]: value
      }) as unknown as Partial<PrismaModels[M]>)
    )
  )

  return applyFindManyArgs(data, args)
}