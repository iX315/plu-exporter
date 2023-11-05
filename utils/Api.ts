import { readFile, writeFile } from "fs/promises";
import { google } from "googleapis";

// tmp folder is the only writable folder in vercel
const keyFilePath = "./tmp/credentials.json";

const createTempKeyFile = async () => {
  const data = Buffer.from(process.env.CREDENTIALS ?? "", "base64")
    .toString()
    .replace(/\n/g, ""); //  hack to remove new lines

  // write credentials to file
  try {
    await writeFile(keyFilePath, data);
    return true;
  } catch {
    return false;
  }
};

export const GoogleSheetsApiCall = async ({
  sheetName = "Menu",
  startRange = "A2",
  endRange = "Z14989",
} = {}) => {
  const cacheDataPath = `./tmp/cache/${sheetName}${startRange}${endRange}.json`;

  // return cached data from file
  try {
    const data = await readFile(cacheDataPath);
    return JSON.parse(data.toString());
  } catch (error) {
    console.log("No cache data found");
  }

  const keyCreated = await createTempKeyFile();

  if (!keyCreated) {
    throw new Error("Could not create credentials file");
  }

  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    keyFile: keyFilePath,
  });

  const sheets = google.sheets({ version: "v4", auth });

  // TODO fixed cells values are not really smart
  const range = `${sheetName}!${startRange}:${endRange}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
    majorDimension: "ROWS",
  });

  writeFile(cacheDataPath, JSON.stringify(response.data.values));

  return response.data.values;
};
