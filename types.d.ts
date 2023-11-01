export type MenuData = {
  group: GroupData;
  products: ProductData[];
};

export type GroupData = {
  Name: string;
  Description: string;
  pre: string;
  post: string;
  page: number;
};

export type ProductData = {
  PLU: number;
  Group: string;
  Name: string;
  Allergies: string;
  Details: string;
  Description: string;
  Size: string;
  Price: number;
  Page: number;
};

export type Data = {
  values: MenuData[];
};
