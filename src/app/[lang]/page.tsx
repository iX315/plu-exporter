import { getPagesData } from "@/models/Page"
import Link from "next/link"

export const revalidate = 600

export default async function Home(props: PageProps<'/[lang]'>) {
  const {lang} = await props.params
  const values = (await getPagesData()).find(({id}) => id === "Root")

  if (!values) return <div>500...</div>

  return (
    <div className="mr-auto lg:mr-75">
      {values.image ? (
        <img
          src={values.image}
          width={896}
          height={288}
          className="mx-auto max-w-4xl aspect-3/1 object-cover"
          alt="Cover image"
        />
      ) : null}
      <div className="mx-auto p-12 max-w-4xl bg-gray-300">
        <h1 className="text-3xl">
          {values.name}
        </h1>
        <h2 className="text-xl pb-2">
          {values.description}
        </h2>
        <Link href={`/${lang}/print`}>
          Menu -&gt;
        </Link>
        <Link href={`/${lang}/preview`} className="hidden"></Link>
      </div>
    </div>
  )
}
