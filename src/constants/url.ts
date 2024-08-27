export const NATIVE_ROUTE = {
  HOME: '/',
  CONTACT_US: '/#contact-us',
  LOGIN: '/users/login',
  DISCOVER: '/discover',
};

export const NATIVE_API = {
  SIGN_IN: '/api/v1/sign-in',
  SIGN_UP: '/api/v1/sign-up',
  SIGN_OUT: '/api/v1/sign-out',
};

export const DEFAULT_AICH_URL = 'https://aich.isunfa.com';

const AICH_ENDPOINTS: { [key: string]: string } = {
  LLAMA_CHAT: '/api/v1/rag/chat',
  LLAMA_HISTORY_CHAT: '/api/v1/rag/chat-with-history',
};

export function getApiUrl(aichUrl:string, endpointKey: string) {
  return aichUrl + AICH_ENDPOINTS[endpointKey];
}
