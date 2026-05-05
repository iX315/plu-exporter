import { Main, MenuLoader, Allergens } from '@/components'

import { dbClient } from '@/utils/dbClient'

export const revalidate = 600

export default async function Print(props: PageProps<'/[lang]/print'>) {
  const { lang } = await props.params
  const values = await dbClient.group.findMany({ where: { language: lang }, include: { products: true } })
  const allergens = await dbClient.allergen.findMany({ where: { language: lang } })

  return (
    <Main>
      <MenuLoader data={{ values }} isLoading={!values} />
      <Allergens data={allergens} />
    </Main>
  )
}
