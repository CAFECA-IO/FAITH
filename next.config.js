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

const requiredEnvVars = [
  'NEXT_PUBLIC_AICH_URL',
];

// Validate environment variables
getEnvVariables(requiredEnvVars);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config options
  reactStrictMode: true,
};

module.exports = nextConfig;
