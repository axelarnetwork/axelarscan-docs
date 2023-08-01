import Copy from '../copy'
import { ENVIRONMENTS } from '../../lib/config'

export default () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6">
      {ENVIRONMENTS.map((d, i) => {
        const { name, explorer_url, api_url, gmp_api_url } = { ...d }
        return (
          <div key={i} className="h-full rounded-lg border dark:border-slate-800 space-y-3 p-4 sm:p-6">
            <div className="text-xl font-bold">
              {name}
            </div>
            <div className="space-y-2">
              {explorer_url && (
                <div className="space-y-0.5">
                  <div className="text-slate-400 dark:text-slate-500 text-base font-normal">
                    Explorer
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-between space-x-2 py-1 px-2.5">
                    <a
                      href={explorer_url}
                      target="_blank"
                      rel="noopenner noreferrer"
                      className="text-base"
                    >
                      {new URL(explorer_url).host}
                    </a>
                    <Copy size={20} value={explorer_url} />
                  </div>
                </div>
              )}
              {api_url && (
                <div className="space-y-0.5">
                  <div className="text-slate-400 dark:text-slate-500 text-base font-normal">
                    API
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-between space-x-2 py-1 px-2.5">
                    <div className="text-slate-600 dark:text-slate-200 text-base">
                      {api_url}
                    </div>
                    <Copy size={20} value={api_url} />
                  </div>
                </div>
              )}
              {gmp_api_url && (
                <div className="space-y-0.5">
                  <div className="text-slate-400 dark:text-slate-500 text-base font-normal">
                    GMP API
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-between space-x-2 py-1 px-2.5">
                    <div className="text-slate-600 dark:text-slate-200 text-base">
                      {gmp_api_url}
                    </div>
                    <Copy size={20} value={gmp_api_url} />
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