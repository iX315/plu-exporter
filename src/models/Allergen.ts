import { GOOGLE_SHEETS_NAMES } from "../constants"
import { googleSheetsApiCall } from "../utils"

export type Allergen = {
    id: number | null
    name: string
    description: string
    language: string | null
}

export const defaultAllergen: Allergen = {
    id: null,
    name: "",
    description: "",
    language: null
}

export const getAllergensData = async () => await googleSheetsApiCall<Allergen[]>({
    sheetName: GOOGLE_SHEETS_NAMES.ALLERGENS
})