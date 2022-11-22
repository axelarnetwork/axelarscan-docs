import Link from 'next/link'
import { FiCode } from 'react-icons/fi'
import { MdOutlineHowToVote } from 'react-icons/md'
import { TbActivityHeartbeat } from 'react-icons/tb'
import { BiMessageDots } from 'react-icons/bi'
import { HiArrowNarrowRight } from 'react-icons/hi'

const items = [
  {
    title: 'Cross-chain',
    description: '',
    icon: (
      <FiCode size={32} />
    ),
    url: '/cross-chain',
  },
  {
    title: 'EVM polls',
    description: '',
    icon: (
      <MdOutlineHowToVote size={32} />
    ),
    url: '/evm-polls',
  },
  {
    title: 'Heartbeats',
    description: '',
    icon: (
      <TbActivityHeartbeat size={32} />
    ),
    url: '/heartbeats',
  },
  {
    title: 'General Message Passing',
    description: '',
    icon: (
      <BiMessageDots size={32} />
    ),
    url: '/general-message-passing',
  }
]

export default () => {
  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-6">
      {items.map((item, i) => {
        const {
          icon,
          title,
          description,
          url,
          external,
        } = { ...item }
        const link = (
          <div className="flex items-center text-blue-500 dark:text-blue-400 space-x-1.5">
            <span>
              Documentation
            </span>
            <HiArrowNarrowRight size={16} className="mt-0.5" />
          </div>
        )
        const element = (
          <div className="card-index h-full flex flex-col justify-between">
            <div className="mb-1">
              <div className="flex flex-col items-start space-y-1">
                {icon}
                <span className="text-sm font-semibold">
                  {title}
                </span>
              </div>
              <div className="text-slate-500 dark:text-slate-400 mt-2">
                {description}
              </div>
            </div>
            {link}
          </div>
        )

        return (
          external ?
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopenner noreferrer"
              className="no-underline text-black dark:text-white"
            >
              {element}
            </a> :
            <Link
              key={i}
              href={url}
            >
              <a className="no-underline text-black dark:text-white">
                {element}
              </a>
            </Link>
        )
      })}
    </div>
  )
}