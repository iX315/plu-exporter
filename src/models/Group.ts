import { googleSheetsApiCall } from "@/utils"
import { GOOGLE_SHEETS_NAMES } from "../constants"

export type Group = {
  name: string
  description: string
  pre: string
  post: string
  page: number
  language: string | null
}

export const defaultGroup: Group = {
  name: "",
  description: "",
  pre: "",
  post: "",
  page: 0,
  language: null
}

export const getGroupsData = async () => await googleSheetsApiCall<Group[]>({
  sheetName: GOOGLE_SHEETS_NAMES.GROUPS
})
