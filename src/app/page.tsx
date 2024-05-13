import { Box } from "@chakra-ui/react"
import { Main } from "@/components"
import { GetMenuData } from "../utils"

export default async function Home() {
  const values = await GetMenuData()

  return (
    <Box padding={"3em"}>
      <Main data={{values}} isLoading={!values} />
    </Box>
  )
}
