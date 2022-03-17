export interface IProductFilter {
  keywords: string;
  categories: string;
  stockStatus: string;
  availability: string;
  vendor: string;
}

export interface ICategories {
  id: string;
  name: string;
}

export interface IUserFilter {
  keywords: string;
  membership: string;
  userTypes: string;
  status: string;
  country: string;
  state: string;
  address: string;
  phone: string;
  userActivity: string;
  dateRange: string;
}

export interface IUserRole {
  administrator: {
    id: string;
    enabled: string;
    name: string;
  };
  customer: {
    id: string;
    name: string;
  };
}

export interface ICountry {
  code: string;
  code3: string;
  country: string;
  currency_id: string;
  enabled: string;
  id: string;
}
