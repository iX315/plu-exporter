"use client"
import { Box, Grid, Text } from "@chakra-ui/react"
import { ProductData } from "@/models/Product"

export const ProductRow = ({
  plu,
  name,
  allergies,
  details,
  description,
  size,
  price,
}: ProductData) => (
  <Grid
    templateColumns="10% 1fr 10% 10%"
    gap={2}
    className={"avoidBreakPageInside"}
  >
    <Text>{plu}</Text>
    <Box>
      <Text as="b">{name}</Text>
      {allergies && " "}
      <Text as="sup">{allergies}</Text>
      {details && " "}
      <Text as="i">{details}</Text>
      <br />
      <Text size="sm" whiteSpace="pre-line">
        <i>{description}</i>
      </Text>
    </Box>
    <Text>{size}</Text>
    <Text>{price}</Text>
  </Grid>
)
