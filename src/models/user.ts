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
  profile_id: string;
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
  checked?: boolean
}
export interface IUserParams {
  access_level: string
  companyName: string | undefined
  default_card_id: string
  earning: number
  email: string
  password?: string;
  confirm_password?: string;
  expense: string
  firstName: string
  first_login: string
  forceChangePassword: string
  income: string
  joined: string
  language: string
  lastName: string
  last_login: string
  membership_id: string | undefined
  order_as_buyer: number
  order_as_buyer_total: number
  paymentRailsId: string | undefined
  paymentRailsType: string | string | undefined
  pending_membership_id: string | undefined
  products_total: string
  profile_id: string
  referer: string
  roles: []
  status: string
  statusComment: string
  taxExempt: string
  vendor_id: string
}