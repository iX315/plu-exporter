"use client"
import { Box, Text } from "@chakra-ui/react"
import { MenuData } from "@/models/MenuData"
import { ProductRow } from "./"
import { MutableRefObject } from "react"

export const Item = ({
  pageRef,
  group,
  products,
}: MenuData & { pageRef: MutableRefObject<number> }) => {
  let addBreakBefore = ""

  if (group.page !== pageRef.current) {
    pageRef.current = group.page
    addBreakBefore = "breakPageBefore"
  }

  return (
    <Box pb={"2em"} className={`avoidBreakPageInside ${addBreakBefore}`}>
      <Text>{group.pre}</Text>
      <Text as="h2" color="orange">
        <b>
          <i>{group.name}</i>
        </b>
      </Text>
      <Text as="h3" color="orange" size="13px" py={"0.2em"}>
        <i>{group.description}</i>
      </Text>
      <Box py={"1em"}>
        {products.map((product, i) => (
          <ProductRow key={i} {...product} />
        ))}
      </Box>
      <Text align={"center"} size="md">
        <b>
          <i>{group.post}</i>
        </b>
      </Text>
    </Box>
  )
}
