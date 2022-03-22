import { IShippingParams } from './utils';
export interface IProductFilter {
  keywords: string;
  categories: string;
  stockStatus: string;
  availability: string;
  vendor: string;
}

export interface IUserFilter {
  keywords: string;
  membership: string;
  userTypes: string;
  status: string;
  address: IAddress[];
  userActivity: string;
  dateRange: string;
}

export interface IUserRole {
  id: string;
  name: string;
  // administrator: {
  //   id: string;
  //   enabled: string;
  //   name: string;
  // };
  // customer: {
  //   id: string;
  //   name: string;
  // };
}

export interface IAddress {
  // country: '' | IShippingParams[];
  country: any;
  state: string;
  address: string;
  phone: string;
}
