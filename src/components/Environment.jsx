'use client'

import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { create } from 'zustand'

export const useEnvironment = create()(set => ({
  environment: 'mainnet',
  setEnvironment: environment => set(state => ({ ...state, environment })),
}))

export const ENVIRONMENTS = ['mainnet', 'testnet']

export const Environment = () => {
  const { environment, setEnvironment } = useEnvironment()

  return (
    <Tab.Group>
      <Tab.List className="-mb-px flex gap-4 text-base font-medium">
        {ENVIRONMENTS.map(e => (
          <Tab key={e} onClick={() => setEnvironment(e)} className={clsx('border-b py-3 transition ui-not-focus-visible:outline-none capitalize', e === environment ? 'border-emerald-500 text-emerald-400 font-semibold' : 'border-transparent text-zinc-400 hover:text-zinc-300')}>
            {e}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  )
}
