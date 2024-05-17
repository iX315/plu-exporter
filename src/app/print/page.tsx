import { Box } from "@chakra-ui/react"
import { Main } from "@/components"
import { getMenuData } from "@/models/MenuData"
import { isDev } from "@/utils"

export const revalidate = isDev() ? 0 : 3600

export default async function Home() {
  const values = await getMenuData()

  return (
    <Box padding={"3em"}>
      <Main data={{values}} isLoading={!values} />
    </Box>
  )
}
