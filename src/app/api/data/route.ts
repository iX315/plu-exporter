"use server"
import { NextResponse } from "next/server"
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GroupData, MenuData, ProductData } from "../../../types"
import { GoogleSheetsApiCall, parseGroup, parseProduct } from "../../../utils/Api"

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
