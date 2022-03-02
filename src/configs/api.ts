import { APIHost } from '../utils/constants';

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
  productList: `${getBaseUrl(APIService.public)}/products/list`,

  // signIn: `https://api.gearfocus.div4.pgtest.co/api/authentication/login`,
  // userProfile: `${getBaseUrl(APIService.public)}/user`,
};
