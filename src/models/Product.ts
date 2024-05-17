import { GoogleSheetsApiCall } from "@/utils"

export type ProductData = {
  PLU: number | null
  Group: string
  Name: string
  Allergies: string
  Details: string
  Description: string
  Size: string
  Price: string
  Page: number
}

export const parseProduct = (product: string[]) =>
  ({
    PLU: product[0] ? Number(product[0]) : null,
    Group: product[1],
    Name: product[2],
    Allergies: product[3],
    Details: product[4],
    Description: product[5],
    Size: product[6],
    Price: product[7],
    Page: Number(product[8]),
  }) as ProductData

export const getProductData = async () =>
  await GoogleSheetsApiCall({ mapperFn: parseProduct })


