import Link from 'next/link'

interface FooterProps {
  name?: string
  description?: string
  links?: {
    name: string
    href: string
  }[]
  address?: string
  phone?: string
  email?: string
  twitter?: string
  instagram?: string
}

export const Footer = ({ name, description, links, address, phone, email, twitter, instagram }: FooterProps) => (
  <footer className="bg-primary text-primary-foreground">
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link className="font-serif text-2xl font-bold" href="/">{name}</Link>
          <p className="mt-4 text-sm leading-relaxed opacity-80">{description}</p>
          <div className="mt-6 flex gap-4">
            <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100" aria-label="Instagram"></a>
            <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100" aria-label="Twitter"></a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Navigate</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {links?.map(({ name, href }, index) => (
              <li key={`${index}_${name}`}>
                <Link className="text-sm opacity-70 transition-opacity hover:opacity-100" href={href}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {address && (
            <>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Address</h3>
              <ul className="mt-4 flex flex-col gap-4">
                <li>
                  <a className="group flex items-start gap-2" href="#"><div>
                    <p className="text-sm font-medium opacity-90 transition-opacity group-hover:opacity-100">Downtown</p>
                    <p className="text-xs opacity-60">{address}</p>
                  </div>
                  </a>
                </li>
              </ul>
            </>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Get in Touch</h3>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <a href={`tel:{phone}`} className="flex items-center gap-2 text-sm opacity-70 transition-opacity hover:opacity-100">
                {phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm opacity-70 transition-opacity hover:opacity-100">
                {email}
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wider opacity-60">Newsletter</p>
            <p className="mt-1 text-xs opacity-50">Subscribe for exclusive offers and seasonal menu updates.</p>
          </div>
        </div>
      </div>
      <div data-orientation="horizontal" role="none" data-slot="separator" className="shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-10 bg-primary-foreground/15"></div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-xs opacity-50">© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <div className="flex gap-6">
          <Link className="text-xs opacity-50 transition-opacity hover:opacity-100" href="/contact">Privacy Policy</Link>
          <Link className="text-xs opacity-50 transition-opacity hover:opacity-100" href="/contact">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
)