export interface IPriceInventory {
  membership: string;
  tax: boolean;
  price: string;
  sale: boolean;
  saledPrice: string;
  arrivalDate: string;
  quantityInStock: string;
}

export interface IShipping {
  continental: string;
  zone: string;
}

export interface IMarketing {
  metaTags: string;
  metaDesc: string;
  metaKeywords: string;
  productPageTitle: string;
  facebookFeed: boolean;
  googleFeed: boolean;
}

export interface IAuth {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: string;
}

export interface IAccess {
  accessLevel: string;
  memberShip: string;
  require: boolean;
}

export interface ITax {
  tax: boolean;
}
