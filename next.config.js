// Info: (20240916 - Murky) use react-i18next instead of next-i18next
// const { i18n } = require('./next-i18next.config');

function getEnvVariables(keys) {
  const missingKeys = [];

  keys.forEach((key) => {
    const value = process.env[key];
    if (!value) {
      missingKeys.push(key);
    }
  });

  if (missingKeys.length > 0) {
    throw new Error(`Missing environment variables: ${missingKeys.join(', ')}`);
  }
}

const requiredEnvVars = ['NEXT_PUBLIC_AICH_URL'];

if (process.env.VERCEL !== '1') {
  getEnvVariables(requiredEnvVars);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config options
  reactStrictMode: true,
  // Info: (20240916 - Murky) use react-i18next instead of next-i18next
  // i18n,
};

module.exports = nextConfig;
