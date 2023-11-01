import { Box, Text } from "@chakra-ui/react";
import { MenuData } from "../types";
import { ProductRow } from "./ProductRow";

let page = 1;

export const Item = ({ group, products }: MenuData) => {
  let addBreakBefore = "";

  if (group.page !== page) {
    page = group.page;
    addBreakBefore = "breakPageBefore";
  }

  return (
    <Box pb={"2em"} className={`avoidBreakPageInside ${addBreakBefore}`}>
      <Text>{group.pre}</Text>
      <Text as="h2" color="orange">
        <b>
          <i>{group.Name}</i>
        </b>
      </Text>
      <Text as="h3" color="orange" size="13px" py={"0.2em"}>
        <i>{group.Description}</i>
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
  );
};
