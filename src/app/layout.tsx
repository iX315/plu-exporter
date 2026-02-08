import "@/styles/globals.css"

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html>
      <body className="custom-theme">
        {children}
        {process.env.NEXT_PUBLIC_CUSTOM_THEME_URL ? (
          <link
            rel="stylesheet"
            crossOrigin="anonymous"
            href={process.env.NEXT_PUBLIC_CUSTOM_THEME_URL}
          />
        ) : null}
      </body>
    </html>
  )
}
