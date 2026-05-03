import { googleSheetsApiCall } from "@/utils"
import { GOOGLE_SHEETS_NAMES } from "../constants"

export type KeyValue = {
  key?: string
  value?: string
}

export const defaultHomepage: KeyValue = {
  key: "",
  value: ""
}

type HomepageData = {
  name?: string
  established?: string
  description?: string
  hero?: string
  logo?: string
  phone?: string
  email?: string
  instagram?: string
  twitter?: string
  youtube?: string
}

const toRecord = (entries: KeyValue[]): HomepageData => Object.fromEntries(
  entries
    .filter((e): e is KeyValue & { key: string; } => e.key !== undefined)
    .map(({ key, value }) => [key, value])
)

export const getHomepageData = async () => toRecord(await googleSheetsApiCall<KeyValue[]>({
  sheetName: GOOGLE_SHEETS_NAMES.HOMEPAGE
}))
