// next.config.mjs

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://m.stripe.network;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https://files.cdn.printful.com;
  connect-src 'self' ws://localhost:3001 https://api.stripe.com https://m.stripe.network;
  font-src 'self' https://fonts.gstatic.com;
  frame-src https://js.stripe.com;
`;

const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\n/g, ''),
    },
];

export default {
    reactStrictMode: true,
    images: {
        domains: ['files.cdn.printful.com'],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
};
