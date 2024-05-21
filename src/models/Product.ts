import { googleSheetsApiCall } from "@/utils"

export type Product = {
  plu: number | null
  group: string
  name: string
  allergies: string
  details: string
  description: string
  size: string
  price: string
  page: number | null
}

export const defaultProduct: Product = {
  plu: null,
  group: "",
  name: "",
  allergies: "",
  details: "",
  description: "",
  size: "",
  price: "",
  page: null,
}

export const getProductData = async () => await googleSheetsApiCall<Product[]>({ sheetName: "Menu" })
