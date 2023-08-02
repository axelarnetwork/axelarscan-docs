import { useRouter } from 'next/router'
import { useSelector, shallowEqual } from 'react-redux'

import { getRoute } from '../../lib/config'
import { toArray } from '../../lib/utils'

const COLUMNS = [
  { id: 'parameter', name: 'Parameter', field: 'id', className: 'font-bold' },
  { id: 'require', name: 'Require', field: 'require', type: 'boolean', className: 'font-medium' },
  { id: 'type', name: 'Type', field: 'type', className: 'capitalize text-slate-500 dark:text-slate-300 font-normal' },
  { id: 'value', name: 'Value', field: 'value', className: 'font-semibold' },
]

export default () => {
  const { routes } = useSelector(state => ({ routes: state.routes }), shallowEqual)
  const { routes_data } = { ...routes }

  const router = useRouter()
  const { pathname } = { ...router }

  const { parameters } = { ...getRoute(pathname, routes_data) }

  return (
    <table className="max-w-fit overflow-x-auto rounded-lg block">
      <thead className="bg-slate-50 dark:bg-black">
        <tr className="border-none">
          {COLUMNS.map((d, i) => {
            const { name, headerClassName } = { ...d }
            return (
              <th key={i} scope="col" className={`${i === 0 ? 'rounded-tl-lg' : i === COLUMNS.length - 1 ? 'rounded-tr-lg' : ''} border-none whitespace-nowrap uppercase text-slate-400 dark:text-slate-500 text-xs text-left py-3 px-4 ${headerClassName || ''}`}>
                {name}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {parameters && toArray(parameters).length < 1 ?
          <tr className="border-none border-b">
            <th scope="col" className="bg-transparent border-none whitespace-nowrap text-slate-400 dark:text-slate-500 font-normal italic py-3 px-4">
              No parameters
            </th>
          </tr> :
          toArray(parameters).map((d, i) => {
            const { enums } = { ...d }
            return (
              <tr key={i} className="border-none border-b">
                {COLUMNS.map((c, j) => {
                  const { id, field, type, className } = { ...c }
                  return (
                    <th key={j} scope="col" className={`${i % 2 === 0 ? 'bg-transparent' : 'bg-slate-50 dark:bg-black'} ${i === parameters.length - 1 ? j === 0 ? 'rounded-bl-lg' : j === COLUMNS.length - 1 ? 'rounded-br-lg' : '' : ''} border-none text-left py-3 px-4 ${className || ''}`}>
                      {type === 'boolean' ?
                        (!!d[field]).toString() :
                        id === 'value' && enums ?
                          <div className="flex flex-wrap items-center">
                            {enums.map((e, k) => (
                              <div key={k} className="bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200 font-medium mb-1.5 mr-1.5 py-0.5 px-2.5">
                                {e}
                              </div>
                            ))}
                          </div> :
                          d[field]?.toString()
                      }
                    </th>
                  )
                })}
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}