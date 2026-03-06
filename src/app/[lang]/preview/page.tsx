import { Main, MenuLoader, Allergens } from "@/components"
import { getMenuData } from "@/models/Menu"
import { getAllergensData } from "@/models/Allergen"
import { filterByLanguage } from "@/utils"

export default async function Preview(props: PageProps<'/[lang]/preview'>) {
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
