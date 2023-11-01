// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Data, GroupData, MenuData, ProductData } from "../../types";
import { SheetDBApiCall } from "../../utils/Api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const productsCall = await SheetDBApiCall();
  const groupsCall = await SheetDBApiCall({ sheet: "Groups" });

  if (productsCall.ok && groupsCall.ok) {
    const products = (await productsCall.json()) as ProductData[];
    const groups = (await groupsCall.json()) as GroupData[];

    const menuData: MenuData[] = groups.map((group) => ({
      group,
      products: products.filter((product) => product.Group === group.Name),
    }));

    res.status(200).json({ values: menuData });
  } else {
    res.status(500).json({ values: [] });
  }
}
