import { Main, MenuLoader, Allergens } from "@/components"
import { getMenuData } from "@/models/Menu"
import { getAllergensData } from "@/models/Allergen"
import { filterByLanguage } from "../../../utils/helpers"

export default async function Preview(props: PageProps<'/preview/[lang]'>) {
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
