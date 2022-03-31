import { APIHost } from '../utils/constants';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../src/utils/constants';

enum APIService {
  auth,
  public,
  vendor
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/apiAdmin`;
  } else if (service === APIService.public) {
    return `${APIHost}/api`;
  } else if (service === APIService.vendor) {
    return `${APIHost}/apiVendor`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.public)}/authentication/login`,
  // users api
  users: `${getBaseUrl(APIService.auth)}/users/list`,
  usersEdit: `${getBaseUrl(APIService.auth)}/users/edit`,
  userDetail: `${getBaseUrl(APIService.vendor)}/profile/detail`,
  usersCreate: `${getBaseUrl(APIService.auth)}/users/create`,
  // common api
  categories: `${getBaseUrl(APIService.public)}/categories/list`,
  brands: `${getBaseUrl(APIService.auth)}/brands/list`,
  role: `${getBaseUrl(APIService.auth)}/commons/role`,
  country: `${getBaseUrl(APIService.auth)}/commons/country`,
  shipping: `${getBaseUrl(APIService.auth)}/shipping/list`,
  vendors: `${getBaseUrl(APIService.auth)}/vendors/list`,
  // products api
  products: `${getBaseUrl(APIService.public)}/products/list`,
  productEdit: `${getBaseUrl(APIService.auth)}/products/edit`,
  productDetail: `${getBaseUrl(APIService.auth)}/products/detail`,
  productCreate: `${getBaseUrl(APIService.auth)}/products/create`,
  uploadImage: `${getBaseUrl(APIService.public)}/products/upload-image`,
};

export const API_HEADER = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
  },
};
