import { Main, MenuLoader, Allergens } from "@/components"
import { getMenuData } from "@/models/Menu"
import { getAllergensData } from "@/models/Allergen"

export default async function Preview() {
  const values = await getMenuData()
  const allergens = await getAllergensData()

  return (
    <Main>
      <MenuLoader data={{values}} isLoading={!values} />
      <Allergens data={allergens} />
    </Main>
  )
}
