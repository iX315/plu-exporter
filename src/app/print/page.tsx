import { Main, Allergens } from "@/components"
import { getMenuData } from "@/models/Menu"
import { isDev } from "@/utils"
import { getAllergensData } from "../../models/Allergen"

export const revalidate = isDev() ? 0 : 3600

export default async function Print() {
  const values = await getMenuData()
  const allergens = await getAllergensData()

  return (
    <div className={"p-6 sm:p-12"}>
      <Main data={{values}} isLoading={!values} />
      <Allergens data={allergens} />
    </div>
  )
}
