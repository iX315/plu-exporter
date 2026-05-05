import Link from 'next/link'
import { dbClient } from '@/utils/dbClient'

export const revalidate = 600

export default async function MenuPage(props: PageProps<'/[lang]/menu'>) {
  const { lang } = await props.params
  const groupWithProducts = await dbClient.group.findMany({ where: { language: lang }, include: { products: true } })

  if (!groupWithProducts) return <div>No menu data available</div>

  // Get unique group names for tabs
  const tabNames = groupWithProducts.map(({ name }) => name)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Menu</h1>
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
          {groupWithProducts.map(({ name, pre, description, products, post, uuid }) => (
            <section
              key={uuid}
              id={name.toLowerCase().replace(/\s+/g, '-')}
              className="space-y-6"
            >
              {pre && (
                <p className="text-sm text-gray-500">{pre}</p>
              )}
              <h2 className="text-2xl font-bold text-orange-600">
                {name}
              </h2>
              {description && (
                <p className="text-gray-600">{description}</p>
              )}
              <div className="grid gap-6">
                {products.map((product) => (
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

              {post && (
                <p className="text-sm text-gray-500">{post}</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
