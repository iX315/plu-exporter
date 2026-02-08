import { googleSheetsApiCall } from "@/utils"

export type Page = {
  id: string
  name: string
  description: string
  image: string
  logo: string
  language: string | null
}

export const defaultPage: Page = {
  id: "",
  name: "",
  description: "",
  image: "",
  logo: "",
  language: null
}

export const getPagesData = async () => await googleSheetsApiCall<Page[]>({ sheetName: "Pages" })
