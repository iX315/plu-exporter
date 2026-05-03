import Link from 'next/link'

interface HeaderProps {
  logo?: string
  name?: string
  links?: {
    name: string
    href: string
  }[]
  cta?: {
    name: string
    href: string
    variant?: 'primary' | 'secondary'
  }
}

export const Header = ({ name: siteName, logo, links, cta }: HeaderProps) => (
  <header className="sticky top-0 z-50 w-full bg-body/80 backdrop-blur-lg">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
      <Link href="/" className="text-2xl font-bold">
        {logo ? <img src={logo} alt={`${siteName} logo`} className="h-12 w-auto" /> : siteName}
      </Link>
      <nav className="hidden items-center gap-1 lg:flex">
        {links?.map(({ href, name }, index) => (
          <Link
            key={`${index}_${name}`}
            href={href}
            className="px-3 py-2 hover:text-secondary rounded-md text-sm font-medium"
          >
            {name}
          </Link>
        ))}
      </nav>
      <div className="hidden min-w-px items-center gap-3 lg:flex">
        {cta ? (
          <Link
            key={cta.name}
            href={cta.href}
            className={`px-4 py-2 rounded ${
              cta.variant === 'primary'
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-secondary text-white hover:bg-secondary/90'
            }`}
          >
            {cta.name}
          </Link>
        ) : null}
      </div>
    </div>
  </header>
)