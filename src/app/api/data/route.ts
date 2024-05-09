"use server"
import { NextResponse } from "next/server"
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GroupData, MenuData, ProductData } from "../../../types"
import { GoogleSheetsApiCall } from "../../../utils/Api"

const parseProduct = (product: string[]) =>
  ({
    PLU: product[0] ? Number(product[0]) : null,
    Group: product[1],
    Name: product[2],
    Allergies: product[3],
    Details: product[4],
    Description: product[5],
    Size: product[6],
    Price: product[7],
    Page: Number(product[8]),
  }) as ProductData

const parseGroup = (group: string[]) =>
  ({
    Name: group[0],
    Description: group[1],
    pre: group[2],
    post: group[3],
    page: Number(group[4]),
  }) as GroupData

export async function GET() {
  const menuApiResponse = await GoogleSheetsApiCall()
  const groupsApiResponse = await GoogleSheetsApiCall({ sheetName: "Groups" })
  const arraysAreValid =
    Array.isArray(menuApiResponse) && Array.isArray(groupsApiResponse)

  const products: ProductData[] = menuApiResponse.map(parseProduct)
  const groups: GroupData[] = groupsApiResponse.map(parseGroup)

  if (arraysAreValid) {
    const menuData: MenuData[] = groups.map((group) => ({
      group,
      products: products.filter((product) => product.Group === group.Name),
    }))

    return NextResponse.json({ values: menuData }, { status: 200 })
  } else {
    return NextResponse.json({ values: [] }, { status: 500 })
  }
}
