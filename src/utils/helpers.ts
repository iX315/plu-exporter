import type { Group, Product } from "@/generated/prisma/client"
import { db } from "@/utils/databaseProxy"

export type Menu = {
  group: Group
  products: Product[]
}

export const getMenuData = async (lang?: string): Promise<Menu[]> => {
  let products = await db('Product', {where: {language: lang}})
  let groups = await db('Group', {where: {language: lang}})

  console.log(products)
  console.log(groups)
  if (products.length > 0 && groups.length > 0) {
    return groups.map((group) => ({
      group,
      products: products.filter((product) => product.group === group.name),
    }))
  } else {
    return []
  }
}
