import { Main, MenuLoader, Allergens } from '@/components'
import { getMenuData } from '@/utils'

import { db } from '@/utils/databaseProxy'

export const revalidate = 600

export default async function Print(props: PageProps<'/[lang]/print'>) {
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
