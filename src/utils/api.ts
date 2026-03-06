import { google } from "googleapis"
import { defaultComposer } from "default-composer"
import { GOOGLE_SHEETS_API } from "@/constants"
import { cache } from "react"

const getCredentials = () => JSON.parse(Buffer.from(process.env.CREDENTIALS ?? "", "base64").toString())

interface GoogleSheetsApiCallProps {
  sheetName?: string
  startRange?: string
  endRange?: string
  defaultData?: any
}

export const googleSheetsApiCall = async <T = string[]>({
  sheetName = "",
  startRange = GOOGLE_SHEETS_API.DEFAULT_START_RANGE,
  endRange = GOOGLE_SHEETS_API.DEFAULT_END_RANGE,
  defaultData = {} as T,
}: GoogleSheetsApiCallProps = {}) => {
  const auth = await google.auth.getClient({
    scopes: GOOGLE_SHEETS_API.SCOPES,
    credentials: getCredentials(),
  })

  const sheets = google.sheets({ version: GOOGLE_SHEETS_API.API_VERSION, auth })

  // TODO fixed cells values are not really smart
  const range = `${sheetName}!${startRange}:${endRange}`

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
    majorDimension: GOOGLE_SHEETS_API.MAJOR_DIMENSION,
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
}