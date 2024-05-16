import { Box, Container, Text } from "@chakra-ui/react"

export default async function Home() {
  return (
    <Box mr={['0px','300px']}>
      <Box mx={'auto'} p={"3em"} maxW={'980px'} bgColor={"#f3f3f3"}>
        <Text as={'h1'} fontSize={"3xl"}>SiteName</Text>
      </Box>
    </Box>
  )
}
