import { googleSheetsApiCall } from "@/utils"

export type PageData = {
  id: string
  name: string
  description: string
  image: string
  logo: string
}

export const defaultPageData: PageData = {
  id: "",
  name: "",
  description: "",
  image: "",
  logo: "",
}

export const getPagesData = async () => await googleSheetsApiCall<PageData[]>({ sheetName: "Pages" })
