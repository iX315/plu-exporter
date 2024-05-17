import { googleSheetsApiCall } from "@/utils"

export type ProductData = {
  plu: number | null
  group: string
  name: string
  allergies: string
  details: string
  description: string
  size: string
  price: string
  page: number
}

export const defaultProductData: ProductData = {
  plu: null,
  group: "",
  name: "",
  allergies: "",
  details: "",
  description: "",
  size: "",
  price: "",
  page: 0,
}

export const getProductData = async () => await googleSheetsApiCall<ProductData[]>({ sheetName: "Menu" })
