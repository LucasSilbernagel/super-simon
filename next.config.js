/** @type {import('next').NextConfig} */
import runtimeCaching from 'next-pwa/cache.js';

const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: prod ? false : true,
  skipWaiting: true,
  runtimeCaching
})

module.exports = withPWA({
  // next.js config
})
