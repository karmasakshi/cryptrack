module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'resources.cryptocompare.com',
        port: '',
        pathname: '/asset-management/**',
      },
    ],
  },
};
