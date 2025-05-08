'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'

import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { useAPIMethodsStore } from '@/app/providers'
import { getAPINameFromPathname } from '@/lib/utils'
import { remToPx } from '@/lib/remToPx'

function useInitialValue(value, condition = true) {
  const initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({ href, target, children }) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        target={target}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'font-bold text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
      )}
    >
      <span className="truncate">
        {children}
      </span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </Link>
  )
}

function VisibleSectionHighlight({ group, pathname }) {
  const [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation(),
  )

  const isPresent = useIsPresent()

  const firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0],
    ),
  )

  const itemHeight = remToPx(2)
  const height = isPresent ? Math.max(1, visibleSections.length) * itemHeight : itemHeight
  const top = group.links.findIndex((link) => link.href === pathname) * itemHeight + firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({ group, pathname }) {
  const itemHeight = remToPx(2)
  const offset = remToPx(0.25)
  const activePageIndex = group.links.findIndex((link) => link.href === pathname)
  const top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({ group, className }) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  const isInsideMobileNavigation = useIsInsideMobileNavigation()

  const APIMethodsStore = useAPIMethodsStore()
  const apiName = getAPINameFromPathname(usePathname())
  const [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => APIMethodsStore[apiName]?.methods?.map(d => ({ id: d.id, title: d.id, tag: d.parameters.length === 0 ? 'GET' : 'POST' })) || s.sections)],
    isInsideMobileNavigation,
  )

  const isActiveGroup = group.links.findIndex((link) => link.href === pathname) !== -1

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink href={link.href} active={link.href === pathname}>
                {link.title}
              </NavLink>
              <AnimatePresence mode="popLayout" initial={false}>
                {link.href === pathname && sections.length > 0 && (
                  <motion.ul
                    role="list"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {sections.map((section) => (
                      <li key={section.id}>
                        <NavLink
                          href={`${link.href}#${section.id}`}
                          tag={section.tag}
                          active={typeof window !== 'undefined' && section.id === window.location.hash.substring(1)}
                          isAnchorLink
                       >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export const NAVIGATIONS = [
  {
    title: 'Guides',
    links: [{ title: 'Introduction', href: '/' }],
  },
  {
    title: 'APIs',
    links: [
      { title: 'Axelarscan', href: '/axelarscan' },
      { title: 'Validator', href: '/validator' },
      { title: 'Token Transfer', href: '/token-transfer' },
      { title: 'GMP', href: '/gmp' },
    ],
  },
]

export function Navigation(props) {
  const pathname = usePathname()
  const router = useRouter()
  const APIMethodsStore = useAPIMethodsStore()

  useEffect(() => {
    if (APIMethodsStore[getAPINameFromPathname(pathname)]?.methods?.find(d => d.id === window.location.hash.substring(1))) {
      router.push(`${pathname}${window.location.hash}`)
    }
    else if (pathname) {
      const pathnames = pathname.split('/').filter(d => d)

      if (pathnames.length > 0) {
        const entry = Object.entries(APIMethodsStore).filter(([k, v]) => v && !k.startsWith('set')).find(([k, v]) => v.methods?.find(d => d.id === pathnames[1]))

        if (entry) {
          router.push(`/${entry[0]}#${pathnames[1]}`)
        }
      }
    }
  }, [pathname, router, APIMethodsStore])

  return (
    <nav {...props}>
      <ul role="list">
        <TopLevelNavItem href="https://axelarscan.io" target="_blank">
          Explorer
        </TopLevelNavItem>
        <TopLevelNavItem href="https://docs.axelar.dev" target="_blank">
          Documentation
        </TopLevelNavItem>
        <TopLevelNavItem href="https://discord.com/invite/aRZ3Ra6f7D" target="_blank">
          Support
        </TopLevelNavItem>
        {NAVIGATIONS.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
      </ul>
    </nav>
  )
}
