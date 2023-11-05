// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Data, GroupData, MenuData, ProductData } from "../../types";
import { GoogleSheetsApiCall } from "../../utils/Api";

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
  } as ProductData);

const parseGroup = (group: string[]) =>
  ({
    Name: group[0],
    Description: group[1],
    pre: group[2],
    post: group[3],
    page: Number(group[4]),
  } as GroupData);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const menuApiResponse = await GoogleSheetsApiCall();
  const groupsApiResponse = await GoogleSheetsApiCall({ sheetName: "Groups" });
  const arraysAreValid =
    Array.isArray(menuApiResponse) && Array.isArray(groupsApiResponse);

  const products: ProductData[] = menuApiResponse.map(parseProduct);
  const groups: GroupData[] = groupsApiResponse.map(parseGroup);

  if (arraysAreValid) {
    const menuData: MenuData[] = groups.map((group) => ({
      group,
      products: products.filter((product) => product.Group === group.Name),
    }));

    res.status(200).json({ values: menuData });
  } else {
    res.status(500).json({ values: [] });
  }
}
