import { googleSheetsApiCall } from "../utils"

export type Allergen = {
    id: number | null
    name: string
    description: string
}

export const defaultAllergen: Allergen = {
    id: null,
    name: "",
    description: "",
}

export const getAllergensData = async () => await googleSheetsApiCall<Allergen[]>({ sheetName: "Allergens" })