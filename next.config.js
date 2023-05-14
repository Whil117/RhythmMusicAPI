const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.scdn.co',
      'via.placeholder.com',
      'seed-mix-image.spotifycdn.com',
      'dailymix-images.scdn.co'
    ],
    formats: ['image/avif', 'image/webp']
  }
};

module.exports = nextConfig;
