import { google } from "googleapis"
import { defaultComposer } from "default-composer"
import { cache } from "react"

const getCredentials = () => JSON.parse(Buffer.from(process.env.CREDENTIALS ?? "", "base64").toString())

interface GoogleSheetsApiCallProps {
  sheetName?: string
  startRange?: string
  endRange?: string
  defaultData?: any
}

export const googleSheetsApiCall = cache(
  async <T = string[]>({
    sheetName = "",
    startRange = "A1",
    endRange = "Z14989",
    defaultData = {} as T,
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

    const header = response.data.values?.shift() ?? []
    const values = response.data.values ?? []

    const data = values.map((row) =>
      defaultComposer(
        defaultData,
        ...row.map((value, index) => ({
          [`${header[index] ?? ""}`.toLowerCase()]: value,
        })),
      ),
    )

    return data as T
  },
)
