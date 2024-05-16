import { google } from "googleapis"
import { MenuData } from "@/types"
import { parseGroup, parseProduct } from "./parsers"

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

export const getMenu = async () => {
  const menuApiResponse = await GoogleSheetsApiCall()
  return menuApiResponse.map(parseProduct)
}

export const getGroups = async () => {
  const groupsApiResponse = await GoogleSheetsApiCall({ sheetName: "Groups" })
  return groupsApiResponse.map(parseGroup)
}

export const getMenuData = async () => {
  const products = await getMenu() ?? []
  const groups = await getGroups() ?? []

  if (Array.isArray(products) && Array.isArray(groups)) {
    const menuData: MenuData[] = groups.map((group) => ({
      group,
      products: products.filter((product) => product.Group === group.Name),
    }))

    return menuData
  } else {
    return []
  }
}