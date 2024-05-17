import { Box, Text } from "@chakra-ui/react"
import { getPagesData } from "@/models/Page"
import { isDev } from "@/utils"
import Link from "next/link"

export const revalidate = isDev() ? 0 : 3600

export default async function Home() {
  const values = (await getPagesData()).find(({id}) => id === "Root")

  if (!values) return <Box>500...</Box>

  return (
    <Box mr={["auto", "300px"]}>
      {values.image ? (
        <Box
          mx={"auto"}
          maxW={"980px"}
          bgImage={values.image}
          aspectRatio={"3/1"}
          bgSize={"cover"}
        />
      ) : null}
      <Box mx={"auto"} p={"3em"} maxW={"980px"} bgColor={"#f3f3f3"}>
        <Text as={"h1"} fontSize={"3xl"}>
          {values.name}
        </Text>
        <Text as={"h2"} fontSize={"xl"}>
          {values.description}
        </Text>
        <Link href={"/print"} target={"_blank"}>Printable menu</Link>
      </Box>
    </Box>
  )
}
