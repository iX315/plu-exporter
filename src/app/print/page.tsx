import { Main } from "@/components"
import { getMenuData } from "@/models/MenuData"
import { isDev } from "@/utils"

export const revalidate = isDev() ? 0 : 3600

export default async function Home() {
  const values = await getMenuData()

  return (
    <div className={"p-12"}>
      <Main data={{values}} isLoading={!values} />
    </div>
  )
}
