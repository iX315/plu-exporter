import { filterByLanguage } from "../utils/helpers"
import { Group, defaultGroup, getGroupsData } from "./Group"
import { Product as Product, getProductData } from "./Product"

export type Menu = {
  group: Group
  products: Product[]
}

export const getMenuData = async (lang?: string): Promise<Menu[]> => {
  let products = await getProductData()
  let groups = await getGroupsData()

  if (products.length > 0 && groups.length > 0) {
    if (lang) {
      groups = filterByLanguage(groups, lang)
      products = filterByLanguage(products, lang)
    }
  
    return groups.map((group) => ({
      group,
      products: products.filter((product) => product.group === group.name),
    }))
  } else {
    return [
      {
        group: defaultGroup,
        products: [],
      }
    ]
  }
}
