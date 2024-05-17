import { GoogleSheetsApiCall } from "@/utils"

export type PageData = {
  Id: string
  Name: string
  Description: string
  Image: string
  Logo: string
}

export const defaultPageData: PageData = {
    Id: "",
    Name: "",
    Description: "",
    Image: "",
    Logo: "",
}

export const parsePage = (page: string[]) =>
  ({
    Id: page[0],
    Name: page[1],
    Description: page[2],
    Image: page[3],
    Logo: page[4],
  }) as PageData

export const getPagesData = async () =>
  await GoogleSheetsApiCall<PageData[]>({ sheetName: "Pages", mapperFn: parsePage })