/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'apistarter.admasolusi.space',
              port: '',
              pathname: '/storage/**',
            },
          ],
    }
};

export default nextConfig;
