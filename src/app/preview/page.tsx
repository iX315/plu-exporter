import { Main, Allergens } from "@/components"
import { getMenuData } from "@/models/Menu"
import { getAllergensData } from "../../models/Allergen"

export default async function Preview() {
  const values = await getMenuData()
  const allergens = await getAllergensData()

  return (
    <div className={"p-6 sm:p-12"}>
      <Main data={{values}} isLoading={!values} />
      <Allergens data={allergens} />
    </div>
  )
}
