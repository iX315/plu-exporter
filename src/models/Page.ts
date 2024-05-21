import { googleSheetsApiCall } from "@/utils"

export type Page = {
  id: string
  name: string
  description: string
  image: string
  logo: string
}

export const defaultPage: Page = {
  id: "",
  name: "",
  description: "",
  image: "",
  logo: "",
}

export const getPagesData = async () => await googleSheetsApiCall<Page[]>({ sheetName: "Pages" })
