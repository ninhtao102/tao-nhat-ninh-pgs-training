export interface IProductFilter {
  availability: string;
  category: string;
  search: string;
  search_type: string;
  stock_status: string;
  vendor: string;
}

export interface IUserFilter {
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
