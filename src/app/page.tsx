import { Box } from "@chakra-ui/react"
import { Main } from "@/components"

async function getData() {
  const res = await fetch("/api/data")
  return res.json()
}

export default async function Home() {
  const data = await getData()

  return (
    <Box padding={"3em"}>
      <Main data={data} isLoading={!data} />
    </Box>
  )
}
