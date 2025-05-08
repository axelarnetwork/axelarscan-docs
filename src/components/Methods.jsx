'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Markdown from 'react-markdown'
import _ from 'lodash'
import moment from 'moment'

import { Environment, useEnvironment } from '@/components/Environment'
import { Row, Col, Properties, Property } from '@/components/mdx'
import { CodePanel, Code } from '@/components/Code'
import { Tag } from '@/components/Tag'
import { Button } from '@/components/Button'
import { useAPIMethodsStore } from '@/app/providers'
import { toJson, getAPINameFromPathname } from '@/lib/utils'

const highlightJSON = json => {
  if (!json) return ''

  const delimiter = ' // '
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    match => {
      let type = 'number'

      if (/^"/.test(match)) {
        type = /:$/.test(match) ? 'key' : 'string'
      }
      else if (/true|false/.test(match)) {
        type = 'boolean'
      }
      else if (/null/.test(match)) {
        type = 'null'
      }

      const comment = type === 'string' && match.includes(delimiter) ? _.last(match.split(delimiter)).slice(0, -1) : undefined

      if (comment) {
        match = _.head(match.split(delimiter))
      }

      return `<span style="color: var(--shiki-token-${type === 'key' ? 'keyword' : 'string'})">${match}${comment ? '"' : ''}</span>${comment ? `${toJson(json) ? ',' : ''}<span class="ml-2" style="color: var(--shiki-token-comment)">// ${comment}</span>${delimiter}` : ''}`
    }
  ).replaceAll(`${delimiter},`, '').replaceAll(`</span>${delimiter}`, '</span>')
}

const parseResponse = (fields, options) => {
  const { noComment } = { ...options }

  const typeToString = (type, description) => `${type}${!noComment && description ? ` // ${description}` : ''}`

  const parseAttributes = attrs => {
    if (!attrs || !Array.isArray(attrs)) return attrs

    let data = {}

    for (const attr of attrs) {
      const { name, type, description, primitive, attributes, key, value } = { ...attr }

      if (primitive) {
        if (attributes) {
          data = parseAttributes(attributes)

          if (type === '[object]') {
            data = [data]
          }
        }
        else {
          return `"${name}": "${typeToString(type, description)}"`
        }
      }
      else {
        switch (type) {
          case 'Map':
            if (attributes) {
              if (name) {
                data[name] = parseAttributes(attributes)
              }
              else {
                data = parseAttributes(attributes)
              }
            }
            else {
              if (name) {
                data[name] = typeToString(type, description)
              }
              else {
                data = typeToString(type, description)
              }
            }
            break
          case 'entry':
            data[`[${key}]`] = parseAttributes(value?.attributes || value)
            break
          default:
            if (attributes) {
              data[name] = parseAttributes(attributes)

              if (type === '[object]') {
                data[name] = [data[name]]
              }
            }
            else {
              data[name] = typeToString(type, description)
            }
            break
        }
      }
    }

    return data
  }

  const result = parseAttributes(fields)

  if (!toJson(result)) {
    return result
  }

  return JSON.stringify(result, null, 2)
}

const getDefaultBodies = (methods, methodID) => {
  if (!methods) return {}

  return Object.fromEntries(methods.filter(d => !methodID || d.id === methodID).map(({ id, parameters }) => [
    id,
    Object.fromEntries(parameters.map(p => {
      const { name, type, required } = { ...p }

      let time

      switch (name) {
        case 'size':
          return [name, 1]
        case 'fromTime':
          time = moment().subtract(1, 'months').startOf('day')
          return [name, type === 'unixtime' ? time.unix() : time.valueOf()]
        case 'toTime':
          time = moment().endOf('day')
          return [name, type === 'unixtime' ? time.unix() : time.valueOf()]
        case 'timestamp':
          time = moment().startOf('minute')
          return [name, type === 'unixtime' ? time.unix() : time.valueOf()]
        default:
          if (p.default) {
            return [name, p.default === 'ZeroAddress' ? '0x0000000000000000000000000000000000000000' : p.default]
          }
          else if (required) {
            switch (name) {
              case 'sourceChain':
              case 'chain':
                return [name, 'avalanche']
              case 'destinationChain':
                return [name, id === 'estimateITSFee' ? 'xrpl' : 'polygon']
              case 'symbol':
                return [name, 'AXL']
              default:
                return
            }
          }

          return
      }
    }).filter(entry => entry)),
  ]))
}

