import Link from 'next/link'

import { getMenuData } from '@/models/Menu'
import { getHomepageData } from '@/models/Homepage'

export const revalidate = 600

export default async function MenuPage(props: PageProps<'/[lang]/menu'>) {
  const { lang } = await props.params
  const values = await getHomepageData()
  const menuData = await getMenuData(lang)

  if (!menuData) return <div>No menu data available</div>

  // Get unique group names for tabs
  const tabNames = menuData.map((menu) => menu.group.name)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <Link href="/" className="text-2xl font-bold">
            {values.logo ? <img src={values.logo} alt={`${values.name} logo`} className="h-12 w-auto" /> : values.name}
          </Link>
          <p className="mt-2 text-gray-600">Browse our selection of dishes</p>
        </header>

        {/* Tabs */}
        <div className="mb-8">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
              defaultValue={tabNames[0]}
            >
              {tabNames.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabNames.map((name, index) => (
                  <a
                    key={name}
                    href={`#${name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      index === 0
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menuData.map((menu, menuIndex) => (
            <section
              key={menuIndex}
              id={menu.group.name.toLowerCase().replace(/\s+/g, '-')}
              className="space-y-6"
            >
              {menu.group.pre && (
                <p className="text-sm text-gray-500">{menu.group.pre}</p>
              )}
              <h2 className="text-2xl font-bold text-orange-600">
                {menu.group.name}
              </h2>
              {menu.group.description && (
                <p className="text-gray-600">{menu.group.description}</p>
              )}
              <div className="grid gap-6">
                {menu.products.map((product) => (
                  <div
                    key={product.plu || product.name}
                    className="group relative aspect-[4/5] overflow-hidden rounded-lg"
                  >
                    {product.image && (
                      <img
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        src={`https://static.funwero.xyz/images/${product.image}`}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{
                          position: 'absolute',
                          height: '100%',
                          width: '100%',
                          left: 0,
                          top: 0,
                          right: 0,
                          bottom: 0,
                          color: 'transparent'
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-900/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {product.details && (
                        <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 text-xs bg-secondary text-secondary-foreground mb-3">
                          {product.details}
                        </span>
                      )}
                      <h3 className="font-serif text-2xl font-bold text-primary-foreground">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-primary-foreground/70 whitespace-pre-line">
                          {product.description}
                        </p>
                      )}
                      <p className="mt-3 text-lg font-semibold text-accent">
                        {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {menu.group.post && (
                <p className="text-sm text-gray-500">{menu.group.post}</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
