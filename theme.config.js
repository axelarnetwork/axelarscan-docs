import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import Image from 'next/image'

const Logo = ({ width, height }) => (
  <>
    <div className="flex dark:hidden items-center">
      <Image
        src="/logos/logo.png"
        alt=""
        width={width}
        height={height}
      />
    </div>
    <div className="hidden dark:flex items-center">
      <Image
        src="/logos/logo_white.png"
        alt=""
        width={width}
        height={height}
      />
    </div>
  </>
)

const TITLE_WITH_TRANSLATIONS = {
  'en-US': 'API Documentation',
}

const FEEDBACK_LINK_WITH_TRANSLATIONS = {
  'en-US': 'Question? Give us feedback →',
}

export default {
  project: { link: 'https://github.com/axelarnetwork/axelarscan-docs' },
  docsRepositoryBase: 'https://github.com/axelarnetwork/axelarscan-docs/blob/main/pages',
  titleSuffix: ' | Axelarscan',
  unstable_flexsearch: true,
  sidebar: { defaultMenuCollapseLevel: 0 },
  feedback: {
    labels: 'feedback',
    content: () => {
      const { locale } = useRouter()
      return FEEDBACK_LINK_WITH_TRANSLATIONS[locale] || FEEDBACK_LINK_WITH_TRANSLATIONS['en-US']
    },
  },
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  logo: () => {
    const { locale } = useRouter()
    return (
      <>
        <Logo width={24} height={24} />
        <span title={`Axelarscan | ${TITLE_WITH_TRANSLATIONS[locale] || TITLE_WITH_TRANSLATIONS['en-US']}`} className="hidden md:inline select-none font-extrabold mx-2">
          Axelarscan
        </span>
        <span className="hidden md:inline select-none text-slate-500 dark:text-slate-400 mx-1">
          API Documentation
        </span>
      </>
    )
  },
  footer: {
    text: (
      <a
        href="https://axelarscan.io"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-600 dark:text-white"
      >
        Axelarscan
      </a>
    ),
  },
  useNextSeoProps() {
    const { frontMatter } = useConfig()
    let { description, image } = { ...frontMatter }
    description = description || 'Axelarscan API Documentation'
    image = image || '/images/ogimage.png'
    return {
      additionalLinkTags: [
        {
          rel: 'apple-touch-icon',
          href: '/icons/apple-touch-icon.png',
          sizes: '180x180',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icons/android-chrome-192x192.png',
          sizes: '192x192',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icons/favicon-32x32.png',
          sizes: '32x32',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icons/favicon-16x16.png',
          sizes: '16x16',
        },
        {
          rel: 'manifest',
          href: '/icons/site.webmanifest',
        },
        {
          rel: 'mask-icon',
          href: '/icons/safari-pinned-tab.svg',
          color: '#000000',
        },
      ],
      additionalMetaTags: [
        { httpEquiv: 'Content-Language', content: 'en' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'apple-mobile-web-app-title', content: 'Axelarscan' },
        { name: 'og:title', content: 'Axelarscan | API Documentation' },
        { name: 'description', content: description },
        { name: 'og:description', content: description },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@axelarcore' },
        { name: 'twitter:image', content: image },
        { name: 'og:image', content: image },
      ],
      description,
      openGraph: {
        images: [{ url: image }]
      },
      titleTemplate: '%s | Axelarscan',
    }
  },
}