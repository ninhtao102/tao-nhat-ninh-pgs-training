import { IShippingParams } from './utils';
export interface IProductFilter {
  keywords: string;
  categories: string;
  stockStatus: string;
  availability: string;
  vendor: string;
}

export interface IUserFilter {
  // keywords: string;
  // membership: string;
  // userTypes: string;
  // status: string | undefined;
  // country: any;
  // // country: string;
  // state: string;
  // address: string;
  // phone: string;
  // userActivity: string;
  // dateRange: string;
  address: string;
  country: string;
  date_range: [];
  date_type: string;
  memberships: [];
  phone: string;
  search: string;
  sort: string;
  state: string;
  status: [];
  types: [];
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
