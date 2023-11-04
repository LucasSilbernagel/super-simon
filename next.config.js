/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production'

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
	reactStrictMode: true,
	pwa: {
		dest: "public",
		register: true,
    disable: prod ? false : true,
		skipWaiting: true,
		runtimeCaching,
		buildExcludes: [/middleware-manifest.json$/]
	}
});

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   disable: prod ? false : true,
//   skipWaiting: true,
//   runtimeCaching: [
//     {
//       urlPattern: /\/_next\/static\/chunks\/pages\/.*/,
//       handler: 'CacheFirst', // Or any other strategy
//       options: {
//         cacheName: 'html-cache',
//       },
//     },
//   ],
// })

// module.exports = withPWA({
//   // next.js config
// })
