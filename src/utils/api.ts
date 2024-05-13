import { readFile, writeFile } from "fs/promises"
import { google } from "googleapis"
import { GroupData, MenuData, ProductData } from "@/types"
import path from "path"

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

export const parseGroup = (group: string[]) =>
  ({
    Name: group[0],
    Description: group[1],
    pre: group[2],
    post: group[3],
    page: Number(group[4]),
  }) as GroupData

const getCredentials = () => JSON.parse(Buffer.from(process.env.CREDENTIALS ?? "", "base64").toString())

export const GoogleSheetsApiCall = async ({
  sheetName = "Menu",
  startRange = "A2",
  endRange = "Z14989",
} = {}) => {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    credentials: getCredentials(),
  })

  const sheets = google.sheets({ version: "v4", auth })

  // TODO fixed cells values are not really smart
  const range = `${sheetName}!${startRange}:${endRange}`

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
    majorDimension: "ROWS",
  })

  return response.data.values ?? []
}

export const GetMenuData = async () => {
  const menuApiResponse = await GoogleSheetsApiCall()
  const groupsApiResponse = await GoogleSheetsApiCall({ sheetName: "Groups" })
  const arraysAreValid =
    Array.isArray(menuApiResponse) && Array.isArray(groupsApiResponse)

  const products: ProductData[] = menuApiResponse.map(parseProduct)
  const groups: GroupData[] = groupsApiResponse.map(parseGroup)

  if (arraysAreValid) {
    const menuData: MenuData[] = groups.map((group) => ({
      group,
      products: products.filter((product) => product.Group === group.Name),
    }))

    return menuData
  } else {
    return []
  }
}