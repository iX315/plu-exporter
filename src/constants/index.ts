// Google Sheets API Constants
export const GOOGLE_SHEETS_API = {
  SCOPES: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  API_VERSION: 'v4' as const,
  DEFAULT_START_RANGE: 'A1',
  DEFAULT_END_RANGE: 'Z14989',
  MAJOR_DIMENSION: 'ROWS' as const
}

export const GOOGLE_SHEETS_NAMES = {
  HOMEPAGE: 'Homepage',
  GROUPS: 'Groups',
  PRODUCTS: 'Products',
  ALLERGENS: 'Allergens',
  LANGUAGES: 'Languages'
}