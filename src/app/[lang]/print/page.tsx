import { Main, MenuLoader, Allergens } from "@/components"
import { getMenuData } from "@/models/Menu"
import { getAllergensData } from "@/models/Allergen"
import { filterByLanguage } from "@/utils"

export const revalidate = 600

export default async function Print(props: PageProps<'/[lang]/print'>) {
  const {lang} = await props.params
  const values = await getMenuData(lang)
  const allergens = filterByLanguage(await getAllergensData(), lang)

  return (
    <Main>
      <MenuLoader data={{values}} isLoading={!values} />
      <Allergens data={allergens} />
    </Main>
  )
}
