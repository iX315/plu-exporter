import { Box, Text } from "@chakra-ui/react"
import { getPagesData } from "@/models/Page"

export default async function Home() {
  const values = (await getPagesData()).find((page) => page.Id === "Root")

  if (!values) return <Box>500...</Box>

  return (
    <Box mr={["auto", "300px"]}>
      {values.Image ? (
        <Box
          mx={"auto"}
          maxW={"980px"}
          bgImage={values.Image}
          aspectRatio={"3/1"}
          bgSize={"cover"}
        />
      ) : null}
      <Box mx={"auto"} p={"3em"} maxW={"980px"} bgColor={"#f3f3f3"}>
        <Text as={"h1"} fontSize={"3xl"}>
          {values.Name}
        </Text>
        <Text as={"h2"} fontSize={"xl"}>
          {values.Description}
        </Text>
      </Box>
    </Box>
  )
}
