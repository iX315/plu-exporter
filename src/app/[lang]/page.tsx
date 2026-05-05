import { Footer, Header, Hero, Story } from '@/components'
import { dbClient } from '@/utils/dbClient'

import type { HomepageKeys, Homepage } from '@/generated/prisma/client'

export const revalidate = 600


export const toHomepageRecord = (entries: Homepage[]) => Object.fromEntries(
  entries
    .filter((e): e is Homepage & { key: string; } => e.key !== undefined)
    .map(({ key, value }) => [key, value])
) as { key: HomepageKeys, value: string }

export default async function Homepage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params
  const values = toHomepageRecord(await dbClient.homepage.findMany())

  if (!values) throw new Error('No homepage data found')

  return (
    <div className="mx-auto">
      <Header
        links={[
          { href: `/${lang}/menu`, name: 'Menu' },
          { href: `/${lang}/#contact`, name: 'Contact' }
          // {href: `/${lang}/print`, name: "Print"},
          // {href: `/${lang}/preview`, name: "Preview"},
        ]}
        {...values}
      />
      <main>
        <Hero {...values} />
        <Story
        />
      </main>
      <Footer {...values} />
    </div>
  )
}
