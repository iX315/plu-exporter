// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type MenuData = {
  group: GroupData
  products: ProductData[]
}

export type GroupData = {
  Name: string
  Description: string
  pre: string
  post: string
  page: number
}

export type ProductData = {
  PLU: number
  Group: string
  Name: string
  Allergies: string
  Details: string
  Description: string
  Size: string
  Price: number
  Page: number
}

export type Data = {
  values: MenuData[]
}

const SheetDB_Api_Call = (params: any = {}) => {
  const envUser = process.env.SHEETDB_API_USERNAME ?? ''
  const envPass = process.env.SHEETDB_API_PASSWORD ?? ''
  let envUrl = process.env.SHEETDB_API_URL ?? ''

  const options: RequestInit = {
    headers: {
      Authorization: 'Basic ' + Buffer.from(envUser + ':' + envPass).toString('base64')
    }
  }

  if (params) {
    const urlParams = new URLSearchParams(params).toString()
    envUrl = envUrl + '?' + urlParams
  }
  return fetch(envUrl, options)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const productsCall = await SheetDB_Api_Call()
  const groupsCall = await SheetDB_Api_Call({ "sheet": "Groups" })

  if (productsCall.ok && groupsCall.ok) {
    const products = await productsCall.json() as ProductData[]
    const groups = await groupsCall.json() as GroupData[]

    const menuData: MenuData[] = groups.map((group) => (
      {
        group,
        products: products.filter(product => product.Group === group.Name)
      }
    ))

    res.status(200).json({ values: menuData })
  } else {
    res.status(500).json({ values: [] })
  }
}
