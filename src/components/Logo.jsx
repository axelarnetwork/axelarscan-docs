import Image from 'next/image'
import { useTheme } from 'next-themes'

export function Logo(props) {
  const { resolvedTheme } = useTheme()

  return (
    <div {...props} className={`${props.className} flex items-center`}>
      <Image
        src={`/logos/logo${resolvedTheme === 'dark' ? '_white' : ''}.png`}
        alt=""
        width={24}
        height={24}
        unoptimized
        className="mr-3"
      />
      <span className="text-lg font-bold">Axelarscan Docs</span>
    </div>
  )
}
