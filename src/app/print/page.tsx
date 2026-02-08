import { Main, MenuLoader, Allergens } from "@/components"
import { getMenuData } from "@/models/Menu"
import { getAllergensData } from "@/models/Allergen"

export const revalidate = 600

export default async function Print() {
  const values = await getMenuData()
  const allergens = await getAllergensData()

  return (
    <Main>
      <MenuLoader data={{values}} isLoading={!values} />
      <Allergens data={allergens} />
    </Main>
  )
}
