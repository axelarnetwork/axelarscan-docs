'use client'

import { useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import { create } from 'zustand'

import { getAxelarscanAPIMethods, getValidatorAPIMethods, getTokenTransferAPIMethods, getGMPAPIMethods } from '@/lib/api'

function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      let systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export const useAPIMethodsStore = create()(set => ({
  axelarscan: null,
  validator: null,
  tokenTransfer: null,
  gmp: null,
  setAxelarscan: data => set(state => ({ ...state, axelarscan: data })),
  setValidator: data => set(state => ({ ...state, validator: data })),
  setTokenTransfer: data => set(state => ({ ...state, tokenTransfer: data })),
  setGMP: data => set(state => ({ ...state, gmp: data })),
}))

const ConfigLoader = () => {
  const { setAxelarscan, setValidator, setTokenTransfer, setGMP } = useAPIMethodsStore()

  useEffect(() => {
    const getData = async () => {
      await Promise.all(['axelarscan', 'validator', 'tokenTransfer', 'GMP'].map(k => new Promise(async resolve => {
        switch (k) {
          case 'axelarscan':
            setAxelarscan(await getAxelarscanAPIMethods())
            break
          case 'validator':
            setValidator(await getValidatorAPIMethods())
            break
          case 'tokenTransfer':
            setTokenTransfer(await getTokenTransferAPIMethods())
            break
          case 'GMP':
            setGMP(await getGMPAPIMethods())
            break
          default:
            break
        }
        resolve()
      })))
    }
    getData()
  }, [])

  return null
}

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <ThemeWatcher />
      <ConfigLoader />
      {children}
    </ThemeProvider>
  )
}
