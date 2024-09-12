export const NATIVE_ROUTE = {
  HOME: '/',
  CONTACT_US: '/#contact-us',
  LOGIN: '/users/login',
  DISCOVER: '/discover',
  OVERVIEW: '/overview',
};

export const NATIVE_API = {
  SIGN_IN: '/api/v1/sign-in',
  SIGN_UP: '/api/v1/sign-up',
  SIGN_OUT: '/api/v1/sign-out',
};

const AICH_URL = process.env.NEXT_PUBLIC_AICH_URL || '';

export const CHAT_URL = `${AICH_URL}/api/v1/rag/chat`;
export const CHAT_WITH_HISTORY_URL = `${AICH_URL}/api/v1/rag/chat-with-history`;

export const I_SUN_FA_URL = {
  CONTACT_US: `https://isunfa.com/#contact-us`,
};
