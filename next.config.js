const { createSecureHeaders } = require('next-secure-headers')

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_flexsearch: true,
  unstable_staticImage: true,
})

module.exports = withNextra({
  headers: () => { return [{ source: '/(.*)', headers: createSecureHeaders() }] },
  experimental: {
    appDir: false,
  },
})
