import { Group, defaultGroup, getGroupsData } from "./Group"
import { Product as Product, getProductData } from "./Product"

export type Menu = {
  group: Group
  products: Product[]
}

export const defaultMenu: Menu = {
  group: defaultGroup,
  products: [],
}

export const getMenuData = async () => {
  const products = await getProductData()
  const groups = await getGroupsData()

  if (Array.isArray(products) && Array.isArray(groups)) {
    return groups.map((group) => ({
      group,
      products: products.filter((product) => product.group === group.name),
    }))
  } else {
    return [defaultMenu]
  }
}
