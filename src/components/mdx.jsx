import Link from 'next/link'
import clsx from 'clsx'

import { Heading } from '@/components/Heading'
import { Prose } from '@/components/Prose'

export const a = Link
export { Button } from '@/components/Button'
export { CodeGroup, Code as code, Pre as pre } from '@/components/Code'
import { Tag } from '@/components/Tag'

export function wrapper({ children }) {
  return (
    <article className="flex h-full flex-col pb-10 pt-16">
      <Prose className="flex-auto">{children}</Prose>
    </article>
  )
}

export const h2 = function H2(props) {
  return <Heading level={2} {...props} />
}

function InfoIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  )
}

export function Note({ children }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <InfoIcon className="mt-1 h-4 w-4 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function Row({ children }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  )
}

export function Col({ children, sticky = false }) {
  return (
    <div
      className={clsx(
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
        sticky && 'xl:sticky xl:top-24',
      )}
    >
      {children}
    </div>
  )
}

export function Properties({ children }) {
  return (
    <div className="my-6">
      <ul
        role="list"
        className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5"
      >
        {children}
      </ul>
    </div>
  )
}

export function Property({ name, children, type, defaultValue, enums, value, onChange }) {
  const isStringDisplay = ['string', 'BigNumber', 'FixedNumber'].includes(type)
  return (
    <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        {type && (
          <>
            <dt className="sr-only">Type</dt>
            <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              {type}
            </dd>
          </>
        )}
        {typeof defaultValue !== 'undefined' && (
          <>
            <dt className="sr-only">Default</dt>
            <Tag>default: {`${isStringDisplay ? '"' : ''}${defaultValue}${isStringDisplay ? '"' : ''}`}</Tag>
          </>
        )}
        {typeof enums !== 'undefined' && (
          <>
            <dt className="sr-only">Enum</dt>
            <dd className="w-full" />
            {enums.map(e => <Tag key={e} color="zinc">{e}</Tag>)}
          </>
        )}
        {typeof onChange === 'function' && (
          <>
            <dt className="sr-only">Input</dt>
            <dd className="w-full" />
            <input
              type={['integer', 'float', 'long', 'unixtime'].includes(type) && (typeof defaultValue === 'number' || (defaultValue && !isNaN(defaultValue))) ? 'number' : 'string'}
              placeholder={name}
              value={value}
              onChange={e => onChange(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-800 rounded-md border-0 sm:text-sm sm:leading-6 text-zinc-800 dark:text-zinc-50 py-1 px-2"
            />
          </>
        )}
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  )
}
