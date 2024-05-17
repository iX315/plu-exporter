import { googleSheetsApiCall } from "@/utils"

export type GroupData = {
  name: string
  description: string
  pre: string
  post: string
  page: number
}

export const defaultGroupData: GroupData = {
  name: "",
  description: "",
  pre: "",
  post: "",
  page: 0,
}

export const getGroupsData = async () => await googleSheetsApiCall<GroupData[]>({ sheetName: "Groups" })
