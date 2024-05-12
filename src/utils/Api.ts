import { readFile, writeFile } from "fs/promises"
import { google } from "googleapis"
import { GroupData, ProductData } from "@/types"

// tmp folder is the only writable folder in vercel
const keyFilePath = "./tmp/credentials.json"

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

const createTempKeyFile = async () => {
  const data = Buffer.from(process.env.CREDENTIALS ?? "", "base64")
    .toString()
    .replace(/\n/g, "") //  hack to remove new lines

  // write credentials to file
  try {
    await writeFile(keyFilePath, data)
    return true
  } catch {
    return false
  }
}

export const GoogleSheetsApiCall = async ({
  sheetName = "Menu",
  startRange = "A2",
  endRange = "Z14989",
} = {}) => {
  const cacheDataPath = `./tmp/cache/${sheetName}${startRange}${endRange}.json`

  // return cached data from file
  try {
    const data = await readFile(cacheDataPath)
    return JSON.parse(data.toString())
  } catch (error) {
    console.log("No cache data found")
  }

  const keyCreated = await createTempKeyFile()

  if (!keyCreated) {
    throw new Error("Could not create credentials file")
  }

  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    keyFile: keyFilePath,
  })

  const sheets = google.sheets({ version: "v4", auth })

  // TODO fixed cells values are not really smart
  const range = `${sheetName}!${startRange}:${endRange}`

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
    majorDimension: "ROWS",
  })

  writeFile(cacheDataPath, JSON.stringify(response.data.values))

  return response.data.values
}
