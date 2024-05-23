/** @type {import('next').NextConfig} */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nextConfig = {
  images: {
    domains: ['api.dicebear.com', 'xsgames.co'],
  },
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add webpack plugins and configurations here
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(
              __dirname,
              './node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
            ),
            to: path.join(__dirname, 'dist'),
          },
        ],
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
