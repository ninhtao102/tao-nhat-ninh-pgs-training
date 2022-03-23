export interface IBrands {
  id: string;
  name: string;
}

export interface ICategories {
  id: string;
  name: string;
  parentId: string;
  path: string;
  pos: string;
}

export interface IShippingParams {
  id: string | undefined;
  name: string;
}

export interface ISort {
  order_by: string;
  sort: Order;
}

export type Order = 'asc' | 'desc';
