import { useRouter } from 'next/router'
import { useSelector, shallowEqual } from 'react-redux'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import { TailSpin } from 'react-loader-spinner'

import Copy from '../copy'
import Codeblock from '../codeblock'
import { equals_ignore_case, is_json } from '../../utils'
import environments from '../../data/environments.json'
import routes from '../../data/routes.json'

export default () => {
  const { environment } = useSelector(state => ({ environment: state.environment }), shallowEqual)
  const { environment_id } = { ...environment }

  const router = useRouter()
  const { pathname } = { ...router }

  const [fetching, setFetching] = useState(false)
  const [input, setInput] = useState(undefined)
  const [data, setData] = useState(null)
  const [response, setResponse] = useState(undefined)

  useEffect(() => {
    const route_data = routes.find(r => equals_ignore_case(r?.id, pathname))
    const {
      parameters,
    } = { ...route_data }
    setData(Object.fromEntries(
      parameters?.filter(p => p?.require || p?.override)
        .map(p => [p.id, p.override ? p.override.value : p.value]) || []
      )
    )
  }, [pathname])

  const environment_data = environments.find(e => equals_ignore_case(e?.id, environment_id))
  const route_data = routes.find(r => equals_ignore_case(r?.id, pathname))
  const {
    id,
    is_gmp,
    methods,
  } = { ...route_data }
  const {
    api_url,
    gmp_api_url,
  } = { ...environment_data }
  const endpoint_url = is_gmp ? gmp_api_url : `${api_url}${id}`

  const request = async () => {
    setFetching(true)
    try {
      const _data = is_json(input) ?
        JSON.parse(input) :
        data
      const method = (_.head(methods) || 'post').toUpperCase()
      const response = await fetch(endpoint_url, {
        method,
        body: JSON.stringify(_data),
      }).catch(error => { return null })
      setResponse(response && await response.json())
    } catch (error) {
      setResponse(error)
    }
    setFetching(false)
  }

  const disabled = fetching || (input !== undefined && !is_json(input))

  return (
    <div className="space-y-4 mx-1">
      <div className="space-y-2">
        <div className="flex items-center justify-between space-x-2">
          <div className="text-lg font-semibold">
            Request {methods?.includes('get') ? 'Params' : 'Body'}
          </div>
          <button
            disabled={disabled}
            onClick={() => request()}
            className={`${disabled ? 'bg-slate-100 dark:bg-zinc-900 text-slate-400 dark:text-slate-600' : 'bg-blue-600 dark:bg-blue-800 text-white'} shadow-lg dark:shadow dark:shadow-slate-400 rounded-xl uppercase font-semibold py-1.5 px-3`}
          >
            Request
          </button>
        </div>
        <textarea
          value={input === undefined ? JSON.stringify(data, {}, '\t') : input}
          onChange={e => setInput(e.target.value)}
          className="w-full h-60 bg-slate-100 dark:bg-zinc-900 rounded-xl py-3 px-4"
        />
      </div>
      {(response !== undefined || fetching) && (
        <div className="space-y-2">
          <div className="flex items-center justify-between space-x-2">
            <div className="text-lg font-semibold">
              Response
            </div>
            <Copy
              value={JSON.stringify(response)}
              title={<span className="cursor-pointer text-slate-400 dark:text-slate-600 font-light mr-0.5">
                Copy to Clipboard
              </span>}
              size={20}
            />
          </div>
          {fetching ?
            <TailSpin
              color="#0ea5e9"
              width="36"
              height="36"
            /> :
            <Codeblock language="json">
              {JSON.stringify(response, null, '\t')}
            </Codeblock>
          }
        </div>
      )}
    </div>
  )
}