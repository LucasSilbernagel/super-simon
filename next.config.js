/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production'

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: prod ? false : true,
  skipWaiting: true,
  exclude: [
    ({ asset }) => {
      if (
        asset.name.startsWith("server/") ||
        asset.name.match(/^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/)
      ) {
        return true;
      }
      if (!prod && !asset.name.startsWith("static/runtime/")) {
        return true;
      }
      return false;
    }
  ],
})

module.exports = withPWA({
  // next.js config
})
