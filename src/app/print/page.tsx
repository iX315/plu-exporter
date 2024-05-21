import { Main } from "@/components"
import { getMenuData } from "@/models/MenuData"

export const revalidate = 600

export default async function Home() {
  const values = await getMenuData()

  return (
    <div className={"p-6 sm:p-12"}>
      <Main data={{values}} isLoading={!values} />
    </div>
  )
}
