const { createSecureHeaders } = require('next-secure-headers')

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_flexsearch: true,
  unstable_staticImage: true,
})

module.exports = withNextra({
  headers: () => {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders(),
      },
    ]
  },
  redirects: () => {
    return [
      {
        source: '/cross-chain',
        destination: '/cross-chain/transfers',
        statusCode: 301,
      },
      {
        source: '/general-message-passing',
        destination: '/general-message-passing/searchGMP',
        statusCode: 301,
      },
    ]
  },
})
