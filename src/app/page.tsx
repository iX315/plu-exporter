import { permanentRedirect } from 'next/navigation'

export default function RootPage() {
  const langTag = navigator.language.split('-')[0]
  permanentRedirect(process.env.LANGUAGES?.split(',')[0] ?? `/${langTag}/`)
}