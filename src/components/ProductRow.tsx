"use client"
import { Box, Grid, Text } from "@chakra-ui/react"
import { ProductData } from "@/types"

export const ProductRow = ({
  PLU,
  Name,
  Allergies,
  Details,
  Description,
  Size,
  Price,
}: ProductData) => (
  <Grid
    templateColumns="10% 1fr 10% 10%"
    gap={2}
    className={"avoidBreakPageInside"}
  >
    <Text>{PLU}</Text>
    <Box>
      <Text as="b">{Name}</Text>
      {Allergies && " "}
      <Text as="sup">{Allergies}</Text>
      {Details && " "}
      <Text as="i">{Details}</Text>
      <br />
      <Text size="sm" whiteSpace="pre-line">
        <i>{Description}</i>
      </Text>
    </Box>
    <Text>{Size}</Text>
    <Text>{Price}</Text>
  </Grid>
)
