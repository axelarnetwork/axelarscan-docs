import { useRouter } from 'next/router'
import Image from 'next/image'

const Logo = ({
  theme,
  width,
  height,
}) => (
  <>
    <div className="flex dark:hidden items-center">
      <Image
        src="/logo/logo.png"
        alt=""
        width={width}
        height={height}
      />
    </div>
    <div className="hidden dark:flex items-center">
      <Image
        src="/logo/logo_dark.png"
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
  projectLink: 'https://github.com/axelarnetwork/axelarscan-docs',
  docsRepositoryBase: 'https://github.com/axelarnetwork/axelarscan-docs/blob/main/pages',
  titleSuffix: ' | Axelarscan',
  search: true,
  unstable_flexsearch: true,
  floatTOC: true,
  defaultMenuCollapsed: true,
  feedbackLink: () => {
    const { locale } = useRouter()
    return (
      FEEDBACK_LINK_WITH_TRANSLATIONS[locale] ||
      FEEDBACK_LINK_WITH_TRANSLATIONS['en-US']
    )
  },
  feedbackLabels: 'feedback',
  logo: () => {
    const { locale } = useRouter()
    return (
      <>
        <Logo
          width={24}
          height={24}
        />
        <span
          title={`Axelarscan | ${TITLE_WITH_TRANSLATIONS[locale] || TITLE_WITH_TRANSLATIONS['en-US']}`}
          className="hidden md:inline select-none font-extrabold mx-2"
        >
          Axelarscan
        </span>
        <span className="hidden md:inline select-none text-gray-500 dark:text-gray-400 mx-1">
          API Documentation
        </span>
      </>
    )
  },
  head: ({
    title,
    meta,
  }) => {
    const { route } = useRouter()
    const ogImage = meta.image || '/images/og.png'
    return (
      <>
        {/* Favicons, meta */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="/favicon/site.webmanifest"
        />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta
          name="msapplication-TileColor"
          content="#ffffff"
        />
        <meta
          httpEquiv="Content-Language"
          content="en"
        />
        <meta
          name="description"
          content={
            meta.description ||
            'Axelarscan API Documentation'
          }
        />
        <meta
          name="og:description"
          content={
            meta.description ||
            'Axelarscan API Documentation'
          }
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:site"
          content="@axelarcore"
        />
        <meta
          name="twitter:image"
          content={ogImage}
        />
        <meta
          name="og:title"
          content={title ?
            `${title} | Axelarscan` :
            'Axelarscan | API Documentation'
          }
        />
        <meta
          name="og:image"
          content={ogImage}
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Axelarscan"
        />
      </>
    )
  },
  footerEditLink: ({ locale }) => {
    switch (locale) {
      default:
        return 'Edit this page on GitHub →'
    }
  },
  footerText: (
    <a
      href="https://axelarscan.io"
      target="_blank"
      rel="noopener noreferrer"
      className="text-slate-600 dark:text-white"
    >
      Axelarscan
    </a>
  ),
}