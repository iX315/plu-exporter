import { GroupData, getGroupsData } from "./Group"
import { ProductData, getProductData } from "./Product"

export type MenuData = {
  group: GroupData
  products: ProductData[]
}

export const getMenuData = async () => {
  const products = await getProductData()
  const groups = await getGroupsData()

  if (Array.isArray(products) && Array.isArray(groups)) {
    const menuData: MenuData[] = groups.map((group) => ({
      group,
      products: products.filter((product) => product.Group === group.Name),
    }))

    return menuData
  } else {
    return []
  }
}
