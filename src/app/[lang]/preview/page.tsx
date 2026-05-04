import { Main, MenuLoader, Allergens } from '@/components'
import { getMenuData } from '@/utils'


import { db } from '@/utils/databaseProxy'

export default async function Preview(props: PageProps<'/[lang]/preview'>) {
  const { lang } = await props.params
  const values = await getMenuData(lang)
  const allergens = await db('Allergen', { where: { language: lang } })

  return (
    <Main>
      <MenuLoader data={{ values }} isLoading={!values} />
      <Allergens data={allergens} />
    </Main>
  )
}
