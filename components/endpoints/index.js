import { FiCode } from 'react-icons/fi'
import { MdOutlineHowToVote } from 'react-icons/md'
import { TbActivityHeartbeat } from 'react-icons/tb'
import { BiMessageDots } from 'react-icons/bi'
import { HiArrowNarrowRight } from 'react-icons/hi'

import Copy from '../copy'
import environments from '../../data/environments'

export default () => {
  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6">
      {environments.map((e, i) => {
        const {
          name,
          explorer_url,
          api_url,
          gmp_api_url,
        } = { ...e }
        return (
          <div
            key={i}
            className="h-full rounded-lg border dark:border-slate-800 space-y-3 p-4 sm:p-6"
          >
            <div className="text-xl font-bold">
              {name}
            </div>
            <div className="space-y-2">
              {explorer_url && (
                <div className="space-y-0.5">
                  <div className="text-slate-400 dark:text-slate-600 text-base font-normal">
                    Explorer
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900 rounded-lg flex items-center justify-between space-x-2 py-1 px-2.5">
                    <a
                      href={explorer_url}
                      target="_blank"
                      rel="noopenner noreferrer"
                      className="text-base sm:text-lg"
                    >
                      {new URL(explorer_url).host}
                    </a>
                    <Copy
                      value={explorer_url}
                      size={20}
                    />
                  </div>
                </div>
              )}
              {api_url && (
                <div className="space-y-0.5">
                  <div className="text-slate-400 dark:text-slate-600 text-base font-normal">
                    API
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900 rounded-lg flex items-center justify-between space-x-2 py-1 px-2.5">
                    <div className="text-slate-600 dark:text-slate-200 text-base sm:text-lg">
                      {api_url}
                    </div>
                    <Copy
                      value={api_url}
                      size={20}
                    />
                  </div>
                </div>
              )}
              {gmp_api_url && (
                <div className="space-y-0.5">
                  <div className="text-slate-400 dark:text-slate-600 text-base font-normal">
                    GMP API
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900 rounded-lg flex items-center justify-between space-x-2 py-1 px-2.5">
                    <div className="text-slate-600 dark:text-slate-200 text-base sm:text-lg">
                      {gmp_api_url}
                    </div>
                    <Copy
                      value={gmp_api_url}
                      size={20}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}