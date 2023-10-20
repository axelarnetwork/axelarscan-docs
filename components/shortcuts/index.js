import Link from 'next/link'
import { FiCode, FiServer, FiSettings } from 'react-icons/fi'
import { HiArrowNarrowRight } from 'react-icons/hi'

import Image from '../image'

const ITEMS = [
  {
    title: 'Interchain',
    description: '',
    url: '/interchain/interchainChart',
    icon: <FiCode size={32} />,
  },
  {
    title: 'Validators',
    description: '',
    url: '/validators/searchUptimes',
    icon: <FiServer size={32} />,
  },
  {
    title: 'Axelar',
    description: '',
    url: '/axelar/getCirculatingSupply',
    icon: (
      <div>
        <div className="block dark:hidden">
          <Image
            src="/logos/logo.png"
            width={32}
            height={32}
          />
        </div>
        <div className="hidden dark:block">
          <Image
            src="/logos/logo_white.png"
            width={32}
            height={32}
          />
        </div>
      </div>
    ),
  },
  {
    title: 'Resources',
    description: '',
    url: '/resources/getChains',
    icon: <FiSettings size={32} />,
  }
]

export default () => {
  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-6">
      {ITEMS.map((d, i) => {
        const { title, description, url, icon } = { ...d }
        return (
          <Link key={i} href={url} className="no-underline text-black dark:text-white">
            <div className="card-index h-full flex flex-col justify-between">
              <div className="mb-1">
                <div className="flex flex-col items-start space-y-1">
                  {icon}
                  <span className="text-sm font-semibold">
                    {title}
                  </span>
                </div>
                <div className="text-slate-400 dark:text-slate-500 mt-2">
                  {description}
                </div>
              </div>
              <div className="flex items-center text-blue-500 dark:text-blue-400 space-x-1.5">
                <span>Documentation</span>
                <HiArrowNarrowRight size={16} className="mt-0.5" />
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
