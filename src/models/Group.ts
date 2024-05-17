import { GoogleSheetsApiCall } from "@/utils"

export type GroupData = {
  Name: string
  Description: string
  pre: string
  post: string
  page: number
}

export const defaultGroupData: GroupData = {
  Name: "",
  Description: "",
  pre: "",
  post: "",
  page: 0,
}

export const parseGroup = (group: string[]) =>
  ({
    Name: group[0],
    Description: group[1],
    pre: group[2],
    post: group[3],
    page: Number(group[4]),
  }) as GroupData

export const getGroupsData = async () =>
  await GoogleSheetsApiCall<GroupData[]>({ sheetName: "Groups", mapperFn: parseGroup })
