export interface AuthToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface IUser {
  profile_id: string;
  login: string;
  firstName: number | null;
  lastName: number | null;
  dateOfLoginAttempt: string;
  countOfLoginAttempts: string;
  forceChangePassword: string;
}

export interface IUserItem {
  id: string;
  vendor: string;
  storeName: string;
  fistName: string;
  lastName: string;
  access_level: string;
  product: number;
  order: {
    order_as_buyer: number;
    order_as_buyer_total: number;
  };
  wishlist: string;
  created: string;
  last_login: string;
}

export interface IUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
  paymentRailsType: string;
  access_level: string;
  memberShip: string;
  require: boolean;
  taxExempt: boolean;
  forceChangePassword: number;
  membership_id: string;
}
