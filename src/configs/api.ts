import { APIHost } from '../utils/constants';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../src/utils/constants';

enum APIService {
  auth,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/apiAdmin`;
  } else if (service === APIService.public) {
    return `${APIHost}/api`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.public)}/authentication/login`,
  products: `${getBaseUrl(APIService.public)}/products/list`,
  categories: `${getBaseUrl(APIService.public)}/categories/list`,
  brands: `${getBaseUrl(APIService.auth)}/brands/list`,
  users: `${getBaseUrl(APIService.auth)}/users/list`,
  role: `${getBaseUrl(APIService.auth)}/commons/role`,
  country: `${getBaseUrl(APIService.auth)}/commons/country`,
  shipping: `${getBaseUrl(APIService.auth)}/shipping/list`,
};

export const API_HEADER = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
  },
};
