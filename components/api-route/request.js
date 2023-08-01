import _ from 'lodash'

import Copy from '../copy'
import { toArray } from '../../lib/utils'

export default ({ data }) => {
  const { is_gmp, methods, environment } = { ...data }
  const { api_url, gmp_api_url } = { ...environment }
  const endpoint_url = is_gmp ? gmp_api_url : api_url

  return (
    <div className="space-y-2 mx-1">
      <div className="flex flex-wrap items-center">
        <div className="sm:w-32 text-slate-400 dark:text-slate-500 mr-3">
          Endpoint
        </div>
        {endpoint_url ?
          <Copy
            size={22}
            value={endpoint_url}
            title={
              <span className="cursor-pointer text-blue-500 dark:text-white sm:text-lg font-semibold mr-1">
                {endpoint_url}
              </span>
            }
          /> :
          <span>-</span>
        }
      </div>
      {toArray(methods).length > 0 && (
        <div className="flex flex-wrap items-center">
          <div className="sm:w-32 text-slate-400 dark:text-slate-500 mr-3">
            Method
          </div>
          {toArray(methods).map((m, i) => (
            <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-lg uppercase text-slate-800 dark:text-slate-200 text-base font-semibold py-1 px-2.5 mr-2">
              {m}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}