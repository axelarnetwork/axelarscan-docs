import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import _ from 'lodash'
import { TailSpin } from 'react-loader-spinner'

import Copy from '../copy'
import Codeblock from '../codeblock'
import { getEnvironment, getRoute } from '../../lib/config'
import { toArray, equalsIgnoreCase, isJson } from '../../lib/utils'

export default () => {
  const { preferences, routes } = useSelector(state => ({ preferences: state.preferences, routes: state.routes }), shallowEqual)
  const { environment } = { ...preferences }
  const { routes_data } = { ...routes }

  const router = useRouter()
  const { pathname } = { ...router }

  const [input, setInput] = useState(undefined)
  const [data, setData] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [response, setResponse] = useState(undefined)

  useEffect(
    () => {
      if (routes_data) {
        const { parameters } = { ...getRoute(pathname, routes_data) }
        setData(Object.fromEntries(toArray(parameters).filter(d => d.require || d.override).map(d => [d.id, d.override ? d.override.value : d.value])))
      }
    },
    [routes_data, pathname],
  )

  const { is_gmp, methods } = { ...getRoute(pathname, routes_data) }
  const { api_url, gmp_api_url } = { ...getEnvironment(environment) }
  const endpoint_url = is_gmp ? gmp_api_url : api_url

  const request = async () => {
    setFetching(true)
    try {
      const _data = isJson(input) ? JSON.parse(input) : data
      const method = (_.head(methods) || 'post').toUpperCase()
      const response = await fetch(endpoint_url, { method, params: equalsIgnoreCase(method, 'get') ? _data : undefined, body: equalsIgnoreCase(method, 'post') ? JSON.stringify(_data) : undefined }).catch(error => { return null })
      setResponse(response && await response.json())
    } catch (error) {
      setResponse(error)
    }
    setFetching(false)
  }

  const disabled = fetching || (input !== undefined && !isJson(input))

  return (
    <div className="space-y-4 mx-1">
      <div className="space-y-2">
        <div className="flex items-center justify-between space-x-2">
          <div className="text-lg font-semibold">
            Request {toArray(methods).includes('get') ? 'Params' : 'Body'}
          </div>
          <button
            disabled={disabled}
            onClick={() => request()}
            className={`${disabled ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500' : 'bg-blue-500 dark:bg-blue-600 text-white'} rounded-xl uppercase font-semibold py-1.5 px-3`}
          >
            Request
          </button>
        </div>
        <textarea
          value={input === undefined ? JSON.stringify(data, {}, '\t') : input}
          onChange={e => setInput(e.target.value)}
          className="w-full h-60 bg-slate-50 dark:bg-slate-900 rounded-xl py-3 px-4"
        />
      </div>
      {(response !== undefined || fetching) && (
        <div className="space-y-2">
          <div className="flex items-center justify-between space-x-2">
            <div className="text-lg font-semibold">
              Response
            </div>
            {!fetching && (
              <Copy
                size={20}
                value={JSON.stringify(response)}
                title={
                  <span className="cursor-pointer text-slate-400 dark:text-slate-500 font-normal mr-0.5">
                    Copy to Clipboard
                  </span>
                }
              />
            )}
          </div>
          {fetching ?
            <TailSpin width="36" height="36" color="#3b82f6" /> :
            <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl py-3 px-4">
              <pre>{JSON.stringify(response, null, '\t')}</pre>
            </div>
          }
        </div>
      )}
    </div>
  )
}