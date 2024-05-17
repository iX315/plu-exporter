import { GroupData, defaultGroupData, getGroupsData } from "./Group"
import { ProductData, getProductData } from "./Product"

export type MenuData = {
  group: GroupData
  products: ProductData[]
}

export const defaultMenuData: MenuData = {
  group: defaultGroupData,
  products: [],
}

export const getMenuData = async () => {
  const products = await getProductData()
  const groups = await getGroupsData()

  if (Array.isArray(products) && Array.isArray(groups)) {
    return groups.map((group) => ({
      group,
      products: products.filter((product) => product.Group === group.Name),
    }))
  } else {
    return [defaultMenuData]
  }
}
