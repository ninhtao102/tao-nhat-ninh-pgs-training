export interface IProductFilter {
  searchKey: string;
  category: string;
  stockStatus: string;
  searchIn: string[];
  availability: string;
  vendor: string;
}

export interface IProductItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  price: string;
  amount: number;
  vendor: string;
  arrivalDate: string;
  checked?: boolean;
}

export interface IProductParams {
  vendor: string;
  productTitle: string;
  brand: string;
  condition: string;
  sku: string;
  images: any;
  category: string;
  description: any;
  sale: number;
}

export interface IPriceInventory {
  membership: string;
  price: string | number;
  arrivalDate: Date;
}
