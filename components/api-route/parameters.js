import { useRouter } from 'next/router'

import { equals_ignore_case } from '../../utils'
import routes from '../../data/routes.json'

const COLUMNS = [
  { id: 'parameter', name: 'Parameter', field: 'id', className: 'font-bold' },
  { id: 'require', name: 'Require', field: 'require', type: 'boolean', className: 'font-medium' },
  { id: 'type', name: 'Type', field: 'type', className: 'capitalize text-slate-500 dark:text-slate-300 font-normal' },
  { id: 'value', name: 'Value', field: 'value', className: 'font-semibold' },
]

export default () => {
  const router = useRouter()
  const { pathname } = { ...router }

  const route_data = routes.find(r => equals_ignore_case(r?.id, pathname))
  const {
    parameters,
  } = { ...route_data }

  return (
    <table className="max-w-fit block shadow dark:shadow-slate-600 rounded-lg overflow-x-auto">
      <thead className="bg-slate-50 dark:bg-black">
        <tr className="border-none">
          {COLUMNS.map((c, i) => {
            const {
              name,
              headerClassName,
            } = { ...c }
            return (
              <th
                key={i}
                scope="col"
                className={`${i === 0 ? 'rounded-tl-lg' : i === COLUMNS.length - 1 ? 'rounded-tr-lg' : ''} border-none whitespace-nowrap uppercase text-slate-400 dark:text-slate-600 text-xs py-3 px-4 ${headerClassName || ''}`}
              >
                {name}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {parameters?.length < 1 ?
          <tr className="border-none border-b">
            <th
              scope="col"
              className="bg-transparent border-none whitespace-nowrap text-slate-400 dark:text-slate-600 font-normal italic py-3 px-4"
            >
              No parameters
            </th>
          </tr> :
          parameters.filter(p => p).map((p, i) => (
            <tr
              key={i}
              className="border-none border-b"
            >
              {COLUMNS.map((c, j) => {
                const {
                  id,
                  field,
                  type,
                  className,
                } = { ...c }
                return (
                  <th
                    key={j}
                    scope="col"
                    className={`${i % 2 === 0 ? 'bg-transparent' : 'bg-slate-50 dark:bg-black'} ${i === parameters.length - 1 ? j === 0 ? 'rounded-bl-lg' : j === COLUMNS.length - 1 ? 'rounded-br-lg' : '' : ''} border-none py-3 px-4 ${className || ''}`}
                  >
                    {type === 'boolean' ?
                      (!!p[field]).toString() :
                      id === 'value' && p.enums ?
                        <div className="flex flex-wrap items-center">
                          {p.enums.map((e, k) => (
                            <div
                              key={k}
                              className="bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200 font-medium py-0.5 px-2.5 mb-1.5 mr-1.5"
                            >
                              {e}
                            </div>
                          ))}
                        </div> :
                        p[field]?.toString()
                    }
                  </th>
                )
              })}
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}