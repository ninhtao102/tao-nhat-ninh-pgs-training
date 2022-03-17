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
