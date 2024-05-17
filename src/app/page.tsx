import { getPagesData } from "@/models/Page"
import { isDev } from "@/utils"
import Image from "next/image"
import Link from "next/link"

export const revalidate = isDev() ? 0 : 3600

export default async function Home() {
  const values = (await getPagesData()).find(({id}) => id === "Root")

  if (!values) return <div>500...</div>

  return (
    <div className="mr-auto lg:mr-[300px]">
      {values.image ? (
        <Image
          src={values.image}
          width={896}
          height={288}
          className="mx-auto max-w-4xl aspect-[3/1] object-cover"
          alt="Cover image"
        />
      ) : null}
      <div className="mx-auto p-12 max-w-4xl bg-gray-300">
        <h1 className="text-3xl">
          {values.name}
        </h1>
        <h2 className="text-xl">
          {values.description}
        </h2>
        <Link href={"/print"} target={"_blank"}>Printable menu</Link>
      </div>
    </div>
  )
}