export const Methods = () => {
  const [bodies, setBodies] = useState(getDefaultBodies())
  const [responses, setResponses] = useState({})
  const [fetching, setFetching] = useState(false)

  const pathname = usePathname()
  const { endpoints, methods } = { ...useAPIMethodsStore()[getAPINameFromPathname(pathname)] }
  const { environment } = useEnvironment()

  const endpoint = endpoints?.[environment]

  useEffect(() => {
    setBodies(getDefaultBodies(methods))
    setResponses({})
    setFetching(false)
  }, [pathname, methods])

  const request = async id => {
    setFetching(true)

    try {
      const response = await fetch(`${endpoint}/${id}`, { method: 'POST', body: JSON.stringify(bodies[id]) }).catch(error => null)
      setResponses({ ...responses, [id]: response && await response.json() })
    } catch (error) {
      setResponses({ ...responses, [id]: error })
    }

    setFetching(false)
  }

  const reset = id => {
    setBodies({ ...bodies, ...getDefaultBodies(methods, id) })
    setResponses({ ...responses, [id]: null })
    setFetching(false)
  }

  const inputOnChange = (value, id, name) => setBodies({ ...bodies, [id]: Object.fromEntries(Object.entries({ ...bodies[id], [name]: value }).filter(([k, v]) => v || typeof v !== 'string')) })

  return methods && (
    <div className="xl:max-w-none flex flex-col">
      {methods.map(d => {
        const { id, description, parameters } = { ...d }

        const requiredParameters = parameters.filter(d => d.required)
        const optionalParameters = parameters.filter(d => !d.required)

        const body = JSON.stringify({ ...bodies[id] }, null, 2)
        const response = responses[id] ? JSON.stringify(responses[id], null, 2) : undefined

        return (
          <div key={id}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 sm:gap-y-0 gap-x-3 mb-3 sm:mb-0">
              <div className="flex items-center gap-x-3">
                <div className="flex items-center gap-x-2">
                  <Tag>{parameters.length === 0 ? 'GET' : 'POST'}</Tag>
                </div>
                <span className="font-mono text-xs text-zinc-400">
                  /{id}
                </span>
              </div>
              <div className="sm:ml-auto">
                <Environment />
              </div>
            </div>
            <h2 className="mt-2 scroll-mt-32" id={id}>
              <Link href={`#${id}`} className="group text-inherit no-underline hover:text-inherit">
                <div className="absolute ml-[calc(-1*var(--width))] mt-1 hidden w-[var(--width)] opacity-0 transition [--width:calc(2.625rem+0.5px+50%-min(50%,calc(theme(maxWidth.lg)+theme(spacing.8))))] group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50 2xl:[--width:theme(spacing.10)]">
                  <div className="group/anchor block h-5 w-5 rounded-lg bg-zinc-50 ring-1 ring-inset ring-zinc-300 transition hover:ring-zinc-500 dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:hover:ring-zinc-600">
                    <svg viewBox="0 0 20 20" fill="none" strokeLinecap="round" aria-hidden="true" className="h-5 w-5 stroke-zinc-500 transition dark:stroke-zinc-400 dark:group-hover/anchor:stroke-white">
                      <path d="m6.5 11.5-.964-.964a3.535 3.535 0 1 1 5-5l.964.964m2 2 .964.964a3.536 3.536 0 0 1-5 5L8.5 13.5m0-5 3 3" />
                    </svg>
                  </div>
                </div>
                {id}
              </Link>
            </h2>
            <Row>
              <Col>
                <Markdown>{description}</Markdown>
                {requiredParameters.length === 0 ? undefined : <>
                  <Markdown>
                    {`### Required attributes`}
                  </Markdown>
                  <Properties>
                    {requiredParameters.map(parameter => {
                      const { name, type, description } = { ...parameter }

                      return (
                        <Property
                          key={name}
                          name={name}
                          type={type}
                          defaultValue={parameter.default}
                          enums={parameter.enum}
                          value={bodies[id]?.[name]}
                          onChange={value => inputOnChange(value, id, name)}
                        >
                          {description}
                        </Property>
                      )
                    })}
                  </Properties>
                </>}
                {optionalParameters.length === 0 ? undefined : <>
                  <Markdown>
                    {`### Optional attributes`}
                  </Markdown>
                  <Properties>
                    {optionalParameters.map(parameter => {
                      const { name, type, description } = { ...parameter }

                      return (
                        <Property
                          key={name}
                          name={name}
                          type={type}
                          defaultValue={parameter.default}
                          enums={parameter.enum}
                          value={bodies[id]?.[name]}
                          onChange={value => inputOnChange(value, id, name)}
                        >
                          {description}
                        </Property>
                      )
                    })}
                  </Properties>
                </>}
              </Col>
              <Col sticky>
                <div className="my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
                  <div className="not-prose">
                    <div className="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-center gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">
                      <h3 className="mr-auto text-xs font-semibold text-white">
                        Request
                      </h3>
                      <Button variant="text" disabled={fetching} onClick={() => request(id)}>
                        {fetching ? 'Fetching...' : 'Try it'}
                      </Button>
                      {response && (
                        <Button variant="text" disabled={fetching} onClick={() => reset(id)}>
                          Reset
                        </Button>
                      )}
                    </div>
                    <div className="overflow-x-auto flex h-9 items-center gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 bg-zinc-900 px-4 dark:border-b-white/5 dark:bg-white/1">
                      <Tag>{parameters.length === 0 ? 'GET' : 'POST'}</Tag>
                      <span className="font-mono text-xs text-zinc-400 whitespace-nowrap">
                        {endpoint}/{id}
                      </span>
                    </div>
                    <CodePanel code={body}>
                      <Code dangerouslySetInnerHTML={{ __html: highlightJSON(body) }} className="language-json" />
                    </CodePanel>
                  </div>
                </div>
                <div className="my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
                  <div className="not-prose">
                    <div className="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">
                      <h3 className="mr-auto pt-3 text-xs font-semibold text-white">
                        Response
                      </h3>
                    </div>
                    <CodePanel code={response || parseResponse(d.response, { noComment: true })}>
                      <Code dangerouslySetInnerHTML={{ __html: highlightJSON(response || parseResponse(d.response)) }} className="language-json" />
                    </CodePanel>
                  </div>
                </div>
              </Col>
            </Row>
            <hr />
          </div>
        )
      })}
    </div>
  )
}
