import { google } from "googleapis"

const getCredentials = () => JSON.parse(Buffer.from(process.env.CREDENTIALS ?? "", "base64").toString())

interface GoogleSheetsApiCallProps {
  sheetName?: string
  startRange?: string
  endRange?: string
  mapperFn?: (data: string[]) => any
}

export const GoogleSheetsApiCall = async <T = string[]>({
  sheetName = "Menu",
  startRange = "A2",
  endRange = "Z14989",
  mapperFn = undefined,
}: GoogleSheetsApiCallProps = {}) => {
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

  const data = mapperFn
    ? response.data.values?.map(mapperFn) ?? []
    : response.data.values ?? []

  return data as T
}
