import { googleSheetsApiCall } from "@/utils"

export type Product = {
  plu: number | null
  group: string
  name: string
  image: string
  allergies: string
  details: string
  description: string
  size: string
  price: string
  page: number | null
  language: string | null
}

export const defaultProduct: Product = {
  plu: null,
  group: "",
  name: "",
  image: "",
  allergies: "",
  details: "",
  description: "",
  size: "",
  price: "",
  page: null,
  language: null
}

export const getProductData = async () => await googleSheetsApiCall<Product[]>({ sheetName: "Menu" })
