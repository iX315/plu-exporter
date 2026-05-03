import { getHomepageData } from '@/models/Homepage'
import { Footer, Header, Hero, Story } from '@/components'

export const revalidate = 600

export default async function Homepage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params
  const values = await getHomepageData()

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
