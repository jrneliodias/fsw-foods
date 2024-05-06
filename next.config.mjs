/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "utfs.io" }, { hostname: "https://lh3.googleusercontent.com" }]
    }
};

export default nextConfig;
